export interface AcquisitionStep {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  layer: "intake" | "raw" | "bronze" | "silver" | "gold" | "semantic" | "access";
  color: string;
  bgColor: string;
  description: string;
  technicalDetail: string;
  duration: string;
}

export const ACQUISITION_STEPS: AcquisitionStep[] = [
  {
    id: "detection",
    step: 1,
    title: "Acquisition Detected",
    subtitle: "M&A Assets Identified",
    layer: "intake",
    color: "#f59e0b",
    bgColor: "rgba(245,158,11,0.1)",
    description:
      "{{company}} enters the Lee Enterprises ecosystem. Source systems, data assets, and subscriber records are catalogued and prioritized for ingestion.",
    technicalDetail:
      "Source connectors configured. Airflow DAG template cloned and parameterized for {{company}} extraction schedule. Initial data profiling completed.",
    duration: "Days 1 – 3",
  },
  {
    id: "raw",
    step: 2,
    title: "Data Lands in Raw Layer",
    subtitle: "GCS → BigQuery Raw",
    layer: "raw",
    color: "#94a3b8",
    bgColor: "rgba(148,163,184,0.1)",
    description:
      "Raw subscriber and operational data extracted from {{company}} source systems and loaded into GCS Storage Bucket, then ingested into BigQuery Raw layer without transformation.",
    technicalDetail:
      "Full historical load via MWAA/Airflow DAG. Data stored in original format with source timestamps intact. Zero transformations applied. Audit trail established.",
    duration: "Days 3 – 7",
  },
  {
    id: "bronze",
    step: 3,
    title: "Bronze Layer Processing",
    subtitle: "Standardization & Cleaning",
    layer: "bronze",
    color: "#cd7f32",
    bgColor: "rgba(205,127,50,0.1)",
    description:
      "Raw data is standardized: null handling, type casting, deduplication, and automated quality checks. {{company}} data becomes structurally consistent with Lee platform standards.",
    technicalDetail:
      "dbt STG/Bronze models execute. Schema contracts enforced. Automated data quality tests run. Failures flagged for remediation before promotion.",
    duration: "Days 7 – 14",
  },
  {
    id: "silver",
    step: 4,
    title: "Silver Layer Modeling",
    subtitle: "Source-Specific Business Logic",
    layer: "silver",
    color: "#94a3b8",
    bgColor: "rgba(148,163,184,0.15)",
    description:
      "{{company}} subscribers are modeled using Lee's established Silver-layer patterns. Source-specific business rules and entity relationships are applied and documented in dbt.",
    technicalDetail:
      "INT/Silver dbt models built for {{company}}. Source-specific subscriber model created ({{company}} Subscribers Model). Cross-property join keys established.",
    duration: "Days 14 – 21",
  },
  {
    id: "gold",
    step: 5,
    title: "Canonical Model Mapping",
    subtitle: "Common Subscriber Model — Gold Layer",
    layer: "gold",
    color: "#fbbf24",
    bgColor: "rgba(251,191,36,0.1)",
    description:
      "{{company}} subscribers are mapped to the enterprise Common Subscriber Model — the same canonical definition used by all Lee properties. Shared KPI definitions inherited automatically.",
    technicalDetail:
      "MRT/Gold canonical mapping applied via dbt. {{company}} is now analytically comparable to all 77+ Lee properties. Cross-property subscriber metrics live.",
    duration: "Days 21 – 28",
  },
  {
    id: "semantic",
    step: 6,
    title: "AI/Semantic Layer Activation",
    subtitle: "Governance Checkpoint → AI Awareness",
    layer: "semantic",
    color: "#0ea5e9",
    bgColor: "rgba(14,165,233,0.1)",
    description:
      "The canonical model is promoted to the AI/Semantic layer. Dataplex governance activates, policy checks run, and AI systems become aware of {{company}} data with appropriate access controls.",
    technicalDetail:
      "AI/Semantic dbt models deployed. Context files updated with {{company}} metadata. Dataplex catalogues new assets. Vertex AI + Gemini can now query {{company}} data through governed pathways.",
    duration: "Days 28 – 35",
  },
  {
    id: "access",
    step: 7,
    title: "Business Users — Full Access",
    subtitle: "Integration Complete",
    layer: "access",
    color: "#10b981",
    bgColor: "rgba(16,185,129,0.1)",
    description:
      "Business users immediately compare {{company}} performance against any Lee property. AI responds to natural language questions about the new acquisition. Cross-property benchmarking is live.",
    technicalDetail:
      "Looker/DOMO dashboards automatically include Company X. Conversational AI responds to natural language queries. Editorial and advertising teams have full analytical access.",
    duration: "Days 35 – 42",
  },
];
