# Domain 2: Architecture Vision & Roadmap
**Exam Weight: 20–30%**

---

## Three Layers to Understand First

> From the SAP EA Blueprint book — this distinction is a common exam trap.

| Layer | Definition | Example |
|-------|-----------|---------|
| **Business Strategy** | The *goals* the enterprise wants to achieve and metrics to track success | "Increase market share by 20% in 3 years" |
| **Business Model** | *How* the enterprise seeks to profit — value proposition, competitive approach | "Subscription-based SaaS with freemium entry" |
| **Business Architecture** | The *structure* — capabilities, processes, information, organisation — to execute the model | "We need a Customer Management capability at maturity level 3" |

These are hierarchical: Strategy → Model → Architecture. **Do not confuse them.**

---

## Architecture Vision Objectives

1. Develop a high-level aspirational vision of the capabilities and business value to be delivered
2. Obtain approval for a **Statement of Architecture Work** (the contract to proceed)

> Phase A is NOT about designing the architecture. It is about **scoping** it and getting **sign-off**.

---

## Artifact 1: Stakeholder Map

### Two dimensions:
- **Influence:** High / Low (power to make or break the engagement)
- **Attitude:** Positive / Negative (current disposition toward change)

### Four quadrants — memorise the actions:

| Quadrant | Influence | Attitude | Action |
|----------|-----------|----------|--------|
| **Promoters** | High | Positive | **Actively engage** — use them to influence others |
| **Enthusiasts** | Low | Positive | **Inform** — supportive but limited power |
| **Opponents** | High | Negative | **Satisfy** — highest priority, can kill the project |
| **Resisters** | Low | Negative | **Monitor and respond** — low risk but don't ignore |

> **Trap:** Opponents are MORE dangerous than Resisters (both negative) because Opponents have influence to actually stop the engagement.

### Stakeholder Analysis also captures:
- Current vs required level of **understanding**
- Current vs required level of **commitment**
- Current vs required level of **support**
- Used to plan communication strategy to close the gaps

---

## Artifact 2: Business Strategy Map

### SAP EA term mapping (TOGAF → SAP EA):
| TOGAF | SAP EA |
|-------|--------|
| Driver | **Strategic Priority** |
| Objective | **Value Driver** |

### Structure (top-down):
```
Strategic Priority
    └── Goals
        └── Value Drivers
            └── Business Capabilities  ← linked here
                └── Initiatives (projects/programs delivering outcomes over time)
```

### Purpose:
- Translates business strategy into architecture by linking strategy map to capabilities
- Gains visibility of business readiness for adoption of change
- Aligns business and IT priorities

---

## Artifact 3: Business Context Diagram

A high-level map of how the business interacts with its **external environment**.

### Shows:
- **Business actors** — organisations, groups, persons (internal and external)
- **Business flows** — payment, product, information flows
- **Structural dependencies** — contractual associations between actors

### Step-by-step approach:
1. Define organisational entities that can perform behaviour
2. Identify and define business actors
3. Identify and define business flows between actors
4. Identify structural dependencies between actors

> This is NOT a process model. It is deliberately high-level — the "who talks to whom and how" view.

---

## Artifact 4: Business Model Canvas ⭐

> The exam specifically tests the **sequence** of the 9 building blocks. Memorise this.

### The 9 Building Blocks in Order:

```
1.  Value Proposition      ← What value do we deliver? What problems do we solve?
2.  Customer Segments      ← For whom? Who are our most important customers?
3.  Channels               ← How do we reach them? How do we deliver the value?
4.  Customer Relationships ← What type of relationship does each segment expect?
5.  Revenue Streams        ← What are customers willing to pay for? How?
--- (flip to internal) ---
6.  Key Resources          ← What assets does our value proposition require?
7.  Key Activities         ← What activities does our value proposition require?
8.  Key Partners           ← Who are our key suppliers/partners? What do we outsource?
9.  Cost Structure         ← What are the most important costs in our business model?
```

### Logic of the sequence:
- Blocks 1–5: **External / value delivery** (what you offer, who you serve, how you earn)
- Blocks 6–8: **Internal / value creation** (what you need to deliver the value)
- Block 9: **Financial reality** (what all of the above costs)

### SAP addition — Sustainable Business Model Canvas:
Adds two dimensions to the traditional canvas:
- **Eco-Social Costs** — environmental and social costs
- **Eco-Social Benefits** — environmental and social value created
Aligns with SAP's intelligent, sustainable enterprise vision.

---

## Artifact 5: Statement of Architecture Work

**The contract. Nothing substantive starts without it.**

### Defines:
- Scope of the architectural work
- Roles and responsibilities
- Acceptance criteria

> **Timing trap:** Must be signed and approved at the **end of Phase A** before Phase B begins. Architecture produced after a decision has already been made is too late.

---

## Artifact 6: Architecture Principles

**Guardrails that constrain how the architecture must be designed.**

### Four components — all four are exam-testable:

| Component | Description |
|-----------|-------------|
| **Name** | Short, memorable, technology-neutral. No ambiguous words: "support", "open", "consider", "avoid". |
| **Statement** | Succinctly and unambiguously communicates the fundamental rule. |
| **Rationale** | Business benefits of adhering. Business language. Relationships to other principles. |
| **Implications** | Requirements (costs, activities, resources) for both business and IT. Reader must understand "How does this affect me?" |

### Creation process:
- Consensus workshop (not 100% agreement — consensus means everyone can live with it)
- Attendees: CIO, Chief Architect, Head of Solutions Development, Head of IT Operations + specialists
- Can reuse SAP-provided "strawman" principles as a starting point
- Multiple iterations may be needed

### Critical limit:
> **10–20 principles maximum.** Too many limits architectural flexibility.

---

## Artifact 7: Solution Context Diagram

Shows the relationship between the proposed solution and organisational units, business roles, and business functions.

**The 10-minute test:**
> Can a stakeholder understand the proposed solution within 10 minutes from this diagram?  
> If not — the diagram is too complex. Simplify.

---

## Artifact 8: Solution Concept Diagram

A high-level **"pencil sketch"** of the expected solution at the outset.

- Shows architecture building blocks in scope (centre)
- Additional systems requiring integration (sides)
- Internal/external users

> **Distinction:** Solution Context = *organisational* relationships. Solution Concept = *technical building blocks* at high level.

---

## Enterprise Transformation Assessment — 3 Activities

| Activity | What it assesses | Tool/Output |
|----------|-----------------|-------------|
| **EA Practice Capability Assessment** | Maturity of the EA function itself | Spider web diagram (current vs target) using 8-dimension maturity model |
| **Preliminary Business & Technology Capability Assessment** | What capabilities are needed to execute the strategy? | Capability heatmap. Preliminary only — detail comes in Phase B. |
| **Business & Technology Transformation Readiness Assessment** | Is the organisation ready to actually transform? | Readiness scoring |

### Two Assessment Approaches:

**Bottom-Up (Capability-Driven):**
- Start with current state
- Define context → agree colour coding → heat map → interpret
- Realistic snapshot of today

**Top-Down (Strategy-Driven):**
- Start with strategic goals
- Link objectives → capabilities via Strategy Map
- Identify which capabilities are most impacted by strategy
- Prioritises future investments

---

## APPLICATION PORTFOLIO — TIME Model

Assesses each application on two dimensions:
- **Technical Fit:** Inappropriate → Fully Appropriate
- **Functional Fit:** Unreasonable → Perfect

| Category | Tech Fit | Functional Fit | Action |
|----------|----------|---------------|--------|
| **Tolerate** | High | Low | Keep temporarily while evaluating alternatives |
| **Invest** | High | High | Strategic — scale and enhance |
| **Migrate** | Low | High | Valuable to business but tech is outdated — move platform |
| **Eliminate** | Low | Low | Decommission or phase out |

---

## Roadmap Artifacts (Phase E)

### Business Architecture Roadmap
- Visual representation of **business outcomes** across functional clusters
- Time horizon: **3–5 years** (use fiscal years, not calendar years)
- Can show: Initiatives, Capabilities, OR Outcomes — **do not mix entity types**
- Outcome-based roadmaps resonate best with business stakeholders
- Must be kept **"evergreen"** — reviewed annually

### Application Architecture Roadmap
- Technology solutions required to realise company goals
- Must be kept **in sync** with the Business Architecture Roadmap
- Consistency check required between both roadmaps

### Transition Architectures
- Formal descriptions of architecture at architecturally significant points in time
- Staging posts between Baseline Architecture and Target Architecture
- One or more may exist depending on transformation complexity

### Work Breakdown Structure (WBS)
- Deliverable-oriented breakdown of a project into manageable sections
- Basis for effort and cost estimation
- Marks the handover from architecture planning to implementation

---

## Roadmap Structuring Elements

| Element | Description |
|---------|-------------|
| **Clusters** | Group by: Business/IT initiatives, LoB, E2E processes, SAP products, or mix |
| **Phases** | Structure by: Transformation phases (Foundation→Optimisation→Innovation) or strategic objectives |
| **Elements** | Portions of projects/activities within a cluster |
| **Sequences** | Right order of change events within and across clusters |
| **Dependencies** | Timeline, boundary conditions, go/no-go decisions, application/integration dependencies |

### Implementation Approaches:

| Approach | Pro | Con |
|----------|-----|-----|
| **Big Bang** | Fastest to full target state | High risk, maximum disruption |
| **Phased by Company/BU** | Lower risk, staged value | Longer timeline, parallel complexity |
| **Phased by Application** | Each app optimised independently | Integration complexity |

---

## Exam Traps — Domain 2

1. **BMC sequence** — Value Proposition → Segments → Channels → Relationships → Revenue → Resources → Activities → Partners → Cost. This is specifically tested.
2. **Strategy vs Model vs Architecture** — three distinct, hierarchical concepts. Don't conflate.
3. **Statement of Architecture Work timing** — must be signed BEFORE Phase B begins.
4. **Principles limit** — 10–20 max. More = less flexibility.
5. **Roadmap entity types** — pick ONE (Initiatives OR Capabilities OR Outcomes). Don't mix.
6. **Solution Context vs Solution Concept** — Context = org relationships. Concept = tech sketch.
7. **10-minute rule** — specific checkpoint for Solution Context Diagram.
8. **Opponents vs Resisters** — both negative attitude but Opponents have HIGH influence = must Satisfy, not just Monitor.

---

## Self-Test

1. Name the 4 stakeholder quadrants and the action for each
2. What is the SAP EA term for TOGAF's "Driver"?
3. What is the SAP EA term for TOGAF's "Objective"?
4. List the 9 BMC building blocks in sequence
5. What are the 4 components of an Architecture Principle?
6. What is the maximum number of Architecture Principles and why?
7. What is the difference between Solution Context and Solution Concept diagrams?
8. Name the 3 Roadmap entity types — which resonates best with business stakeholders?
9. What are the 2 dimensions of the TIME model?
10. What makes outcome-based roadmaps superior for business stakeholders?
