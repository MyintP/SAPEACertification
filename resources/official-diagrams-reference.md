# Official SAP EA Diagrams — Study Reference

> These are the seven official SAP diagrams from the EA Framework documentation. Study until you can reconstruct each from memory.

---

## Diagram 1 — Enterprise Domains, BCM, and Business Process Model

**What it shows:** The three-tier RBA structure side by side.

**Left — 4 Enterprise Domains (colour-coded):**
- 🔴 Products & Services
- 🟢 Supply
- 🔵 Customer
- 🟡 Corporate

**Middle — Business Capability Model (Level 2 Business Areas):**

| Domain | Business Areas |
|--------|---------------|
| Products & Services 🔴 | R&D/Engineering, Product Management |
| Supply 🟢 | Sourcing and Procurement, Supply Chain Planning, Supply Chain Execution, Supply Chain Enablement, Manufacturing, Service Delivery |
| Customer 🔵 | Marketing, Sales, Omnichannel Commerce, Customer Service |
| Corporate 🟡 | Human Resources, Asset Management, Enterprise Strategy, Sustainability Management, Portfolio and Project Management, Governance Risk and Compliance, International Trade and Global Tax, IT Management*, Finance |

*IT Management shown greyed out — connected domain, not a core business capability

**Right — 8 Business Process Groups (colour-matched to domains):**
Idea to Market 🔴 | Source to Pay 🟢 | Plan to Fulfill 🟢 | Lead to Cash 🔵 | Recruit to Retire 🟡 | Acquire to Decommission 🟡 | Governance 🟡 | Finance 🟡

> **Exam tip:** Colour coding is consistent. Know the domain colours and you can always map a process group to its domain.

---

## Diagrams 2 & 4 — The Four Views Matrix

**What it shows:** Business Architecture and IT Solution Architecture linked across four views.

```
                    Business Architecture    IT Solution Architecture
                    (Blue)                   (Yellow)
─────────────────────────────────────────────────────────────────
Capability View  │  Business Capability  ──→  Solution Capability
                 │  Model                     Model
─────────────────────────────────────────────────────────────────
Process View     │  Business Process     ──→  Solution Process
                 │  Model                     Model
─────────────────────────────────────────────────────────────────
Data View        │  Business Data        ──→  Solution Data
                 │  Model                     Model
─────────────────────────────────────────────────────────────────
Organisation     │  Business Role        ──→  Application Role
View             │  Model                     Model
─────────────────────────────────────────────────────────────────
```

**The connecting arrows are navigable links in LeanIX** — not decorative. Click a Business Capability, navigate to Solution Capability, navigate to Solution Component, navigate to APIs.

**The Organisation View pair is the most overlooked:**
Business Role (e.g. "Purchasing Manager") → Application Role (how that role is implemented in SAP Ariba)

---

## Diagram 3 — EA Services Honeycomb

**What it shows:** All SAP EA Services organised by domain. More granular than courseware.

| Domain | Services |
|--------|----------|
| Architecture Vision | Clean Architecture Assessment, Scoping & Vision, Transformation Readiness |
| Strategy & Motivation | Strategy Mapping, Value Management, Business Model Patterns |
| Business Architecture | Business Process, Business Capability, Template Assessment & Guidelines, Business Model Patterns |
| Application & Data Architecture | Business Process Intelligence, Application Architecture, Data Architecture, Extensibility, Instance Strategy, AI & Automation, Analytics Architecture |
| Technology Architecture | Security Architecture, Integration, User Experience, Scaling Strategy, Technical Architecture Deployment |
| Roadmap & Transition | Initiatives & Roadmap, Transition Scenario Evaluation, Data Migration Strategy, Transition to Execution, Rollout, Organisational Change |
| Governance | Architecture Practice, Architecture Practice Maturity, Principles Policies & Standards, Practice with LeanIX |

**Three things not in the courseware:**
1. AI & Automation is a named service — active today, not future-state
2. "Practice with LeanIX" is a standalone Governance service
3. Transformation Readiness sits in Architecture Vision — assess readiness before defining vision

---

## Diagram 5 — Complete Artifact Map by Domain

See `artifact-map-complete.md` for the full breakdown.

**New artifacts visible vs courseware:**
- Business Process Catalog (Business Architecture)
- Business Role Catalog (Business Architecture)
- Software Distribution Diagram (Solution Architecture — Phase C→D bridge)
- Conceptional Data Diagram (Solution Architecture)
- Requirements Catalog (Governance)
- Architectural Decision Catalog (Governance)

---

## Diagram 6 — Five Building Blocks Circle

**What it shows:** The five pillars as equal, interconnected, surrounding the framework.

```
              Methodology
           ↗              ↖
    Services    SAP EAF    Reference
                           Content
           ↖              ↗
         Practice    Tooling
```

Circular layout is intentional — no building block is more important or comes before another.

---

## Diagram 7 — Metro Map Full Detail (dated 16.08.2024)

**What it shows:** Complete EA engagement flow from Request for Architectural Work to Start Implementation.

**Three parallel tracks:**

**Track 1 — Business Architecture (teal/blue):**
Stakeholder Map → Business Strategy Map → Business Model Canvas → Organization Map → Business Roles Catalog → Business Capability Map + Business Value Flow Diagram → Business Footprint Diagram → Business Data Catalog → Architecture Roadmap → WBS

**Track 2 — Cross-cutting (white/grey):**
Statement of Architecture Work → Solution Context Diagram → Enterprise Transformation Assessment → Solution Concept Diagram → Solution Architecture Diagrams → Application Architecture Overview → Environments & Location Diagram → **Start Implementation**

**Track 3 — Solution & Technology Architecture (yellow/orange):**
Principles Standards & Guidelines → Baseline Business and Solution Architecture → SAP RBA input → SAP RSA input → Software Distribution Diagram → Solution Data Architecture Diagrams

**Bottom bar — Requirements & Governance (pink, full length):**
Requirements Management, Architectural Decisions, Risk Analysis — runs the ENTIRE engagement

**Enterprise Transformation Assessment footnote — three activities:**
1. EA Practice Capability Assessment
2. Preliminary Business and Technology Capability Assessment
3. Business and Technology Transformation Readiness Assessment

**RBA and RSA input timing:**
- SAP RBA feeds in at the Business Capability Map / Business Value Flow Diagram stage
- SAP RSA feeds in at the Solution Architecture Diagrams stage AND again at Solution Data Architecture
- Sequence confirmed: define business needs first → apply reference content → design solutions

---

## How All Seven Diagrams Connect

| Diagram | Angle |
|---------|-------|
| 1 | What the RBA contains |
| 2 & 4 | How business and IT are structurally linked |
| 3 | What EA looks like as an external service |
| 5 | Every artifact by domain |
| 6 | Five building blocks as equal pillars |
| 7 | How a real engagement flows start to finish |

If you can look at any one and explain how it connects to the other six — you are ready for the exam.
