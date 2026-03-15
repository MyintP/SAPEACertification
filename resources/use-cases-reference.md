# SAP EA Use Cases Reference

> Source: SAP EA Book Webcast — Anup Das, Peter Klee, Johannes Reichel (SAP Transformation Hub)
> These are real customer scenarios with fictitious company names. The framework application is real.

---

## How Use Cases Are Structured in the Book

Every use case follows the same four-part structure:
1. **Business and IT context** — what situation the organisation is in
2. **Problem statement** — what specific challenge needs to be solved
3. **Framework application** — which SAP EAF artifacts and methodology steps are applied
4. **Outcomes and deliverables** — what is produced

---

## Use Case 1 — TCO Reduction

### Business and IT Context
TCO reduction is one of the key strategic priorities for any transformation. When a customer needs to present a business case to their board, three parallel tracks run simultaneously:

| Track | Who Leads | What It Covers |
|-------|-----------|----------------|
| **Value** | Value advisory team | Dollar value, ROI quantification |
| **Architecture** | **Enterprise Architect (primary role)** | Architectural decisions, target direction, scope |
| **Cost** | Cost/finance team | Cost to implement the architecture |

> The EA's primary involvement is the **architecture track** — not value advisory or cost modelling.

### The TCO Iceberg

**Above the waterline (visible in business cases):**
- Software and license cost (OpEx vs CapEx)
- Hardware and infrastructure cost (hyperscaler options)

**Below the waterline (frequently underestimated):**
- Implementation and consulting cost
- Change management cost (moving from on-prem to cloud affects entire organisation)
- Support and maintenance cost (team profile changes with cloud transition)
- End of life and decommissioning cost (retiring applications requires budget)

### Business and IT Drivers for TCO Reduction

**Business drivers (prerequisites for AI readiness):**
1. Process standardisation
2. Process harmonisation
3. Process automation
4. Data harmonisation and quality

> *"If your process is not standardised, harmonised, and automated, it is meaningless to think of generative AI or agentic AI."* — Anup Das

**IT drivers:**
- Cloud architecture (SaaS or hybrid)
- Landscape consolidation (reduce number of ERP instances)
- Application rationalisation (TIME and 6R frameworks)
- Data centre centralisation
- Clean architecture (Clean Core + process standardisation + data quality)

### Framework Application — Fictitious Company: Digital Aerospace Technologies (DAT)

DAT is acquiring TechD. Both have separate application landscapes.

**Artifacts applied:**
- Business Process and Business Capability heat mapping — identify harmonisation potential and pain points
- Template Assessment & Guidelines — determine which company's processes become the standard
- Instance Strategy — single global instance vs business division vs regional instances
- Application Architecture — target landscape after consolidation
- Initiatives & Roadmap — ECC modernisation, BW modernisation, Manufacturing, WMS, TM, PPM initiatives
- Transition Scenario Evaluation — qualitative and quantitative assessment of options

### Key Deliverables
- Business capability heat map (red/green — opportunities and pain points)
- Instance strategy options comparison
- Transition scenario evaluation (spider diagram / decision matrix)
- Architecture roadmap with transition flavour

---

## Use Case 2 — Mergers, Acquisitions & Divestitures

### The M&A Reality for Enterprise Architects

> *"Almost 90% of enterprise architects get involved in post-merger integration efforts — not pre-deal."*

By the time EA is engaged, the deal is done. The challenge is making it work architecturally.

### M&A Lifecycle Phases

| Phase | EA Involvement |
|-------|---------------|
| Pre-deal / Strategy | Rare — but high value if involved (capability gap assessment) |
| Due diligence | Sometimes invited |
| Deal execution | Sometimes involved |
| **Post-deal integration** | **Primary EA engagement point (90% of cases)** |
| Business and IT transformation | Ongoing EA involvement |

### Scenario A — Divestiture / Carve-Out (SpinCo from FarmCo)

**Situation:** FarmCo has three business units (BU1, BU2, BU3) in one SAP ECC system. BU3 is being spun off as SpinCo. SpinCo needs to carve out from ECC and move to S/4HANA as a separate entity.

**Challenge:** BU3 data is comingled with BU1 and BU2 in terms of product hierarchy, divisions, and financial data. Selective data transition required.

**Framework application:**
- Strategy Mapping — define SpinCo's standalone architecture direction
- Capability Assessment — what capabilities SpinCo retains vs what FarmCo keeps
- Application Architecture — target landscape for the carved-out entity
- **Transition Scenario Evaluation** — key artifact here

**Transition strategy evaluated:**
Selective Data Transition approach — carve out BU3 selectively, transition directly to S/4HANA (not just lift-and-shift to new ECC).

Evaluation criteria used:
- Financial risk
- Business fit and flexibility
- Deployment speed and duration
- Dual maintenance risk during transition
- Landscape risk
- Total cost of implementation and effort
- Change management requirements

### Scenario B — Acquisition / Landscape Consolidation

**Situation:** Acquirer has one application landscape. Acquired company has a different landscape. Two separate environments must be consolidated into a target architecture.

**Challenge:** Identify which processes and capabilities can be harmonised, which need integration during transition, and how to sequence the consolidation.

**Framework application:**
- Business Process and Business Capability heat mapping — where is harmonisation potential?
- Application Architecture — target consolidated landscape
- Integration architecture — what needs to stay integrated during transition phases
- Roadmap — phased consolidation plan

### Key Deliverables for M&A
- Capability heat map showing harmonisation potential across both companies
- Transition scenario evaluation (qualitative + quantitative spider diagram)
- Target application architecture
- Phased consolidation roadmap

---

## Use Case 3 — Cloud Transformation (PumpTech)

### The Two-Track Business Model Problem

**Company:** PumpTech — leading pump manufacturer.

**Traditional business model:** Sell physical pump units + maintenance services. Cash cow. Heavily customised SAP ECC.

**New business model:** "Pumping as a Service" — subscription and pay-per-use. Customer pays for pump usage, not ownership. Requires IoT monitoring, predictive maintenance, real-time data.

**The architectural challenge:** Both business models must run simultaneously. You cannot wait for legacy transformation before enabling the new model.

### Baseline Architecture (As-Is)
SAP ECC with: Finance/Controlling, Plant Maintenance, Production Planning, Quality Management, APO (PPDS), Extended Warehouse Management, Transportation Management. Plus non-SAP: MES, CRM, HCM, SRM. Heavily customised.

### The Two-Track Architectural Decision

| Track | Business Model | Architecture Choice | Rationale |
|-------|---------------|--------------------|-----------| 
| **Track 1** | Traditional (cash cow) | S/4HANA Cloud **Private Edition** — Brownfield | Preserve business, existing data and config, low risk, clean core later |
| **Track 2** | New subscription model | S/4HANA Cloud **Public Edition** — Greenfield | Maximum agility, fast implementation, standard processes |

**On top of S/4HANA Public Cloud (SAP BTP innovations):**
- Subscription billing solution
- Asset performance management (IoT/health monitoring)
- IoT enablement (real-time pump monitoring)

**Integration:** Financial reporting and consolidation must connect both tracks at the company level.

### Brownfield vs Greenfield — When to Use Each

| Factor | Brownfield | Greenfield |
|--------|-----------|------------|
| Business model | Established, cash cow | New, needs agility |
| Existing data | Must be preserved | Starting fresh |
| Customisations | Many — assess for clean core | None — start standard |
| Implementation timeline | Longer | Shorter |
| Risk tolerance | Low | Higher acceptable |
| Primary driver | Secure business continuity | Enable innovation |

### Framework Application for PumpTech

Artifacts applied (from EA Services honeycomb):
- Stakeholder Map — CEO/CDO as Promoters, CIO as Opponent (high influence, negative attitude)
- Transformation Readiness Assessment — O-data + X-data combined
- Business Process Intelligence — analyse current processes, identify innovations
- Instance Strategy — private cloud + public cloud two-track decision
- Application Architecture — target landscape
- AI & Automation mapping — AI capabilities per business capability
- Extensibility — Clean Core strategy for private cloud track
- Initiatives & Roadmap

### The O-Data + X-Data Readiness Assessment

**O-data (Operational data — hard facts from systems):**
- Custom code usage reports
- Process KPIs
- System performance data

**X-data (Experience data — human sentiments):**
- Stakeholder surveys
- Process disruption feedback
- Sentiment analysis

**Combined insight example:**
- O-data: High custom code usage detected
- X-data: Users report frequent process disruptions due to customisations
- Insight: Clean Core strategy is mandatory before any cloud migration

### PumpTech High-Level Roadmap

**Traditional business model track:**
1. ECC → S/4HANA Cloud Private Edition conversion (Brownfield)
2. Parallel: Clean Core and AI adoption across all domains
3. HR transformation
4. Supply chain: EWM/TM migration, APO back to S/4HANA core

**New subscription model track (runs simultaneously):**
1. S/4HANA Cloud Public Edition + Asset Management + Subscription Billing
2. IoT enablement
3. Integration strategy (BTP)

**Cross topics:** SAP Business Data Cloud, data lake integration, analytics landscape

---

## Framework Application Pattern Across All Use Cases

Every use case follows the same pattern:

```
Business & IT Context Analysis
        ↓
Stakeholder Map (who are the Promoters/Opponents?)
        ↓
Transformation Readiness Assessment (O-data + X-data)
        ↓
Business Capability & Process Heat Mapping
        ↓
Instance Strategy Decision
        ↓
Application Architecture (target landscape)
        ↓
Transition Scenario Evaluation (qualitative + quantitative)
        ↓
Initiatives & Roadmap
```

> *"Follow the framework and your life will be more predictable and structured. The framework brings method to the madness."* — Anup Das

---

## Exam Relevance

| Use Case | Exam Domain | Key Artifacts Tested |
|----------|-------------|---------------------|
| TCO Reduction | Domain 2 (Vision & Roadmap) | Business Capability heat map, Roadmap, WBS |
| M&A Divestiture | Domain 3 (Business Architecture) | Transition Scenario Evaluation, Capability Assessment |
| M&A Acquisition | Domain 3 + Domain 4 | Landscape consolidation, Application Architecture |
| Cloud Transformation | Domain 4 (Data, App & Tech) | Instance Strategy, Brownfield vs Greenfield, Clean Core |

---

## Sources
- SAP EA Book Webcast — "Enterprise Architecture with SAP" Virtual Master Class
- Authors: Anup Das, Peter Klee, Johannes Reichel (SAP Transformation Hub)
- Book: "Enterprise Architecture with SAP" — SAP Press
