# SAP Enterprise Architect Certification Workspace

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://myintp.github.io/SAPEACertification/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

> **Learn the decisions, not the answer keys.**

This repository hosts a certification workspace for the **SAP P_SAPEA Enterprise Architect certification**: a single-page app shell with a persistent certification map (left), a reading canvas (centre), and a per-sheet Study Desk for notes (bottom). The content develops architectural decision-making skills through a structured approach: **KNOW → RECOGNIZE → DECIDE → DEFEND**.

## 🚀 Getting Started

1. **Visit the live site**: [https://myintp.github.io/SAPEACertification/](https://myintp.github.io/SAPEACertification/)
2. **Use the left-hand map** to move through Get Started → The Role → Exam → Method → Architecture Domains → Case Study → Practice → Reference → Certification → Progress
3. **Practice with the Connected Case** (`07 Connected Case`) without looking at model answers, then use `Practice` for scenario quizzes and full cases
4. **Score yourself** using the rubric (`09 Scoring Rubric`)
5. **Jot notes as you go** in the Study Desk at the bottom — it remembers a separate note per sheet
6. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>K</kbd> anywhere to jump straight to a sheet by name

## 📁 Repository Structure

| File/Folder | Description |
|-------------|-------------|
| `index.html` | The app shell: context bar, sidebar navigation, content workspace and Study Desk, containing every sheet (including Practice) |
| `quiz.html` | Redirect stub to `index.html#sheet-practice`, kept so old links/bookmarks still resolve |
| `styles.css` | Design system: dark app shell, light reading canvas, one accent colour |
| `app.js` | Shell behaviour: sheet routing, sidebar/context bar sync, Study Desk notes, progress tracker, quiz scoring, search. The Domain Knowledge Checks quiz bank (60 questions) is content-as-data here — a `DOMAIN_QUIZ_BANK` array rendered and filtered at runtime, not hand-authored HTML |
| `/quiz` | Self-assessment questions for each skill area. `domain-1..4-quiz.md` are the source for the Practice sheet's Domain Knowledge Checks; `discovering-sap-ea-assessment.md` and `wanderlust-prep.md` are referenced from other sheets but not yet wired in as live quizzes (multiple-answer format needs different scoring logic) |
| `/resources` | Supplementary study materials and references |
| `/domains` | Domain-specific architecture guides |
| `/artifacts` | Sample architecture artifacts and templates |
| `/docs` | Exam overview, 6-week study plan, key links |
| `DEPLOYMENT.md` | Deployment instructions for GitHub Pages |
| `.github/workflows/link-check.yml` | Automated dead-link check on every push |

## 🛠️ Local Development

No build step, framework, or package installation is required — but the domain sheets and the
`docs.html` markdown viewer fetch `.md` files at runtime, and browsers block `fetch()` of local
files opened directly (`file://`). **Don't just double-click `index.html`** — serve the folder:

1. Clone this repository (or your fork)
2. From the repo root, run a static server, e.g. `python -m http.server 8000` (any static server
   works — VS Code's Live Server extension, `npx serve`, etc.)
3. Open `http://localhost:8000` in your browser
4. Edit files directly — no rebuild or restart needed, just refresh

Forking to actually use the site day-to-day? Enable GitHub Pages on your fork (**Settings → Pages
→ Source: Deploy from a branch, `main`, `/root`**) — see `DEPLOYMENT.md`. That serves everything
over HTTPS with no server to run.

## 📚 Primary SAP Sources Used

This guide is maintained based on official SAP documentation:
- [SAP Learning Certification](https://learning.sap.com/get-certified)
- [Scenario-Based Assessment FAQs](https://learning.sap.com/helpcenter/certification-support/scenario-based-assessment-faqs)
- [Exam Essentials](https://learning.sap.com/helpcenter/certification-support/exam-essentials)
- [Becoming an SAP Enterprise Architect](https://learning.sap.com/learning-journeys/becoming-an-sap-enterprise-architect)
- [Intelligent Enterprise Architecture Fundamentals](https://learning.sap.com/courses/intelligent-enterprise-architecture-fundamentals)

## 🔄 Maintenance Rule

> **Important**: SAP's certification program changes frequently. Before each major revision, verify the current P_SAPEA certification page and SAP Learning guidance. Do not hard-code exam details unless confirmed by SAP.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Suggesting new case studies
- Improving the rubric
- Reporting broken links
- Proposing content updates

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## 📄 License

This project is proprietary. See [LICENSE](LICENSE) for details.

## 📧 Contact

For questions or suggestions, please open an issue or contact the maintainer.

---

**Version**: v2026.09 | **Last Updated**: September 2026
