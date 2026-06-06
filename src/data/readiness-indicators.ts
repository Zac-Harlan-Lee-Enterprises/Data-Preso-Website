export interface ReadinessIndicator {
  id: string;
  label: string;
  value: number;
  color: string;
  icon: string;
  currentState: string;
  targetState: string;
  businessImpact: string;
  strategicValue: string;
}

export const READINESS_INDICATORS: ReadinessIndicator[] = [
  {
    id: "data-standardization",
    label: "Data Standardization",
    value: 72,
    color: "#f59e0b",
    icon: "Database",
    currentState:
      "Canonical subscriber model established for DSI and Falcon properties. Bronze and Silver layers operational in BigQuery. dbt handling cross-property transformations with 40+ active models.",
    targetState:
      "All 77+ Lee properties feeding into a unified canonical model. Single KPI definitions across the enterprise. Zero source-specific logic leaking into the BI layer.",
    businessImpact:
      "Eliminates 60–80% of analyst time currently spent on data reconciliation across properties. Single source of truth enables cross-market benchmarking that was previously impossible.",
    strategicValue:
      "Every new capability — AI, advanced analytics, acquisition integration — compounds in value when built on a standardized foundation. This is the strategic multiplier that makes everything else possible.",
  },
  {
    id: "ai-readiness",
    label: "AI Readiness",
    value: 45,
    color: "#0ea5e9",
    icon: "Brain",
    currentState:
      "AI/Semantic layer in BigQuery under active development. Context files (Markdown documentation, dbt metadata, Dataplex metadata) established. Vertex AI and Gemini connected to governance-checked data paths.",
    targetState:
      "Full AI/Semantic layer with governed access paths across all domains. Conversational analytics available to business users via Microsoft Teams. AI models grounded in enterprise knowledge with policy enforcement.",
    businessImpact:
      "Natural language querying replaces ad-hoc BI ticket requests. Business users get trusted answers in seconds rather than submitting reports that take days to fulfill.",
    strategicValue:
      "A governed AI layer is the precondition for enterprise-grade agentic AI. Each governance checkpoint built today enables trusted automation tomorrow — turning the platform into an operating system for the business.",
  },
  {
    id: "governance-maturity",
    label: "Governance Maturity",
    value: 60,
    color: "#10b981",
    icon: "Shield",
    currentState:
      "Dataplex metadata governance operational. Policy checks integrated into conversational AI flow. Column-level access controls enforced on Gold and AI/Semantic layers. Lineage tracking active for dbt transformations.",
    targetState:
      "Automated lineage tracking across all transformations from source to Gold. Attribute-based access control for all data domains. Governance operates as a background service — invisible to users, inviolable in design.",
    businessImpact:
      "Audit-ready data usage across every access pattern. Demonstrated compliance posture reduces regulatory risk as AI capabilities scale across the enterprise.",
    strategicValue:
      "Governance maturity is what separates a trusted enterprise platform from a data swamp. It is the foundation for regulatory confidence, audit readiness, and responsible AI deployment at scale.",
  },
  {
    id: "acquisition-scalability",
    label: "Acquisition Scalability",
    value: 55,
    color: "#f97316",
    icon: "GitMerge",
    currentState:
      "Canonical subscriber model validated with Company X integration scenario. Medallion architecture pattern documented. Airflow DAG templates for new source onboarding available. dbt mapping patterns established.",
    targetState:
      "Any new acquisition maps into the canonical model in 4–8 weeks vs. the historical 9–12 months. Standard onboarding playbook with automated validation gates and monitoring dashboards available from day one.",
    businessImpact:
      "Each acquisition is immediately analytically comparable to the rest of the portfolio. No data dark period. No reconciliation backlog. Faster ROI recognition on every M&A transaction.",
    strategicValue:
      "Acquisition integration speed is a direct financial differentiator. Every month shaved off integration time is a month of faster portfolio insight, cross-property optimization, and AI-powered synergy discovery.",
  },
  {
    id: "operational-self-service",
    label: "Operational Self-Service",
    value: 38,
    color: "#8b5cf6",
    icon: "Users",
    currentState:
      "Looker and DOMO dashboards available for Gold-layer consumption. Direct SQL access available for technical analysts via governed BigQuery paths. Engineering handles most ad-hoc data requests.",
    targetState:
      "Business users query enterprise data through natural language via Teams integration. Analysts build dashboards without engineering intervention. Self-service rate above 70% for routine data requests.",
    businessImpact:
      "Significant reduction in data engineering tickets for routine reporting. Analytics leadership focuses on strategic insight rather than data plumbing and ticket fulfillment.",
    strategicValue:
      "Self-service is the ultimate measure of platform trust. When business users prefer the platform over workarounds and shadow IT, the modernization has succeeded. This is where ROI becomes compounding.",
  },
];
