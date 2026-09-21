// Central place for links and numbers used across the site.
// TODO(content): replace the placeholder values marked below with real ones.

export const REGISTER_URL = "https://campus.hellorubric.com/?s=9746";

// TODO(content): point this at the real applications form (Google Form, Notion, etc.)
export const APPLY_URL = "https://forms.gle/REPLACE_ME";

export const INSTAGRAM_URL = "https://www.instagram.com/gdg_anu/";
export const GDG_COMMUNITY_URL =
  "https://gdg.community.dev/gdg-on-campus-the-australian-national-university-canberra-australia/";

// TODO(content): real contact email
export const CONTACT_EMAIL = "hello@gdganu.com";

// Members and mentors are the club's own figures. Events (9 in 2026) come from the Hellorubric dashboard.
export const STATS = [
  { value: 300, suffix: "+", label: "Members", color: "#4285F4" },
  { value: 9, suffix: "", label: "Events in 2026", color: "#EA4335" },
  { value: 5, suffix: "", label: "Professional mentors", color: "#FBBC05" },
  { value: 3, suffix: "", label: "Current projects", color: "#34A853" },
] as const;

export const TICKER = [
  "Tech talks",
  "Workshops",
  "Study sessions",
  "Coffee catchups",
  "Speaker series",
  "Career nights",
  "Real projects",
  "Socials",
];

export const NAV_LINKS = [
  { name: "About", href: "/#about" },
  { name: "Events", href: "/#events" },
  { name: "Projects", href: "/#projects" },
  { name: "Team", href: "/#team" },
  { name: "Join us", href: "/#join" },
  { name: "Sponsors", href: "/#sponsors" },
] as const;
