export interface ComputerQA {
  id: string;
  question: string;
  keywords: string[];
  category: "architecture" | "ai" | "governance" | "acquisition" | "strategy" | "roadmap";
  response: {
    answer: string;
    strategicImpact: string;
    businessValue: string;
    riskReduction: string;
    supportingEvidence: string;
    nextStep: string;
  };
}

export const COMPUTER_QA: ComputerQA[] = [
  {
    id: "canonical-models",
    question: "Why do canonical models matter?",
    keywords: ["canonical", "model", "matter", "important", "why canonical"],
    category: "architecture",
    response: {
      answer:
        "A canonical model is a single, agreed-upon definition of a business entity — like a subscriber — that every system, every team, and every AI model uses as the authoritative source. Without it, Lee Enterprises has 77+ properties each defining 'subscriber' differently, making cross-property comparison impossible and every acquisition a bespoke integration project.",
      strategicImpact:
        "The canonical subscriber model is the architectural decision that transforms Lee's data platform from a collection of pipelines into a strategic asset. It makes the platform reusable, scalable, and AI-ready across every property and every acquisition.",
      businessValue:
        "Eliminates weeks of analyst reconciliation work per reporting cycle. Enables cross-property benchmarking that was previously manual or impossible. Makes every new acquisition immediately comparable to the existing portfolio without custom integration work.",
      riskReduction:
        "Reduces the risk of inconsistent metrics misleading executive decisions. Eliminates shadow IT and local spreadsheets created when analysts can't trust platform data. Provides a single audit trail for regulatory compliance.",
      supportingEvidence:
        "The current architecture shows DSI and Falcon subscriber data flowing through separate source-specific models (INT/Silver) before converging at the Common Subscriber Model in the Gold layer — proving the pattern works at scale.",
      nextStep:
        "Navigate to Main Engineering to explore how the canonical model fits within the full medallion architecture, or visit the Acquisition Simulator to see how it accelerates M&A integration.",
    },
  },
  {
    id: "medallion-architecture",
    question: "What is the medallion architecture?",
    keywords: ["medallion", "architecture", "layers", "raw", "bronze", "silver", "gold", "semantic"],
    category: "architecture",
    response: {
      answer:
        "The medallion architecture is Lee's five-layer data processing framework in BigQuery: Raw (source data as-is), Bronze/STG (cleaned and standardized), Silver/INT (source-specific business logic), Gold/MRT (canonical enterprise models), and AI/Semantic (governed, AI-ready layer). Each layer adds business value while maintaining full lineage to the source.",
      strategicImpact:
        "The medallion architecture provides a scalable, predictable structure for transforming any source data into trusted enterprise knowledge. It is the operating model of the Warp Core — the foundational system everything else depends on.",
      businessValue:
        "Different personas consume different layers: BI dashboards consume Gold, SQL analysts query governed models, conversational AI uses the AI/Semantic layer. Every persona gets data that is right-sized for their needs without compromising the canonical foundation.",
      riskReduction:
        "Each layer transition has automated quality gates managed by dbt. Failed quality checks prevent promotion to the next layer, ensuring that bad data cannot reach BI dashboards or AI systems without explicit remediation.",
      supportingEvidence:
        "The architecture diagram shows all three access flows (BI Dashboard, Direct SQL, Conversational AI) drawing from different layers of the same BigQuery medallion — demonstrating that a single architecture supports multiple consumption patterns.",
      nextStep:
        "Visit Main Engineering to explore each layer interactively, or run the Acquisition Simulator to see how a new company moves through all five layers in a real integration scenario.",
    },
  },
  {
    id: "acquisition-integration",
    question: "How does acquisition integration work?",
    keywords: ["acquisition", "integration", "onboard", "company x", "m&a", "merge", "new company"],
    category: "acquisition",
    response: {
      answer:
        "When Lee acquires a new company, its data follows a structured seven-step integration through the medallion architecture: source data lands in Raw via Airflow DAGs, gets cleaned through Bronze, modeled through Silver with source-specific logic, then mapped to Lee's Common Subscriber Model in Gold — making it immediately comparable to all 77+ properties. Finally, it's promoted to the AI/Semantic layer with governance activation.",
      strategicImpact:
        "The canonical model is what makes this fast. Instead of building a bespoke integration for every acquisition, the platform has a reusable pattern. The question is no longer 'how do we integrate this company?' but 'how do we map their subscriber data to our canonical model?'",
      businessValue:
        "Traditional integration: 9–12 months before acquisition data is analytically useful. Target state with the canonical model: 4–8 weeks. That is a 60–75% reduction in time-to-insight for every acquisition Lee makes going forward.",
      riskReduction:
        "The automated quality gates at each layer transition ensure data integrity before promotion. Governance activation at the AI/Semantic layer ensures AI systems cannot query acquisition data before it has been properly catalogued and access-controlled.",
      supportingEvidence:
        "The acquisition architecture diagram shows Company X subscribers flowing through an identical medallion path to DSI and Falcon, then mapping to the shared Common Subscriber Model — proving the pattern is reusable, not theoretical.",
      nextStep:
        "Run the Acquisition Simulator to watch this integration unfold step by step, including the canonical model mapping and governance activation sequence.",
    },
  },
  {
    id: "ai-readiness",
    question: "What is our AI readiness status?",
    keywords: ["ai readiness", "ai ready", "artificial intelligence", "status", "readiness"],
    category: "ai",
    response: {
      answer:
        "Lee's AI readiness is currently at 45% — the AI/Semantic layer in BigQuery is under active development, context files are established, and Vertex AI with Gemini is connected to governance-checked data paths. The foundational architecture is in place; the work ahead is scaling it across all data domains and business units.",
      strategicImpact:
        "Reaching full AI readiness means Lee can deploy conversational analytics, automated reporting, cross-property benchmarking AI, and ultimately agentic workflows — all grounded in governed, canonical data that makes AI responses trustworthy rather than speculative.",
      businessValue:
        "At full readiness, business users query enterprise data in natural language and receive answers in seconds. Analysts focus on interpretation rather than extraction. Executives see real-time strategic insights without waiting for reports.",
      riskReduction:
        "The governance-first approach to AI readiness is a deliberate risk reduction strategy. By requiring Dataplex policy checks before AI can access any data, Lee ensures that AI responses are grounded in authorized, quality-validated information — not hallucinated from incomplete or ungoverned data.",
      supportingEvidence:
        "The conversational AI sequence diagram shows a full policy check step (Governance → approved) before any query reaches Vertex AI and BigQuery — demonstrating that governance is architecturally enforced, not aspirational.",
      nextStep:
        "Review the AI Readiness indicator in the Bridge Overview for detailed current and target states, or ask the Computer about the agentic AI roadmap for the long-term vision.",
    },
  },
  {
    id: "governance",
    question: "Explain the governance model.",
    keywords: ["governance", "govern", "policy", "dataplex", "compliance", "access control"],
    category: "governance",
    response: {
      answer:
        "Lee's governance model uses Google Cloud Dataplex as the metadata and policy engine. Every data access pattern — BI dashboards, direct SQL, and conversational AI — routes through governance checks. For conversational AI, the sequence is explicit: a natural language request triggers context assembly, which submits a policy check to Dataplex before any AI model generates a response or any SQL executes against BigQuery.",
      strategicImpact:
        "Governance is not a compliance checkbox — it is the architectural feature that makes AI trustworthy at enterprise scale. Without it, AI responses are based on whatever data the model can access. With it, every AI response is grounded in data the user is authorized to see, with a full audit trail.",
      businessValue:
        "Business users interact with AI without needing to understand data access rules — governance operates invisibly. Compliance and legal teams have automated audit trails without manual reporting. IT has one place to manage access policy across all consumption patterns.",
      riskReduction:
        "Eliminates the risk of unauthorized data access through AI interfaces. Prevents sensitive subscriber or financial data from appearing in AI responses to users who don't have authorization. Provides audit-ready logs for regulatory requirements.",
      supportingEvidence:
        "The three-flow architecture diagram shows Dataplex operating as a mandatory checkpoint in Flow 3 (Conversational AI) between Context Assembly and Vertex AI — it is architecturally impossible to bypass this governance step.",
      nextStep:
        "Explore the Governance Maturity indicator on the Bridge Overview, or visit Main Engineering to see how the Navigation Computer (Governance layer) connects to all data access patterns.",
    },
  },
  {
    id: "dbt-role",
    question: "What is the role of dbt?",
    keywords: ["dbt", "transformation", "semantic", "models", "transform"],
    category: "architecture",
    response: {
      answer:
        "dbt (data build tool) is Lee's Main Computer — the transformation and semantic governance engine. It manages all SQL transformations from Raw through to the AI/Semantic layer, enforces schema contracts, runs automated data quality tests at every layer transition, and maintains lineage metadata that Dataplex uses for governance. It is also the version-controlled source of truth for all data models, stored in GitHub.",
      strategicImpact:
        "dbt is what makes the medallion architecture maintainable at scale. Without it, transformations are ad-hoc SQL scripts that are fragile, undocumented, and impossible to test. With dbt, every transformation is a versioned, tested, documented model with clear lineage from source to Gold.",
      businessValue:
        "Data engineers move faster because dbt models are modular and reusable. When a new acquisition arrives, the existing dbt model patterns are cloned and adapted rather than rebuilt from scratch. Quality gates in dbt catch data issues before they reach BI or AI — dramatically reducing error correction work.",
      riskReduction:
        "dbt's automated testing means data quality issues are caught at the transformation layer, not discovered by analysts or business users. Full lineage documentation means any data quality issue can be traced back to its source in minutes, not days.",
      supportingEvidence:
        "The architecture diagram shows dbt receiving feeds from all five BigQuery layers and GitHub — it operates as the central transformation hub connecting raw source data to the canonical models that power both BI and AI consumption.",
      nextStep:
        "Visit Main Engineering and click on the Main Computer (dbt) node to explore its full responsibilities, dependencies, and strategic importance in the platform architecture.",
    },
  },
  {
    id: "conversational-ai",
    question: "How does conversational analytics work?",
    keywords: ["conversational", "analytics", "natural language", "teams", "chat", "question", "query"],
    category: "ai",
    response: {
      answer:
        "A user asks a natural language question in Microsoft Teams. The Teams integration forwards the request to the AI Orchestration layer, which sends it to Context Assembly. Context Assembly retrieves context from three sources: dbt Semantic Layer metadata, Markdown documentation, and Dataplex metadata. This context bundle goes through a Governance policy check. If approved, an enriched prompt goes to Vertex AI and Gemini, which generates SQL. That SQL is validated with a dry run, executed against BigQuery, and the results come back as a grounded natural language response.",
      strategicImpact:
        "Conversational analytics is the interface that makes the data platform accessible to non-technical business users without compromising governance or data quality. It collapses the distance between a business question and a trusted data answer.",
      businessValue:
        "A publisher asking 'how did our weekend digital subscribers trend compared to last quarter?' gets a direct, sourced answer in seconds — without submitting a ticket, waiting for an analyst, or opening a BI dashboard. This scales analytical capacity without scaling the engineering team.",
      riskReduction:
        "The mandatory governance policy check before AI generation ensures that conversational responses cannot return data the user is not authorized to see. The dry-run SQL validation step prevents malformed queries from executing. Grounded responses reduce hallucination risk.",
      supportingEvidence:
        "The three-flow sequence diagram shows the complete Conversational AI path (Flow 3, green) with explicit steps: context request → metadata → policy check → approved → enriched prompt → generated SQL → validate & dry run → execute → grounded response.",
      nextStep:
        "Try the Computer Interface module to experience conversational analytics in action, or explore the Universal Translator node in Main Engineering for the full system architecture.",
    },
  },
  {
    id: "agentic-ai",
    question: "What is the agentic AI roadmap?",
    keywords: ["agentic", "agent", "autonomous", "future", "roadmap", "vision", "2027", "2028"],
    category: "roadmap",
    response: {
      answer:
        "Phase 3 of Lee's data modernization roadmap (2027–2028) targets agentic AI: autonomous workflows that operate on trusted, governed enterprise data without requiring human prompting for every task. This includes automated reporting, proactive performance alerts, cross-property benchmarking agents, and self-healing data pipeline agents that detect and remediate quality issues automatically.",
      strategicImpact:
        "Agentic AI is not a technology goal — it is a business model transformation. An organization where AI agents proactively surface insights, automate routine analytical work, and flag strategic anomalies operates at a fundamentally different speed than one where humans must query and interpret data manually.",
      businessValue:
        "Editorial teams receive proactive content performance insights without pulling reports. Revenue teams get automated cross-property advertiser yield analysis. M&A teams receive AI-generated acquisition integration progress summaries. These are hours of work delivered as ambient intelligence.",
      riskReduction:
        "Because agentic AI is built on top of the governed AI layer established in Phase 1 and 2, every agent action is bounded by the same policy checks that govern human queries. Agents cannot access unauthorized data or generate responses based on ungoverned sources.",
      supportingEvidence:
        "The architecture diagram shows the Agentic Layer as a distinct system connecting to the AI Layer (Vertex AI + Gemini) and the data platform — designed from the beginning as a first-class citizen of the architecture, not a future add-on.",
      nextStep:
        "Visit the Captain's Log to explore the 2028 vision in detail, including example agentic workflows and natural language AI interactions that will define the future state of Lee's analytics capability.",
    },
  },
  {
    id: "bigquery-role",
    question: "What is BigQuery's role in the platform?",
    keywords: ["bigquery", "big query", "warp core", "database", "warehouse", "data warehouse"],
    category: "architecture",
    response: {
      answer:
        "BigQuery is the Warp Core — the central data processing and storage engine for the entire Lee data platform. It hosts all five medallion layers (Raw, Bronze, Silver, Gold, AI/Semantic), executes all dbt transformation models, serves as the query engine for BI dashboards, direct SQL access, and conversational AI, and provides the performance and scale needed to process data across 77+ properties.",
      strategicImpact:
        "Centralizing on BigQuery as a single cloud data warehouse eliminates the performance inconsistencies and maintenance overhead of managing multiple database systems. It provides the computational foundation for both current analytical needs and future AI-scale workloads.",
      businessValue:
        "BigQuery's serverless architecture means Lee pays for queries run, not servers provisioned. Its native integration with Vertex AI and Gemini means the AI/Semantic layer can be queried by AI models without complex data movement. Performance scales automatically with demand.",
      riskReduction:
        "Column-level security and row-level access controls in BigQuery enforce governance policies at the storage layer — meaning even if an application bypasses the governance API, unauthorized data access is still blocked at the database level.",
      supportingEvidence:
        "All three access flows shown in the architecture diagram (BI Dashboard, Direct SQL, Conversational AI) converge on BigQuery for query execution — it is the single execution engine for all analytical consumption patterns in the platform.",
      nextStep:
        "Explore the Warp Core node in Main Engineering to see its full architecture, including how the five medallion layers are organized and how they connect to every downstream system.",
    },
  },
  {
    id: "kpi-standardization",
    question: "How are KPIs standardized across properties?",
    keywords: ["kpi", "metrics", "standardize", "consistent", "definition", "measure"],
    category: "architecture",
    response: {
      answer:
        "KPI standardization is enforced at the Gold layer through the Common Subscriber Model. When a metric like 'active digital subscriber' is defined in the canonical model, that definition applies identically to DSI, Falcon, and any future acquisition. The definition lives in dbt as a versioned model — changes require code review, testing, and deliberate deployment, not informal spreadsheet edits.",
      strategicImpact:
        "Standardized KPIs are the prerequisite for meaningful cross-property analytics and executive reporting. Without them, every comparison requires footnotes explaining definitional differences. With them, a cross-market subscriber trend analysis is a query, not a reconciliation project.",
      businessValue:
        "Executive dashboards showing comparative property performance become credible and trustworthy. Revenue and editorial leadership can make decisions based on consistent, comparable metrics rather than debating whether the numbers mean the same thing across markets.",
      riskReduction:
        "Eliminates the risk of different teams using different definitions of the same metric in the same board presentation. Creates a governed audit trail for every KPI definition change — critical for financial reporting and regulatory compliance.",
      supportingEvidence:
        "The acquisition architecture diagram lists 'Shared KPI definitions' as one of the five explicit Acquisition Onboarding Benefits — demonstrating that KPI standardization was designed into the acquisition integration pattern, not retrofitted.",
      nextStep:
        "Ask the Computer about the canonical subscriber model for more detail, or navigate to the Acquisition Simulator to see how standardized KPIs are automatically inherited during acquisition integration.",
    },
  },
  {
    id: "vertex-ai",
    question: "How does Vertex AI integrate with the platform?",
    keywords: ["vertex", "gemini", "google ai", "vertex ai", "ai layer", "ai core"],
    category: "ai",
    response: {
      answer:
        "Vertex AI and Gemini form the AI Core — the reasoning engine that powers conversational analytics. In the conversational flow, Vertex AI receives enriched prompts (user question + context bundle + dbt metadata + Dataplex metadata) and generates SQL queries against BigQuery. Gemini provides the language understanding and generation capabilities. Together they transform natural language questions into governed, executable database queries and translate results back into business-readable responses.",
      strategicImpact:
        "Native GCP integration between Vertex AI and BigQuery eliminates the data movement, latency, and security risk of sending data to external AI APIs. The AI models run in the same security perimeter as the data — a critical architectural advantage for enterprise governance.",
      businessValue:
        "AI-generated SQL quality is dramatically better when models have access to semantic context (dbt model documentation, Dataplex metadata, business glossaries). This means fewer query errors, more relevant responses, and lower correction overhead for the engineering team.",
      riskReduction:
        "By processing AI queries within GCP's security boundary, Lee avoids the risk of enterprise data being transmitted to third-party AI providers. Dataplex governance policies apply equally to AI-generated queries as to human-written ones.",
      supportingEvidence:
        "The sequence diagram shows Vertex AI receiving the enriched prompt only after the governance policy check has been approved — confirming that AI access to data is architecturally conditional on authorization, not assumed.",
      nextStep:
        "Visit Main Engineering and click on the AI Core node to explore Vertex AI and Gemini's full role, or navigate to the Captain's Log for a vision of how AI capabilities will evolve through the three-phase roadmap.",
    },
  },
  {
    id: "three-phase-roadmap",
    question: "What is the three-phase roadmap?",
    keywords: ["roadmap", "phases", "plan", "timeline", "strategy", "three phase", "phase 1", "phase 2", "phase 3"],
    category: "roadmap",
    response: {
      answer:
        "Lee's data modernization unfolds in three phases: Phase 1 (2025–2026) establishes the Canonical Subscriber Model and medallion architecture — the foundation. Phase 2 (2026–2027) expands the semantic layer beyond subscribers to all enterprise data domains — the acceleration. Phase 3 (2027–2028) deploys agentic AI operating on the governed platform — the transformation.",
      strategicImpact:
        "Each phase is designed to be self-funding: Phase 1 delivers acquisition efficiency and analyst productivity that justifies Phase 2 investment. Phase 2 delivers cross-domain AI analytics that justifies Phase 3. The roadmap is not aspirational — it is compounding.",
      businessValue:
        "By the end of Phase 1, acquisition integration time drops from 9–12 months to 4–8 weeks — a measurable business outcome. By Phase 2, every business unit has self-service access to trusted enterprise analytics. By Phase 3, AI agents handle routine analysis autonomously, freeing human capital for strategic work.",
      riskReduction:
        "The phased approach de-risks the transformation by delivering business value at each phase boundary rather than requiring a multi-year commitment before any return. Each phase also builds governance maturity, reducing the risk profile of the subsequent phase.",
      supportingEvidence:
        "Phase 1 is currently active, with the canonical subscriber model validated and the medallion architecture operational. Phase 2 objectives are defined and architecture-ready. Phase 3 has its Agentic Layer represented in the current architecture diagram — built in from the beginning.",
      nextStep:
        "Navigate to the Bridge Overview and explore the Strategic Roadmap section for the full phase detail, or visit the Captain's Log for the 2028 vision of what Phase 3 looks like in practice.",
    },
  },
  {
    id: "self-service",
    question: "How does self-service BI work?",
    keywords: ["self-service", "self service", "looker", "domo", "dashboard", "bi", "business intelligence", "report"],
    category: "architecture",
    response: {
      answer:
        "Self-service BI is the Holodeck — the visualization and exploration layer built on Looker and DOMO. Both tools connect to the Gold layer in BigQuery, consuming the canonical models and standardized KPIs. Users can build dashboards, explore data, and generate reports without engineering involvement. For more advanced users, direct SQL access to governed BigQuery models is available through the SQL IDE path.",
      strategicImpact:
        "Self-service BI is the democratization layer of the data platform. When business users can answer their own questions using the platform rather than submitting tickets, the platform has achieved its most important success metric: trusted adoption.",
      businessValue:
        "Reduction in data engineering ticket volume for routine reporting requests. Faster time-to-insight for business stakeholders. Analytics engineering team focuses on building new canonical models rather than fulfilling ad-hoc requests. Cross-property comparison dashboards become a self-service capability for property leadership.",
      riskReduction:
        "Because Looker and DOMO connect to the Gold layer — not raw source tables — users are protected from seeing inconsistent, uncleaned data. The canonical model ensures all dashboard metrics are consistent definitions. Row-level security in BigQuery enforces data access boundaries automatically.",
      supportingEvidence:
        "Flow 1 in the architecture diagram (BI Dashboard, blue) shows the complete path: User → opens dashboard → queries Gold models → returns result set → renders visualization. This is the highest-volume access pattern on the platform.",
      nextStep:
        "Explore the Holodeck node in Main Engineering to see how Looker and DOMO connect to the platform, or ask the Computer about operational self-service for the long-term vision of analytics democratization.",
    },
  },
  {
    id: "source-systems",
    question: "What systems feed into the platform?",
    keywords: ["source", "oracle", "mssql", "falcon", "dsi", "source systems", "feeds", "input", "saas"],
    category: "architecture",
    response: {
      answer:
        "The Sensor Array — Lee's source systems — consists of two categories: on-premise systems (Oracle, MSSQL) running at individual property level, and SaaS/Cloud sources (Falcon subscriber management, DSI subscription platform, and future M&A assets). All source data is extracted via AWS MWAA Airflow DAGs and landed in GCS Storage Bucket before entering the BigQuery medallion.",
      strategicImpact:
        "The platform's value is directly proportional to the breadth and quality of sources feeding it. The architecture is designed to onboard new sources through standardized Airflow DAG templates, meaning each new property or acquisition does not require a new custom pipeline — just a new parameterized DAG configuration.",
      businessValue:
        "Consolidating 77+ property data sources into a single extraction framework reduces operational overhead significantly. When a new SaaS tool is adopted enterprise-wide, it connects to the platform through the same pattern as every other source — predictable, documented, and testable.",
      riskReduction:
        "Centralized extraction through MWAA means there is one place to monitor data freshness, pipeline health, and extraction failures for every source — rather than 77+ independent monitoring systems. Alert fatigue is reduced; visibility is increased.",
      supportingEvidence:
        "The architecture diagram explicitly shows on-premise (Oracle, MSSQL) and SaaS (Falcon, DSI) sources as separate lanes, both flowing through MWAA Airflow DAGs to a common GCS landing zone — demonstrating the platform handles heterogeneous source types through a unified pattern.",
      nextStep:
        "Visit the Sensor Array node in Main Engineering to explore source system responsibilities and dependencies, or run the Acquisition Simulator to see how a new source (Company X) enters the platform through this standardized extraction pattern.",
    },
  },
  {
    id: "subscriber-model",
    question: "What is the canonical subscriber model?",
    keywords: ["subscriber model", "subscriber", "common subscriber", "canonical subscriber"],
    category: "architecture",
    response: {
      answer:
        "The Common Subscriber Model is Lee's enterprise-wide definition of what a subscriber is. It lives in the Gold layer of BigQuery, built and maintained by dbt. It defines subscriber identity, status, product associations, tenure, and behavioral metrics in a way that is consistent across DSI, Falcon, and every future acquisition. It is the single source of truth for subscriber analytics across all 77+ properties.",
      strategicImpact:
        "The subscriber model is the most strategically valuable artifact Lee's data team has built. It is the canonical definition that makes cross-property comparisons trustworthy, acquisition integration fast, AI analytics accurate, and executive subscriber reporting credible.",
      businessValue:
        "Subscriber analytics that previously required property-specific reports and manual reconciliation are now a single query. Cross-property subscriber retention analysis, acquisition subscriber quality benchmarking, and enterprise-wide churn modeling all become routine analytical operations.",
      riskReduction:
        "A single canonical definition eliminates the risk of different teams presenting different subscriber counts in the same executive meeting. The versioned dbt model means definition changes are documented, reviewed, and deployed deliberately — not silently changed in a spreadsheet.",
      supportingEvidence:
        "The acquisition architecture diagram shows DSI Subscribers and Falcon Subscribers converging at the Common Subscriber Model in the Gold layer, with Company X Subscribers mapped to the same model — demonstrating the canonical pattern working across three distinct sources simultaneously.",
      nextStep:
        "Explore the Warp Core node in Main Engineering to see how the canonical subscriber model sits within the full five-layer BigQuery architecture, or run the Acquisition Simulator to watch a new subscriber dataset map to the canonical model in real time.",
    },
  },
  {
    id: "strategic-leverage",
    question: "How does this create long-term strategic leverage?",
    keywords: ["strategic", "leverage", "long-term", "advantage", "competitive", "future", "value"],
    category: "strategy",
    response: {
      answer:
        "Lee's data platform creates strategic leverage through three compounding effects: First, every new property added costs less to integrate than the last — the canonical model absorbs new sources. Second, every AI capability deployed is more powerful because it operates on richer, more governed data. Third, every business decision made on the platform is more trusted because the governance architecture is inviolable.",
      strategicImpact:
        "The platform is not just a data system — it is Lee's operating system for the AI era. Organizations that build governed, canonical data foundations now will have a 3–5 year head start on competitors who are still managing data silos when agentic AI becomes table stakes.",
      businessValue:
        "Direct financial leverage: faster acquisition integration means faster ROI recognition on M&A investments. Indirect leverage: trusted analytics enables confident strategic decisions on market expansion, product investment, and editorial strategy — reducing the cost of uncertainty.",
      riskReduction:
        "The platform's canonical foundation reduces the 'architecture debt' risk — the accumulation of inconsistent data systems that eventually becomes so expensive to maintain that modernization is forced and costly. Building the canonical model now is investing in architectural solvency.",
      supportingEvidence:
        "The three-phase roadmap demonstrates that each investment phase delivers measurable business value before requiring the next phase investment — this is a compounding return structure, not a speculative long-range bet.",
      nextStep:
        "Return to the Bridge Overview to review the Strategic Readiness Indicators and understand Lee's current position on each dimension, or visit the Captain's Log for the 2028 vision of where this strategic leverage takes the organization.",
    },
  },
  {
    id: "data-quality",
    question: "How is data quality managed?",
    keywords: ["data quality", "quality", "testing", "validation", "clean", "accuracy"],
    category: "governance",
    response: {
      answer:
        "Data quality is enforced at multiple layers: dbt runs automated tests (schema validation, null checks, uniqueness constraints, referential integrity) at every layer transition in the medallion. Data that fails quality tests cannot be promoted to the next layer. At the AI/Semantic layer, Dataplex adds metadata-driven quality rules. For conversational AI, a dry-run SQL validation step runs before any query executes against live data.",
      strategicImpact:
        "Quality enforcement at the transformation layer means data issues are caught before they reach BI dashboards or AI models — not after a business user reports a surprising number in a leadership meeting. The cost of catching a data error in the Bronze layer is a fraction of the cost of discovering it in an executive report.",
      businessValue:
        "Analysts spend dramatically less time investigating data anomalies because known quality rules are automated. Business users trust platform data more because they have visibility into the quality gates it passes through. AI responses are more reliable because they are grounded in tested data.",
      riskReduction:
        "Automated quality testing eliminates the manual QA overhead of checking data before every report cycle. Full test results are logged, creating an audit trail that demonstrates to auditors and regulators that Lee's data has provable quality standards — not just asserted ones.",
      supportingEvidence:
        "The medallion architecture's staged promotion model (Raw → Bronze → Silver → Gold) is fundamentally a quality escalation ladder. Each promotion gate is a quality checkpoint managed by dbt — the architecture enforces quality by design, not by policy alone.",
      nextStep:
        "Explore the Navigation Computer (Governance) node in Main Engineering to see how Dataplex quality monitoring integrates with the transformation pipeline, or ask the Computer about the governance model for the full compliance architecture.",
    },
  },
  {
    id: "mwaa-airflow",
    question: "How does Airflow orchestration work?",
    keywords: ["airflow", "mwaa", "dag", "orchestration", "pipeline", "extract", "etl"],
    category: "architecture",
    response: {
      answer:
        "AWS MWAA (Managed Workflows for Apache Airflow) serves as Lee's EPS Conduits — the orchestration layer that schedules, executes, and monitors all data extraction jobs. Airflow DAGs define the extraction logic for each source system: when to run, how to extract, where to land the data, and how to handle failures. For new acquisitions, the same DAG template is cloned and parameterized with the new source's connection details.",
      strategicImpact:
        "Centralized orchestration through MWAA means all data pipelines are managed, monitored, and versioned in one place. The reusable DAG template pattern is what makes acquisition onboarding fast — a new source is a configuration change, not a development project.",
      businessValue:
        "Operational teams have a single pane of glass for all data pipeline health. Failed extractions generate alerts through a single monitoring system. Engineers spend time building new capabilities rather than debugging undocumented custom pipelines.",
      riskReduction:
        "AWS MWAA's managed service model eliminates the operational risk of self-managing Airflow infrastructure. Retry logic, failure alerting, and execution history are built-in. DAG version control in GitHub means pipeline changes go through code review before deployment.",
      supportingEvidence:
        "The architecture diagram shows separate Airflow DAGs for each source (Oracle, MSSQL, Falcon, DSI, and the M&A source) all flowing to the same GCS landing zone — demonstrating the 'one DAG template, many parameterizations' pattern in practice.",
      nextStep:
        "Explore the EPS Conduits node in Main Engineering for detailed Airflow responsibilities and dependencies, or run the Acquisition Simulator to see how a new DAG is activated for Company X at Step 1 of the integration sequence.",
    },
  },
];

export function matchQuestion(input: string): ComputerQA | undefined {
  const clean = input
    .toLowerCase()
    .replace(/^computer[,:\s]*/i, "")
    .replace(/[?!.,]/g, "")
    .trim();

  let bestScore = 0;
  let bestMatch: ComputerQA | undefined;

  for (const qa of COMPUTER_QA) {
    let score = 0;
    for (const kw of qa.keywords) {
      if (clean.includes(kw.toLowerCase())) {
        score += kw.split(" ").length; // multi-word keywords score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = qa;
    }
  }

  return bestScore >= 1 ? bestMatch : undefined;
}
