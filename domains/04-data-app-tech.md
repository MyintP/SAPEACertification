# Domain 4: Data, Application & Technology Architecture
**Exam Weight: 20–30%**

---

## Three Approaches to Application & Data Architecture (Phase C)

| Approach | When Used |
|----------|-----------|
| **Capability-Centric** | Business Capabilities → Solution Capabilities → Solution Components |
| **Process-Centric** | Business Process Model → Solution Process Model → Solution Components |
| **Experience-Based** | Seasoned architect with deep domain knowledge. Uses RBA/RSA as checklist. |

---

## Application Architecture Diagrams — Know All Six

| Diagram | What it shows | Key use |
|---------|--------------|---------|
| **Product Map** | Recommended products/solution components per Business Domain or Area. Bill of Materials. | "What SAP products do we need?" |
| **Solution Component Diagram** | Blueprint of solution components and communication channels. Deployment Units + Communication Channels. | "How do the systems connect?" |
| **Solution Value Flow Diagram** | High-level process. Value-adding business activities mapped to solution components and capabilities. | "What value does each system deliver?" |
| **Solution Process Flow Diagram** | Detailed BPMN 2.0 collaboration diagram. Drill-down to integration content. | "What exactly happens step by step?" |
| **Application Architecture Overview Diagram** | Abstract view of all relevant solution components and integrations. Based on Solution Concept. | "What's the full landscape?" |
| **Software Distribution Diagram** | How solution components are distributed across infrastructure (On-Premise / Private / Public Cloud). | "Where does everything live?" |

> **Trap — Component vs Process Flow:**  
> Component Diagram = **STRUCTURE** (what systems exist and how they connect statically)  
> Process Flow = **BEHAVIOUR** (what happens dynamically step-by-step inside those systems)

---

## Solution Component Key Concepts

| Concept | Definition |
|---------|-----------|
| **Solution Component** | Modular software unit. Configured to perform specific functions. |
| **Deployment Unit** | Smallest solution component that can be deployed and run independently. |
| **Communication Channel** | Data transfer between Deployment Units (request-response or information flow). |
| **Solution Capability** | Functional ability of one or more solution components to support a Business Capability. |

> Interactions **within** a Deployment Unit (method calls, shared database) are NOT described in SAP EA Methodology.  
> Only interactions **between** Deployment Units are modelled as Communication Channels.

---

## Deployment Types — Three Models

| Type | Definition |
|------|-----------|
| **On-Premise** | Software installed and runs on the organisation's own computers/data centres. |
| **Private Cloud** | Cloud for exclusive use of a single organisation (single-tenant). Accessed via VPN. Managed by org or third party. |
| **Public Cloud** | Cloud for open use by the general public (multi-tenant). Managed by cloud provider (AWS, Azure, GCP). |

---

## Cloud Service Models — SaaS vs PaaS vs IaaS

| Model | Full Name | Provider Manages | Customer Controls |
|-------|-----------|-----------------|-------------------|
| **SaaS** | Software as a Service | Everything including the application | User-specific config only. No control over releases. Multi-tenant typical. |
| **PaaS** | Platform as a Service | Infrastructure + platform/middleware | Deployed applications + platform configuration. |
| **IaaS** | Infrastructure as a Service | Physical hardware only | OS, storage containers, deployed applications, selected network (VLAN). |

> Source: NIST definitions. Exam may reference these directly.

---

## S/4HANA Cloud: Public Edition vs. Private Edition

A layer more specific than the generic cloud models above — this is the actual product-level decision an architect makes when the target is S/4HANA Cloud. Evaluate workload-by-workload against the client's real constraints, not as a single enterprise-wide choice:

| Factor | Points to Public Edition | Points to Private Edition |
|---|---|---|
| **Standardisation appetite** | High — willing to adopt SAP best-practice processes as-is | Low — needs to preserve differentiating custom processes |
| **Extension complexity** | Light — Key User / in-app extensibility covers the gap | Heavy — needs on-stack Developer Extensibility close to the core |
| **Upgrade cadence** | Accepts frequent, mandatory releases | Needs control over upgrade timing |
| **Regulatory / data residency** | Standard multi-tenant hosting is acceptable | Requires dedicated infrastructure or specific hosting terms |

> **Trap:** "Which edition is better" is not a real question — the exam expects a workload-by-workload evaluation against constraints, not a blanket recommendation. A single enterprise can legitimately run both.

---

## Data Architecture Diagrams

| Diagram | Purpose |
|---------|---------|
| **Solution Data Flow Diagram** | Typical data flows for master, transactional, configuration data between solution components. Each endpoint = a Solution Data Object. |
| **Conceptual Data Diagram** | Entity-Relationship style. Data entities processed by solution components, their attributes, and relationships. |

### Solution Data Object
- Solution Component-specific realisation of a Business Data Object
- Structure defined by **SAP One Domain Model (ODM)** — https://api.sap.com/sap-one-domain-model

### Conceptual Data Diagram Steps:
1. **Define Entities** — identify information objects being processed
2. **Define Attributes** — name with unambiguous terms, add data types (number, string, date — keep simple)
3. **Define Relationships** — associations between entities, multiplicity, verb descriptions

---

## Technology Architecture (Phase D)

### Purpose
Describes the technology stack, physical computing environment, and network connectivity that enable the Application and Data Architecture building blocks.

### Two Objectives:
1. Develop Target Technology Architecture enabling the Architecture Vision and all building blocks
2. Identify candidate Architecture Roadmap components from gaps between Baseline and Target

### Key Artifact: Environments and Location Diagram

Evolves from the **Software Distribution Diagram** (Phase C) into a more detailed deployment view.

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Shows which Solution Building Blocks are deployed in which data centre location, and required physical connections |
| **Build Steps** | 1. Start with Software Distribution Diagram → 2. Name data centre providers, locations, infrastructure → 3. Map building blocks to environments → 4. Visualise data flows and network requirements |
| **Also Considers** | Physical user locations, external systems, where data crosses public lines, where VPN security is needed |

> **Note:** The Software Distribution Diagram belongs to Application Architecture (Phase C) but provides the INPUT for the Technology Architecture's Environments and Location Diagram.

### Additional Diagram:
**Network and Communications Diagram** — documents network communication lines, VPNs, and connectivity in detail.

---

## SAP Clean Core Principles ⭐

> One of the most exam-tested technology topics. SAP Clean Core = keeping S/4HANA standard and unmodified.

### The Extension Hierarchy (know all three):

| Extension Type | Where it runs | How it extends |
|---------------|--------------|---------------|
| **Key User Extensibility** | On S/4HANA itself | Business users configure without code. Low risk. In-app tools. |
| **Developer Extensibility** | On S/4HANA itself (ABAP Environment) | Developers extend using SAP's stable, published APIs. No modification of SAP code. |
| **Side-by-Side Extensions** | On SAP BTP (Business Technology Platform) | Separate system entirely. Connected via APIs. Maximum flexibility and isolation. |

### Clean Core Benefits:
- Easier upgrades (no custom code conflicts)
- Lower total cost of ownership
- Faster innovation adoption
- Reduced risk during transformations

---

## SAP Integration Solution Advisory Methodology (ISA-M)

> SAP's methodology for defining integration architecture. Exam tests awareness and the four integration domains.

### Four Integration Domains:

| Domain | What it covers |
|--------|---------------|
| **Process Integration** | Connecting business processes across systems (A2A and B2B) |
| **Data Integration** | Moving and synchronising data between systems |
| **Analytics Integration** | Connecting operational data to analytics and reporting systems |
| **IoT Integration** | Connecting devices and things to enterprise systems |

### Integration Styles (know these):
- **Synchronous** — caller waits for response (request/reply)
- **Asynchronous** — fire and forget, or event-driven
- **Batch** — bulk data transfer at scheduled times
- **Real-time** — immediate data propagation

---

## The Three SAP Advisory Methodologies

ISA-M is not the only one. SAP publishes three specialised advisory methodologies that plug into the EA Framework, each owning a different problem space. Knowing which one applies to a given scenario is the testable point.

| Methodology | Owns | Use it when the scenario is about |
|---|---|---|
| **ISA-M** — Integration Solution Advisory Methodology | Integration | Connecting systems across a hybrid estate; integration styles, domains, use-case patterns |
| **SAP Application Extension Methodology** | Extensibility | Choosing *how* to extend — protecting the clean core, in-app vs. side-by-side |
| **SAP Data and Analytics Advisory Methodology** | Data & analytics | Designing the data landscape, analytics strategy, data governance |

> **Exam angle:** These are *complements*, not alternatives — and none of them replaces the EA Methodology (the ADM). They are specialist methods you invoke inside a phase, not a substitute for the framework.

---

## SAP Application Extension Methodology

A structured, technology-agnostic way to decide extension architecture — the method behind the Clean Core decision you make on instinct. Three phases, three steps each.

**Two entry points:**
- Start at **Phase 1** for a specific extension use case
- Start at **Phase 2** to define an organisation-wide extension strategy and governance

| Phase | Steps | Output |
|---|---|---|
| **1 — Assess Extension Use Case** | System Context → Business Context & Requirements → Application Extension Use Case | Shared understanding of the business challenge, captured as an Extension Application Use Case Description |
| **2 — Assess Extension Technology** | Extension Styles → Extension Task → Extension Technology Mapping | Business requirements translated into technology-agnostic extension tasks |
| **3 — Define Extension Target Solution** | Extension Technology per Task → Decision Guidance Assets → Extension Target Solution | An extension target solution diagram |

### Extension Styles — mapped to the Three-Tier Architecture

| Tier | Extension Style | What it does |
|---|---|---|
| **Presentation** | User Interface Extension | Adapt the standard UI — add, remove, change labels, buttons, fields |
| **Presentation** | New User Interface | Create a custom UI alongside or replacing a standard one |
| **Presentation** | Form and E-Mail | Adapt or create forms and e-mail templates |
| **Application** | Business Logic Extension | Add business logic; add, exchange or rewire process steps |
| **Data** | Data Model Extension | Extend an existing data model's entities, or define a new one |

### Extension Tasks and Building Blocks

- **Extension tasks** are **technology-agnostic** and carry IDs (`P01`–`P07` presentation, `A01`+ application). You map each requirement to one or many tasks *before* thinking about technology — deliberately, so technical limitations don't shape the requirement.
- **Technical extension building blocks** are the actual technology options, categorised into **extension domains**: the **core solution extension domain** and the **side-by-side extension domain**.
- Only in Phase 3 do tasks get mapped to building blocks.

> **Trap:** The sequence is use case → task → technology. Naming the technology first (the instinct to say "we'll build it on BTP") inverts the method, and is the same Principle 1 violation as picking a product before mapping a capability.

**Personas involved:** Enterprise Architect, Domain Architect, Business User.

> Source: SAP Application Extension Methodology, User Guide (PUBLIC, 2025-08-13), help.sap.com.

---

## SAP Data and Analytics Advisory Methodology

Guides the design and validation of solution architectures for data-driven innovation. Built on TOGAF and the SAP EA Framework — so its vocabulary deliberately matches the ADM. Four phases:

| Phase | Focus | Key deliverables |
|---|---|---|
| **I — Scoping & Baseline Analysis** | Scope, current artifacts, pain points | Statement of Architecture Work, current architecture documentation, prioritised issues (Business Priority Matrix) |
| **II — Business Outcomes & Solution Requirements** | What the business needs and why | Business outcome definitions, use-case analyses with **data journey maps**, solution context diagram, data integration flow diagrams |
| **III — Capability Map & Solution Architecture** | Requirements → architecture | Solution concept diagram, capability maps, solution maps, architecture options assessment, target architecture diagram |
| **IV — Data Governance & Roadmaps** | Making it stick organisationally | Data & analytics maturity assessment, organisational role definitions, architecture roadmap |

> **Note:** Phases II and III **iterate** — they're run repeatedly to refine the target architecture against business outcomes. Same iterative logic as the ADM; same trap if you describe it as a one-pass sequence.

Relevant SAP solutions: **SAP Datasphere** (data fabric / integration across hybrid landscapes) and **SAP Analytics Cloud** (planning and analytics).

---

## SAP Business Technology Platform (BTP)

SAP's platform-as-a-service (PaaS) layer. Underpins Side-by-Side extensions and cloud integrations.

Key services to know:
- **SAP Integration Suite** — connects SAP and non-SAP systems (API Management, Cloud Integration)
- **SAP Build** — low-code/no-code development tools
- **SAP Business Application Studio** — developer IDE for cloud-native apps
- **SAP Event Mesh / Advanced Event Mesh** — event-driven integration

---

## Data and Analytics Products

| Product | Purpose |
|---------|---------|
| **SAP HANA Cloud** | In-memory cloud database. Foundation for real-time analytics. |
| **SAP Datasphere** (formerly Data Intelligence) | Data integration, orchestration, and governance. |
| **SAP Analytics Cloud (SAC)** | Business intelligence, planning, and predictive analytics. |

---

## Instance Strategy

An EA responsibility: advising on how many SAP instances a customer needs and how to structure them.

### Key Decisions:
- **Global vs Regional instances** — one central instance or regional instances per geography?
- **Number of instances** — based on business process complexity, regulatory requirements, and operational needs
- Influenced by: data sovereignty laws, performance/latency requirements, organisational autonomy

---

## S/4HANA Transformation Strategies

Know these three migration strategies — they appear in exam scenarios:

| Strategy | Description | When to use |
|----------|-------------|-------------|
| **Greenfield** | New implementation from scratch | New business, clean start, maximum standardisation desired |
| **Brownfield** | System conversion from existing SAP to S/4HANA | Existing SAP customer, wants to preserve config and data |
| **Selective Data Transition** | Process re-engineering + selective data migration | Wants Greenfield processes but needs specific historical data |

---

## RISE with SAP vs. GROW with SAP

These are SAP's **commercial and delivery packaging** around the transformation — not part of the EA methodology itself, but the container almost every real engagement runs inside. An architect who can't place a customer in the right one will design a target state the commercial model won't support.

| | **RISE with SAP** | **GROW with SAP** |
|---|---|---|
| **Core** | S/4HANA Cloud, **Private Edition** | S/4HANA Cloud, **Public Edition** (multi-tenant SaaS) |
| **Aimed at** | Existing installed base — mid-to-large enterprises on ECC or older ERP | Net-new and midmarket customers adopting cloud ERP |
| **Customisation philosophy** | Retains room for existing complexity and custom ABAP | Adopt best-practice standard processes, minimal customisation |
| **Upgrades** | Customer manages upgrade timing; new capabilities adopted deliberately | Automatic public-cloud release cycle |
| **Typical timeline** | Longer, complexity-driven | Faster — often ~3–6 months |

**Why it matters architecturally:** the choice constrains your extensibility options and your Clean Core story. Private Edition leaves developer extensibility on-stack available; Public Edition pushes you harder toward key-user and side-by-side extensibility. It also determines who controls the upgrade calendar — which is the whole basis of the two-way upgrade-stable guarantee.

> **Caveat:** RISE and GROW are commercial constructs that SAP repositions periodically (GROW was relaunched in January 2026 as an AI-first midmarket pathway). Treat the packaging details above as orientation from partner/industry sources, not as certification fact — verify current terms on SAP's own pages before advising a customer.

---

## Security, Identity & Authorisation (Architect-Level View)

Security is a cross-cutting non-functional concern the Requirements Catalog explicitly classifies (see Domain 1) — but it also lands as concrete architecture decisions:

| Concern | Architect's question |
|---|---|
| **Identity provider & SSO** | Where does identity live, and how does it propagate across S/4HANA, BTP and third-party apps? |
| **Authorisation model** | Business roles → application roles → technical authorisations. Who owns role design? |
| **User context propagation** | Does a side-by-side extension on BTP carry the user's security context, or run as a technical user? |
| **Data protection & residency** | Where is personal data stored and processed, and which jurisdiction's rules apply? |
| **Segregation of duties** | Which role combinations are prohibited, and where is that enforced? |

> **Connects to:** the **Business Role Model → Application Role Model** pairing in the Four Views (Domain 3). Business roles are product-agnostic; application roles implement them inside a specific SAP product. Security architecture is where that mapping becomes enforceable.

> **Trap:** "Security" is not only Technology Architecture. Identity and authorisation decisions bind Business Architecture (who does what) to Application Architecture (what the system permits) — treating it as a late infrastructure concern is the classic failure.

---

## Application Rationalisation — TIME & 6R

Two complementary frameworks for deciding what happens to an existing application portfolio. They answer different questions — don't confuse them.

| Framework | Question it answers | Options |
|-----------|---------------------|---------|
| **TIME** (see `domains/02-vision-roadmap.md`) | "What should we do with this application, in place?" | Tolerate (high tech/low functional fit), Invest (high/high), Migrate (low tech/high functional), Eliminate (low/low) |
| **6R** | "How do we move this to the cloud?" | **Rehost**, **Retire**, **Replatform**, **Repurchase**, **Refactor/Re-architect**, **Retain** |

> **Trap:** TIME assesses an application's *fit*; 6R is a *cloud migration* decision. A TIME-assessed "Invest" application might still be moved via any of the 6R options depending on cost, risk, and target platform — they're sequential lenses, not alternatives to each other.

---

## Exam Traps — Domain 4

1. **Component vs Process Flow diagrams** — Structure vs Behaviour. Most commonly confused pair.
2. **SaaS customer control** — customers have almost NO control (only user-specific config). IaaS has the MOST customer control.
3. **Private Cloud ≠ On-Premise** — Private Cloud is still a cloud deployment. Owned by org or third party, but not physically on-premise by definition.
4. **Clean Core extension types** — three types, know which runs where (on S/4HANA vs on BTP).
5. **Side-by-Side = BTP** — always. This is the recommended SAP pattern for new extensions.
6. **Software Distribution → Environments & Location** — the first feeds the second. SD = Phase C. E&L = Phase D.
7. **ISA-M has four domains** — Process, Data, Analytics, IoT. All four testable.
8. **S/4HANA migration strategies** — Greenfield, Brownfield, Selective. Know when to recommend each.
9. **TIME vs 6R** — TIME assesses application fit. 6R decides how to move it to the cloud. Different questions, often confused.

---

## Self-Test

1. Name all six Application Architecture diagram types and what each shows
2. What is the difference between a Deployment Unit and a Solution Component?
3. Which cloud deployment model uses a single-tenant model accessed via VPN?
4. What does a customer control in a SaaS deployment?
5. What are the three SAP Clean Core extension types and where does each run?
6. What are the four ISA-M integration domains?
7. What is the difference between the Software Distribution Diagram and the Environments & Location Diagram?
8. Name the three S/4HANA transformation strategies and when to recommend each
9. What is SAP BTP and what role does it play in the extension architecture?
10. What is the SAP One Domain Model and where is it used?
11. What is the difference between the TIME model and the 6R framework?

---

## Sources

- SAP EA Certification Study Bible — `SAP_EA_StudyBible_Final.docx` in this repository
