# Wanderlust Case Study — Exam Preparation Guide

> ⚠️ **Format note (2026):** the "18/40 questions" figure below describes the older multiple-choice version of the P_SAPEA exam. The current exam is a **Scenario-Based Assessment** (AI-guided roleplay or video review) — see `docs/exam-overview.md`. It is unconfirmed whether the live assessment still references Wanderlust by name. Treat this file as **reasoning practice using SAP's classic case-study material**, not a guaranteed preview of your actual exam content. The skill it builds — reading a messy scenario and reasoning through it end-to-end — is exactly what the new scenario format tests, so it is still worth doing.

---

## What is Wanderlust?

Wanderlust GmbH is SAP's real, publicly-published reference case study for the SAP EA Certification exam — a German-headquartered manufacturer of conventional fuel-driven cars, with manufacturing facilities and sales globally, expanding into electric vehicles via a "Smart Battery" initiative. It is published on the SAP learning portal and is publicly available to read before sitting the exam. See the [Wanderlust Case Hub](index.html#sheet-wanderlust) in this workspace for a structured summary.

**This is not a trick — SAP wants you to read it in advance.** Case-study material like this tests whether you can apply the SAP EA Framework to a real-world scenario, not just recall facts — which is exactly the skill the current scenario-based exam evaluates.

---

## How to Prepare

### Step 1: Read the case study completely (do this BEFORE exam day)
Access it at: https://learning.sap.com/enterprise-architect

Read it like an architect would:
- What is Wanderlust's business strategy?
- What are their strategic priorities and value drivers?
- What business capabilities do they need?
- What does their current IT landscape look like?
- What are the key pain points?
- Who are the key stakeholders?

### Step 2: Map the case study to the SAP EA Framework

As you read, annotate with domain labels:
- Identify elements that relate to Domain 1 (Framework decisions)
- Identify stakeholders and vision elements (Domain 2)
- Identify capability and process descriptions (Domain 3)
- Identify technology and application references (Domain 4)

### Step 3: Practice applying artifacts to the scenario

For each major artifact, ask: "How would this apply to Wanderlust?"

---

## Key Questions to Answer While Reading

### Business Context
- [ ] What industry does Wanderlust operate in?
- [ ] What are their primary revenue streams?
- [ ] Who are their key customer segments?
- [ ] What are their main business domains?
- [ ] Who are the key stakeholders (and their quadrant in the Stakeholder Map)?

### Strategic Direction
- [ ] What are Wanderlust's stated strategic priorities?
- [ ] What business capabilities need to be improved or created?
- [ ] What is the target business model vs current state?
- [ ] What are the main transformation goals?

### Current State (Baseline)
- [ ] What does their current IT landscape look like?
- [ ] What are the main pain points in their current processes?
- [ ] What legacy systems are they dealing with?
- [ ] What are the key integration challenges?

### Target State
- [ ] What SAP solutions are relevant to their transformation?
- [ ] What deployment model is appropriate (cloud/on-premise/hybrid)?
- [ ] What Clean Core extensions would be needed?
- [ ] What integration patterns would apply?

---

## Case Study Question Patterns

Classic case-study questions typically follow these patterns:

### Pattern 1: Artifact Selection
> "Given the Wanderlust scenario, which artifact would BEST communicate X to stakeholder Y?"

**How to answer:** Think about: what is the stakeholder's role? What do they need to understand? Which artifact serves that purpose?

### Pattern 2: Artifact Application
> "Based on the Wanderlust case study, which quadrant of the Stakeholder Map would the CFO fall into?"

**How to answer:** Apply the framework definition to the specific characters described in the case study.

### Pattern 3: Approach Selection
> "The Wanderlust architecture team is starting Business Architecture. Given their situation, which approach is most appropriate?"

**How to answer:** Use the context clues — are they capability-focused or process-focused? Is the driver business or technology?

### Pattern 4: Gap Analysis
> "Wanderlust has capability X but lacks capability Y. What does this represent and what should happen next?"

**How to answer:** Know the gap analysis → roadmap pathway. Gaps become roadmap items.

### Pattern 5: Tool Selection
> "Which SAP tool should Wanderlust use to analyse the performance of their Lead-to-Cash processes?"

**How to answer:** Know your tools. Signavio = processes. LeanIX = architecture. Cloud ALM = execution.

---

## Common Wanderlust Scenario Themes

Wanderlust GmbH is a German automotive manufacturer expanding into electric vehicles — expect questions around:

- **Customer Experience** capabilities (Customer domain in BCM) — direct-to-consumer EV sales is new territory for a company that has always sold through dealers.
- **Product & Services** capabilities — the "Smart Battery" initiative: value proposition, cost structure, revenue streams, partners and channels.
- **Landscape complexity** — three separate SAP ECC instances, one per continent, evolved independently.
- **Digital channels** (Lead-to-Cash: marketing analytics, lead management, campaign management) — the legacy marketing application the CIO wants replaced.
- **EA maturity** — the practice is "nascent," which makes stakeholder mapping the priority over any tooling or technical decision.
- **Cloud migration** — the transition from ECC to S/4HANA Cloud and SAP BTP, and which Clean Core extension type fits which requirement.
- **Integration** (connecting the continental ECC instances, and eventually the S/4HANA Cloud target, via Signavio for process mapping and LeanIX for the application portfolio).

---

## Day-Before Checklist

- [ ] Re-read the Wanderlust case study
- [ ] Review your stakeholder annotations — who is a Promoter vs Opponent?
- [ ] Review the capability gaps you identified
- [ ] Note which SAP tools and deployment models fit the scenario
- [ ] Review your artifact-to-phase cheatsheet
- [ ] Review the exam traps file

---

## Important Reminder

> The Wanderlust case study is **publicly available in advance**.  
> There is no reason to walk into the exam seeing it for the first time.  
> Read it at least twice — once to understand the business, once as an architect.
