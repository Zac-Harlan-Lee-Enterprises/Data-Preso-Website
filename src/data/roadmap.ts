export interface RoadmapPhase {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  status: "active" | "upcoming" | "future";
  timeframe: string;
  objectives: string[];
  keyDeliverable: string;
  strategicOutcome: string;
  color: string;
}

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: "phase-1",
    number: 1,
    title: "Canonical Subscriber Model",
    subtitle: "The Foundation",
    status: "active",
    timeframe: "2025 – 2026",
    color: "#f59e0b",
    objectives: [
      "Establish medallion architecture: Raw → Bronze → Silver → Gold → AI/Semantic",
      "Deploy canonical subscriber model across all Lee properties",
      "Integrate dbt for transformation governance and semantic modeling",
      "Launch conversational analytics via Microsoft Teams integration",
      "Activate Dataplex governance across all access patterns",
      "Validate acquisition onboarding pattern with Company X scenario",
    ],
    keyDeliverable:
      "A single, reusable subscriber model that makes every Lee property immediately comparable and any new acquisition mappable in weeks — not months.",
    strategicOutcome:
      "Lee Enterprises stops managing data chaos and starts managing a data platform. Every capability built from this point compounds on this canonical foundation.",
  },
  {
    id: "phase-2",
    number: 2,
    title: "Semantic Governance Expansion",
    subtitle: "The Acceleration",
    status: "upcoming",
    timeframe: "2026 – 2027",
    color: "#0ea5e9",
    objectives: [
      "Extend canonical models beyond subscribers to advertising, content, and financial data",
      "Build enterprise-wide semantic layer with cross-domain KPI definitions",
      "Scale conversational analytics to all business units and executive leadership",
      "Implement automated acquisition onboarding playbook with validation gates",
      "Deploy advanced governance with automated lineage and impact analysis",
      "Enable cross-property AI benchmarking and performance analytics",
    ],
    keyDeliverable:
      "A full enterprise semantic layer where every domain — subscribers, advertising, content, finance — participates in shared definitions and AI-ready governed data.",
    strategicOutcome:
      "Lee Enterprises operates with a single version of business truth. Acquisitions integrate in weeks. AI queries carry enterprise-grade authority across all domains.",
  },
  {
    id: "phase-3",
    number: 3,
    title: "Agentic Enterprise AI",
    subtitle: "The Transformation",
    status: "future",
    timeframe: "2027 – 2028",
    color: "#8b5cf6",
    objectives: [
      "Deploy autonomous agentic workflows for routine analytics and reporting",
      "Enable proactive AI recommendations in editorial and advertising workflows",
      "Build self-healing data pipelines with automated quality remediation",
      "Achieve cross-property AI benchmarking and performance prediction",
      "Establish Lee Enterprises as a data-native media organization",
      "Position data platform as core competitive infrastructure",
    ],
    keyDeliverable:
      "Agentic AI operating on trusted, governed enterprise data — making proactive recommendations, automating routine analytical work, and surfacing strategic insights without being asked.",
    strategicOutcome:
      "The data platform becomes the operating system of the business. Lee Enterprises competes not just as a media company, but as a technology-enabled enterprise where intelligence is embedded in every decision.",
  },
];
