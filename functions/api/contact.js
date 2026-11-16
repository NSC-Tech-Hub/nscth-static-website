const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const escape = (s) => s
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/`/g, "\u2035");

const getString = (value) =>
  typeof value === "string" ? value.trim() : "";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LEN = 2000;

export async function onRequestPost(context) {
  try {
    const contentLength = context.request.headers.get("content-length");
    if (contentLength && Number(contentLength) > 50_000) {
      return json({ error: "Payload too large" }, 413);
    }

    let payload;
    try {
      payload = await context.request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return json({ error: "Invalid JSON body" }, 400);
    }

    // A bot receives the same response as a successful submission, without external calls.
    if (payload.website) return json({ success: true });

    const name = getString(payload.name);
    const email = getString(payload.email);
    const message = getString(payload.message);

    if (!name || !email || !message) {
      return json({ error: "Missing required fields" }, 400);
    }

    if (name.length > 100 || email.length > 254 || message.length > MAX_LEN) {
      return json({ error: "Name, email, or message exceeds the length limit" }, 400);
    }

    if (!emailRegex.test(email)) {
      return json({ error: "Invalid email" }, 400);
    }

    const slackWebhook = context.env.SLACK_WEBHOOK_URL;
    if (!slackWebhook) {
      return json({ error: "Slack webhook not configured" }, 500);
    }

    const secret = context.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
      return json({ error: "Contact verification is unavailable" }, 503);
    }

    const token = getString(payload.turnstileToken);
    if (!token || token.length > 2048) {
      return json({ error: "Please complete the verification" }, 400);
    }

    let verification;
    try {
      const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token }),
        signal: AbortSignal.timeout(5000),
      });
      if (!result.ok) throw new Error("Verification service failed");
      verification = await result.json();
    } catch {
      return json({ error: "Contact verification is unavailable. Please try again." }, 503);
    }
    if (verification?.success !== true || verification.action !== "contact") {
      return json({ error: "Verification failed. Please try again." }, 400);
    }

    const safeMessage = escape(message);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    let response;
    try {
      response = await fetch(slackWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text:
            `*New Contact Form Submission*\n` +
            `*Name:* ${escape(name)}\n` +
            `*Email:* ${escape(email)}\n` +
            `*Message:*\n` +
            `\`\`\`\n${safeMessage}\n\`\`\``,
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const slackError = await response.text().catch(() => "Unknown Slack error");
      console.error("Slack request failed", {
        status: response.status,
        body: slackError,
      });
      return json({ error: "Slack request failed" }, 500);
    }

    return json({ success: true });

  } catch (err) {
    console.error("Contact form error", {
      message: err?.message,
      stack: err?.stack,
    });
    return json({ error: "Server error" }, 500);
  }
}