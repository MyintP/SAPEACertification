# SAP Reference Business Architecture (RBA) — Deep Dive

> **Source:** Maria Goltz, SAP Community Blog (Sep 2022) + SAP EA Methodology Guide (Official)
> **Exam relevance:** Domain 1 (Framework) and Domain 3 (Business Architecture) — high weight

---

## The One-Sentence Foundation

> *"The SAP Reference Business Architecture is based on SAP's 50 years of industry experience and is aligned with best practices and standards such as APQC."*

The RBA is not theoretical — it is distilled from 50 years of SAP seeing how enterprises actually operate. This is why it is used as a validated starting point, not built from scratch each engagement.

---

## Four Enterprise Domains — Official Definitions

| Domain | Official Definition | Colour |
|--------|-------------------|--------|
| **Products & Services** | Developing and managing products and services | Red |
| **Supply** | Fulfilling the demand for products and services | Green |
| **Customer** | Generating the demand for products and services | Blue |
| **Corporate** | Planning and managing the enterprise | Yellow/Orange |

> **Exam pattern:** The definitions are verb phrases. Map the verb to the domain:
> - "Managing supplier contracts" → fulfilling demand → **Supply**
> - "Managing accounts payable" → planning and managing → **Corporate**
> - "Managing customer complaints" → generating demand → **Customer**
> - "Managing product design" → developing and managing products → **Products & Services**

---

## The RBA Decomposition Chain

```
Enterprise Domain (4)
    ↓
Business Domain — Level 1 of BCM
    ↓
Business Area — Level 2 of BCM
    ↓
Business Capability — Level 3 of BCM (WHAT the enterprise can do)
    ↓ enables
Business Activity (HOW value is generated using capabilities)
    ↓ combined into
Business Process (END-TO-END combination of Business Activities)
```

> ⚠️ **Critical distinction:** Business Capability ≠ Business Process ≠ Business Activity. They are three different entities in a hierarchy. A Business Activity **requires** a Business Capability to execute. A Business Process is **built from** Business Activities.

---

## Business Capability — Precise Definition

> *"A Business Capability defines the 'what' the enterprise does, constituting a particular ability that an enterprise may possess, which is needed to deliver value or achieve a specific outcome."*

Three testable elements:
1. Defines **"what"** — not how, not who, not when
2. An **ability** the enterprise **may possess** — not every enterprise has every capability. Gaps exist and are expected.
3. Needed to **deliver value or achieve a specific outcome** — outcome-oriented, not activity-oriented

---

## 8 Business Process Groups — Full Scope Definitions

| Process Group | Domain | What It Covers |
|--------------|--------|----------------|
| **Idea to Market** | Products & Services 🔴 | Product/service lifecycle — portfolio, investments, new products, design, IP, compliance |
| **Source to Pay** | Supply 🟢 | Sourcing and procurement — planning, spend, sourcing, supplier contracts, operational procurement |
| **Plan to Fulfill** | Supply 🟢 | Planning, production, delivery, fulfillment, tracking, data management, sustainable manufacturing |
| **Lead to Cash** | Customer 🔵 | Marketing, selling, order management, fulfillment, after-sales, invoicing, AR, payment collection |
| **Recruit to Retire** | Corporate 🟡 | Employee lifecycle — HR strategy, planning, budgeting |
| **Acquire to Decommission** | Corporate 🟡 | Physical asset lifecycle — strategy, investments, maintenance, acquisition, onboarding, decommission |
| **Governance** | Corporate 🟡 | Internal operations — enterprise strategy, portfolio, projects, global trade, tax, risk, compliance |
| **Finance** | Corporate 🟡 | Financial operations — optimising financials, AR/AP, accounting, financial close, treasury |

> ⚠️ **Trap — Lead to Cash vs Finance boundary:**
> Lead to Cash includes accounts **receivable** and payment **collection**.
> Finance covers accounting, financial **close**, and treasury.
> The boundary is at the point where commercial activity ends and financial reporting begins.

> ⚠️ **Trap — Acquire to Decommission:**
> This covers **physical/operational assets** — equipment, infrastructure, plant assets.
> It is NOT about software decommissioning or IT asset retirement in the IT sense.

---

## Business Process Variations — Critical Concept

Generic E2E processes are **templates** containing all possible activities for that process in any context.

**Variations** are the executable versions — specific subsets for particular industries, business models, or use cases.

Example — Lead to Cash variations:
- **Lead to Cash for B2B** — tangible products, one-time services, B2B customers
- **Lead to Cash for B2C Omnichannel Commerce** — tangible products, B2C customers
- **Lead to Cash for Subscription and Usage Business** — recurring/usage-based billing

> **Exam angle:** When a scenario describes a specific business model (subscription, B2B, asset-heavy manufacturing), the correct answer references the appropriate **variation** — not the generic template. The Wanderlust case study uses this principle — Wanderlust is a travel company with specific process variations.

---

## Business Capability Model — Three Levels

SAP RBA defines Business Capabilities at three hierarchical levels:

| Level | Name | Example |
|-------|------|---------|
| Level 1 | Business Domain | Supply Chain |
| Level 2 | Business Area | Supply Chain Planning |
| Level 3 | Business Capability | Demand Planning |

The BCM observes **MECE** — Mutually Exclusive and Collectively Exhaustive.

---

## Business Architecture Domain vs Strategy & Motivation

> From the glossary: *"In the SAP EA Methodology, Business Strategy and Business Model are separated from the Business Architecture and build a domain of their own. Business Architecture describes how Business Strategy and Business Model are implemented — from a pure business perspective, not from an IT perspective."*

| Domain | What it does |
|--------|-------------|
| Strategy & Motivation | Defines WHY — strategic priorities, goals, value drivers, motivation |
| Business Architecture | Defines WHAT — capabilities, processes, data, organisational structure |

Business Architecture never answers "why" — that belongs to Strategy & Motivation.
Business Architecture never answers "how technically" — that belongs to Solution Architecture.

---

## The Four Views — Business and IT Pairs

| View | Business Side | IT Side |
|------|--------------|---------|
| Capability | Business Capability Model | Solution Capability Model |
| Process | Business Process Model | Solution Process Model |
| Data | Business Data Model | Solution Data Model |
| Organisation | Business Role Model | Application Role Model |

The connecting lines between views are navigable links in the toolchain — not decorative.

---

## Sources
- Maria Goltz, "SAP Reference Architecture Content: An Overview", SAP Community, Sep 2022
- SAP EA Methodology Guide (Official), 2023
- SAP EA Methodology Blog — Rene de Daniel, 2024
