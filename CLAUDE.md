# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## About this repository

A personal, static single-page study workspace for the SAP P_SAPEA (Enterprise Architect)
certification, published via GitHub Pages at https://myintp.github.io/SAPEACertification/.
Vanilla HTML/CSS/JS, no build step, no framework, no backend. See `README.md` for structure
and `CHANGELOG.md` for history.

This is personal study material, not a company or client deliverable. Do not add employer,
consultancy, or third-party branding anywhere in this repository — content, commit messages,
file metadata, or otherwise.

---

## How We Work

**I direct. Claude writes.**

- I define the problem, the constraints, and the outcome. Claude writes all code.
- I read and review output. I do not edit code manually.
- Execute-only. No filler, no commentary outside the task, no unsolicited suggestions.
- If you need a file to proceed, ask for it. Do not assume.

**Fix everything in one pass.**

- Before touching any file: read every relevant file, identify all issues, resolve everything in a single complete implementation.
- Never fix one file without checking what it connects to. Map dependencies first.
- No incremental patches. No "this should work, try it and see." Deliver the complete, correct solution.

**One complete fix, not a sequence of attempts.**

- If something is broken, find the root cause. Do not treat symptoms.
- If a path is referenced in multiple files, find all references before changing any of them.
- If a config value is used downstream, trace it downstream before committing to a change.

---

## Rules for Every Session

1. **Read before writing.** Read every file that could be affected before changing anything.
2. **Map dependencies.** Understand what connects to what. A change in one file may break three others.
3. **One complete implementation.** Deliver the full solution. Do not deliver a partial fix with instructions to "try this."
4. **No placeholders.** No `// TODO`, no `[your value here]`, no stubs. Everything in the output must be production-ready.
5. **Own the path.** If you identify a problem adjacent to the task, fix it. Do not deliver a correct solution sitting next to a broken one.
6. **No branding.** This is personal study content — no employer, consultancy, or company names in any file, document, or generated content.
