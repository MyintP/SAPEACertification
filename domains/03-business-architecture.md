# Domain 3: Business Architecture
**Exam Weight: 20–30%**

---

## Why Business Architecture is the Foundation

> Business Architecture is a **prerequisite** for all other domains (Data, Application, Technology).  
> It must be completed first — unless already covered in other organisational processes.

A knowledge of Business Architecture is required before architecture work in **any other domain**. It is also the primary means of demonstrating **business value** to stakeholders and justifying ROI from EA work.

---

## The Two Approaches — Know Both

| Approach | Focus | Anchor Point | Tools |
|----------|-------|-------------|-------|
| **Capability-Centric** | WHAT the business does | Business Capabilities → Solution Capabilities → Applications | SAP LeanIX, SAP Signavio |
| **Process-Centric** | HOW the business does it | Business Process Model → Solution Process Model → Applications | SAP Signavio Process Explorer |

> **Third approach (experienced architects only):** Experience-Based — architect uses deep domain knowledge directly. Uses RBA/RSA as a checklist rather than navigation tool.

---

## The RBA → RSA Link (Critical Connection)

This is what organisations are ultimately looking for from EA.

```
REFERENCE BUSINESS ARCHITECTURE (RBA)          REFERENCE SOLUTION ARCHITECTURE (RSA)
─────────────────────────────────────          ──────────────────────────────────────
Business Domain                                Solution Component
    └── Business Area                              └── Solution Capability
        └── Business Capability          ←→             └── (implements Business Capability)

E2E Business Process
    └── Business Process Module          ←→     Solution Process
        └── Business Process Segment                └── Solution Activity
            └── Business Activity        ←→             (realises Business Activity)

Business Data Object                     ←→     Solution Data Object
                                                (SAP One Domain Model)
```

**It answers:** Which stakeholders are impacted? What are the strategic objectives? How do requirements connect to processes, integration, and data?

---

## Business Capability Map

### Definition
A Business Capability describes the organisation's **ability to successfully perform business activities**, thereby achieving business objectives and delivering value to customers.

> Capabilities define **WHAT** the business does — **independent of how technology supports it.**

### Three-Level Hierarchy (MECE principle):

| Level | Name | Description |
|-------|------|-------------|
| **Level 1** | Business Domain | Highest grouping. Four enterprise domains. |
| **Level 2** | Business Area | Groups of related capabilities within a domain. |
| **Level 3** | Business Capability | Specific ability the org must possess. |

### Four Enterprise Domains (Level 1):
1. **Product & Services**
2. **Customer**
3. **Supply**
4. **Corporate**

### MECE Principle:
- **Mutually Exclusive** — no overlap between capabilities
- **Collectively Exhaustive** — no gaps in coverage

### Heat Mapping Process:
1. Define the context (fit-gap, pain/gains, strategic importance, maturity, etc.)
2. Define and agree on the colour coding scale
3. Conduct the heat mapping exercise with capability owners (business owns capabilities)
4. Derive and interpret results

> **Rule:** Naming of business capabilities should resonate with the business — the business owns them.

---

## Business Process Model

### Four-Level Hierarchy:

| Level | Name | Naming Convention |
|-------|------|-------------------|
| **Level 1** | E2E Business Process | Starts "Plan to Optimise…", ends "Manage…" (PDCA cycle) |
| **Level 2** | Business Process Module | Format: `<A to B>` (e.g., Hire to Retire). "Manage…" = pervasive |
| **Level 3** | Business Process Segment | Named same as related Business Area in BCM (creates synergy) |
| **Level 4** | Business Activity | Lowest value-creating step. ONE central Business Activity Repository. |

> Based on **APQC Process Classification Framework (PCF) v7.2.1**

### PDCA Cycle in Level 1 Processes:
- **Plan** (Plan to Optimise...) → **Do** (execution modules) → **Check** → **Act** → **Manage** (pervasive activities)

---

## Business Architecture Artifacts

### 1. Organisation Map
- Shows key organisational units, partners, and stakeholder groups
- **Network of relationships** — NOT just a hierarchy chart
- Shows working relationships, not just reporting lines
- Provides organisational context for the entire EA effort

### 2. Business Roles Catalog
- Documents internal and external business roles impacted by the architecture change
- Identifies personas interacting with the target solution

### 3. Business Capability Map
- Visualises what the organisation must be able to do to generate value
- Three levels (Domain → Area → Capability)
- MECE principle
- Supports heat mapping exercises

### 4. Business Value Flow Diagram
- Combination of value-adding activities to fulfil a defined business goal
- Describes business processes from a **value perspective**
- Starting point: identify value flows (use reference models if none documented)
- Break down into modules → segments → activities as needed

### 5. Business Footprint Diagram ⭐
The **"X-ray"** — the most powerful cross-domain stakeholder communication artifact.

```
Organisation Units
    ↓
Strategic Goals / Objectives (Value Drivers)
    ↓
Business Processes
    ↓
Business Capabilities
    ↓
Solution Components
    ↓
Technology Capabilities / Locations
```

- Links strategic objectives → capabilities → applications → technology in one view
- Prerequisite: high quality data for entities and relationships
- Scope and storyline must be clearly defined
- Select only the relevant entities for the storyline — don't include everything

### 6. Business Data Catalog
- Summarises all business-relevant information objects (entities) for a specific purpose
- Identifies relationships between business information entities
- Connected to business capabilities and processes
- Source: via business processes/capabilities OR SAP One Domain Model (https://api.sap.com/sap-one-domain-model)

---

## Gap Analysis

A technique used throughout Business Architecture to identify:
- **Baseline Architecture** (as-is) — where the organisation is today
- **Target Architecture** (to-be) — where the organisation needs to be
- **Gaps** — capabilities, processes, or systems that are missing or inadequate

Gap analysis results feed directly into the **roadmap** (Phase E) as the basis for identifying what needs to be built, bought, or improved.

---

## Capability Assessment Models

### Integrated Assessment Model — Three Lenses:
1. **Business Capability Assessment** — Viability of existing operating model. Uses Business Capability Heatmap (commodity / differentiation / innovation).
2. **Technology Capability Assessment** — Feasibility of current IT landscape. Uses Technology Capability Heatmap.
3. **Applications & Solutions Assessment** — Usability and value delivery. Uses **TIME model** (Tolerate / Invest / Migrate / Eliminate).

> Strategy sets the direction. These assessments translate strategy into actionable insights.

### Bottom-Up vs Top-Down Assessment:
- **Bottom-Up (Capability-Driven):** Start from current state. Realistic. "Where are we today?"
- **Top-Down (Strategy-Driven):** Start from strategic goals. Forward-looking. "What do we need to prioritise?"

---

## Reference Business Architecture Content

| Level | Name | Description |
|-------|------|-------------|
| **RBA** | Reference Business Architecture | Complete business scope. Solution-agnostic. APQC-based. |
| **High-Level RSA** | Reference Solution Architecture | Recommended mapping to SAP solution portfolio. |
| **Detailed RSA** | Reference Solution Architecture (Detail) | Process + integration info. APIs, iFlows, data objects. |

### Access Points:
- **SAP Signavio Process Explorer** — business process models
- **SAP Business Accelerator Hub** (https://api.sap.com) — APIs, integration content

---

## Exam Traps — Domain 3

1. **Capability vs Process** — Capability = WHAT (stable). Process = HOW (continually improved). Don't swap.
2. **Business owns capabilities** — naming must resonate with business, not IT jargon.
3. **MECE** — both Mutually Exclusive AND Collectively Exhaustive. Both conditions required.
4. **Business Footprint = cross-domain** — it links ALL domains in one diagram. It is NOT just a business diagram.
5. **Business Process Segment naming** = same as Business Area name in BCM. This creates synergy — they are DIFFERENT objects with the same name.
6. **Level 4 Business Activities** = ONE central repository. All business activities in one place.
7. **Gap analysis** = Baseline → Target → Gap. Feeds the roadmap. This is the mechanism, not just an output.
8. **Organisation Map ≠ Org Chart** — it is a network of working relationships, not a hierarchy.

---

## Self-Test

1. Why is Business Architecture a prerequisite for all other domains?
2. What are the two main approaches to Business Architecture and what does each focus on?
3. Name the four Enterprise Domains in the SAP Business Capability Model
4. What does MECE stand for and why does it apply to capability models?
5. What is the naming convention for Level 2 Business Process Modules?
6. What does the Business Footprint Diagram link together?
7. What is the APQC PCF and why is it relevant?
8. What are the three levels of granularity in SAP Reference Business Architecture?
9. Where are all Level 4 Business Activities stored?
10. What is the difference between a Business Capability Heatmap and the TIME model?
