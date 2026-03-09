# Artifact Cheatsheet — All Phases

> Quick reference: every artifact by phase, what it is, and when the exam tests it.

---

## Preliminary Phase

| Artifact | Purpose | Exam Trap |
|----------|---------|-----------|
| **Tailored ADM** | Customised process for the specific engagement | Three types: Terminology, Content, Process |
| **Principles Catalog** | Architecture guardrails (10–20 max) | 4 components: Name, Statement, Rationale, Implications |
| **Metro Map Selection** | Business-centric / IT-centric / Holistic | Selected for stakeholders, not for architecture completeness |

---

## Phase A — Architecture Vision

| Artifact | Purpose | Exam Signal |
|----------|---------|-------------|
| **Stakeholder Map** | Influence × Attitude matrix | 4 quadrants: Promoters/Enthusiasts/Opponents/Resisters |
| **Business Strategy Map** | Strategic priorities → goals → value drivers → capabilities | SAP uses "Strategic Priority" not "Driver"; "Value Driver" not "Objective" |
| **Business Context Diagram** | Business ↔ external environment flows | Actors, flows (payment/product/info), structural dependencies |
| **Business Model Canvas** | How the org creates, delivers, captures value | 9 blocks in sequence — TESTED |
| **Statement of Architecture Work** | The contract to proceed | Must be signed BEFORE Phase B begins |
| **Architecture Principles** | Guardrails for all architectural decisions | 10–20 max; 4 components per principle |
| **Solution Context Diagram** | Proposed solution ↔ org units/roles | 10-minute test: can a stakeholder understand it in 10 mins? |
| **Solution Concept Diagram** | High-level "pencil sketch" of the solution | Not formal — it's a sketch. Shows building blocks + integration points |

---

## Cross-Cutting — Requirements, Risk & Decisions

| Artifact | Purpose | Key Detail |
|----------|---------|-----------|
| **Requirements Catalog** | Captures functional + non-functional requirements | Runs through ALL phases, not just one |
| **Risk Register** | Initial risk → mitigation → residual risk | Four domains: Business, Data, Application, Technology |
| **Architecture Decision Records (ADRs)** | Documents significant architecture decisions | Must be made BEFORE decisions are taken by leaders |

---

## Phase B — Business Architecture

| Artifact | Purpose | Exam Signal |
|----------|---------|-------------|
| **Organisation Map** | Network of org relationships | NOT a hierarchy chart — working relationships |
| **Business Roles Catalog** | Internal + external roles impacted by change | Links to target solution |
| **Business Capability Map** | What the org must be able to do (3 levels, 4 domains) | MECE principle; business owns naming |
| **Business Value Flow Diagram** | Value-adding process flows | Based on APQC PCF v7.2.1 |
| **Business Footprint Diagram** | Cross-domain X-ray: strategy→capabilities→IT | Most powerful stakeholder artifact; crosses all domains |
| **Business Data Catalog** | Business information objects and relationships | Uses SAP One Domain Model |

---

## Phase C — Application & Data Architecture

| Artifact | Purpose | Exam Signal |
|----------|---------|-------------|
| **Product Map** | Recommended products per Business Domain/Area | Bill of Materials for target architecture |
| **Solution Component Diagram** | Blueprint: solution components + communication channels | Structure view (not behaviour) |
| **Solution Value Flow Diagram** | Business activities mapped to solution components | High-level process view |
| **Solution Process Flow Diagram** | Detailed BPMN 2.0 process flows | Behaviour view (not structure) |
| **Application Architecture Overview** | All solution components + integrations in one view | Based on Solution Concept Diagram |
| **Software Distribution Diagram** | Components distributed across On-Prem/Private/Public Cloud | Feeds into Environments & Location Diagram (Phase D) |
| **Solution Data Flow Diagram** | Data flows between solution components | Master/transactional/config data |
| **Conceptual Data Diagram** | Entity-relationship view of data | Entities, Attributes, Relationships |

---

## Phase D — Technology Architecture

| Artifact | Purpose | Exam Signal |
|----------|---------|-------------|
| **Environments & Location Diagram** | Where building blocks are deployed physically | Evolves from Software Distribution Diagram; adds data centre detail |
| **Network and Communications Diagram** | Network lines, VPNs, connectivity | Used for detailed network documentation |

---

## Phase E — Opportunities & Solutions

| Artifact | Purpose | Exam Signal |
|----------|---------|-------------|
| **Business Architecture Roadmap** | Business outcomes across time horizons (3–5 years) | Fiscal years; one entity type (outcomes/capabilities/initiatives) |
| **Application Architecture Roadmap** | Technology solutions over time | Must sync with Business Roadmap |
| **Transition Architecture(s)** | Staging posts between Baseline and Target | One or more; formally defined states |
| **Work Breakdown Structure** | Project deliverables broken into manageable sections | Basis for effort + cost estimation |
| **Initiative Catalog** | All transformation initiatives with outcomes | Rate by business value + project risk |
| **Priorities Matrix** | Business Value × Project Risk matrix | High value, low risk = prioritise first |

---

## Quick Artifact → Phase Reference

```
Preliminary:     Tailored ADM, Principles, Metro Map Selection
Phase A:         Stakeholder Map, Strategy Map, Context Diagram, BMC,
                 Statement of Architecture Work, Architecture Principles,
                 Solution Context, Solution Concept
Cross-Cutting:   Requirements Catalog, Risk Register, ADRs
Phase B:         Org Map, Business Roles, Capability Map, Value Flow,
                 Footprint Diagram, Data Catalog
Phase C:         Product Map, Solution Component Diagram, Value Flow Diagram,
                 Process Flow Diagram, Overview Diagram, Software Distribution,
                 Data Flow Diagram, Conceptual Data Diagram
Phase D:         Environments & Location Diagram, Network Diagram
Phase E:         Business Roadmap, Application Roadmap, Transition Architecture(s),
                 WBS, Initiative Catalog, Priorities Matrix
```

---

## The Rene de Daniel Link Collection — Exam Blueprint

These 22 links from a Principal SAP EA represent the official artifact map:

| # | Artifact/Resource | Domain |
|---|-------------------|--------|
| 1 | SAP EA Framework | Foundation |
| 2 | SAP Reference Architecture | Foundation |
| 3 | SAP Reference Architecture Meta Model | Foundation |
| 4 | Business Capability Model | Phase B |
| 5 | Business Process Model | Phase B |
| 6 | BCM → Solution Architecture | Phase B→C |
| 7 | BPM → Business & Solution Architecture | Phase B→C |
| 8 | SAP EA Methodology | Framework |
| 9 | Metro Map I | Framework |
| 10 | Metro Map II | Framework |
| 11 | Business Strategy Map — Artifact | Phase A |
| 12 | Business Strategy Map in Action (LeanIX) | Phase A |
| 13 | Business Capability Diagram — Artifact | Phase B |
| 14 | Business Capability Diagram in Action (LeanIX) | Phase B |
| 15 | BCM → Solution Capabilities → Components in Action | Phase B→C |
| 16 | Business Process Diagram — Artifact | Phase B |
| 17 | Business Process Diagram in Action (LeanIX) | Phase B |
| 18 | Software Distribution Diagram — Artifact & Action | Phase C |
| 19 | Application Architecture Roadmap — Artifact | Phase E |
| 20 | Application Architecture Roadmap in Action (LeanIX) | Phase E |
| 21 | SAP EA Framework Services | Services |
| 22 | SAP Professional EA Certification | Certification |
