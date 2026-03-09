# Domain 1: SAP EA Framework & Toolset
**Exam Weight: 20–30%**

---

## The Five Building Blocks

> Memorise these cold. Every exam question in this domain sits inside one of these five.

| Building Block | What It Is | Exam Signal Words |
|---------------|-----------|-------------------|
| **Methodology** | TOGAF v10-based, tailored for SAP. Reduces tailoring effort for typical SAP engagements | "how to do EA", "ADM", "phases", "iterative" |
| **Reference Architecture Content** | Pre-built RBA + RSA blueprints. APQC-based. Adapt rather than invent | "pre-built", "reference", "RBA", "RSA", "accelerate" |
| **Tooling** | LeanIX + Signavio + Cloud ALM + Business Accelerator Hub | "tools", "LeanIX", "Signavio", "Cloud ALM" |
| **Practice** | Organisational implementation of EA. Governance, operating model, maturity | "org model", "governance", "maturity", "team" |
| **Services** | North Star Architecture. SAP-delivered engagement services | "North Star", "engagement", "delivery", "modules" |

> **Trap:** Practice = internal org model. Services = external SAP engagement model. They sound similar — they are different.

---

## TOGAF Foundation

- Developed by The Open Group from **1995**
- Used by **80% of Global 50** and **60% of Fortune 500** companies
- Four architecture levels: **Business, Application, Data, Technology**
- SAP tailored TOGAF — did **not** replace it
- TOGAF always expects tailoring. SAP's tailoring = less work per engagement

---

## The ADM Phases

```
Preliminary
    ↓
Phase A: Architecture Vision
    ↓
Phase B: Business Architecture
    ↓
Phase C: Application & Data Architecture
    ↓
Phase D: Technology Architecture
    ↓
Phase E: Opportunities & Solutions
    ↑_____________↓
   (iterative cycle)

Running through ALL phases:
- Requirements Management
- Governance (Risk, Decisions, Principles)
```

> ⚠️ **Critical: NOT a waterfall. Iterations happen within phases, between phases, and between full cycles.**

---

## Three Types of Tailoring (Preliminary Phase)

| Type | What It Covers |
|------|---------------|
| **Terminology** | Agreed glossary. Business-understood terms. Enterprise Glossary document. |
| **Content** | Adopt third-party frameworks, customise classification. Uses TOGAF Architecture Content Framework. |
| **Process** | Remove duplicate tasks, add org-specific checkpoints, align with portfolio mgmt, project lifecycle, procurement, ops handover. |

---

## The Metro Map

SAP's visual representation of the entire methodology — like a tube/subway map.

### What it shows:
- Full set of artifacts (recommended and optional)
- Input from SAP Reference Architecture at each stage
- References to existing work products

### Three variants:

| Variant | When to use |
|---------|------------|
| **Business-Centric** | Engagement driven by business transformation. Fewer IT artifacts. |
| **IT-Centric** | Engagement driven by technology change. Lighter business artifacts. |
| **Holistic** | Full end-to-end. All domains from strategy through technology. |

> **Key rule:** Artifacts are selected for the **stakeholders**, not for the sake of architectural completeness.

---

## The Integrated Toolchain

### Five-Step Flow:

```
1. INGEST      LeanIX ↔ Cloud ALM    Import current SAP system landscape
2. ANALYSE     Signavio               Process performance. 1,000+ built-in metrics. 24hr connection.
3. DESIGN      LeanIX + Signavio      Target architecture + future process models. Cross-navigation.
4. PLAN        LeanIX → Cloud ALM     Roadmaps handed over. Implementation projects generated.
5. EXECUTE     Signavio + Cloud ALM   Process designs transferred. Operations + monitoring.
```

### Tool Roles:

| Tool | Primary Role |
|------|-------------|
| **SAP LeanIX** | Architecture Management. Application Portfolio, Roadmaps, Technology Risk. The living EA repository. |
| **SAP Signavio** | Process Management. Process Insights (performance data), Process Intelligence (conformance/spaghetti), Process Explorer (RBA content). |
| **SAP Cloud ALM** | Project Execution + Operations. Receives roadmaps from LeanIX. Testing and monitoring post go-live. |
| **SAP Business Accelerator Hub** | API and integration content. APIs, iFlows, Solution Process references. https://api.sap.com |

### Unique value propositions (exam testable):
- Linking applications and processes for better impact analysis
- Integration of planning and implementation views across tools
- Connecting business process models to real-world execution
- Enabling continuous adoption and operational stability

---

## EA Practice — Four Organisational Models

| Model | Best For | Risk |
|-------|----------|------|
| **Informal** | Early EA adoption. Building the case. | Long-term: misses all EA benefits |
| **Separated** | Loosely coupled divisions, different architectures | Legacy of acquisitions. Synergies missed. |
| **Federated** | Each unit has EA role, virtual team together | No conflict resolution → collapses to Separated |
| **Centralised** | Matrix-managed orgs with corporate culture | Too large → can't stay close to all functions. Perceived as policing. |

---

## EA Practice Maturity Model — 8 Dimensions

| Dimension | What it measures |
|-----------|-----------------|
| Business-IT Alignment | Traceability between business objectives and IT capabilities |
| Stakeholder Involvement | Identification, engagement, and awareness of EA initiatives |
| Action & Impact | Whether EA actually influences decisions on sourcing, investment, strategy |
| Architecture Development | Comprehensiveness and standardisation of deliverables |
| Architecture Process | How well-defined the development and governance process is |
| Organisation & Governance | Formal structures, defined team, senior management endorsement |
| Communication | How well decisions are captured, shared, and used |
| People Enablement | Roles, responsibilities, skills, RACI matrices |

- 5 maturity levels: **Ad-Hoc → Initial → Defined → Managed → Optimised**
- Output: **spider web diagram** showing current vs target state

---

## Requirements, Risk & Decisions (Cross-Cutting)

### Requirements Management
- Runs through ALL ADM phases — not isolated to one phase
- **Requirement Catalog** classifies: functional vs non-functional
- Non-functional categories: Continuity (Availability, Performance), Adaptability (Scalability, Extensibility, Interoperability), Security (Access), Usability (Locality, Learnability, Support)
- **Functional Requirements** = what the system must do
- **Transition Requirements** = what's needed to move from current to future state (temporary — disappear after full implementation)

### Risk Management
- **Initial Risk** = before mitigation actions
- **Residual Risk** = after mitigation actions
- Risk domains: Business, Data, Application, Technology
- Process: Identify → Assess (probability + impact) → Mitigate → Re-assess residual

### Architecture Decision Records (ADRs)
> ⚠️ **Architecture produced AFTER decisions = too late and causes conflict.**  
> EAs must be involved BEFORE key decisions are made.

---

## Exam Traps — Domain 1

1. **Practice ≠ Services.** Practice = internal org. Services = SAP engagement offering.
2. **ADM is NOT waterfall.** Always iterative. This will appear in at least one question.
3. **Metro Map variant choice** = driven by the primary engagement driver (business vs IT vs both).
4. **Artifact selection** = always for stakeholder needs, not for architecture completeness.
5. **LeanIX vs Signavio** — LeanIX = architecture/applications. Signavio = processes. Don't swap them.
6. **Maturity model has 8 dimensions** — all eight are testable individually.

---

## Self-Test

1. Name the 5 building blocks of the SAP EA Framework
2. What are the 3 Metro Map variants and what drives the choice?
3. Which tool would you use to analyse broken business processes?
4. What is the key difference between Federated and Centralised EA models?
5. Why is the ADM described as iterative rather than sequential?
6. What is the difference between Initial Risk and Residual Risk?
7. Name the 8 dimensions of the EA Practice Maturity Model

> Answers: review the sections above 👆
