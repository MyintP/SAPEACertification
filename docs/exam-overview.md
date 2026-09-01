# Exam Overview — SAP Certified Professional: SAP Enterprise Architect

## ⚠️ The exam format changed in 2026 — read this first

Since 2026 SAP has been moving its certification portfolio from multiple-choice recognition tests to **performance-based practical assessments**. P_SAPEA now uses a **Scenario-Based Assessment (SBA)**: you reason through a connected business situation, either via an **AI-guided roleplay interview** (record responses, get scored automatically) or by **recording a video for human review** (results in up to ~20 business days).

Everything below the line marks each fact as **Confirmed** (sourced directly from SAP's own certification/help-centre pages) or **Legacy / unverified** (describes the older 40-question multiple-choice exam, or comes only from third-party prep sites, and may no longer apply). **Before your exam, verify the current structure on the official pages linked below** — do not rely on this document, or any third-party prep site, for exact numbers.

---

## What's Confirmed (from SAP's own pages)

| Detail | Info |
|--------|------|
| **Full name** | SAP Certified Professional – SAP Enterprise Architect |
| **Level** | Professional (highest SAP certification level) |
| **Format** | Scenario-Based Assessment — a single connected business scenario, not discrete multiple-choice questions |
| **Completion options** | AI-guided roleplay interview (automatic scoring), **or** record-and-submit video for human review |
| **AI scoring method** | Semantic analysis of the intent of your answer (not keyword matching); each objective scored 1 (Insufficient) to 5 (Excellent) |
| **Reattempts** | Up to 4 attempts in a 12-month period; 24-hour minimum wait between attempts; after 4 failed attempts, a 1-year wait before retrying |

Source: [Scenario-Based Assessment FAQs](https://learning.sap.com/helpcenter/certification-support/scenario-based-assessment-faqs) (official SAP page).

## What's Legacy or Unverified — do not treat as current fact

These numbers describe the **previous** multiple-choice version of this exam. Third-party prep sites (exam dump/practice-question vendors) still quote them, and some even attach the old certification code (`P_SAPEA_2023`) — but SAP's own scenario-based assessment page does not confirm any of this for the current exam:

- ~~40 questions, 22 MCQ + 18 from a "Wanderlust" case study~~
- ~~3-hour duration~~
- ~~80% pass mark (32/40)~~

Treat any of these numbers you see elsewhere as **unconfirmed** until you see them stated on your own official exam invitation or the live P_SAPEA certification page.

---

## Four Exam Domains — Still Equally Weighted

SAP has stated the change is about *format*, not *syllabus* — the underlying knowledge domains are unchanged even though the assessment method changed:

| Domain | Focus |
|--------|-------|
| SAP EA Framework & Toolset | Methodology, reference content, tooling, practice, services |
| Architecture Vision & Roadmap | Stakeholders, strategy, principles, roadmapping |
| Business Architecture | Capabilities, processes, organisation, data |
| Data, Application & Technology Architecture | Solution components, deployment, Clean Core, integration |

All four domains carry equal weight — a weak domain is not compensated by a strong one. Use `domains/01-framework-toolset.md` through `domains/04-data-app-tech.md` to study each in depth, and the domain quizzes in `/quiz` to check your recall. Because the exam is now scenario-based reasoning rather than isolated recall, treat those quizzes as **knowledge checks**, not as a rehearsal of the live exam's question format.

---

## Exam Day Strategy (format-agnostic — still applies)

1. **Practise reasoning out loud.** The scenario format rewards articulate, structured spoken (or recorded) reasoning — not just a written answer.
2. **Use the 9-step defense pattern** (`index.html#sheet-08`) as your default structure for any scenario response.
3. **Best answer, not perfect answer** — SAP looks for the most appropriate, defensible response in context, not a single "correct" design.
4. **Know your equipment.** If using the AI-guided or video-review path, confirm your camera, microphone, and browser meet SAP's stated technical requirements well before exam day.

---

## Pre-Exam Checklist

- [ ] Confirmed the *current* assessment format and duration on the official P_SAPEA page (do not assume this document is up to date)
- [ ] TOGAF ADM phases memorised (Preliminary → A → B → C → D → E)
- [ ] 5 SAP EA Framework building blocks memorised
- [ ] Business Model Canvas 9 blocks in sequence memorised
- [ ] Stakeholder Map 4 quadrants + actions memorised
- [ ] Metro Map 3 variants understood
- [ ] All artifact names and their phases known
- [ ] TIME model (Tolerate/Invest/Migrate/Eliminate) understood
- [ ] Cloud models (SaaS/PaaS/IaaS) + deployment types understood
- [ ] SAP Clean Core principles reviewed
- [ ] ISA-M (Integration Solution Advisory Methodology) reviewed
- [ ] Extension types (Key User / Developer / Side-by-Side) understood
- [ ] Practised at least one full scenario response out loud against the clock

---

## Recommended Preparation Path

```
Week 1: Domain 1 – Framework & Toolset
Week 2: Domain 2 – Architecture Vision & Roadmap
Week 3: Domain 3 – Business Architecture
Week 4: Domain 4 – Data, Application & Technology
Week 5: Revision + domain quizzes + connected-case practice (spoken, not just written)
Week 6: Full scenario mock (say your 9-step defense out loud) + exam traps review + final prep
```

See `study-plan.md` for the full day-by-day 6-week plan.

---

## Key Resources

| Resource | Link | Priority |
|----------|------|----------|
| SAP EA Certification Page | https://learning.sap.com/enterprise-architect | Essential |
| Scenario-Based Assessment FAQs | https://learning.sap.com/helpcenter/certification-support/scenario-based-assessment-faqs | Essential |
| SAP IEA10 Course | https://learning.sap.com/courses/intelligent-enterprise-architecture-fundamentals | Essential |
| SAP Business Accelerator Hub | https://api.sap.com | High |
| SAP One Domain Model | https://api.sap.com/sap-one-domain-model | High |
| SAP EA Community | https://groups.community.sap.com/t5/enterprise-architecture | Medium |
| SAP Help Portal – EA Framework | https://help.sap.com/docs/SAP_ENTERPRISE_ARCHITECTURE_FRAMEWORK | Medium |

---

## Source Material

- SAP's official Scenario-Based Assessment FAQ (confirmed current-format details above)
- SAP IEA10 Course (primary domain content)
- *SAP Enterprise Architecture: A Blueprint for Executing Digital Transformation* — Sheunopa Chalmers Musukutwa
- SAP EA Certification article by Rajprasath Subramanian (Principal EA @ SAP)
- SAP EA Link Collection by Rene de Daniel (Principal EA @ SAP LeanIX)
- Third-party prep sites (erpprep, pass4success, etc.) — useful for domain content, **not authoritative on current exam mechanics**
