/**
 * MISSION CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Edit the numbers in this file to update what's displayed on the dashboard.
 * After saving, the dev server hot-reloads instantly.
 * To push to the live site, ask to "deploy to GitHub Pages".
 *
 * All percentages are 0–100.
 */

// ── Bridge Overview ──────────────────────────────────────────────────────────

/** Overall mission progress shown in the radial dial on the Bridge Overview */
export const MISSION_PROGRESS = 78;

// ── Strategic Readiness Indicators ──────────────────────────────────────────
// Each value is shown as a progress bar and percentage on the Bridge Overview.

export const READINESS_VALUES = {
  /** Canonical model coverage across Lee properties */
  dataStandardization: 20,

  /** AI/Semantic layer maturity and governed access paths */
  aiReadiness: 10,

  /** Dataplex governance, lineage, and access control maturity */
  governanceMaturity: 15,

  /** Speed and repeatability of acquisition data integration */
  acquisitionScalability: 20,

  /** Business users able to self-serve without engineering tickets */
  operationalSelfService: 5,
} as const;

// ── Mission Objectives ───────────────────────────────────────────────────────
// status options:
//   'complete'    — green check, full-brightness text
//   'in-progress' — amber check, muted text, "IN PROGRESS" badge
//   'pending'     — dim check, dim text, "PENDING" badge

export const MISSION_OBJECTIVES: { text: string; status: 'complete' | 'in-progress' | 'pending' }[] = [
  { text: 'Prove Canonical Subscriber Model on Subscription Rates', status: 'in-progress' },
  { text: 'Build Medallion Architecture (Bronze → Gold)',           status: 'in-progress' },
  { text: 'Establish dbt Transformation Governance Patterns',       status: 'in-progress' },
  { text: 'Govern Enterprise Data with Dataplex',                   status: 'in-progress' },
  { text: 'Position Acquisition Onboarding Against Canonical Model',status: 'in-progress' },
  { text: 'Enable Natural Language Self-Serve via Teams',           status: 'in-progress' },
  { text: 'Activate AI/Semantic Layer',                             status: 'pending'     },
  { text: 'Prepare Agentic AI Foundation',                          status: 'pending'     },
];

// ── Bridge Crew ───────────────────────────────────────────────────────────────
// Tweak titles, roles, and the small domain tag shown on each crew card.
// 'rank'           — large label above the name (e.g. "Captain")
// 'role'           — subtitle under the name (e.g. "Chief Information Officer")
// 'strategicDomain'— small dim tag at the bottom of the card

export const CREW_CONFIG: Record<string, { rank: string; role: string; strategicDomain: string }> = {
  fletcher: {
    rank:             'Starfleet Command',
    role:             'Chief Information Officer',
    strategicDomain:  'Executive Command & Strategic Alignment',
  },
  harlan: {
    rank:             'Captain',
    role:             'Mission Commander & Platform Architect',
    strategicDomain:  'Mission Architecture & Future Systems',
  },
  turner: {
    rank:             'First Officer',
    role:             'Bridge Operations Lead',
    strategicDomain:  'Operational Excellence & Delivery',
  },
  hadley: {
    rank:             'Chief Science Officer',
    role:             'Enterprise Data Strategy Lead',
    strategicDomain:  'Data Intelligence & Knowledge Systems',
  },
  acker: {
    rank:             'Chief Engineer',
    role:             'Warp Core Systems',
    strategicDomain:  'Core Systems Reliability & Performance',
  },
  markendorf: {
    rank:             'Data Intelligence Officer',
    role:             'Data Intelligence & Reconnaissance',
    strategicDomain:  'Data Intelligence & Automation',
  },
  mueller: {
    rank:             'Chief Integration Engineer',
    role:             'Platform Integration Engineer',
    strategicDomain:  'Systems Integration & Connectivity',
  },
};
