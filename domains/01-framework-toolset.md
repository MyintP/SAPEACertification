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

## Origin: IndRA, Not TOGAF

> **Trap:** The methodology's *origin* is not TOGAF. SAP built and validated it internally on its own IT landscape as **IndRA (Industry Reference Architecture)**, then aligned it with TOGAF as the industry-standard ADM foundation. TOGAF is what it's *built on*; IndRA is *where it came from*.

This is why SAP can apply the same methodology in three places at once — the **3D-ADM**:

1. **Product Engineering** — SAP architects use it to design and document new products
2. **Customer Engagements** — SAP Customer Success services apply it in transformation engagements
3. **SAP's Own IT** — SAP IT uses it for its own internal enterprise architecture

The three pillars — Methodology, Reference Architecture Content, and Tooling — are interrelated, not independent: reference content is developed *following* the methodology and made available *in* the tooling. When SAP Product Engineering documents a new product's capabilities, processes, and technologies, it does so according to the methodology, and that becomes what you see when you browse the Business Accelerator Hub.

> Source: SAP Enterprise Architecture Methodology Guide (Official, 2023), Getting Started.

---

## TOGAF Foundation

- Developed by The Open Group from **1995**
- Used by **80% of Global 50** and **60% of Fortune 500** companies
- Four architecture levels: **Business, Application, Data, Technology**
- SAP tailored TOGAF — did **not** replace it
- TOGAF always expects tailoring. SAP's tailoring = less work per engagement

---

## The Six Architectural Principles

Every scenario answer should be defensible against these six. In scenario-based questions, a "reasonable-sounding" generic answer is often the distractor precisely because it violates one of these.

| # | Principle | Guard Rail | Applied Example |
|---|-----------|-----------|-----------------|
| 1 | **Map Business and IT Separately** | Disentangle IT solutions from business goals — don't let a product decision drive the business capability definition. | Before debating Teams vs. Zoom, first map the business capability "Real-Time Collaboration." Product selection is downstream. |
| 2 | **Use Industry Standards** | Reuse proven, stress-tested standards instead of inventing new ones. | TOGAF for methodology, BPMN for process notation, APQC PCF for the process classification basis. |
| 3 | **Connect to Other Architectures** | EA is an equal partner, not a ruler — it works in harmony with integration, data and system-landscape architecture. | Align EA work products with integration and data architects using domain-driven design, rather than dictating to them. |
| 4 | **Collaborative Approach & Content Fluency** | Shared taxonomy and repeatable processes so content flows to every use case without restricting local autonomy. | Consistent meta-models let different business units use the same architecture data without a central bottleneck. |
| 5 | **Defined Content Ownership** | Every artifact, capability, application and process has a single named owner accountable for keeping it current. | One owner per Business Capability Map entry — not a committee, and not "whoever last touched it." |
| 6 | **Sustainability and Simplicity** | Keep the architecture and its documentation as simple as the problem allows. | Unnecessary complexity is a cost, not a sign of rigor — it's also the justification for the 10–20 Architecture Principles limit. |

> **Trap:** Principle 1 is the one most often violated by a plausible-sounding distractor — any answer that starts with "select the SAP product first, then..." is wrong before you finish reading it.

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

### The Full ADM — All Phases (Preliminary Through H)

The simplified diagram above covers the phases SAP EA content is organised around, but the underlying TOGAF ADM has three further phases most study material skips. Know all of them:

| Phase | Purpose |
|-------|---------|
| **Preliminary** | Tailor the framework. Establish principles. Three types: Terminology, Content, Process. |
| **A — Architecture Vision** | Define scope. Identify stakeholders. Create the Statement of Architecture Work. |
| **B — Business Architecture** | Define capabilities, processes, data, org structure. |
| **C — Information Systems** | Application and Data architecture. |
| **D — Technology Architecture** | Infrastructure, deployment, environments. |
| **E — Opportunities & Solutions** | Identify projects and transition plans to **realise** the target architecture. |
| **F — Migration Planning** | Prioritise projects. Create the detailed roadmap. |
| **G — Implementation Governance** | Oversee implementation contracts. |
| **H — Architecture Change Management** | Monitor for change triggers, manage updates. |
| **Requirements Management** | Cross-cutting — runs through all phases above. |

> **Trap:** Phase E *identifies* projects and transition plans to realise the target architecture — it does not itself define the target (that's Phases B–D). This exact distinction has appeared as a direct exam question.

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

### Metro Map's 7 Domains vs the Methodology's 3 Core Domains

Two different counts appear depending on which question you're answering — both are correct:

| View | Count | Domains |
|------|-------|---------|
| **Metro Map** (the full engagement flow) | **7** | Architecture Vision, Strategy & Motivation, Business Architecture, Solution Architecture, Technology Architecture, Roadmap & Transition, Requirements & Governance |
| **SAP EA Methodology** (the core model) | **3** core (+1 connection) | Business Strategy & Model Domain, Business Architecture Domain, Solution Architecture Domain — connecting to the IT Landscape Domain (Technology Architecture) |

> **Trap:** Don't collapse these into one number. "How many domains does the Metro Map have?" and "How many domains does the SAP EA Methodology define?" are different questions with different correct answers.

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

### The same toolchain, mapped to SAP Activate

The five-step flow above describes what LeanIX and Signavio do for each other. Mapped onto **SAP Activate** (the standard delivery methodology for cloud implementations), the same tools play consistent roles at each phase:

| SAP Activate Phase | SAP Signavio | SAP LeanIX |
|---|---|---|
| **Discover** | Mines as-is transaction logs from legacy systems to understand actual (not assumed) process flows | Imports and documents the as-is IT application portfolio, flagging legacy systems and initial technology risk |
| **Prepare / Explore** | Runs the Fit-to-Standard workshop — compares current processes against SAP's reference process content | Links target business capabilities to the proposed SAP applications; defines interfaces, ownership and the target-state roadmap |
| **Realize / Deploy** | Acts as the single source of truth for process documentation, training and workflow alignment | Manages the transition architecture and tracks go-live dependencies for a clean legacy decommission |

> This is a delivery-lifecycle view of the same toolchain, not a separate framework — useful for scenario questions phrased around "when in the project" rather than "which architecture layer."

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
7. **Origin is IndRA, not TOGAF.** SAP built the methodology internally, then aligned it with TOGAF.
8. **7 vs 3 domains.** Metro Map = 7 domains. SAP EA Methodology core model = 3 domains (+ IT Landscape connection). Both correct, different questions.

---

## Self-Test

1. Name the 5 building blocks of the SAP EA Framework
2. What are the 3 Metro Map variants and what drives the choice?
3. Which tool would you use to analyse broken business processes?
4. What is the key difference between Federated and Centralised EA models?
5. Why is the ADM described as iterative rather than sequential?
6. What is the difference between Initial Risk and Residual Risk?
7. Name the 8 dimensions of the EA Practice Maturity Model
8. What is IndRA, and how does it relate to TOGAF?
9. Name all 9 ADM phases from Preliminary through H
10. How many domains does the Metro Map have? How many does the SAP EA Methodology itself define?
11. Name the 6 Architectural Principles, and give the one-line application example for Principle 1

> Answers: review the sections above 👆

---

## Sources

- SAP Enterprise Architecture Methodology Guide (Official, 2023) — `SAP_Enterprise_Architecture_Methodology_Guide_Official.pdf` in this repository
- SAP EA Certification Study Bible — `SAP_EA_StudyBible_Final.docx` in this repository
