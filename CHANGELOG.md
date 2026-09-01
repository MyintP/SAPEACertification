# Changelog

All notable changes to the SAP Enterprise Architect Study Guide will be documented here.

## [Unreleased] - September 2026 certification workspace shell

### Added
- Rebuilt the site as a single-page app shell: a persistent context bar (current sheet, breadcrumb, checklist progress, bookmark, search), a collapsible sidebar navigation grouped into Get Started / Exam / Method / Architecture Domains / Case Study / Practice / Reference / Progress, and a bottom Study Desk for per-sheet notes
- Study Desk: resizable, collapsible, autosaves a separate note per sheet to `localStorage`
- Global search (`Ctrl`/`Cmd`+`K`) over all sheet titles, with keyboard navigation
- Per-sheet bookmark toggle in the context bar
- Merged the former `quiz.html` page into the shell as the `Practice` sheet; `quiz.html` now redirects to `index.html#sheet-practice` so existing links keep working
- Mobile: sidebar becomes an off-canvas drawer, Study Desk becomes a bottom sheet; only one region is shown at a time

### Changed
- One-page navigation: switching sheets updates the workspace in place via `location.hash`, without a full page reload
- Visual theme: dark app shell (sidebar, context bar, Study Desk) with a light, constrained-width reading canvas for content; tables and multi-column layouts can break out to the full canvas width
- Unified all accent colours (badges, links, active states, progress) to one accent colour used at two lightness levels for light vs. dark surfaces

### Preserved
- All existing certification content, domain notes, quiz questions, case studies and links carried over unchanged — this was a layout/interaction rebuild, not a content rewrite
- Progress tracker and quiz scoring (`localStorage`-based) continue to work exactly as before, now also surfaced in the context bar

## [Unreleased] - September 2026 site & content cleanup

### Fixed
- Corrected `DEPLOYMENT.md` production URL (was pointing at a stale `zencloudau.github.io` org, not the live `myintp.github.io` site)
- Restored `.github/workflows/link-check.yml` at the correct path — the previous workflow file lived at the repo root, where GitHub Actions never picked it up, so link checking was never actually running
- Flagged legacy exam-format content: `docs/exam-overview.md`, `docs/study-plan.md`, `docs/key-links.md`, `resources/glossary.md`, `resources/exam-traps.md`, `resources/community-study-tips.md`, and `quiz/wanderlust-prep.md` described the pre-2026 40-question/Wanderlust/80%-pass-mark exam as current fact; P_SAPEA now uses a Scenario-Based Assessment. Each file now distinguishes SAP-confirmed facts from legacy/unverified ones
- Merged the duplicate `docs/exam-overview.md` / `docs/exam-overview-v2.md` into one canonical, corrected file
- Fixed `quiz.html`'s navigation bar, which referenced CSS classes (`nav-container`, `nav-header`, `nav-title`) that didn't exist in `styles.css`, leaving it unstyled
- Wired up the previously dead `trackQuizProgress`/`getQuizProgress` code in `app.js` — quiz scores are now actually recorded and shown, on both `quiz.html` and the Sheet 12 tracker on `index.html`

### Changed
- Consolidated all inline styles from `index.html` into `styles.css` as a shared, reusable class system
- Removed ~150 lines of navigation/back-to-top/quiz JavaScript duplicated between `app.js` and an inline `<script>` in `quiz.html` — both pages now share one `app.js`
- Added Open Graph tags, meta description, theme colour, canonical URL and a favicon to both pages (previously missing on both, despite an earlier changelog entry claiming otherwise)
- Added a site footer with links back to the repo and SAP Learning

## [v2026.09] - September 2026

### Added
- Enhanced navigation with "Back to Top" button
- Progress tracker reset functionality
- Anchor link highlighting in navigation menu
- `CONTRIBUTING.md` and `CHANGELOG.md` files
- This structured README with clear getting started guide

### Changed
- Standardized guide name across all files
- Improved mobile responsiveness
- Updated exam-day checklist with latest SAP guidance

### Fixed
- Broken links to SAP learning resources
- Progress tracker save/load issues in some browsers

## [v2026.06] - June 2026

### Added
- Initial 16-point scoring rubric
- Connected Case (Wanderlust-style) scenario
- 9-step architecture defense pattern
- Local progress tracker (Sheet 12)

### Changed
- Complete site refresh to match 2026 exam model
- Shifted focus to scenario-based assessment preparation
- Updated all references to latest SAP materials

## [v2025.12] - December 2025

### Added
- Original study guide content
- SAP EA Framework and methodology
- Basic navigation structure

---

**Format**: Keep entries clear and actionable. Link to relevant issues or pull requests when possible.