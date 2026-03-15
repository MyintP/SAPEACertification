# SAP EA Artifact Map — Complete Reference by Domain

> Every artifact, every domain. Select for stakeholders — not for architectural completeness.

---

## Architecture Vision

| Artifact | Purpose | Key Rule |
|----------|---------|----------|
| **Stakeholder Map** | Classify stakeholders by influence and attitude | Promoters (High/+), Enthusiasts (Low/+), Opponents (High/-), Resisters (Low/-) |
| **Statement of Architecture Work** | The contract authorising all subsequent phases | Signed end of Phase A. Phase B cannot begin without it. |
| **Solution Context Diagram** | Organisational relationships and external context | 10-minute test — can a senior stakeholder understand it in 10 mins? |
| **Solution Concept Diagram** | Technical "pencil sketch" | Building blocks + integration points. High-level, not detailed. |

---

## Strategy & Motivation

| Artifact | Purpose | Key Rule |
|----------|---------|----------|
| **Business Context Diagram** | External actors, flows, structural dependencies | NOT a process model. Shows actors and relationships, not process steps. |
| **Business Strategy Map** | Strategic Priority → Goals → Value Drivers → Capabilities → Initiatives | SAP terminology: Strategic Priority (not Driver), Value Driver (not Objective) |
| **Business Model Canvas & Patterns** | 9-block business model structure | Current version: Sustainable Business Model Canvas. 9 blocks in sequence. |

**Business Model Canvas — 9 Blocks in Order:**
Value Proposition → Customer Segments → Channels → Customer Relationships → Revenue Streams → Key Resources → Key Activities → Key Partners → Cost Structure

---

## Business Architecture

| Artifact | Purpose | Key Rule |
|----------|---------|----------|
| **Business Capability Map** | 3-level hierarchy of capabilities | MECE. Domain → Area → Capability. Business language only — no SAP products. |
| **Business Process Catalog** | Catalog of all business processes | Structured list — not a flow diagram |
| **Business Value Flow Diagram** | Value-adding activities for a business goal | No loops, no decision points, no alternative flows. Easy for stakeholders to consume. |
| **Organization Map** | Network of working relationships | NOT an org chart. Shows relationships, not hierarchy. |
| **Business Data Catalog** | Business information objects and relationships | Business language only |
| **Business Role Catalog** | All business roles impacted | Internal and external roles. Product-agnostic. |
| **Business Footprint Diagram** | Cross-domain X-ray | Strategy → Capabilities → Solution Components → Technology. Shows end-to-end alignment. |

---

## Solution Architecture

| Artifact | Type | Key Characteristic |
|----------|------|-------------------|
| **Product Map** | Reference | Bill of materials — recommended SAP products per domain/area |
| **Solution Component Diagram** | **STRUCTURAL** | Main components, structural groupings, Communication Channels between Deployment Units. Static view. |
| **Solution Value Flow Diagram** | Abstract | Business activities mapped to Solution Components and Capabilities implementing them |
| **Solution Process Flow Diagram** | **BEHAVIOURAL** | BPMN 2.0. Pools = Deployment Units. Lanes = Application Roles. Message flows = integration. Dynamic view. |
| **Solution Data Flow Diagram** | Data | Flow of data objects between Solution Components. System of Records to downstream. |
| **Software Distribution Diagram** | Phase C→D bridge | Feeds Technology Architecture. Shows software deployment across systems. |
| **Application Architecture Overview Diagram** | Landscape | Full landscape view across all domains |
| **Conceptional Data Diagram** | Data | High-level data model — key data objects and relationships |

> ⚠️ **Most tested distinction:** Solution Component Diagram = STRUCTURE (static). Solution Process Flow Diagram = BEHAVIOUR (dynamic). Never swap these.

---

## Technology Architecture

| Artifact | Purpose | Key Rule |
|----------|---------|----------|
| **Environments & Location Diagram** | Physical deployment | Evolves from Software Distribution Diagram. Adds data centre locations, VPN, network connectivity. Only artifact in this domain. |

---

## Roadmap & Transition

| Artifact | Purpose | Key Rule |
|----------|---------|----------|
| **Architecture Roadmap** | 3-5 year transformation plan | Fiscal years. ONE entity type only — never mix outcomes, capabilities, and initiatives. |
| **Work Breakdown Structure** | Deliverable-oriented breakdown | Basis for effort and cost estimation. |

---

## Requirements & Governance ← Cross-cutting, ALL phases

| Artifact | Purpose |
|----------|---------|
| **Requirements Catalog** | All requirements captured across the engagement |
| **Architecture Principles Catalog** | 10-20 principles. Name + Statement + Rationale + Implications. |
| **Risk Catalog** | Tracks risks across all domains |
| **Architectural Decision Catalog** | Captures significant decisions as ADRs |

> ⚠️ Requirements & Governance is NOT Phase A. It runs across ALL phases. Requirements can emerge in any domain.

---

## Artifact Selection Rules

1. **For stakeholders** — not for architectural completeness
2. **Nature of the project** determines which artifacts are needed
3. **Metro Map is a menu** — you choose from it, you don't order everything
4. **Iterations** — you may revisit and update artifacts as the engagement progresses

---

## Enterprise Transformation Assessment — Three Activities

This appears as a single stop on the Metro Map but represents three distinct assessments:

1. **EA Practice Capability Assessment** — spider web diagram across 8 dimensions
2. **Preliminary Business and Technology Capability Assessment** — heat map
3. **Business and Technology Transformation Readiness Assessment**

All three are testable individually.

---

## Quick Trap Reference

| Trap | Wrong | Correct |
|------|-------|---------|
| Business Context Diagram | Is a process model | Shows actors and relationships — NOT process steps |
| Organization Map | Is an org chart | Network of working relationships |
| Business Value Flow | Shows decision points and loops | Deliberately omits these — easy stakeholder consumption |
| Solution Component Diagram | Shows behaviour | Shows STRUCTURE only |
| Solution Process Flow | Shows structure | Shows BEHAVIOUR (BPMN 2.0) |
| Technology Architecture artifacts | Multiple artifacts | Only ONE — Environments & Location Diagram |
| Requirements & Governance | Phase A only | ALL phases — cross-cutting |
