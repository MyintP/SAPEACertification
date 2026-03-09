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

## Exam Traps — Domain 4

1. **Component vs Process Flow diagrams** — Structure vs Behaviour. Most commonly confused pair.
2. **SaaS customer control** — customers have almost NO control (only user-specific config). IaaS has the MOST customer control.
3. **Private Cloud ≠ On-Premise** — Private Cloud is still a cloud deployment. Owned by org or third party, but not physically on-premise by definition.
4. **Clean Core extension types** — three types, know which runs where (on S/4HANA vs on BTP).
5. **Side-by-Side = BTP** — always. This is the recommended SAP pattern for new extensions.
6. **Software Distribution → Environments & Location** — the first feeds the second. SD = Phase C. E&L = Phase D.
7. **ISA-M has four domains** — Process, Data, Analytics, IoT. All four testable.
8. **S/4HANA migration strategies** — Greenfield, Brownfield, Selective. Know when to recommend each.

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
