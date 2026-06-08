import { READINESS_VALUES } from './mission-config';

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
    value: READINESS_VALUES.dataStandardization,
    color: "#f59e0b",
    icon: "Database",
    currentState:
      "BigQuery, dbt, and Airflow are operational. However, no canonical semantic model exists across properties — each dataset uses source-specific logic. Phase 1 is establishing the subscription rates canonical model as the first reusable pattern.",
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
    value: READINESS_VALUES.aiReadiness,
    color: "#0ea5e9",
    icon: "Brain",
    currentState:
      "BigQuery and Vertex AI infrastructure is in place. No governed conversational AI path currently exists — analytics requests require BI team tickets. Phase 1 establishes the first governed natural language interface over the subscription rates model.",
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
    value: READINESS_VALUES.governanceMaturity,
    color: "#10b981",
    icon: "Shield",
    currentState:
      "Dataplex is provisioned but governance patterns are not yet established. No systematic data lineage or access policy layer exists across the medallion architecture. Governance design is being built alongside Phase 1.",
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
    value: READINESS_VALUES.acquisitionScalability,
    color: "#f97316",
    icon: "GitMerge",
    currentState:
      "Acquisitions currently require 9–12 months of custom integration work before data becomes analytically useful. No reusable onboarding pattern exists. Phase 1's canonical subscriber model, once proven, becomes the repeatable template for all future acquisitions.",
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
    value: READINESS_VALUES.operationalSelfService,
    color: "#8b5cf6",
    icon: "Users",
    currentState:
      "Looker and Domo dashboards serve routine reporting. Ad-hoc data questions require BI team ticket submission — there is no self-service path for unstructured queries. Phase 1 targets moving routine subscription rate questions out of the ticket queue entirely.",
    targetState:
      "Business users query enterprise data through natural language via Teams integration. Analysts build dashboards without engineering intervention. Self-service rate above 70% for routine data requests.",
    businessImpact:
      "Significant reduction in data engineering tickets for routine reporting. Analytics leadership focuses on strategic insight rather than data plumbing and ticket fulfillment.",
    strategicValue:
      "Self-service is the ultimate measure of platform trust. When business users prefer the platform over workarounds and shadow IT, the modernization has succeeded. This is where ROI becomes compounding.",
  },
];
