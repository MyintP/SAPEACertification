# Assessment: Discovering SAP Enterprise Architecture
## 30 Questions — Answers & Explanations

> **Score target:** 80%+ (same standard as the certification exam)
> **Format:** Single correct answer (✦) and multiple correct answers (✦✦)

---

### Q1 ✦
**How does the SAP Reference Business Architecture support the connection between business needs and IT solutions?**

- [ ] By defining program languages used in SAP development
- [x] **By mapping business capabilities to solution capabilities and components**
- [ ] By standardizing payroll processes across all industries
- [ ] By limiting customization in business capability models

**Why correct:** The RBA is product-agnostic on the business side — it describes what the business needs to do. The RSA then maps those business capabilities to SAP solution capabilities and components. That bridge is the core value of reference architecture content.

**Why others are wrong:** Programming languages are out of scope. Payroll standardisation is too narrow — the RBA covers all industries. Limiting customisation contradicts the framework's purpose; the RBA is a starting point, not a constraint.

---

### Q2 ✦
**What is the core purpose of the SAP Reference Solution Architecture?**

- [ ] To provide high-level business goals without linking to technical execution
- [x] **To provide pre-tested, implementable solution designs that map business processes to SAP components**
- [ ] To replace the SAP Business Capability Model with a custom framework
- [ ] To define employee onboarding procedures for SAP consultants

**Why correct:** The RSA describes application, data, and technology aspects of SAP solutions mapped to business architecture assets. The Detailed RSA is explicitly tested and validated for implementation.

**Why others are wrong:** No link to technical execution is the opposite of what the RSA does. The RSA complements the BCM — it never replaces it. Onboarding procedures are entirely out of scope.

---

### Q3 ✦
**What is one of the key roles of Enterprise Architecture in supporting successful transformation initiatives?**

- [ ] Enforcing strict project timelines for all departments
- [x] **Promoting business-outcome-focused planning and reusable decision frameworks**
- [ ] Developing marketing strategies for technology products
- [ ] Centralizing all decision-making under the IT department

**Why correct:** EA exists to align business and IT, create common language, and enable consistent decision-making through principles and ADRs — all focused on business outcomes.

**Why others are wrong:** Strict timeline enforcement ignores the iterative nature of ADM. Marketing strategy is out of EA scope. Centralising decisions under IT is the exact anti-pattern EA exists to prevent — business owns business architecture.

---

### Q4 ✦
**Which tool is primarily used to provide architectural insights in complex IT landscapes with over 100 systems?**

- [ ] SAP Signavio
- [x] **SAP LeanIX**
- [ ] SAP Cloud ALM
- [ ] Tricentis

**Why correct:** LeanIX is the EA Management tool — application portfolio management, landscape visualisation, and architectural insights across complex multi-system environments.

**Why others are wrong:** Signavio = process modelling and mining. Cloud ALM = project execution and monitoring. Tricentis = testing tool, outside the SAP EA toolchain entirely.

---

### Q5 ✦
**Which SAP LeanIX Meta Model layer primarily supports outputs such as Goals & Roadmaps?**

- [ ] Business Architecture
- [x] **Strategy & Transformation**
- [ ] Application & Data Architecture
- [ ] Technical Architecture

**Why correct:** Goals and roadmaps are strategic outputs. Strategy & Transformation is where business strategy, transformation initiatives, and planning outputs live in LeanIX.

**Why others are wrong:** Business Architecture = capabilities and processes. Application & Data = solution landscape. Technical Architecture = infrastructure and deployment. Roadmaps are outputs of strategic decision-making, not current-state description.

---

### Q6 ✦✦
**Which statements accurately reflect key differences between enterprise architects and technical architects?**

- [x] **Enterprise architects focus on aligning IT strategy with business transformation goals**
- [ ] Technical architects manage end-to-end enterprise-wide IT governance
- [x] **Enterprise architects typically operate at a strategic level, while technical architects focus on implementation details**
- [x] **In tech-driven environments, enterprise architects can assume more technical responsibilities**
- [ ] Technical architects are responsible for defining corporate vision and driving innovation initiatives

**Why correct:** These three reflect the strategic vs implementation distinction, the core EA alignment purpose, and the acknowledged reality that in tech-heavy organisations the boundary can blur.

**Why others are wrong:** End-to-end enterprise-wide IT governance is an EA responsibility, not technical architects'. Defining corporate vision and driving innovation is EA/business leadership — not what technical architects do.

---

### Q7 ✦✦
**Which EA traits best enable business value in an SAP context?**

- [x] **A tech-savvy EA advocates for technologies like Cloud Native and DevOps to improve efficiency**
- [ ] A data-driven EA makes decisions based on historical intuition and experience
- [x] **An EA with an agile mindset balances fast development cycles with necessary compliance and security**
- [x] **An EA with a large scope ensures decentralized and centralized architectures work together**
- [ ] An evangelistic EA resists frequent change to ensure system stability

**Why correct:** Tech-savviness, agile balance, and broad scope are genuine EA characteristics that directly deliver business value.

**Why others are wrong:** Data-driven EA makes decisions based on **data and evidence** — not intuition. An evangelistic EA **champions and drives change** — resisting it is the opposite of the trait.

---

### Q8 ✦✦
**Why is it important for an EA to combine T-shaped and I-shaped expertise when working with SAP?**

- [x] **It allows the EA to connect business domains while also leading deep, focused projects**
- [ ] It reduces the need to collaborate with other architects
- [x] **It helps the EA align both high-level strategy and detailed technical implementation**
- [ ] It ensures the EA can independently configure all SAP modules

**Why correct:** T-shaped = broad cross-domain knowledge. I-shaped = deep expertise in specific areas. Together they enable both strategic alignment and focused delivery.

**Why others are wrong:** The Collaborative Approach principle explicitly requires working with others — T-shaped expertise enhances collaboration, not replaces it. Independently configuring all SAP modules describes a functional consultant, not an EA.

---

### Q9 ✦✦
**Which behaviours are most critical for EAs to lead strategic change and build stakeholder trust?**

- [x] **Tailoring communication for both technical and business audiences**
- [x] **Building frameworks to evaluate both technical and strategic challenges**
- [ ] Avoiding collaboration to maintain technical independence
- [x] **Leading teams by sharing expertise and guiding vision, not hierarchy**
- [ ] Prioritising individual tasks over group innovation

**Why correct:** Communication, frameworks, and servant leadership are core EA competencies for stakeholder trust and strategic influence.

**Why others are wrong:** Avoiding collaboration violates the Collaborative Approach principle — one of the six official EA principles. Prioritising individual tasks contradicts both collaborative EA practice and the Content Fluency principle.

---

### Q10 ✦✦
**How does EA support organisations in managing modern IT landscape challenges?**

- [x] **Helps integrate emerging technologies like AI securely**
- [x] **Identifies inefficiencies and reduces IT costs**
- [ ] Prevents all cybersecurity threats automatically
- [x] **Provides transparency into fragmented systems**
- [x] **Aligns IT strategies with business goals**

**Why correct:** These four appear directly in the EA value proposition and competency descriptions.

**Why wrong:** EA provides governance frameworks that *support* security — it is not a technical security control. The word "all" makes this an absolute claim no architecture practice can guarantee.

---

### Q11 ✦✦
**Which statements about complexity in IT landscapes are true?**

- [ ] Functional complexity decreases flexibility and agility in IT systems
- [ ] Multiple interfaces lower system integration costs
- [x] **Unclear data ownership increases risk and compliance issues**
- [x] **Technical complexity — such as unpatched software — can increase organisational risk**
- [ ] High complexity always leads to improved system performance

**Why correct:** Data governance gaps create compliance exposure. Unmanaged technical debt (unpatched software) is a direct risk EA exists to surface and address.

**Why others are wrong:** Functional complexity *increases* rigidity and reduces agility. Multiple interfaces *increase* integration costs. High complexity typically *degrades* performance — never "always improves" it.

---

### Q12 ✦✦
**Which illustrate how EA has evolved and why it remains essential?**

- [x] **Traditional frameworks like TOGAF are being complemented by agile, service-based approaches such as EA Management as a Service**
- [ ] Enterprise architects today focus only on technical infrastructure, not business outcomes
- [x] **Tools like SAP LeanIX have made it easier to respond quickly to business changes**
- [x] **The role of the architect now includes fostering continuous transformation and improvement**
- [ ] Enterprise Architecture no longer needs to align with strategic business goals

**Why correct:** These three reflect EA's evolution toward agility, tooling maturity, and continuous transformation.

**Why others are wrong:** Business outcomes are the *primary* purpose of EA — not just technical infrastructure. Alignment with strategic business goals is not optional — it is the fundamental reason EA exists.

---

### Q13 ✦
**Which TOGAF ADM phase is primarily responsible for identifying projects and transition plans to realise the target architecture?**

- [ ] Architecture Vision
- [ ] Business Architecture
- [x] **Opportunities and Solutions**
- [ ] Technology Architecture

**Why correct:** Phase E is the pivot from *defining* architectures to *planning how to achieve them*. It identifies projects, work packages, and transition architectures.

**Why others are wrong:** Phase A sets scope. Phase B defines the business layer. Phase D defines the technology layer. None are responsible for identifying the implementation roadmap — that is exclusively Phase E.

---

### Q14 ✦
**What is one benefit of using SAP reference architecture content when applying TOGAF to SAP projects?**

- [ ] It eliminates the need for collaboration with non-SAP teams
- [ ] It guarantees the architecture is identical across all SAP customers
- [x] **It accelerates engagements by providing ready-made patterns and integration guidance**
- [ ] It replaces all phases of the TOGAF ADM

**Why correct:** Reference architecture content exists to accelerate business transformation by giving architects a validated starting point rather than building from scratch.

**Why others are wrong:** Collaboration with non-SAP teams is required (Respect and Connect principle). Every customer adapts reference content — architectures are never identical. Reference content complements ADM phases — it never replaces them.

---

### Q15 ✦✦
**Which are examples of artifacts provided by the SAP EA Methodology?**

- [x] **Business Capability Map**
- [x] **Solution Component Diagram**
- [ ] Data Flow Technique
- [x] **Stakeholder Map**
- [ ] Capability-based Planning

**Why correct:** These three are diagrams/visualisations — actual work products you produce and deliver.

**Why others are wrong:** Data Flow is a **technique** for analysing how data moves. Capability-based Planning is a **technique** for mapping capabilities to investments. Neither is an artifact — they are methods used to *produce* artifacts.

> ⚠️ **Key distinction:** Artifact = deliverable you produce. Technique = method you apply to produce it.

---

### Q16 ✦✦
**Which accurately describe the roles of different architecture domains in SAP EA?**

- [x] **Strategy and Motivation derives objectives from long-term strategic priorities to inspire and align stakeholders**
- [ ] Business Architecture defines networking and hardware infrastructure across the enterprise
- [x] **Solution Architecture bridges business needs with technical implementation through reference and target architectures**
- [x] **Technology Architecture outlines how IT systems are deployed across environments and infrastructure**
- [x] **Requirements and Governance captures architecture decisions and provides risk management artifacts**

**Why correct:** These four match the official domain definitions precisely.

**Why wrong:** Business Architecture covers capabilities, processes, data, and organisational structure — never networking and hardware. That description belongs to Technology Architecture. Classic domain-swap trap.

---

### Q17 ✦✦
**How do RBAs and RSAs add value to EA projects?**

- [x] **RBAs help define business capabilities and industry-aligned target states**
- [x] **RSAs provide solution blueprints that reduce risk and accelerate design**
- [ ] Architecture Principles enforce a rigid, one-size-fits-all approach to architecture
- [x] **RSAs align solution design with SAP's technology roadmap**

**Why correct:** These three reflect the official value propositions of RBA and RSA content.

**Why wrong:** Architecture Principles provide guardrails for consistent decision-making — they are not rigid or one-size-fits-all. The framework is explicitly designed for adaptation to each customer's context. The courseware states reference architecture must be assessed and validated per customer scenario.

---

### Q18 ✦
**What is one of the main purposes of architecture principles in enterprise architecture?**

- [ ] To define user interface layouts for SAP applications
- [ ] To provide detailed coding standards for developers
- [x] **To guide consistent decision-making across projects**
- [ ] To describe legacy system maintenance procedures

**Why correct:** Principles are rules that reflect general consensus on EA work, empowering consistent decisions with speed, high confidence, and clarity — directly from the courseware definition.

**Why others are wrong:** UI layouts, coding standards, and legacy maintenance are all implementation-level concerns sitting well below the strategic governance level where architecture principles operate.

---

### Q19 ✦✦
**How do the different pillars of the SAP EA Framework support effective architecture practices?**

- [x] **Methodology provides standardized guidance for planning and governing architectures**
- [x] **Reference Architecture Content offers reusable models that map strategy to SAP solutions**
- [x] **Tooling supports documentation and integration of architectural assets**
- [ ] Practice ensures that technical upgrades are automated without governance
- [x] **Services help guide organisations through transformation initiatives**

**Why correct:** These four accurately describe the Methodology, Reference Content, Tooling, and Services pillars.

**Why wrong:** Practice is about the EA organisational model, governance structures, and maturity assessment. Automating upgrades *without* governance is the opposite of what Practice stands for — governance is its core purpose.

---

### Q20 ✦✦
**Which are key components typically included in an Enterprise Architecture model?**

- [x] **The organisation's strategic goals and objectives**
- [x] **Technical and business process blueprints**
- [ ] The company's branding and marketing slogans
- [x] **Systems, data, and technology infrastructure**

**Why correct:** These three map to the four TOGAF layers — strategic goals (Business), process blueprints (Business + Solution), and systems/data/infrastructure (Application + Data + Technology).

**Why wrong:** Branding and marketing slogans are outside EA scope entirely. EA may model Marketing as a business capability, but slogans are not architectural content.

---

### Q21 ✦✦
**Which are the key goals of Business Process Management (BPM)?**

- [x] **Capture and design business processes**
- [x] **Execute and measure process performance**
- [x] **Establish end-to-end visibility and accountability across departmental boundaries**
- [x] **Monitor and control processes for efficiency**

**Why all correct:** These four form the complete BPM lifecycle — design, execute, monitor, govern. All four are correct. Maps directly to Signavio's role: Process Explorer (reference content), Process Manager (modelling), Process Intelligence (measuring and monitoring).

---

### Q22 ✦✦
**Which reflect strategic business benefits of successfully implemented BPM initiatives?**

- [x] **Increased employee satisfaction through the elimination of repetitive tasks**
- [x] **Improved regulatory compliance through visual process mapping**
- [ ] Complete elimination of manual work across all departments
- [x] **Better agility through quicker identification of impacted processes during market changes**

**Why correct:** These three are genuine, realistic BPM benefits supported by the courseware.

**Why wrong:** "Complete elimination of manual work across *all* departments" — the absolute language ("complete," "all") is the giveaway. BPM reduces and automates manual work where appropriate; complete elimination everywhere is unrealistic. Watch for absolutes on the real exam.

---

### Q23 ✦✦
**Which are typical activities in the Process Documentation phase of the process lifecycle?**

- [x] **Running workshops with process participants**
- [ ] Setting performance KPIs for bottleneck detection
- [x] **Creating or refining process models for execution**
- [ ] Executing tasks through workflow engines

**Why correct:** Documentation phase = capturing and modelling. Workshops gather knowledge; process models capture it.

**Why others are wrong:** Setting KPIs for bottleneck detection = **Monitor and Control** phase. Executing tasks through workflow engines = **Execution** phase. You don't run or measure processes during documentation — you model them.

---

### Q24 ✦✦
**Which are true about value chains in a process architecture model?**

- [x] **They provide a high-level view of business processes across management, core, and support areas**
- [ ] They replace the need for process modeling languages like BPMN
- [x] **They help structure and organize processes before drilling down into detailed levels**
- [ ] They only apply to customer journey mapping, not internal operations

**Why correct:** Value chains are the top-level organising structure — they provide orientation before drilling into detailed process modelling.

**Why others are wrong:** Value chains operate at a higher abstraction level than BPMN — they do not replace it. BPMN is used for detailed flows *beneath* the value chain. Value chains apply across management, core, AND support processes — not just customer journeys.

---

### Q25 ✦✦
**Which types of information are typically added during the execution-focused stage of process documentation?**

- [x] **Roles responsible for tasks and their systems**
- [ ] Process vision statements and core company values
- [x] **Risks within specific tasks and corresponding controls**
- [ ] Marketing strategies associated with product features

**Why correct:** Execution-focused documentation is operational and precise — who does what (roles), with what tools (systems), what can go wrong (risks), and how it's controlled (controls).

**Why others are wrong:** Vision statements and core values = Architecture Vision / Strategy & Motivation domain content. Marketing strategies = out of scope for process documentation entirely.

---

### Q26 ✦✦
**Which are capabilities of the SAP Signavio Transformation Suite?**

- [x] **Process and journey modelling**
- [x] **Value acceleration and artificial intelligence**
- [ ] Financial forecasting and financial modelling
- [x] **Process governance and automated execution**

**Why correct:** Signavio covers process modelling (Process Manager), journey modelling, AI-assisted process improvement, governance, and automated execution.

**Why wrong:** Financial forecasting and modelling = SAP S/4HANA Finance / FP&A tools. Signavio is a process management platform, not a financial planning tool.

---

### Q27 ✦
**What is one primary benefit of SAP Cloud ALM's Service capabilities?**

- [x] **Share digitized service reports to review finalised issues and actions in an easy-to-consume format**
- [ ] Build custom software applications for remote teams
- [ ] Test deployment workflows for third-party vendors
- [ ] Automate predictive analytics using AI-based scoring models

**Why correct:** Cloud ALM is the execution and monitoring layer — project outcomes, issues, and actions are tracked and reported here.

**Why others are wrong:** Building custom apps = SAP BTP. Testing third-party deployment workflows = outside Cloud ALM's purpose. AI-based predictive scoring = analytics tools, not project/service management.

---

### Q28 ✦
**What is the main purpose of SAP LeanIX Business Reference Architecture feature?**

- [ ] To manage employee payroll processes in SAP SuccessFactors
- [ ] To provide code-based integration testing for cloud applications
- [x] **To support structured planning and deployment of SAP solutions based on business capabilities**
- [ ] To generate automated marketing reports from SAP Analytics Cloud

**Why correct:** LeanIX hosts the Business Reference Architecture content and uses it as the foundation for capability-based planning, application portfolio management, and roadmap development.

**Why others are wrong:** Payroll = SuccessFactors. Integration testing = SAP BTP / Cloud ALM. Marketing analytics = SAP Analytics Cloud. LeanIX's entire purpose is structured EA planning anchored in business capabilities.

---

### Q29 ✦✦
**How does EA support organisations in managing challenges of modern IT landscapes?**

*(Repeat of Q10 — same answer)*

- [x] **Helps integrate emerging technologies like AI securely**
- [x] **Identifies inefficiencies and reduces IT costs**
- [ ] Prevents all cybersecurity threats automatically
- [x] **Provides transparency into fragmented systems**
- [x] **Aligns IT strategies with business goals**

> ⚠️ **Note:** This question appeared twice in the assessment (Q10 and Q29). On the real exam, if you see a repeated question, treat it as a gift — same reasoning applies. Eliminate absolutes first.

---

### Q30 ✦
**Which best describes a key advantage of SAP Activate "Fit-to-Standard" over traditional "Design to Blueprint"?**

- [ ] It allows unlimited customisation before go-live
- [ ] It follows a strict waterfall methodology
- [x] **It uses standard best practices and accelerators for faster, repeatable deployments**
- [ ] It focuses on designing new solutions from scratch with heavy development

**Why correct:** Fit-to-Standard starts with SAP's best practice processes and adapts the business to fit the standard — directly aligned with Clean Core and the EA Framework's emphasis on reference architecture content.

**Why others are wrong:** Unlimited customisation, waterfall methodology, and building from scratch are precisely what Fit-to-Standard exists to avoid. All three describe the traditional Design to Blueprint approach it replaces.

---

## Key Exam Patterns from This Assessment

| Pattern | How to spot it | Action |
|---------|---------------|--------|
| **Absolute language** | "all," "complete," "always," "never," "eliminates" | Eliminate immediately |
| **Domain swap** | Business Architecture described with infrastructure/hardware terms | Check which domain it really belongs to |
| **Technique vs Artifact** | "Data Flow," "Capability-based Planning" offered as artifacts | Techniques produce artifacts — they are not artifacts themselves |
| **Role confusion** | EA responsibilities attributed to technical architects or IT | EA = strategic + cross-domain. Technical = implementation |
| **Pillar misrepresentation** | Practice described without governance | Practice = EA org model + governance. Never automation without governance |
| **Repeated questions** | Same question appears twice | Identical answer — use it to verify your reasoning |
