# Deployment

Production URL: https://myintp.github.io/SAPEACertification/
Platform: GitHub Pages
Source branch: main (root)
Site source: static site (index.html, quiz.html, styles.css, app.js)
Role: SAP enterprise architecture certification study hub

## How it deploys

GitHub Pages serves this repository directly from the root of `main` — there is no build step. Pushing to `main` publishes immediately (typically within a minute).

To confirm or change the Pages source: repository **Settings → Pages → Build and deployment → Source**. It should be set to "Deploy from a branch", branch `main`, folder `/ (root)`.

## Link checking

`.github/workflows/link-check.yml` runs on every push and pull request to `main`, plus a weekly schedule, and checks `index.html`, `quiz.html`, and all Markdown files for dead links.
