export interface CrewMember {
  id: string;
  name: string;
  rank: string;
  role: string;
  photo: string;
  strategicDomain: string;
  bio: string;
}

export const ACTIVE_CREW: CrewMember[] = [
  {
    id: "fletcher",
    name: "Virginia Fletcher",
    rank: "Captain",
    role: "Chief Information Officer",
    photo: "/crew/VirginiaFletcher.jpg",
    strategicDomain: "Executive AI & Data Strategy",
    bio: "Commanding the USS Lee Enterprise's mission to transform fragmented data assets into a trusted enterprise intelligence platform.",
  },
  {
    id: "harlan",
    name: "Zac Harlan",
    rank: "First Officer",
    role: "Platform Architecture",
    photo: "/crew/ZacHarlan.jpeg",
    strategicDomain: "Platform Architecture & Delivery",
    bio: "Overseeing the design and implementation of Lee's medallion architecture, ensuring the platform is built to scale across all 77+ properties.",
  },
  {
    id: "turner",
    name: "Jonathan Turner",
    rank: "Chief Operations Officer",
    role: "Bridge Operations Lead",
    photo: "/crew/JonathanTurner.jpg",
    strategicDomain: "Operational Excellence & Delivery",
    bio: "Coordinating mission-critical operations across the bridge, ensuring all ship systems remain aligned with strategic objectives.",
  },
  {
    id: "hadley",
    name: "Matt Hadley",
    rank: "Chief Science Officer",
    role: "Enterprise Data Strategy Lead",
    photo: "/crew/MattHadley.jpg",
    strategicDomain: "Enterprise Data Strategy",
    bio: "Leading the scientific analysis of Lee's data landscape and charting the course toward a fully governed, AI-ready data estate.",
  },
  {
    id: "acker",
    name: "Sheila Acker",
    rank: "Chief Engineer",
    role: "Warp Core Systems",
    photo: "/crew/SheilaAcker.jpg",
    strategicDomain: "Core Infrastructure & Reliability",
    bio: "Maintaining the warp core — the medallion data pipeline — at peak efficiency, keeping data flowing from raw ingestion to AI-ready gold.",
  },
  {
    id: "markendorf",
    name: "Stacey Markendorf",
    rank: "Science Officer",
    role: "Data Intelligence & Reconnaissance",
    photo: "/crew/StaceyMarkendorf.jpg",
    strategicDomain: "Data Intelligence & Analytics",
    bio: "Scanning the data frontier for intelligence signals, translating raw findings into actionable insights for command.",
  },
  {
    id: "mueller",
    name: "Ken Mueller",
    rank: "Transporter Chief",
    role: "Platform Integration Engineer",
    photo: "/crew/KenMueller.png",
    strategicDomain: "Systems Integration & Connectivity",
    bio: "Ensuring reliable transport of data across all 77+ source systems, acquisition targets, and downstream consumers without signal loss.",
  },
];
