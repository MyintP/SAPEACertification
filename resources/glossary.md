# Glossary — SAP EA Key Terms Decoded

> For someone coming from an IT (non-SAP) background.

---

## A

**ADM (Architecture Development Method)**  
TOGAF's process engine. The cycle of phases from Preliminary through to Architecture Change Management. Iterative — not waterfall.

**ADR (Architecture Decision Record)**  
A document recording a significant architecture decision, the context in which it was made, and its consequences. Must be created BEFORE decisions are made by leaders.

**Architecture Principle**  
A fundamental rule or guideline that constrains how the architecture must be designed. Has 4 components: Name, Statement, Rationale, Implications. Max 10–20.

**Architecture Vision**  
Phase A of the ADM. Produces the high-level vision of what the architecture will deliver and the Statement of Architecture Work.

**Artifact**  
A deliverable produced during an architecture engagement. Could be a diagram, document, catalog, or matrix.

---

## B

**Baseline Architecture**  
The "as-is" — the current state of the enterprise's architecture.

**BCM (Business Capability Model)**  
A hierarchical model of all business capabilities an organisation needs to succeed. Three levels: Domain → Area → Capability.

**BPM (Business Process Model)**  
A structured model of how the business operates. Four levels: E2E Process → Module → Segment → Activity. Based on APQC PCF.

**BTP (Business Technology Platform)**  
SAP's PaaS layer. Runs side-by-side extensions, integrations, and cloud-native applications.

**Business Activity**  
Level 4 of the Business Process Model. The lowest-level value-creating step. All activities stored in ONE central repository.

**Business Architecture**  
Domain covering capabilities, processes, data, and organisational structure. Prerequisites all other architecture domains.

**Business Capability**  
What an organisation needs to be able to do to generate value. Independent of technology. Example: "Customer Order Management."

**Business Context Diagram**  
High-level diagram of how the business interacts with its external environment. Shows actors, flows, and dependencies.

**Business Data Catalog**  
Summary of all business-relevant information objects for a specific business purpose.

**Business Footprint Diagram**  
Cross-domain "X-ray" linking strategic objectives → capabilities → solution components → technology. Most powerful stakeholder communication artifact.

**Business Model Canvas (BMC)**  
One-page representation of how an organisation creates, delivers, and captures value. Nine building blocks.

**Business Process Module**  
Level 2 of the BPM. Named `<A to B>`. Covers execution from one point to another.

**Business Process Segment**  
Level 3 of the BPM. Named same as corresponding Business Area in BCM.

**Business Strategy Map**  
Artifact capturing Strategic Priorities → Goals → Value Drivers → Capabilities → Initiatives.

**Business Value Flow Diagram**  
Value-adding business activities that together fulfil a defined business goal.

---

## C

**Capability-Centric Approach**  
Building Business Architecture starting from Business Capabilities (WHAT the business does). Opposite of Process-Centric.

**Clean Core**  
SAP principle: keep S/4HANA standard and unmodified. Extensions go through Key User, Developer, or Side-by-Side patterns.

**Clusters (Roadmap)**  
Groups of related initiatives on a roadmap. Can be by LoB, E2E process, initiative type, or SAP product.

**Communication Channel**  
The data transfer mechanism between two Deployment Units in the Solution Component Diagram.

**Conceptual Data Diagram**  
Entity-Relationship style diagram describing data entities, attributes, and relationships.

---

## D

**Deployment Unit**  
The smallest solution component that can be deployed and operated independently.

**E2E Business Process**  
Level 1 of the Business Process Model. Covers a full PDCA cycle.

---

## E

**Environments and Location Diagram**  
Technology Architecture artifact showing where solution components are physically deployed. Evolves from Software Distribution Diagram.

**EA Practice**  
The organisational implementation of Enterprise Architecture. One of the five SAP EA Framework building blocks.

**EA Repository**  
Central storage for all EA artifacts. In SAP context, SAP LeanIX serves this role.

---

## F

**Federated EA**  
Organisational model where each business unit has an EA role, and all EAs form a virtual team.

---

## G

**Gap Analysis**  
The process of comparing Baseline Architecture to Target Architecture to identify what is missing or needs improvement.

**Greenfield**  
S/4HANA transformation strategy: new implementation from scratch. Maximum standardisation.

---

## H

**Heat Map**  
Visual technique applying colour coding to business capabilities (or technology) to show maturity, strategic importance, pain points, etc.

---

## I

**IaaS (Infrastructure as a Service)**  
Cloud model where the provider manages physical hardware only. Customer controls OS, storage, deployed applications.

**ISA-M (Integration Solution Advisory Methodology)**  
SAP's methodology for defining integration architecture. Four domains: Process, Data, Analytics, IoT Integration.

---

## L

**LeanIX**  
SAP's Enterprise Architecture Management tool (acquired by SAP). Used for application portfolio, roadmaps, and architecture lifecycle management.

---

## M

**MECE**  
Mutually Exclusive, Collectively Exhaustive. The structuring principle for Business Capability Models. No overlap, no gaps.

**Metro Map**  
SAP EA's visual representation of the full methodology. Three variants: Business-Centric, IT-Centric, Holistic.

---

## O

**ODM (One Domain Model)**  
SAP's canonical data model. Defines the structure of Solution Data Objects. Accessed at https://api.sap.com/sap-one-domain-model

---

## P

**PaaS (Platform as a Service)**  
Cloud model where provider manages infrastructure and platform. Customer controls deployed applications.

**Preliminary Phase**  
The setup phase. Tailors the ADM for the specific engagement. Three tailoring types: Terminology, Content, Process.

**Private Cloud**  
Cloud infrastructure for exclusive use of one organisation (single-tenant). Accessed via VPN.

**Process-Centric Approach**  
Building Business Architecture starting from Business Processes (HOW the business does things). Opposite of Capability-Centric.

**Product Map**  
Visualises recommended SAP products/solution components per Business Domain or Area. Acts as Bill of Materials.

**Public Cloud**  
Cloud infrastructure for open use by the general public (multi-tenant). Managed by provider.

---

## R

**RBA (Reference Business Architecture)**  
Pre-built SAP content defining complete business scope. Solution-agnostic. APQC-based.

**Residual Risk**  
The risk that remains after mitigation actions have been applied.

**RSA (Reference Solution Architecture)**  
Pre-built SAP content mapping business scope to SAP solutions. Available at High-Level and Detailed levels.

---

## S

**SaaS (Software as a Service)**  
Cloud model where provider manages everything including the application. Customer controls only user-specific configuration.

**SAP EAF (SAP Enterprise Architecture Framework)**  
SAP's tailored EA framework. Built on TOGAF. Officially launched 2007. Five building blocks: Methodology, Reference Content, Tooling, Practice, Services.

**Signavio**  
SAP's Business Process Management tool. Used for process analysis, process mining, conformance checking.

**Solution Capability**  
Functional ability of one or more solution components to implement and support a Business Capability.

**Solution Component**  
Modular software unit that comes together with others to form a complete solution.

**Solution Component Diagram**  
Blueprint of required solution components and their communication channels. Structure view.

**Solution Concept Diagram**  
High-level "pencil sketch" of the proposed solution. Informal. Shows building blocks + integration points.

**Solution Context Diagram**  
Shows proposed solution vs. organisational units and business functions. 10-minute test applies.

**Solution Data Flow Diagram**  
Shows data flows between solution components. Uses Solution Data Objects.

**Solution Process Flow Diagram**  
Detailed BPMN 2.0 diagram showing step-by-step process flows through solution components. Behaviour view.

**Solution Value Flow Diagram**  
High-level view showing value-adding business activities mapped to solution components.

**Software Distribution Diagram**  
Shows how solution components are distributed across On-Prem/Private/Public Cloud. Phase C artifact that feeds Phase D.

**Stakeholder Map**  
Influence × Attitude matrix identifying four quadrant types: Promoters, Enthusiasts, Opponents, Resisters.

**Statement of Architecture Work**  
The formal contract defining scope, roles, responsibilities, and acceptance criteria for an architecture engagement. Must be signed before Phase B.

---

## T

**Target Architecture**  
The "to-be" — the desired future state of the enterprise's architecture.

**TIME Model**  
Application Portfolio Assessment framework: Tolerate, Invest, Migrate, Eliminate. Based on Technical Fit × Functional Fit.

**TOGAF**  
The Open Group Architecture Framework. Global EA standard. SAP EA is built on TOGAF v10.

**Transition Architecture**  
A formally defined state of the architecture at a significant point in time during the journey from Baseline to Target.

---

## W

**Wanderlust**  
The SAP EA certification case study. 18/40 exam questions are based on it. Read before exam day.

**WBS (Work Breakdown Structure)**  
Deliverable-oriented breakdown of a project into manageable sections. Basis for effort and cost estimation.
