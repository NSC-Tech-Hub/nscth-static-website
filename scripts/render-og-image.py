#!/usr/bin/env python3
"""Render the NSC Tech Hub 1200x630 Open Graph / social preview card.

Reproducible generator for public/og-image.png. Matches the site's brand:
dark slate-950 background, blue-400 accent, the NSC Tech Hub wordmark logo,
headline, and tagline. Run from the repo root:  python3 scripts/render-og-image.py

Portable: no machine-specific paths. Fonts resolve via ./fonts -> ~/.fonts ->
system font dirs. Output is written relative to this script.
"""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "og-image.png")
LOGO = os.path.join(os.path.dirname(__file__), "..", "public", "Logo.png")

# Brand palette (from the site's Tailwind slate-950 / blue-400 usage)
BG_TOP = (2, 6, 23)        # slate-950
BG_BOTTOM = (15, 23, 42)   # slate-900
ACCENT = (96, 165, 250)    # blue-400
TEXT = (255, 255, 255)
MUTED = (148, 163, 184)    # slate-400


def _font_path(name):
    """Resolve a font file portably: ./fonts -> ~/.fonts -> system dirs."""
    candidates = [
        os.path.join(os.path.dirname(__file__), "..", "fonts", name),
        os.path.join(os.path.expanduser("~"), ".fonts", name),
        os.path.join("/usr/share/fonts/truetype/dejavu", name),
    ]
    for c in candidates:
        if os.path.isfile(c):
            return c
    return candidates[-1]


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def main():
    # Vertical gradient background
    base = Image.new("RGB", (W, H), BG_TOP)
    d = ImageDraw.Draw(base)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=lerp(BG_TOP, BG_BOTTOM, t))

    # Subtle grid overlay (like the hero)
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    step = 72
    for x in range(0, W, step):
        gd.line([(x, 0), (x, H)], fill=(255, 255, 255, 8))
    for y in range(0, H, step):
        gd.line([(0, y), (W, y)], fill=(255, 255, 255, 8))
    base = Image.alpha_composite(base.convert("RGBA"), grid).convert("RGB")
    d = ImageDraw.Draw(base)

    # Accent bar at top
    d.rectangle([0, 0, W, 6], fill=ACCENT)

    # Logo (wide light wordmark) centered upper area
    logo = Image.open(LOGO).convert("RGBA")
    logo_w, logo_h = logo.size
    target_w = 520
    target_h = int(logo_h * target_w / logo_w)
    logo = logo.resize((target_w, target_h), Image.LANCZOS)
    logo_x = (W - target_w) // 2
    logo_y = 120
    base.paste(logo, (logo_x, logo_y), logo)

    # Headline (two lines, second line accented)
    title_font = ImageFont.truetype(_font_path("DejaVuSans-Bold.ttf"), 58)
    line1 = "The Technical Engine for"
    line2 = "Bridge to Tech"
    l1w = d.textlength(line1, font=title_font)
    l2w = d.textlength(line2, font=title_font)
    d.text(((W - l1w) / 2, 300), line1, font=title_font, fill=TEXT)
    d.text(((W - l2w) / 2, 372), line2, font=title_font, fill=ACCENT)

    # Tagline
    tag_font = ImageFont.truetype(_font_path("DejaVuSans.ttf"), 30)
    tag = "Student-led digital solutions at North Seattle College"
    tw = d.textlength(tag, font=tag_font)
    d.text(((W - tw) / 2, 470), tag, font=tag_font, fill=MUTED)

    # URL pill
    url_font = ImageFont.truetype(_font_path("DejaVuSans.ttf"), 26)
    url = "nsctechhub.com"
    uw = d.textlength(url, font=url_font)
    pad_x, pad_y = 28, 14
    pill_w = uw + pad_x * 2
    pill_h = 26 + pad_y * 2
    pill_x = (W - pill_w) / 2
    pill_y = 540
    d.rounded_rectangle(
        [pill_x, pill_y, pill_x + pill_w, pill_y + pill_h],
        radius=pill_h / 2, fill=(30, 41, 59), outline=(51, 65, 85),
    )
    d.text(((W - uw) / 2, pill_y + pad_y - 2), url, font=url_font, fill=ACCENT)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    base.save(OUT)
    print(f"Wrote {os.path.abspath(OUT)} ({W}x{H})")


if __name__ == "__main__":
    main()
