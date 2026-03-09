# Quiz — Domain 3: Business Architecture

> 15 practice questions. Answers at the bottom.

---

## Questions

**Q1.** Which statement BEST distinguishes a Business Capability from a Business Process?

A) Business Capabilities describe HOW the business operates; Business Processes describe WHAT it must do  
B) Business Capabilities describe WHAT the business must be able to do; Business Processes describe HOW it does it  
C) Business Capabilities are owned by IT; Business Processes are owned by the business  
D) Business Capabilities change frequently; Business Processes are stable  

---

**Q2.** A company's Business Capability Map includes "Sales," "Marketing," and "Customer Service" all as Level 1 items under the same domain. An architect notices that "Customer Service" partially overlaps with "Sales" in terms of the capabilities it contains. Which principle has been violated?

A) APQC PCF compliance  
B) MECE — Mutually Exclusive condition  
C) MECE — Collectively Exhaustive condition  
D) Business Footprint alignment  

---

**Q3.** Which of the following is the CORRECT naming convention for a Level 2 Business Process Module?

A) "Manage Customer Relationships"  
B) "Customer to Cash"  
C) "Sales Process Segment"  
D) "Plan to Optimise Sales"  

---

**Q4.** A Business Architect is conducting a heat mapping exercise. Which party should PRIMARILY own and name the business capabilities?

A) The enterprise architect  
B) The IT department  
C) The business stakeholders  
D) The SAP implementation partner  

---

**Q5.** The Business Footprint Diagram is described as a "cross-domain X-ray." What makes it unique compared to other Business Architecture artifacts?

A) It is the only artifact that uses colour coding  
B) It links strategic objectives, capabilities, solution components, and technology in a single view  
C) It is the only mandatory artifact in Phase B  
D) It replaces both the Capability Map and the Process Model  

---

**Q6.** Which approach to Business Architecture should be used when the architecture engagement is driven by a new SAP S/4HANA implementation covering multiple business functions?

A) Experience-Based  
B) Process-Centric  
C) Capability-Centric  
D) Technology-Centric  

---

**Q7.** A Level 3 Business Process Segment for "Customer Management" shares its name with a Business Area in the Business Capability Map. An architect questions whether this is an error. What is the correct response?

A) It is an error — they must have different names to avoid confusion  
B) It is intentional — the shared naming creates synergy between capability and process models  
C) It is acceptable practice but not recommended by SAP  
D) The process segment should be renamed to reflect the solution, not the business  

---

**Q8.** Which SAP tool provides access to the Reference Business Architecture process content?

A) SAP LeanIX  
B) SAP Cloud ALM  
C) SAP Signavio Process Explorer  
D) SAP Business Application Studio  

---

**Q9.** In the Business Process Model, at which level are all entries stored in ONE central repository?

A) Level 1 — E2E Business Process  
B) Level 2 — Business Process Module  
C) Level 3 — Business Process Segment  
D) Level 4 — Business Activity  

---

**Q10.** An architect produces an Organisation Map showing the reporting lines between the CEO, regional directors, and department heads. A colleague says this is not an Organisation Map in the SAP EA sense. Why?

A) Organisation Maps should only show external stakeholders  
B) Organisation Maps show networks of working relationships, not hierarchical reporting lines  
C) Organisation Maps are not produced until Phase C  
D) Organisation Maps should be based on the Business Capability structure  

---

**Q11.** Which of the following is the PRIMARY purpose of the Business Data Catalog?

A) To document the database schema of the target SAP system  
B) To summarise business-relevant information objects and their relationships  
C) To define data migration requirements from legacy systems  
D) To map solution data objects to infrastructure storage locations  

---

**Q12.** What does the APQC PCF provide in the context of SAP Business Architecture?

A) A technology reference model for SAP infrastructure  
B) A process classification framework used as the basis for the Business Process Model  
C) A capability maturity assessment framework  
D) A set of SAP-specific integration patterns  

---

**Q13.** Which of the following BEST describes the bottom-up approach to Business Capability Assessment?

A) Start from strategic goals and link them to capabilities via the Strategy Map  
B) Start from the current state and use heat mapping to identify gaps and priorities  
C) Start from the SAP Reference Business Architecture and map to current capabilities  
D) Start from identified IT investments and trace them back to business capabilities  

---

**Q14.** In which domain of the four Enterprise Domains would "Financial Planning and Analysis" most likely be classified?

A) Product & Services  
B) Customer  
C) Supply  
D) Corporate  

---

**Q15.** A Business Architect is mapping business capabilities to solution capabilities. They find that a Business Capability has no corresponding Solution Capability in the target architecture. What does this represent?

A) A requirement to customise the SAP solution  
B) A gap — this capability must be addressed in the roadmap  
C) A capability that should be eliminated from the Business Capability Map  
D) A non-functional requirement to be added to the Requirements Catalog  

---

## Answers

| Q | Answer | Explanation |
|---|--------|-------------|
| 1 | **B** | Capabilities = WHAT (stable). Processes = HOW (continually improved). |
| 2 | **B** | Overlap between capabilities = violation of Mutually Exclusive (the first M in MECE) |
| 3 | **B** | Level 2 format = `<A to B>` e.g. "Customer to Cash". Level 1 = "Plan to Optimise…". |
| 4 | **C** | Business stakeholders own and name capabilities. Naming must resonate with business. |
| 5 | **B** | Business Footprint = only artifact that links strategy → capabilities → solutions → technology |
| 6 | **C** | New implementation across multiple functions = Capability-Centric approach |
| 7 | **B** | Intentional. Shared naming = synergy between models. Different objects, same name. |
| 8 | **C** | SAP Signavio Process Explorer provides RBA content access |
| 9 | **D** | Level 4 Business Activities are stored in ONE central Business Activity Repository |
| 10 | **B** | EA Organisation Map = network of working relationships, NOT a hierarchy/org chart |
| 11 | **B** | Business Data Catalog = business-relevant information objects and their relationships |
| 12 | **B** | APQC PCF v7.2.1 is the basis for the SAP Business Process Model |
| 13 | **B** | Bottom-Up = start from current state, heat map, identify gaps. Top-Down = start from strategy. |
| 14 | **D** | Financial Planning = Corporate domain (finance, HR, legal, IT, risk) |
| 15 | **B** | Missing Solution Capability = a gap. Must be addressed in the architecture roadmap. |

---

**Score:** 13–15 = Exam ready | 10–12 = Review flagged areas | Below 10 = Re-read Domain 3
