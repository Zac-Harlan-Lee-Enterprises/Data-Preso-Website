import type { Node, Edge } from "@xyflow/react";

export type FlowId = "bi" | "sql" | "ai";

export interface ShipSystemData extends Record<string, unknown> {
  shipSystem: string;
  technology: string;
  subtitle: string;
  color: string;
  icon: string;
  flows: FlowId[];
  panel: {
    overview: string;
    responsibilities: string[];
    currentState: string;
    futureState: string;
    businessValue: string;
    dependencies: string[];
    strategicImportance: string;
  };
}

export interface FlowEdgeData extends Record<string, unknown> {
  flows: FlowId[];
  colors: Record<FlowId, string>;
  label?: string;
}

export const FLOW_COLORS: Record<FlowId, string> = {
  bi: "#3b82f6",
  sql: "#ec4899",
  ai: "#22c55e",
};

export const FLOW_LABELS: Record<FlowId, string> = {
  bi: "BI Dashboard",
  sql: "Direct SQL",
  ai: "Conversational AI",
};

export const ARCHITECTURE_NODES: Node<ShipSystemData>[] = [
  {
    id: "sensor-array",
    type: "shipSystem",
    position: { x: 380, y: 20 },
    data: {
      shipSystem: "Sensor Array",
      technology: "Source Systems",
      subtitle: "Oracle · MSSQL · Falcon · DSI · SaaS",
      color: "#f59e0b",
      icon: "Radio",
      flows: ["bi", "sql", "ai"],
      panel: {
        overview:
          "The Sensor Array represents Lee's heterogeneous source systems — the raw data origins across all 77+ properties. These include on-premise databases (Oracle, MSSQL), SaaS subscription platforms (Falcon, DSI), and M&A asset systems. Every data point that enters the platform originates here.",
        responsibilities: [
          "Oracle: On-premise relational data for operational systems at property level",
          "MSSQL: SQL Server instances hosting legacy subscription and CRM data",
          "Falcon: Subscription management platform — subscriber acquisition, billing, status",
          "DSI: Digital subscriber platform — digital product subscriptions and engagement",
          "SaaS/Cloud: Third-party data sources, ad platforms, content management systems",
          "M&A Assets: Acquired company source systems mapped to the extraction pattern",
        ],
        currentState:
          "Extraction pipelines established for Falcon and DSI subscriber data via MWAA Airflow DAGs. Oracle and MSSQL connections operational for select properties. M&A source pattern validated with Company X scenario.",
        futureState:
          "All 77+ property source systems connected through standardized Airflow DAG templates. New source onboarding reduced to a configuration task. Automated source schema change detection and alerting.",
        businessValue:
          "Centralizing all source system connections through a single extraction framework reduces operational overhead and creates one monitoring surface for all data pipeline health across the enterprise.",
        dependencies: ["EPS Conduits (MWAA)", "Data Transport (GCS)"],
        strategicImportance:
          "The breadth of the Sensor Array determines the analytical breadth of the entire platform. Every source system connected expands the canonical model's coverage and the AI's contextual knowledge — making every addition a force multiplier.",
      },
    },
  },
  {
    id: "eps-conduits",
    type: "shipSystem",
    position: { x: 380, y: 180 },
    data: {
      shipSystem: "EPS Conduits",
      technology: "AWS MWAA · Airflow",
      subtitle: "Orchestration & Pipeline Management",
      color: "#f97316",
      icon: "Workflow",
      flows: ["bi", "sql", "ai"],
      panel: {
        overview:
          "The EPS Conduits are Lee's orchestration layer — AWS Managed Workflows for Apache Airflow (MWAA). Every data extraction job, transformation trigger, and pipeline dependency is managed here. Airflow DAGs define when, how, and where data moves from source systems into the platform.",
        responsibilities: [
          "Schedule and execute extraction jobs for all source systems",
          "Manage extraction DAGs for Oracle, MSSQL, Falcon, DSI, and M&A sources",
          "Handle retry logic and failure alerting for all pipeline operations",
          "Trigger dbt transformation runs after successful data loads",
          "Provide centralized monitoring for all pipeline execution history",
          "Version-controlled DAG deployment via GitHub CI/CD integration",
        ],
        currentState:
          "MWAA operational with DAGs running for Falcon and DSI subscriber extraction. Template-based DAG pattern established for rapid new source onboarding. Pipeline monitoring active with failure alerting configured.",
        futureState:
          "Fully automated source onboarding via parameterized DAG templates. Dynamic DAG generation for new acquisition sources. Real-time pipeline health dashboard with SLA monitoring and proactive alerting.",
        businessValue:
          "Centralized orchestration means all data pipeline operations are monitored, alertable, and manageable in one place — eliminating the operational overhead of maintaining 77+ independent pipeline systems.",
        dependencies: ["Sensor Array (Source Systems)", "Data Transport Network (GCS)"],
        strategicImportance:
          "The EPS Conduits' reusable DAG template pattern is what makes acquisition integration fast. A new source is a configuration, not a development project — reducing engineering cost per acquisition dramatically.",
      },
    },
  },
  {
    id: "data-transport",
    type: "shipSystem",
    position: { x: 380, y: 340 },
    data: {
      shipSystem: "Data Transport Network",
      technology: "GCP · GCS",
      subtitle: "Storage Bucket · Landing Zone",
      color: "#a78bfa",
      icon: "HardDrive",
      flows: ["bi", "sql", "ai"],
      panel: {
        overview:
          "The Data Transport Network is Google Cloud Storage (GCS) — the central landing zone where all source data arrives before entering BigQuery. GCS serves as the raw ingestion buffer, decoupling extraction from transformation and providing a durable, cost-effective staging layer.",
        responsibilities: [
          "Serve as the primary landing zone for all Airflow-extracted data",
          "Buffer data between extraction and BigQuery ingestion",
          "Store raw source files (CSV, JSON, Parquet) before transformation",
          "Provide backup and recovery capabilities for raw data",
          "Support large-scale initial historical loads for new acquisitions",
          "Enable cost-effective long-term raw data retention",
        ],
        currentState:
          "GCS Storage Bucket operational as landing zone for all Airflow extraction outputs. Raw data organized by source and date partition. BigQuery load jobs configured to ingest from GCS on schedule.",
        futureState:
          "Automated schema detection on ingest. Event-driven BigQuery load triggers on new file arrival. Tiered storage policies for cost optimization. Cross-region replication for disaster recovery.",
        businessValue:
          "GCS decoupling between extraction and transformation means extraction failures and transformation failures are independent — a transformation issue does not require re-extraction, and raw data is always preserved for reprocessing.",
        dependencies: ["EPS Conduits (MWAA)", "Warp Core (BigQuery)"],
        strategicImportance:
          "The data transport layer's durability and scalability is what makes large historical acquisition data loads practical. A newly acquired company's entire data history can be landed in GCS and processed incrementally — no artificial constraints on historical depth.",
      },
    },
  },
  {
    id: "warp-core",
    type: "shipSystem",
    position: { x: 230, y: 500 },
    data: {
      shipSystem: "Warp Core",
      technology: "GCP · BigQuery",
      subtitle: "Raw · Bronze · Silver · Gold · AI/Semantic",
      color: "#22d3ee",
      icon: "Zap",
      flows: ["bi", "sql", "ai"],
      panel: {
        overview:
          "The Warp Core is GCP BigQuery — Lee's central data warehouse and the processing engine for the entire medallion architecture. It hosts all five data layers (Raw, STG/Bronze, INT/Silver, MRT/Gold, AI/Semantic), executes all dbt models, serves all three analytical access patterns (BI, SQL, Conversational AI), and provides the computational foundation for both current and future AI workloads.",
        responsibilities: [
          "Raw Layer: Exact copy of source data with source timestamps and no transformations",
          "STG/Bronze Layer: Cleaned, typed, and deduplicated source data with quality validation",
          "INT/Silver Layer: Source-specific business models with entity relationships resolved",
          "MRT/Gold Layer: Canonical enterprise models — Common Subscriber Model and beyond",
          "AI/Semantic Layer: Governed, AI-ready models with full metadata and access controls",
          "Query execution for BI dashboards, direct SQL, and conversational AI-generated queries",
        ],
        currentState:
          "All five medallion layers operational. Canonical subscriber model live in Gold layer for DSI and Falcon. AI/Semantic layer in active development. Direct SQL and BI access operational. Conversational AI query execution integrated.",
        futureState:
          "All 77+ property data in canonical Gold models. Full enterprise semantic layer across subscriber, advertising, content, and financial domains. BigQuery ML models integrated for in-database AI inference. Real-time streaming ingestion for high-frequency sources.",
        businessValue:
          "Serverless scaling means BigQuery handles the full analytical load of Lee's growing data estate without infrastructure provisioning. Native GCP integration with Vertex AI enables AI models to query data without external API calls — faster, cheaper, more secure.",
        dependencies: [
          "Data Transport Network (GCS)",
          "Main Computer (dbt)",
          "Navigation Computer (Governance)",
          "AI Core (Vertex AI)",
        ],
        strategicImportance:
          "The Warp Core is the singular execution engine for all analytical work at Lee. Its performance, scalability, and native AI integration make it the foundational infrastructure decision on which the entire data modernization strategy depends.",
      },
    },
  },
  {
    id: "main-computer",
    type: "shipSystem",
    position: { x: 640, y: 500 },
    data: {
      shipSystem: "Main Computer",
      technology: "dbt · GitHub",
      subtitle: "Transformation · Semantic Governance",
      color: "#f59e0b",
      icon: "Code2",
      flows: ["ai"],
      panel: {
        overview:
          "The Main Computer is dbt (data build tool) — Lee's transformation and semantic governance engine. dbt manages all SQL transformations across all five medallion layers, enforces schema contracts, runs automated data quality tests at every layer transition, and maintains the lineage metadata that powers governance. All dbt models are version-controlled in GitHub with CI/CD deployment pipelines.",
        responsibilities: [
          "Define and execute all SQL transformations from Raw through AI/Semantic",
          "Enforce schema contracts at every layer boundary with automated testing",
          "Run data quality tests (null checks, uniqueness, referential integrity) on promotion",
          "Maintain full lineage metadata from source tables to canonical models",
          "Generate semantic documentation for Dataplex and AI context assembly",
          "Provide the canonical model definitions that power the Common Subscriber Model",
        ],
        currentState:
          "40+ active dbt models across all five layers. Canonical subscriber models for DSI and Falcon live in Gold. Company X integration models drafted and tested. GitHub integration for version control and CI/CD deployment active.",
        futureState:
          "200+ dbt models covering subscriber, advertising, content, and financial domains. Automated model generation for new acquisition mappings. dbt Semantic Layer fully integrated with Vertex AI context assembly. Real-time model documentation published to data catalog.",
        businessValue:
          "dbt's modular, testable model structure means new canonical models can be built by reusing existing patterns — dramatically reducing the development cost of extending the platform to new domains or new acquisitions.",
        dependencies: ["Warp Core (BigQuery)", "Navigation Computer (Governance)", "AI Core (Vertex AI)"],
        strategicImportance:
          "dbt is the Main Computer because it is where all institutional data knowledge is encoded. The canonical model definitions, business logic, KPI calculations, and quality rules that make the platform trustworthy all live in dbt — version-controlled, documented, and testable.",
      },
    },
  },
  {
    id: "nav-computer",
    type: "shipSystem",
    position: { x: 80, y: 680 },
    data: {
      shipSystem: "Navigation Computer",
      technology: "Dataplex · Governance",
      subtitle: "Policy · Metadata · Access Control",
      color: "#10b981",
      icon: "Shield",
      flows: ["ai"],
      panel: {
        overview:
          "The Navigation Computer is Lee's governance layer, powered by Google Cloud Dataplex. It manages metadata cataloguing for all data assets across every layer, enforces access policies for all data access patterns, conducts policy checks in the conversational AI flow, and maintains the audit trail for regulatory compliance. Governance is architecturally enforced — it cannot be bypassed.",
        responsibilities: [
          "Catalogue all BigQuery assets (tables, views, columns) with business metadata",
          "Enforce column-level and row-level access controls on Gold and AI/Semantic layers",
          "Conduct policy checks in the conversational AI flow before AI query generation",
          "Maintain audit logs for all data access events across all consumption patterns",
          "Provide data lineage visualization from source to Gold for any column or table",
          "Manage data classification (PII, sensitive, public) with automated tagging",
        ],
        currentState:
          "Dataplex cataloguing operational for BigQuery assets. Policy checks integrated into conversational AI flow as mandatory step. Column-level security active on Gold layer. Audit logging enabled for all query patterns.",
        futureState:
          "Automated lineage tracking for every transformation from source to AI/Semantic. Real-time policy check with millisecond latency for conversational AI. Self-service data access request and approval workflows. Automated PII detection and classification.",
        businessValue:
          "Governance operating as a background service means business users interact with data through any access pattern without needing to understand data access rules — compliance is enforced automatically, not through user training.",
        dependencies: ["Warp Core (BigQuery)", "Main Computer (dbt)", "Universal Translator (Conv. AI)"],
        strategicImportance:
          "The Navigation Computer is what separates Lee's AI platform from an ungoverned data experiment. Every AI-generated response is conditionally authorized. Every data access event is logged. This is the architectural feature that makes enterprise-scale AI deployment responsible, not reckless.",
      },
    },
  },
  {
    id: "universal-translator",
    type: "shipSystem",
    position: { x: 380, y: 680 },
    data: {
      shipSystem: "Universal Translator",
      technology: "Conversational AI · Teams",
      subtitle: "AI Orchestration · Context Assembly",
      color: "#a78bfa",
      icon: "MessageSquare",
      flows: ["ai"],
      panel: {
        overview:
          "The Universal Translator is Lee's conversational analytics layer — the interface that translates natural language business questions into governed, executable data queries. It encompasses Microsoft Teams integration, AI Orchestration, and Context Assembly. Together they bridge the gap between human intent and trusted enterprise data.",
        responsibilities: [
          "Receive natural language questions from business users via Microsoft Teams",
          "Forward requests to AI Orchestration for context enrichment",
          "Assemble context bundles from dbt Semantic Layer, Markdown docs, and Dataplex metadata",
          "Submit context bundles for governance policy checks before AI engagement",
          "Deliver enriched, governance-approved prompts to Vertex AI for SQL generation",
          "Return grounded, sourced natural language responses to business users",
        ],
        currentState:
          "Teams integration configured. AI Orchestration layer operational. Context Assembly retrieving metadata from dbt Semantic Layer and Dataplex. Governance policy check integration active. End-to-end conversational flow tested.",
        futureState:
          "Multi-turn conversations with memory across session. Proactive insight delivery (push, not just pull). Voice interface for mobile and meeting room scenarios. Conversational AI available across all communication channels, not just Teams.",
        businessValue:
          "Business users get answers to data questions in the tools they already use (Teams) without learning BI tools, SQL, or data catalog navigation. This is the highest-leverage user experience investment in the data platform.",
        dependencies: [
          "Navigation Computer (Governance)",
          "AI Core (Vertex AI)",
          "Warp Core (BigQuery)",
          "Main Computer (dbt)",
        ],
        strategicImportance:
          "The Universal Translator is the front door to the entire data platform for non-technical users. Its adoption rate is the primary measure of platform democratization success — and the precondition for deploying agentic AI workflows that business users actually interact with.",
      },
    },
  },
  {
    id: "ai-core",
    type: "shipSystem",
    position: { x: 680, y: 680 },
    data: {
      shipSystem: "AI Core",
      technology: "Vertex AI · Gemini",
      subtitle: "Language Understanding · SQL Generation",
      color: "#ec4899",
      icon: "Brain",
      flows: ["ai"],
      panel: {
        overview:
          "The AI Core is Lee's reasoning engine — Google Cloud Vertex AI with Gemini models. In the conversational analytics flow, Vertex AI receives governance-approved, context-enriched prompts and generates SQL queries against BigQuery. Gemini provides the language understanding that translates business questions into precise, executable queries with dry-run validation before execution.",
        responsibilities: [
          "Receive enriched prompts from Context Assembly after governance approval",
          "Understand natural language questions in the context of Lee's data model",
          "Generate semantically correct SQL queries against BigQuery canonical models",
          "Validate generated SQL with dry-run execution before live query submission",
          "Return grounded, sourced responses based on actual query results",
          "Support future agentic workflows operating on governed enterprise data",
        ],
        currentState:
          "Vertex AI and Gemini integrated with AI Orchestration layer. SQL generation operational for canonical subscriber model queries. Dry-run validation active. Integration with Dataplex metadata for contextual accuracy.",
        futureState:
          "Multi-model support for different query complexity tiers. In-database BigQuery ML inference for predictive analytics. Agentic reasoning for multi-step analytical tasks. Fine-tuned models on Lee's domain-specific data and terminology.",
        businessValue:
          "AI-generated SQL grounded in semantic context (dbt models + Dataplex metadata) produces significantly more accurate queries than generic LLMs — meaning business users get correct answers, not plausible-sounding hallucinations.",
        dependencies: [
          "Navigation Computer (Governance)",
          "Universal Translator (Conv. AI)",
          "Warp Core (BigQuery)",
          "Main Computer (dbt)",
        ],
        strategicImportance:
          "The AI Core operating within GCP's security boundary is a critical architectural advantage — enterprise data never leaves Lee's cloud environment for AI processing. This is the technical foundation for responsible AI deployment at scale.",
      },
    },
  },
  {
    id: "holodeck",
    type: "shipSystem",
    position: { x: 860, y: 500 },
    data: {
      shipSystem: "Holodeck",
      technology: "Looker · DOMO",
      subtitle: "BI Dashboards · Visual Analytics",
      color: "#3b82f6",
      icon: "BarChart3",
      flows: ["bi"],
      panel: {
        overview:
          "The Holodeck is Lee's business intelligence and visualization layer — Looker and DOMO connecting to the Gold layer of BigQuery. Business users explore canonical data through interactive dashboards, scheduled reports, and ad-hoc visualizations. Both tools consume the Common Subscriber Model and all standardized enterprise metrics, ensuring consistent definitions across every report.",
        responsibilities: [
          "Provide self-service dashboard creation for business and editorial teams",
          "Deliver scheduled reports and executive summary views",
          "Enforce data consistency through connections to Gold layer canonical models",
          "Enable cross-property performance comparison through shared metric definitions",
          "Support ad-hoc data exploration without engineering intervention",
          "Provide role-based dashboard access aligned with Dataplex governance policies",
        ],
        currentState:
          "Looker and DOMO operational with connections to BigQuery Gold layer. Subscriber dashboards live for DSI and Falcon properties. Cross-property comparison views available. Direct SQL access path operational for technical analysts.",
        futureState:
          "Automated dashboard generation for new acquisition properties upon canonical model completion. AI-assisted dashboard building within Looker. Natural language to visualization pipeline via Conversational AI integration. Real-time streaming dashboards for operational metrics.",
        businessValue:
          "Editorial leadership, revenue teams, and property managers have self-service access to trusted, consistent data without submitting engineering tickets for every report. Cross-property subscriber benchmarking becomes a routine business activity.",
        dependencies: ["Warp Core (BigQuery)", "Navigation Computer (Governance)"],
        strategicImportance:
          "The Holodeck is currently the primary interface for most Lee data consumers. Its connection to canonical Gold models is what makes the platform trustworthy — business users are not seeing raw data, but governed, tested, canonical enterprise analytics.",
      },
    },
  },
  {
    id: "mission-specialists",
    type: "shipSystem",
    position: { x: 380, y: 860 },
    data: {
      shipSystem: "Mission Specialists",
      technology: "Analysts · Business Users · Agentic Layer",
      subtitle: "The Consumers of Enterprise Intelligence",
      color: "#10b981",
      icon: "Users",
      flows: ["bi", "sql", "ai"],
      panel: {
        overview:
          "Mission Specialists are the humans (and eventually agents) who consume value from the USS Lee Enterprise data platform. They include editorial leaders, revenue teams, property managers, data analysts, and the future Agentic Layer — autonomous AI systems that operate on governed enterprise data. Three access patterns serve different specialist types: BI Dashboards, Direct SQL, and Conversational AI.",
        responsibilities: [
          "Editorial teams: content performance analysis, audience insights, trend identification",
          "Revenue teams: advertising yield analysis, subscriber acquisition ROI, cross-property comparison",
          "Property managers: local performance benchmarking against enterprise portfolio",
          "Data analysts: advanced analysis via direct SQL on governed BigQuery models",
          "M&A teams: acquisition integration monitoring and cross-property synergy analysis",
          "Agentic Layer (future): autonomous workflows for routine analysis and proactive insights",
        ],
        currentState:
          "BI access via Looker and DOMO operational. Direct SQL access available for technical analysts through governed BigQuery connections. Conversational AI access in active deployment. Agentic Layer architecture defined for Phase 3.",
        futureState:
          "All business users have self-service analytical access through their preferred interface (BI, SQL, or natural language). Agentic AI proactively delivers insights without requiring user-initiated queries. Analytics adoption rate above 70% across all properties.",
        businessValue:
          "When Mission Specialists can answer their own analytical questions through trusted platform data rather than submitting tickets, the data team's capacity shifts from fulfillment to innovation — a fundamental upgrade in organizational analytical capability.",
        dependencies: [
          "Holodeck (BI Dashboards)",
          "Universal Translator (Conv. AI)",
          "Warp Core (BigQuery)",
        ],
        strategicImportance:
          "Mission Specialists are both the customers and the ultimate measure of the platform's success. Platform adoption rate, question-to-answer latency, and business decision quality are the KPIs that prove the data modernization created real enterprise value.",
      },
    },
  },
];

export const ARCHITECTURE_EDGES: Edge<FlowEdgeData>[] = [
  {
    id: "e-sensor-eps",
    source: "sensor-array",
    target: "eps-conduits",
    type: "flowEdge",
    data: { flows: ["bi", "sql", "ai"], colors: FLOW_COLORS },
  },
  {
    id: "e-eps-transport",
    source: "eps-conduits",
    target: "data-transport",
    type: "flowEdge",
    data: { flows: ["bi", "sql", "ai"], colors: FLOW_COLORS },
  },
  {
    id: "e-transport-warp",
    source: "data-transport",
    target: "warp-core",
    type: "flowEdge",
    data: { flows: ["bi", "sql", "ai"], colors: FLOW_COLORS },
  },
  {
    id: "e-warp-main",
    source: "warp-core",
    target: "main-computer",
    type: "flowEdge",
    data: { flows: ["ai"], colors: FLOW_COLORS },
  },
  {
    id: "e-warp-holodeck",
    source: "warp-core",
    target: "holodeck",
    type: "flowEdge",
    data: { flows: ["bi"], colors: FLOW_COLORS },
  },
  {
    id: "e-warp-specialists-sql",
    source: "warp-core",
    target: "mission-specialists",
    type: "flowEdge",
    data: { flows: ["sql"], colors: FLOW_COLORS, label: "Direct SQL" },
  },
  {
    id: "e-holodeck-specialists",
    source: "holodeck",
    target: "mission-specialists",
    type: "flowEdge",
    data: { flows: ["bi"], colors: FLOW_COLORS },
  },
  {
    id: "e-main-nav",
    source: "main-computer",
    target: "nav-computer",
    type: "flowEdge",
    data: { flows: ["ai"], colors: FLOW_COLORS },
  },
  {
    id: "e-nav-aicore",
    source: "nav-computer",
    target: "ai-core",
    type: "flowEdge",
    data: { flows: ["ai"], colors: FLOW_COLORS },
  },
  {
    id: "e-aicore-translator",
    source: "ai-core",
    target: "universal-translator",
    type: "flowEdge",
    data: { flows: ["ai"], colors: FLOW_COLORS },
  },
  {
    id: "e-translator-specialists",
    source: "universal-translator",
    target: "mission-specialists",
    type: "flowEdge",
    data: { flows: ["ai"], colors: FLOW_COLORS },
  },
];
