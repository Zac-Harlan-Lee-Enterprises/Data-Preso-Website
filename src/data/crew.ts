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
];
