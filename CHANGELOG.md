# Changelog

All notable changes to the SAP Enterprise Architect Study Guide will be documented here.

## [Unreleased] - September 2026 Clean Core tool, Wanderlust hub, SBA drill; fixed a real factual error

### Added
- **Clean Core Decision Engine** (new sheet, new "Tools" nav group, code 14): click one of three scenario cards
  (data-intensive ABAP close to the core / decoupled &amp; BTP-native / direct table modification) and get an
  immediate recommendation — Developer Extensibility, Side-by-Side on BTP, or a critical-breach flag — with the
  reasoning behind it. New `.decision-engine`/`.decision-card`/`.decision-result` components in `styles.css`,
  outcome data and click-handling in `app.js` (`DECISION_OUTCOMES`, `wireDecisionEngines()`).
- **Wanderlust Case Hub** (new sheet, "Case Study" group, code 15): a tabbed guide (The Situation / Stakeholder
  Blueprint / Target Architecture) to SAP's real Wanderlust GmbH reference case. New generic `.tab-group`
  component (`wireTabGroups()` in `app.js`) — event-delegated, reusable for any future tabbed content.
- **Scenario-Based Assessment Drill** (new section, top of the Practice sheet): three questions in the current
  exam's scenario format, using the existing quiz-card/`checkAnswer()` pattern.

### Fixed — real factual error, not just formatting
- **Wanderlust GmbH is not a travel and tourism company.** It's a German automotive manufacturer expanding into
  EVs via a "Smart Battery" initiative, with three continental SAP ECC instances and an EA practice at "nascent"
  maturity. `quiz/wanderlust-prep.md` had it backwards (claimed "fictional travel and tourism company"), and
  `domains/rba-deep-dive.md` repeated the error. Verified via public search results describing the actual SAP
  P_SAPEA exam guide and community write-ups before correcting — this was wrong in the repository for multiple
  prior revisions and would have actively misled anyone studying the real case. Both files corrected, including
  the "Common Wanderlust Scenario Themes" section in `wanderlust-prep.md`, which was entirely rewritten around
  the wrong industry (booking systems, hotels, airlines → Lead-to-Cash, dealer network, ECC landscape complexity).

## [Unreleased] - September 2026 remove all non-personal branding

A full repository sweep after a report that `SAP_EA_StudyBible_Final.docx` still carried
consultancy branding. It did — and so did three other files that don't render on the live site
but are committed to this public repo:

### Fixed
- `SAP_EA_StudyBible_Final.docx`: removed "ZenCloud.au" from the cover line and closing footer
  (edited `word/document.xml` directly, repackaged, verified content and hidden document
  properties are otherwise unchanged and clean).
- `LICENSE`: copyright holder changed from "Zencloud Advisory" to "Phil Myint" — this is personal
  study content, not a company work product.
- `CLAUDE.md`: was a stale, unedited copy of a *different* project's instructions file — it
  literally named `github.com/ZenCloudAU/learn-with-claude` as "this repo," and listed four other
  client/company repos with their Azure resource group names, container names, region, a public
  IP address, and secret *names* (not values). None of that belongs in this repository. Replaced
  with a short, project-specific file with no employer, other-repo, or infrastructure references.
- `AGENTS.md`: deleted. It was an auto-generated, broken mash-up of the same stale template (e.g.
  "Anthropic SDK (Codex-sonnet-4-6)", "github.com/ZenCloudAU/learn-with-Codex") — not accurate for
  any tool, and not needed.
- Confirmed clean via full-repository text search and binary `strings` scan: `index.html`,
  `app.js`, `styles.css`, every `domains/`/`resources/`/`quiz/`/`artifacts/`/`docs/` file, the
  official SAP PDF, and the NotebookLM podcast audio all have zero branding references.

### Known limitation
- Two past commits' *messages* still mention "ZenCloud" / "Zencloud Advisory" (they're where this
  branding was originally added). Fixing that requires rewriting public git history (force-push),
  which was not done here without being asked explicitly — flagged to the user instead.

## [Unreleased] - September 2026 concepts adapted from the sister Salesforce Architect workspace

A sibling study workspace (github.com/MyintP/SalesForceArchitect, same author) was reviewed for
patterns worth porting over. Six of the seven identified concepts are implemented here; the
seventh (a full content-as-data rewrite of every sheet) was deliberately scoped down — see
"Not in scope" below.

### Added
- **Domain Knowledge Checks is now content-as-data.** The 60 questions added in the previous
  entry were hand-authored HTML; they're now a `DOMAIN_QUIZ_BANK` array in `app.js`, rendered
  at runtime. This is what makes the next two items possible without hand-editing 60 quiz cards.
- **Domain filter + live score gauge** on the Domain Knowledge Checks section: a dropdown
  narrows the view to one domain, and a circular SVG progress ring (new `svgGauge()` helper,
  shared with the Tracker sheet below) shows correct/attempted for whatever's currently in view.
- **"Discover the Enterprise Architect Role"** (new sheet, new "The Role" nav group, right after
  Start): orients to what an EA actually does before any platform mechanics — the EA-vs-technical-
  architect distinction, the traits that create business value, T-shaped/I-shaped expertise, and
  the three C-suite perspectives (CEO/CFO/CIO) EA serves. Content is drawn from and cross-checked
  against `quiz/discovering-sap-ea-assessment.md` (SAP's own "Discovering SAP Enterprise
  Architecture" assessment) and this repo's Study Bible extract — surfaces a file that was
  previously linked from nowhere in the app.
- **"Certification Track"** (new sheet, new "Certification" nav group, code 13): maps P_SAPEA
  against the wider SAP certification landscape — a commonly-cited associate-to-professional path
  and complementary credentials (SAP LeanIX, TOGAF). Explicitly flagged as third-party-observed,
  not a confirmed prerequisite chain from SAP's own certification page, since SAP Learning does
  not publish one — checked directly before writing this sheet.
- **"How this workspace and SAP Learning fit together"** on the Start sheet: a two-column
  comparison table (SAP Learning does / this site does) plus a one-paragraph "practically, do
  things in this order" note, so the relationship between this workspace and the official
  platform is stated once, plainly, instead of implied.
- **Sharper Connected Case scenarios.** Sheet 07 and all three Full Practice Cases in Practice
  now include a "Push your reasoning further" list of pointed trade-off questions (in the style
  of "what happens to the 201st event if the platform is mid-deployment") before the task, not
  just an open "what would you do."
- **Self-scorable rubric checklists** on the three Full Practice Cases: each model-answer reveal
  now ends with the 8 scoring-rubric dimensions as actual checkboxes (new `sapEaCaseChecklist`
  localStorage key, generic id→bool store, independent of the fixed 8-key Tracker on sheet 12).
- **Circular progress gauge on the Tracker sheet** (sheet 12): the checklist percentage now also
  renders as the same SVG ring used in Domain Knowledge Checks.

### Not in scope
- Rewriting every sheet as content-as-data (the sister site's `SHEETS` array + `render()`
  pattern). That's a full-shell rewrite touching all 18 sheets' bespoke layouts for a personal,
  already-working site — disproportionate risk for the benefit here. Scoped down to just the
  quiz bank, where the content-as-data pattern earns its keep (filtering, no more hand-duplicated
  markup per question).
- The 30-question "Discovering SAP Enterprise Architecture" assessment is referenced (Role sheet,
  Official Resources) but still not wired in as a live scored quiz — several of its questions are
  multiple-answer, which needs different scoring logic than `checkAnswer()`.

## [Unreleased] - September 2026 domain knowledge checks wired into Practice

### Added
- **Domain Knowledge Checks** (new section on the Practice sheet, above the existing
  scenario quizzes): all 60 questions from `quiz/domain-1-quiz.md` through
  `quiz/domain-4-quiz.md` (15 per skill area) are now live, scoreable quiz cards, matching
  the same interaction pattern as the existing scenario quizzes (immediate correct/wrong
  marking, explanation, contributes to the shared quiz tally and progress tracker). These
  files existed in the repo but were never rendered anywhere in the app — `README.md`
  already described `/quiz` as "source material for the Practice sheet," which wasn't true
  until now.
- Each Architecture Domain sheet (03–06) now links directly to its matching quiz section
  on the Practice sheet ("Test yourself: Domain N quiz →"), next to the existing "Full
  domain deep-dive" link.
- The original 6 scenario quizzes are relabelled "🏢 Applied Scenario Practice" (was
  "📝 Scenario-Based Quizzes") to distinguish them from the new domain checks — they test
  general architectural judgment across industries, not SAP-specific recall, and that
  distinction wasn't visible before.

### Verified
- Cross-checked several of the more checkable claims already sitting in the domain quiz
  content against public sources before wiring it in: the SAP EA Framework's 2007 Sapphire
  launch, the five building blocks' current official naming (Methodology / Reference
  Architecture Content / Tooling / Practice / Services), and SAP One Domain Model as the
  canonical Solution Data Object model. No corrections needed. The Metro Map's three
  selection variants (Business-Centric / IT-Centric / Holistic) aren't confirmed by public
  SAP pages (the relevant SAP Learning course content requires a login), but they're
  consistent with every other file already in this repo (`resources/glossary.md`,
  `artifacts/artifact-cheatsheet.md`, `domains/01-framework-toolset.md`) — not something
  introduced by this change.

### Not in scope
- `quiz/discovering-sap-ea-assessment.md` (30 questions, several multi-select) and
  `quiz/wanderlust-prep.md` (a study guide, not a quiz) are still unwired. The multi-select
  format needs different scoring logic than the existing single-answer `checkAnswer()`
  pattern reused here — left for a follow-up rather than bolted on.

## [Unreleased] - September 2026 study companions and a real markdown viewer

### Added
- **Study Companions** (new sheet, `Reference` group): the AI-generated audio overview
  (`podcast/SAP_Enterprise_Architecture_bridges_strategy_and_IT.m4a`, via Google NotebookLM)
  is now tracked in git and linked from the workspace as an intentional multi-modal study
  companion, alongside a verified video ("The Enterprise Architecture with SAP Masterclass"),
  its companion book, and three official YouTube channels (SAP PRESS, EA SAP Community, SAP
  Community). Every link was checked against the live page before being added.
- A proper markdown viewer (`docs.html` + `docs.js`): every `.md` link across the site
  (domain deep-dives, artifact cheatsheet, glossary, exam traps, official diagrams reference,
  study plan, exam overview) now opens as a rendered, styled page instead of raw plain text.
  Vanilla JS, no dependencies - a small custom parser for the markdown subset these files
  actually use (headers, tables, lists, blockquotes, fenced code, inline formatting). Access
  is restricted to `docs/`, `domains/`, `artifacts/`, `resources/` and `quiz/` - root-level
  files such as `CLAUDE.md`/`AGENTS.md` are not servable through it.

### Fixed
- `.gitignore` no longer excludes `podcast/`/`*.m4a` - that exclusion was added in a prior
  pass before this was confirmed to be intentional site content, not scratch media.
- Two real bugs surfaced by building the markdown viewer, both now fixed in `styles.css` and
  benefiting the main app shell too: (1) CRLF line endings on several repo files were
  silently defeating every `$`-anchored regex in the parser (headers, rules, table
  separators) - markdown is now normalised to LF before parsing; (2) CSS Grid's implicit
  `min-width: auto` on `.sheet-inner` children let wide tables and ASCII-diagram code blocks
  stretch the whole page instead of scrolling within themselves, and a long unbroken
  filename used as inline `` `code` `` had no wrap point and pushed the page wide on mobile.
- `resources/ea-trends.md` and `resources/use-cases-reference.md`: their existing "SAP EA
  Book Webcast" and book citations now link to the actual verified YouTube video and SAP
  PRESS product page instead of being unlinked text.

### Preserved
- No existing content rewritten. All markdown files render through the same source file
  used elsewhere - no duplicated content to drift out of sync.

Two source documents were already sitting in the repo root, untracked and unlinked from
anywhere in the site: `SAP_Enterprise_Architecture_Methodology_Guide_Official.pdf` (SAP's
own 2023 methodology guide) and `SAP_EA_StudyBible_Final.docx` (an 18-part personal
exam-prep compilation). Extracted both and mined genuinely new, sourced material that
wasn't in the repo at all:

### Added
- `domains/01-framework-toolset.md`: IndRA origin + the 3D-ADM (methodology used in Product
  Engineering, Customer Engagements, and SAP's own IT), the full ADM phase table
  (Preliminary through H — previously stopped at Phase E), and the Metro Map's 7 domains
  vs the Methodology's 3 core domains distinction.
- `domains/04-data-app-tech.md`: the 6R cloud migration framework (Rehost/Retire/
  Replatform/Repurchase/Refactor/Retain), paired against the existing TIME model.
- `artifacts/artifact-cheatsheet.md`: a new "Technique vs Artifact" section (verb vs noun —
  capability mapping produces a Business Capability Map, tracing data flows produces a
  Solution Data Flow Diagram) as a foundational distinction ahead of the phase-by-phase list.
- `resources/glossary.md`: seven missing official-SAP terms (Application Role, Architecture
  Model, Business Role, Business Scenario, Data Flow, Message Flow, Solution Process) plus
  IndRA and the 6R Framework.
- `resources/exam-traps.md`: five new trap entries covering the above (IndRA origin, 7-vs-3
  domains, TIME vs 6R, Technique vs Artifact).
- Both source documents are now directly linked from Sheet 10 (Official Resources) and
  `docs/key-links.md`, and are actually servable as static assets — no build step required.
- Sources sections added to every file touched, citing which document each addition came from.

### Preserved
- No existing content was rewritten or removed — every addition is new material inserted
  alongside what was already there.

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