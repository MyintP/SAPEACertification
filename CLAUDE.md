# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Who I Am

**Phil Myint** — Principal Architect, ZenCloud Global Consultants, Brisbane.

I have zero coding background. I think in systems, decisions, and frameworks. I have designed, directed, and shipped live production software to Azure using Claude as my implementation layer. That is the model we use.

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

## Active Repos

### VAF Agentic Architect
**Repo:** github.com/ZenCloudAU/velocity-architecture  
**Live:** http://velocityarchitectureframework.com  
**Stack:** TypeScript 5.3, Node.js 20, Express 4.18, Anthropic SDK (claude-sonnet-4-6), Docker, GitHub Actions, Azure Container Instances  
**Azure:** Resource group `vaf-rg` · Container `vaf-agentic-architect` · Region `australiasoutheast` · IP `20.190.118.105`  
**Registry:** `ghcr.io/zencloudau/velocity-architecture:latest`  
**Secrets:** `AZURE_CREDENTIALS`, `ANTHROPIC_API_KEY`, `GH_TOKEN`  
**Architecture:** Express → Orchestrator → [gc-agent | tom-agent | adr-agent] → Claude API; kb-loader reads VAF KB from GitHub; action-engine commits artefacts back to the repo

### VAF Solution Architecture Framework
**Repo:** github.com/ZenCloudAU/vaf-sa  
**Stack:** Static HTML/CSS — published framework

### Agentic Cert Study Hub
**Repo:** github.com/ZenCloudAU/agentic-cert  
**Stack:** Markdown — CCA-F and GH-600 study content

### ZenCloud OS Automation
**Repo:** github.com/ZenCloudAU/zencloud-os  
**Stack:** Python — daily workflow automation scripts

### Learn With Claude
**Repo:** github.com/ZenCloudAU/learn-with-claude (this repo)  
**Stack:** Markdown — structured learning and reference documentation

---

## Rules for Every Session

1. **Read before writing.** Read every file that could be affected before changing anything.
2. **Map dependencies.** Understand what connects to what. A change in one file may break three others.
3. **One complete implementation.** Deliver the full solution. Do not deliver a partial fix with instructions to "try this."
4. **No placeholders.** No `// TODO`, no `[your value here]`, no stubs. Everything in the output must be production-ready.
5. **Own the path.** If you identify a problem adjacent to the task, fix it. Do not deliver a correct solution sitting next to a broken one.
