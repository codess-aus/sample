# AI Education &amp; Mentoring Workshops

A responsive workshop website built with [MkDocs](https://www.mkdocs.org/) and the
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) theme.

The site promotes practical AI education and mentoring workshops for leaders,
students and young professionals, and provides a way for organisations and
educational institutions to enquire about booking a workshop.

---

## Contents

- [Quick start](#quick-start)
- [Local development](#local-development)
- [Adding or replacing chapter images](#adding-or-replacing-chapter-images)
- [Editing navigation](#editing-navigation)
- [Creating a new chapter](#creating-a-new-chapter)
- [Testing the production build](#testing-the-production-build)
- [Deployment](#deployment)
- [Booking form configuration](#booking-form-configuration)
- [Updating site metadata](#updating-site-metadata)
- [Accessibility](#accessibility)

---

## Quick start

**Requirements:** Python 3.10 or later.

```bash
# Clone the repository
git clone https://github.com/codess-aus/sample.git
cd sample

# Create and activate a virtual environment (recommended)
python -m venv .venv
source .venv/bin/activate     # macOS / Linux
# .venv\Scripts\activate      # Windows

# Install dependencies
pip install -r requirements.txt

# Start the local development server
mkdocs serve
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.
The server reloads automatically when you save a file.

---

## Local development

| Command | Description |
|---------|-------------|
| `mkdocs serve` | Start live-reload dev server |
| `mkdocs build` | Build the site to `site/` |
| `mkdocs build --strict` | Build and fail on warnings (mirrors CI) |

---

## Adding or replacing chapter images

Workshop images live in `docs/assets/images/`.

| File | Used on |
|------|---------|
| `empowering-minds.png` | About page hero and homepage card |
| `ai-for-leaders.png` | AI for Leaders hero and homepage card |
| `understanding-ai.png` | Philosophy hero and homepage card |
| `industrial-problem-solving.png` | Industrial Problem-Solving hero and card |
| `mentoring-today.png` | Approach hero and homepage card |
| `book-a-workshop.png` | Book a Workshop homepage card |

To replace an image, save the new file with the **same filename** and the same
aspect ratio (16:9 recommended). The `alt` text in each Markdown file should be
updated if the image content changes.

---

## Editing navigation

The site navigation is defined in `mkdocs.yml` under the `nav:` key.

```yaml
nav:
  - Home: index.md
  - About: about.md
  - AI for Leaders: ai-for-leaders.md
  ...
```

Add, remove or reorder entries to change what appears in the top navigation bar.

---

## Creating a new chapter

1. Create a new Markdown file in `docs/`, for example `docs/new-topic.md`.
2. Add a hero image to `docs/assets/images/` and reference it at the top of the page.
3. Add the page to `nav:` in `mkdocs.yml`.
4. Add a card to `docs/index.md` in the chapter-card grid section.

Each chapter page should follow the same structure:

```markdown
---
title: Page Title
description: Short description for SEO and social sharing.
---

<div class="chapter-hero">
  <img
    src="assets/images/your-image.png"
    alt="Descriptive alt text"
    loading="eager"
    class="chapter-hero__img"
  >
</div>

# Page Title

Introductory paragraph.

---

## Section heading

...

<div class="chapter-nav">
  <a href="../previous-page/" class="chapter-nav__prev">← Previous</a>
  <a href="../next-page/" class="chapter-nav__next">Next: Topic →</a>
</div>
```

---

## Testing the production build

Run the site builder in strict mode to catch any broken links or missing pages:

```bash
mkdocs build --strict
```

The built site is written to `site/`. You can preview it with any static file server:

```bash
python -m http.server 8080 --directory site
```

---

## Deployment

The site deploys automatically to GitHub Pages via GitHub Actions on every push
to the `main` branch. The workflow file is at `.github/workflows/deploy.yml`.

**Before enabling deployment:**

1. Go to **Settings → Pages** in the GitHub repository and set the source to
   **GitHub Actions**.
2. Update `site_url` in `mkdocs.yml` to match your Pages URL
   (e.g. `https://codess-aus.github.io/sample/`).
3. If you are using a custom domain, add a `CNAME` file to `docs/` containing
   your domain, and update `site_url` accordingly.

You can also trigger a deployment manually from the **Actions** tab in GitHub.

---

## Booking form configuration

The booking form in `docs/book-a-workshop.md` currently uses a **placeholder**
form action. Before publishing, connect it to a real form-processing service.

**To use Formspree:**

1. Create an account at [formspree.io](https://formspree.io).
2. Create a new form and copy the form ID.
3. In `docs/book-a-workshop.md`, replace `REPLACE_WITH_YOUR_FORM_ID` in the
   `action` attribute with your actual Formspree form ID:

   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

4. Update the fallback email address (`hello@placeholder.example`) in both
   `book-a-workshop.md` and `docs/assets/javascripts/extra.js`.

---

## Updating site metadata

Edit `mkdocs.yml` to update:

| Setting | Where in mkdocs.yml |
|---------|---------------------|
| Site name | `site_name:` |
| Site description | `site_description:` |
| Author name | `site_author:` |
| Site URL | `site_url:` |
| Copyright text | `copyright:` |
| Social profile links | `extra.social:` |

---

## Accessibility

This site targets **WCAG 2.2 AA** conformance. Key features include:

- Semantic HTML with one `h1` per page and a logical heading hierarchy
- Visible keyboard focus indicators on all interactive elements
- Descriptive `alt` text on all meaningful images
- Accessible form labels and error messaging
- Sufficient colour contrast in both light and dark modes
- `prefers-reduced-motion` support to disable transitions
- `aria-live` regions for form status feedback
- Minimum 44px touch targets on interactive elements

When modifying the site, please maintain these standards. Run an automated
accessibility checker (such as axe or WAVE) against the built site before
publishing significant changes.