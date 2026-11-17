import { test } from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/contact.js';

const valid = { name: 'Jane', email: 'jane@example.com', message: 'Hello', turnstileToken: 'token' };
const env = { SLACK_WEBHOOK_URL: 'https://slack.invalid/webhook', TURNSTILE_SECRET_KEY: 'secret' };
const submit = (payload, settings = env) => onRequestPost({
  request: new Request('https://example.com/api/contact', { method: 'POST', body: JSON.stringify(payload) }),
  env: settings,
});

test('contact protections', async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });
  let calls;
  let verification;
  t.beforeEach(() => {
    calls = [];
    verification = { success: true, action: 'contact' };
    globalThis.fetch = async (url, options) => {
      calls.push({ url, body: JSON.parse(options.body) });
      return Response.json(url.includes('siteverify') ? verification : {});
    };
  });

  await t.test('normal submission verifies before posting to Slack', async () => {
    assert.equal((await submit(valid)).status, 200);
    assert.equal(calls.length, 2);
    assert.equal(calls[0].body.response, 'token');
    assert.match(calls[1].body.text, /Jane/);
  });
  await t.test('escapes control characters in every user field', async () => {
    assert.equal((await submit({ ...valid, name: '<!channel>&`', email: '<x>&@example.com', message: '<https://evil.example|click>&```' })).status, 200);
    const text = calls[1].body.text;
    assert.ok(!text.includes('<'));
    assert.match(text, /&lt;!channel&gt;&amp;‵/);
    assert.match(text, /&lt;x&gt;&amp;@example.com/);
    assert.match(text, /&lt;https:\/\/evil.example\|click&gt;&amp;‵‵‵/);
  });
  await t.test('honeypot silently succeeds without external calls', async () => {
    const result = await submit({ website: 'spam' }, {});
    assert.equal(result.status, 200);
    assert.deepEqual(await result.json(), { success: true });
    assert.equal(calls.length, 0);
  });
  await t.test('rejects oversized fields before verification', async () => {
    for (const [field, size] of [['name', 101], ['email', 255], ['message', 2001]]) {
      assert.equal((await submit({ ...valid, [field]: 'x'.repeat(size) })).status, 400);
    }
    assert.equal(calls.length, 0);
  });
  await t.test('accepts field length boundaries', async () => {
    assert.equal((await submit({ ...valid, name: 'x'.repeat(100), email: 'x'.repeat(242) + '@example.com', message: 'x'.repeat(2000) })).status, 200);
  });
  await t.test('rejects missing and oversized tokens without external calls', async () => {
    for (const turnstileToken of ['', 'x'.repeat(2049)]) {
      assert.equal((await submit({ ...valid, turnstileToken })).status, 400);
    }
    assert.equal(calls.length, 0);
  });
  await t.test('failed or wrong-action verification never reaches Slack', async () => {
    for (const result of [{ success: false }, { success: true, action: 'other' }]) {
      verification = result;
      assert.equal((await submit(valid)).status, 400);
    }
    assert.ok(calls.every(call => call.url.includes('siteverify')));
  });
  await t.test('missing secret fails closed', async () => {
    assert.equal((await submit(valid, { SLACK_WEBHOOK_URL: env.SLACK_WEBHOOK_URL })).status, 503);
    assert.equal(calls.length, 0);
  });
  await t.test('verification outage fails closed', async () => {
    globalThis.fetch = async () => { throw new Error('offline'); };
    assert.equal((await submit(valid)).status, 503);
  });
  await t.test('invalid payloads return client errors', async () => {
    for (const value of [null, [], 'hello', {}, { ...valid, email: 'invalid' }]) {
      assert.equal((await submit(value)).status, 400);
    }
    assert.equal(calls.length, 0);
  });
});
