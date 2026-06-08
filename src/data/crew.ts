import { CREW_CONFIG } from './mission-config';

export interface CrewMember {
  id: string;
  name: string;
  rank: string;
  role: string;
  photo: string;
  strategicDomain: string;
  bio: string;
  division: 'command' | 'operations' | 'sciences';
}

// TNG uniform division colors
export const DIVISION_COLORS: Record<CrewMember['division'], { color: string; glow: string; ring: string }> = {
  command:    { color: '#cc3333', glow: 'rgba(204,51,51,0.35)',    ring: 'rgba(204,51,51,0.5)'  },
  operations: { color: '#c9a227', glow: 'rgba(201,162,39,0.35)',   ring: 'rgba(201,162,39,0.5)' },
  sciences:   { color: '#3a82c4', glow: 'rgba(58,130,196,0.35)',   ring: 'rgba(58,130,196,0.5)' },
};

const BASE_CREW: CrewMember[] = [
  {
    id: "fletcher",
    name: "Virginia Fletcher",
    rank: "Captain",
    role: "Chief Information Officer",
    photo: "/crew/VirginiaFletcher.jpg",
    strategicDomain: "Executive AI & Data Strategy",
    bio: "Commanding the USS Lee Enterprise's mission to transform fragmented data assets into a trusted enterprise intelligence platform.",
    division: "command",
  },
  {
    id: "harlan",
    name: "Zac Harlan",
    rank: "First Officer",
    role: "Platform Architecture",
    photo: "/crew/ZacHarlan.jpeg",
    strategicDomain: "Platform Architecture & Delivery",
    bio: "Overseeing the design and implementation of Lee's medallion architecture, ensuring the platform is built to scale across all 77+ properties.",
    division: "command",
  },
  {
    id: "turner",
    name: "Jonathan Turner",
    rank: "Chief Operations Officer",
    role: "Bridge Operations Lead",
    photo: "/crew/JonathanTurner.jpg",
    strategicDomain: "Operational Excellence & Delivery",
    bio: "Coordinating mission-critical operations across the bridge, ensuring all ship systems remain aligned with strategic objectives.",
    division: "command",
  },
  {
    id: "hadley",
    name: "Matt Hadley",
    rank: "Chief Science Officer",
    role: "Enterprise Data Strategy Lead",
    photo: "/crew/MattHadley.jpg",
    strategicDomain: "Enterprise Data Strategy",
    bio: "Leading the scientific analysis of Lee's data landscape and charting the course toward a fully governed, AI-ready data estate.",
    division: "sciences",
  },
  {
    id: "acker",
    name: "Sheila Acker",
    rank: "Chief Engineer",
    role: "Warp Core Systems",
    photo: "/crew/SheilaAcker.jpg",
    strategicDomain: "Core Infrastructure & Reliability",
    bio: "Maintaining the warp core — the medallion data pipeline — at peak efficiency, keeping data flowing from raw ingestion to AI-ready gold.",
    division: "operations",
  },
  {
    id: "markendorf",
    name: "Stacey Markendorf",
    rank: "Science Officer",
    role: "Data Intelligence & Reconnaissance",
    photo: "/crew/StaceyMarkendorf.jpg",
    strategicDomain: "Data Intelligence & Analytics",
    bio: "Scanning the data frontier for intelligence signals, translating raw findings into actionable insights for command.",
    division: "sciences",
  },
  {
    id: "mueller",
    name: "Ken Mueller",
    rank: "Transporter Chief",
    role: "Platform Integration Engineer",
    photo: "/crew/KenMueller.png",
    strategicDomain: "Systems Integration & Connectivity",
    bio: "Ensuring reliable transport of data across all 77+ source systems, acquisition targets, and downstream consumers without signal loss.",
    division: "operations",
  },
];

// Merge config overrides so rank/role/strategicDomain can be edited in mission-config.ts
export const ACTIVE_CREW: CrewMember[] = BASE_CREW.map((member) => ({
  ...member,
  ...(CREW_CONFIG[member.id] ?? {}),
}));
