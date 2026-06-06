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
  dataStandardization: 72,

  /** AI/Semantic layer maturity and governed access paths */
  aiReadiness: 45,

  /** Dataplex governance, lineage, and access control maturity */
  governanceMaturity: 60,

  /** Speed and repeatability of acquisition data integration */
  acquisitionScalability: 55,

  /** Business users able to self-serve without engineering tickets */
  operationalSelfService: 38,
} as const;

// ── Mission Objectives ───────────────────────────────────────────────────────
// status options:
//   'complete'    — green check, full-brightness text
//   'in-progress' — amber check, muted text, "IN PROGRESS" badge
//   'pending'     — dim check, dim text, "PENDING" badge

export const MISSION_OBJECTIVES: { text: string; status: 'complete' | 'in-progress' | 'pending' }[] = [
  { text: 'Establish Canonical Subscriber Models',    status: 'complete'     },
  { text: 'Build Medallion Architecture (5 Layers)', status: 'complete'     },
  { text: 'Deploy dbt Transformation Governance',    status: 'complete'     },
  { text: 'Govern Enterprise Data with Dataplex',    status: 'complete'     },
  { text: 'Validate Acquisition Onboarding Pattern', status: 'complete'     },
  { text: 'Enable Conversational Analytics (Teams)', status: 'in-progress'  },
  { text: 'Activate AI/Semantic Layer',              status: 'in-progress'  },
  { text: 'Prepare Agentic AI Foundation',           status: 'pending'      },
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
    strategicDomain:  'Executive AI & Data Strategy',
  },
  harlan: {
    rank:             'Captain',
    role:             'Mission Commander & Platform Architect',
    strategicDomain:  'Platform Architecture & Delivery',
  },
  turner: {
    rank:             'First Officer',
    role:             'Bridge Operations Lead',
    strategicDomain:  'Operational Excellence & Delivery',
  },
  hadley: {
    rank:             'Chief Science Officer',
    role:             'Enterprise Data Strategy Lead',
    strategicDomain:  'Enterprise Data Strategy',
  },
  acker: {
    rank:             'Chief Engineer',
    role:             'Warp Core Systems',
    strategicDomain:  'Core Infrastructure & Reliability',
  },
  markendorf: {
    rank:             'Data Intelligence Officer',
    role:             'Data Intelligence & Reconnaissance',
    strategicDomain:  'Data Intelligence & Analytics',
  },
  mueller: {
    rank:             'Chief Integration Engineer',
    role:             'Platform Integration Engineer',
    strategicDomain:  'Systems Integration & Connectivity',
  },
};
