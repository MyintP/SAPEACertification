# Exam Traps — Common Mistakes & How to Avoid Them

> These are the questions that catch people out. Review this the night before the exam.

---

## Domain 1 Traps

### ⚠️ Trap 1: Practice ≠ Services
- **Practice** = the *internal* organisational model of EA within a company
- **Services** = the *external* SAP engagement offering (North Star Architecture)
- They sound similar. They are completely different things.

### ⚠️ Trap 2: ADM is NOT waterfall
- The exam will describe a sequential approach and ask if it's correct
- Answer: **No.** The ADM is iterative — within phases, between phases, between full cycles
- The Metro Map is NOT meant to give the impression of a waterfall approach

### ⚠️ Trap 3: Artifacts are for stakeholders, NOT for architecture
- When asked why you would choose a subset of Metro Map artifacts, the answer is always **stakeholder needs**
- Not "to cover all architecture domains" or "for completeness"

### ⚠️ Trap 4: LeanIX vs Signavio confusion
- **LeanIX** = architecture and applications management
- **Signavio** = business process management and analysis
- LeanIX holds the *what* (applications, capabilities). Signavio holds the *how* (processes).

### ⚠️ Trap 5: Maturity model has 8 dimensions
- All 8 are individually testable
- Don't confuse them with the 5 building blocks or the ADM phases

---

## Domain 2 Traps

### ⚠️ Trap 6: Business Model Canvas sequence
The exam specifically tests this. The nine building blocks in order:
1. Value Proposition
2. Customer Segments
3. Channels
4. Customer Relationships
5. Revenue Streams
6. Key Resources
7. Key Activities
8. Key Partners
9. Cost Structure

> External blocks (1–5) come before internal blocks (6–8). Cost (9) is last.

### ⚠️ Trap 7: Strategy vs Model vs Architecture
- **Business Strategy** = goals and metrics
- **Business Model** = how you profit (value proposition, competitive approach)
- **Business Architecture** = structure to execute the model
- These are hierarchical. Strategy → Model → Architecture.

### ⚠️ Trap 8: Statement of Architecture Work timing
- Must be signed and approved at the END of Phase A
- Phase B cannot begin without it
- Architecture produced AFTER a decision has already been made is **too late and causes conflict**

### ⚠️ Trap 9: Architecture Principles — too many
- Maximum 10–20 principles
- More principles = less flexibility for the architecture
- If a scenario describes 40 principles, that is a problem, not a best practice

### ⚠️ Trap 10: Roadmap entity types — don't mix
- Business roadmaps can show: Initiatives OR Capabilities OR Outcomes
- **Do not mix** entity types on the same roadmap
- Outcome-based roadmaps are most effective with business stakeholders

### ⚠️ Trap 11: Solution Context vs Solution Concept
- **Solution Context** = organisational relationships (who uses what)
- **Solution Concept** = technical building blocks at high level (pencil sketch)
- Both are Phase A artifacts but serve different purposes

### ⚠️ Trap 12: Opponents vs Resisters
- Both have negative attitude
- **Opponents** = High influence → **Satisfy** (highest priority)
- **Resisters** = Low influence → **Monitor and respond**
- Don't swap the actions

### ⚠️ Trap 13: SAP term changes from TOGAF
- TOGAF "Driver" → SAP EA **"Strategic Priority"**
- TOGAF "Objective" → SAP EA **"Value Driver"**

---

## Domain 3 Traps

### ⚠️ Trap 14: Capability vs Process
- **Capability** = WHAT the business does (stable, rarely changes)
- **Process** = HOW the business does it (continually improved)
- Capabilities are independent of technology. Processes are not.

### ⚠️ Trap 15: Business owns capabilities
- Business people name and own the capabilities
- Naming must resonate with business language, not IT jargon

### ⚠️ Trap 16: MECE — both conditions required
- **Mutually Exclusive** AND **Collectively Exhaustive**
- Both conditions must be true simultaneously
- Not just one or the other

### ⚠️ Trap 17: Business Footprint Diagram is cross-domain
- It is NOT just a business architecture diagram
- It links strategy → capabilities → solution components → technology
- It crosses ALL architecture domains

### ⚠️ Trap 18: Level 3 Business Process Segment naming
- Named the same as the corresponding Business Area in the BCM
- This creates synergy between models
- They are **different objects** that happen to share the same name

### ⚠️ Trap 19: Organisation Map ≠ Org Chart
- Org Map = network of working relationships
- Org Chart = hierarchical reporting structure
- EA uses Org Maps, not Org Charts

### ⚠️ Trap 20: Business Activity Repository
- ALL Level 4 Business Activities are stored in ONE central repository
- Names can change to reflect industry/use case but the inherent meaning cannot

---

## Domain 4 Traps

### ⚠️ Trap 21: Solution Component vs Solution Process Flow
- **Solution Component Diagram** = STRUCTURE (static view of systems and connections)
- **Solution Process Flow Diagram** = BEHAVIOUR (dynamic, step-by-step flow)
- Most commonly confused pair in this domain

### ⚠️ Trap 22: Private Cloud ≠ On-Premise
- Private Cloud is still a cloud deployment
- It is single-tenant, can be managed by org or third party
- On-Premise = physically on the organisation's own premises

### ⚠️ Trap 23: SaaS customer control
- In SaaS: customer controls ONLY user-specific configuration
- No control over releases, underlying infrastructure, or platform
- IaaS gives the MOST customer control

### ⚠️ Trap 24: Clean Core extension location
- **Key User Extensibility** = runs ON S/4HANA (in-app, no code)
- **Developer Extensibility** = runs ON S/4HANA (ABAP, stable APIs, no modification)
- **Side-by-Side** = runs ON BTP (separate system, connected via APIs)

### ⚠️ Trap 25: Software Distribution Diagram phase
- Belongs to **Phase C** (Application Architecture)
- Provides INPUT to the **Environments & Location Diagram** (Phase D)
- They are different diagrams at different levels of detail

### ⚠️ Trap 26: ISA-M has 4 domains
- Process Integration
- Data Integration
- Analytics Integration
- IoT Integration
- All four are individually testable

---

## Case Study (Wanderlust) Traps

### ⚠️ Trap 27: Not reading the case study before exam day
- 18/40 questions = 45% of the exam
- The case study is published in advance
- Read it BEFORE exam day so you're not learning the context under time pressure

### ⚠️ Trap 28: Applying the wrong artifact to a scenario
- Always ask: what phase are we in, and what does the stakeholder need to understand?
- Artifacts are chosen for stakeholder communication purposes, not theoretical completeness

### ⚠️ Trap 29: Confusing Transition Architecture with Target Architecture
- **Target Architecture** = final desired state
- **Transition Architecture** = formally defined intermediate state on the journey to the target
- Multiple Transition Architectures may exist between Baseline and Target

---

## General Exam Traps

### ⚠️ Trap 30: Answering too quickly on "best" answer questions
- SAP exam questions often look for the MOST appropriate answer, not the only correct one
- Read all options before selecting
- Context matters — an answer that's right in one scenario may be wrong in another

### ⚠️ Trap 31: Forgetting Requirements Management is cross-cutting
- Requirements Management runs through ALL ADM phases
- It is NOT confined to the Preliminary Phase or Phase A
- Same for Governance (Risk, Decisions, Principles)
