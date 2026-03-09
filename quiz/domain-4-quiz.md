# Quiz — Domain 4: Data, Application & Technology Architecture

> 15 practice questions. Answers at the bottom.

---

## Questions

**Q1.** An architect needs to show how solution components communicate with each other statically — what systems exist, what they connect to, and through which channels. Which diagram should they use?

A) Solution Process Flow Diagram  
B) Solution Value Flow Diagram  
C) Solution Component Diagram  
D) Application Architecture Overview  

---

**Q2.** A company runs SAP S/4HANA on their own hardware in their own data centre, with no cloud involvement. What deployment type is this?

A) Private Cloud  
B) Public Cloud  
C) On-Premise  
D) Hybrid Cloud  

---

**Q3.** In a SaaS deployment, what does the customer control?

A) The operating system and storage  
B) The deployed applications and middleware  
C) Only user-specific configuration  
D) The physical hardware layer  

---

**Q4.** A business user needs to extend SAP S/4HANA functionality without writing any code and without affecting the standard SAP delivery. Which Clean Core extension type should they use?

A) Developer Extensibility  
B) Side-by-Side Extension  
C) Key User Extensibility  
D) ABAP Custom Code  

---

**Q5.** A company wants to build a complex mobile application that integrates with S/4HANA but runs completely separately to avoid any impact on the core system. Which extension approach is recommended?

A) Key User Extensibility — low risk, in-app  
B) Developer Extensibility — ABAP on S/4HANA  
C) Side-by-Side Extension on SAP BTP  
D) Core modification with SAP support approval  

---

**Q6.** The Software Distribution Diagram belongs to which ADM phase?

A) Phase B — Business Architecture  
B) Phase C — Application & Data Architecture  
C) Phase D — Technology Architecture  
D) Phase E — Opportunities & Solutions  

---

**Q7.** Which diagram in Technology Architecture evolves from the Software Distribution Diagram by adding physical data centre locations and network connectivity?

A) Network and Communications Diagram  
B) Application Architecture Overview  
C) Environments and Location Diagram  
D) Solution Component Diagram  

---

**Q8.** A company operates SAP infrastructure in a cloud environment that is used exclusively by them, managed by a third-party provider, and accessed via VPN. What deployment type is this?

A) On-Premise  
B) Public Cloud  
C) Private Cloud  
D) Community Cloud  

---

**Q9.** Which of the four ISA-M integration domains covers the connection between operational systems and reporting/analytics platforms?

A) Process Integration  
B) Data Integration  
C) Analytics Integration  
D) IoT Integration  

---

**Q10.** A company is migrating from SAP ECC to S/4HANA. They want maximum standardisation and are willing to re-configure everything from scratch, discarding all legacy customisations. Which transformation strategy is appropriate?

A) Brownfield  
B) Selective Data Transition  
C) Greenfield  
D) Lift and Shift  

---

**Q11.** Which SAP product serves as the canonical data model defining the structure of Solution Data Objects?

A) SAP Master Data Governance (MDG)  
B) SAP One Domain Model (ODM)  
C) SAP Data Intelligence  
D) SAP HANA Cloud  

---

**Q12.** In the Solution Component Diagram, what is a "Communication Channel"?

A) A business process that flows between two organisational units  
B) A data transfer mechanism between two Deployment Units  
C) An API endpoint published on SAP Business Accelerator Hub  
D) A network connection described in the Environments & Location Diagram  

---

**Q13.** An architect is producing the Conceptual Data Diagram. After defining entities, what is the NEXT step?

A) Define relationships between entities  
B) Define attributes of each entity  
C) Map entities to solution components  
D) Create the Solution Data Flow Diagram  

---

**Q14.** In an IaaS deployment, what does the customer control that they do NOT control in PaaS?

A) Deployed applications  
B) Platform middleware  
C) The operating system  
D) User-specific configuration  

---

**Q15.** Which of the following BEST describes the purpose of the Product Map in Application Architecture?

A) A BPMN diagram showing step-by-step product delivery processes  
B) A bill of materials showing recommended SAP products per Business Domain or Area  
C) A landscape diagram showing all currently deployed SAP products  
D) A roadmap showing planned SAP product upgrades over time  

---

## Answers

| Q | Answer | Explanation |
|---|--------|-------------|
| 1 | **C** | Solution Component Diagram = static STRUCTURE view of systems and connections |
| 2 | **C** | Own hardware, own data centre = On-Premise |
| 3 | **C** | SaaS customer controls ONLY user-specific configuration |
| 4 | **C** | Key User Extensibility = no code, in-app, on S/4HANA, no impact to standard delivery |
| 5 | **C** | Complex separate app = Side-by-Side Extension on SAP BTP |
| 6 | **B** | Software Distribution Diagram = Phase C (Application Architecture) |
| 7 | **C** | Environments & Location Diagram evolves from Software Distribution Diagram in Phase D |
| 8 | **C** | Exclusive use + third-party managed + VPN access = Private Cloud |
| 9 | **C** | Analytics Integration = connecting operational data to analytics/reporting |
| 10 | **C** | Max standardisation, fresh start = Greenfield |
| 11 | **B** | SAP One Domain Model (ODM) at https://api.sap.com/sap-one-domain-model |
| 12 | **B** | Communication Channel = data transfer between two Deployment Units |
| 13 | **B** | Conceptual Data Diagram steps: Entities → **Attributes** → Relationships |
| 14 | **C** | IaaS = customer controls OS (plus storage + apps). PaaS = OS managed by provider. |
| 15 | **B** | Product Map = bill of materials for recommended SAP products per domain/area |

---

**Score:** 13–15 = Exam ready | 10–12 = Review flagged areas | Below 10 = Re-read Domain 4
