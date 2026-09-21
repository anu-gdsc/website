// Local fallback for the org chart. Used when Sanity has no team documents.
// Names/roles mirror scripts/seed-sanity.mjs.

export type TeamMember = {
  name: string;
  role: string;
  department: "leadership" | "operations" | "projects";
  subTeam?: string | null;
  image?: string | null;
  github?: string | null;
  linkedin?: string | null;
};

export const fallbackTeam: TeamMember[] = [
  { name: "Saheb Yuvraj Singh", role: "President", department: "leadership" },
  { name: "Sam",     role: "VP Operations",     department: "leadership" },
  { name: "Boris",   role: "VP Projects",       department: "leadership" },
  { name: "Aleeyah", role: "Secretary",         department: "leadership" },
  { name: "Junjun",  role: "Treasurer",         department: "leadership" },

  { name: "Luc",     role: "Events Lead",       department: "operations", subTeam: "Events" },
  { name: "Hemonsi", role: "Sponsorships Lead", department: "operations", subTeam: "Sponsorships" },
  { name: "Rituka",  role: "Marketing Lead",    department: "operations", subTeam: "Marketing" },
  { name: "Aliya",   role: "P&C Lead",          department: "operations", subTeam: "People & Culture" },

  { name: "Pranav",  role: "Tech Lead",         department: "projects",   subTeam: "Tech" },
];
