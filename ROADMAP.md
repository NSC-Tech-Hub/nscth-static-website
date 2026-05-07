# 🌐 ROADMAP — NSC Tech Hub Static Website

**Stack:** Astro · Tailwind CSS · Cloudflare Pages **or** GitHub Pages
**Repo:** `NSC-Tech-Hub/nscth-static-website`
**MVP Deadline:** June 22, 2026 — End of Spring Quarter

![Status](https://img.shields.io/badge/Status-In%20Progress-EF9F27?style=flat-square)
![Built with Astro](https://img.shields.io/badge/Astro-5C7DD9?style=flat-square&logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F48120?style=flat-square&logo=cloudflare&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat-square&logo=github&logoColor=white)
![MVP Deadline](https://img.shields.io/badge/MVP-Jun%2022%2C%202026-E24B4A?style=flat-square)

---

## 📅 MVP Timeline

| Phase | Wk 1<br>May 11–17 | Wk 2<br>May 18–24 | Wk 3<br>May 25–31 | Wk 4<br>Jun 1–7 | Wk 5<br>Jun 8–14 | Wk 6<br>Jun 15–22 |
|-------|:-----------------:|:-----------------:|:-----------------:|:---------------:|:----------------:|:-----------------:|
| ⚙️ **Phase 1** — Foundation | `████████████` | | | | | |
| 🧱 **Phase 2** — Layout & Pages | | `████████████` | `████████████` | | | |
| 🎨 **Phase 3** — Content & Components | | | | `████████████` | `████████████` | |
| 🚀 **Phase 4** — MVP Launch | | | | | | `████████████` |

---

## ⚙️ Phase 1 — Foundation
> **Week 1 · May 11–17 · ✅ Complete**

### 1.1 Project Setup

- [x] 1.1.1 Initialize Astro project with Tailwind CSS
- [x] 1.1.2 Define brand design tokens in `tailwind.config.mjs`
- [x] 1.1.3 Set up `src/styles/global.css`
- [x] 1.1.4 Confirm `npm run dev` runs at `http://localhost:4321`
- [x] 1.1.5 Confirm `npm run build` outputs to `dist/` cleanly

### 1.2 Repository & Documentation

- [x] 1.2.1 Create `README.md` with local setup and startup instructions
- [x] 1.2.2 Add `CONTRIBUTING.md` with branch and PR conventions
- [x] 1.2.3 Configure `.gitignore` for Astro (`dist/`, `.astro/`, `node_modules/`)
- [x] 1.2.4 Set branch protection on `main` — PR and review required before merge

**Phase 1 Deliverable:** Project boots locally, all contributors can run the dev server.

---

## 🧱 Phase 2 — Layout & Core Pages
> **Weeks 2–3 · May 18–31 · 🟡 In Progress**

### 2.1 Global Layout & Navigation
> Week 2 · May 18–24

- [ ] 2.1.1 Create `src/layouts/BaseLayout.astro` — `<head>`, meta tags, Open Graph, favicon, font imports
- [ ] 2.1.2 Create `src/layouts/PageLayout.astro` — wraps BaseLayout, adds Header and Footer
- [ ] 2.1.3 Create `src/components/Header.astro` — logo, nav links, mobile hamburger menu, active page state
- [ ] 2.1.4 Create `src/components/Footer.astro` — tagline, quick links, NSC affiliation, copyright
- [ ] 2.1.5 Update Home page to use `PageLayout.astro`

### 2.2 Page Routes
> Week 3 · May 25–31

- [x] 2.2.1 Create `src/pages/index.astro` — Home page
- [ ] 2.2.2 Create `src/pages/about.astro` — About page
- [ ] 2.2.3 Create `src/pages/services.astro` — Services page
- [ ] 2.2.4 Create `src/pages/team.astro` — Team page
- [ ] 2.2.5 Create `src/pages/contact.astro` — Contact page
- [ ] 2.2.6 Create `src/pages/404.astro` — Not found page
- [ ] 2.2.7 Each page has a unique `<title>` and `<meta name="description">` passed via layout props
- [ ] 2.2.8 Confirm all routes resolve with no 404s in local dev

### 2.3 Deployment Pipeline
> Week 3 · May 25–31

- [ ] 2.3.1 Choose deployment platform — Cloudflare Pages **or** GitHub Pages (see [Deployment Options](#-deployment-options) below)
- [ ] 2.3.2 Configure `astro.config.mjs` — `site` URL and `base` path if required
- [ ] 2.3.3 Connect repo to chosen platform and configure build settings
- [ ] 2.3.4 Confirm preview deploy triggers on branch push
- [ ] 2.3.5 Confirm production deploy auto-triggers on merge to `main`

**Phase 2 Deliverable:** All page routes exist, layout is consistent, deployment pipeline is live.

---

## 🎨 Phase 3 — Content & Components
> **Weeks 4–5 · June 1–14 · 🔲 Not Started**

### 3.1 Reusable UI Components
> Week 4 · June 1–7

- [ ] 3.1.1 Create `src/components/Button.astro` — primary, secondary, outline variants
- [ ] 3.1.2 Create `src/components/Card.astro` — generic card with content slot
- [ ] 3.1.3 Create `src/components/SectionHeader.astro` — heading and subheading style
- [ ] 3.1.4 Create `src/components/Badge.astro` — Creative · Business · Technical tags
- [ ] 3.1.5 Create `src/components/ServiceCard.astro` — icon, title, description
- [ ] 3.1.6 Create `src/components/TeamCard.astro` — name, role, department badge, photo

### 3.2 Page Content
> Week 4–5 · June 1–14

- [ ] 3.2.1 **Home page** — hero section, agency intro, three-pillar callout (Creative · Business · Technical), CTA
- [ ] 3.2.2 **About page** — agency mission, interdisciplinary model, department breakdown
- [ ] 3.2.3 **Services page** — three-pillar section using `ServiceCard.astro`, CTA linking to Contact
- [ ] 3.2.4 **Team page** — department-grouped grid using `TeamCard.astro`, faculty and leadership row
- [ ] 3.2.5 **Contact page** — static contact form, get involved section, GitHub org link
- [ ] 3.2.6 **404 page** — branded message, link back to Home

### 3.3 Assets & Meta
> Week 5 · June 8–14

- [ ] 3.3.1 Add `public/favicon.svg`
- [ ] 3.3.2 Add `public/og-image.png` — Open Graph preview image
- [ ] 3.3.3 Add `public/robots.txt` — allow all crawlers
- [ ] 3.3.4 Add meta titles, descriptions, and Open Graph tags to all pages via `BaseLayout.astro`
- [ ] 3.3.5 Add sitemap via `@astrojs/sitemap` integration

**Phase 3 Deliverable:** All pages content-complete with working components and assets.

---

## 🚀 Phase 4 — MVP Launch
> **Week 6 · June 15–22 · Hard deploy target: June 20**

### 4.1 Quality Assurance
> June 15–19

- [ ] 4.1.1 All internal links resolve — no 404s
- [ ] 4.1.2 `npm run build` exits clean with zero errors
- [ ] 4.1.3 Cross-browser testing — Chrome · Firefox · Safari · Edge
- [ ] 4.1.4 Mobile testing — iOS Safari · Android Chrome
- [ ] 4.1.5 Verify layout at 375px, 768px, and 1280px

### 4.2 Accessibility & Performance

- [ ] 4.2.1 All images have descriptive `alt` text
- [ ] 4.2.2 Color contrast passes WCAG 2.1 AA
- [ ] 4.2.3 Full keyboard navigation on all interactive elements
- [ ] 4.2.4 Lighthouse Accessibility score 90+ on all pages
- [ ] 4.2.5 Lighthouse Performance score 90+ on all pages

### 4.3 Production Launch
> June 20 — 2-day buffer before quarter end

- [ ] 4.3.1 Merge `dev` → `main` via reviewed pull request
- [ ] 4.3.2 Confirm production deploy succeeds on chosen platform
- [ ] 4.3.3 Verify live URL on desktop and mobile
- [ ] 4.3.4 Triage all open issues — close resolved, label deferred as `next-quarter`
- [ ] 4.3.5 Retrospective scheduled for June 22

**Phase 4 Deliverable: MVP is live. Spring Quarter shipped. ✅**

---

## 🚢 Deployment Options

> Decide in **Week 3** as part of 2.3. Both are fully supported by Astro.

| | Cloudflare Pages | GitHub Pages |
|---|---|---|
| **Auto-deploy on push to `main`** | ✅ | ✅ via GitHub Actions |
| **Preview URL per branch** | ✅ Built-in | ⚠️ Requires extra config |
| **Custom domain** | ✅ | ✅ |
| **Astro `base` path needed** | ❌ | ⚠️ Only if using repo path URL |
| **Best for** | Preview deploys + custom domain | Staying inside GitHub |

<details>
<summary><strong>Cloudflare Pages setup</strong></summary>

No changes to `astro.config.mjs` needed if using a custom domain.

1. Go to [Cloudflare Pages](https://pages.cloudflare.com) → **Create a project → Connect to Git**
2. Select `NSC-Tech-Hub/nscth-static-website`
3. Set build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variable: `NODE_VERSION` = `20`
4. Every push to `main` triggers a production deploy
5. Every branch push generates a unique preview URL automatically

</details>

<details>
<summary><strong>GitHub Pages setup</strong></summary>

Update `astro.config.mjs` if deploying to a repo path (skip if using a custom domain):

```js
export default defineConfig({
  site: 'https://nsc-tech-hub.github.io',
  base: '/nscth-static-website',
});
```

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

Go to **Settings → Pages → Source → GitHub Actions**.

</details>

---

## 🔀 Branch & PR Conventions

| Branch | Purpose |
|--------|---------|
| `main` | Production — auto-deploys |
| `dev` | Integration — all PRs target here |
| `feature/issue-{n}-{description}` | One branch per task |

```bash
# Example
git checkout -b feature/issue-2-global-layout-navigation
```

Before every PR:
```bash
npm run dev    # must run without errors
npm run build  # must complete clean
```

---

## 📊 Progress

| Phase | Dates | Status |
|-------|-------|--------|
| ⚙️ Phase 1 — Foundation | Wk 1 · May 11–17 | ✅ Complete |
| 🧱 Phase 2 — Layout & Pages | Wk 2–3 · May 18–31 | 🟡 In Progress |
| 🎨 Phase 3 — Content & Components | Wk 4–5 · Jun 1–14 | 🔲 Not Started |
| 🚀 Phase 4 — MVP Launch | Wk 6 · Jun 15–22 | 🔲 Not Started |

---

*Last updated: May 7, 2026 · NSC Tech Hub — App & AI Dev Dept*
