"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Container from "@/components/ui/container";

// ── Types ─────────────────────────────────────────────────────────────
export interface TeamMember {
  name:       string;
  role:       string;
  department: "leadership" | "operations" | "projects";
  image?:     string | null;
  github?:    string | null;
  linkedin?:  string | null;
}

// ── Department config ──────────────────────────────────────────────────
const DEPTS = {
  leadership: { label: "Leadership",  color: "#4285F4", order: 0 },
  operations: { label: "Operations",  color: "#FBBC05", order: 1 },
  projects:   { label: "Projects",    color: "#34A853", order: 2 },
} as const;

const DEPT_ORDER = ["leadership", "operations", "projects"] as const;

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── Avatar ─────────────────────────────────────────────────────────────
function Avatar({ name, image, color }: { name: string; image?: string | null; color: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover"
      />
    );
  }

  const initials = name
    .split(/[\s/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className="flex h-full w-full items-center justify-center text-base font-bold text-white"
      style={{
        background: `linear-gradient(135deg, ${color}55, ${color}25)`,
      }}
    >
      {initials}
    </div>
  );
}

// ── Member card ────────────────────────────────────────────────────────
function MemberCard({
  member,
  color,
  index,
}: {
  member: TeamMember;
  color: string;
  index: number;
}) {
  const hasSocial = !!(member.github || member.linkedin);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center transition-colors hover:border-white/20 hover:bg-white/[0.05]"
      style={{
        boxShadow: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${color}18`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Avatar */}
      <div
        className="h-14 w-14 overflow-hidden rounded-full border-2"
        style={{ borderColor: `${color}40` }}
      >
        <Avatar name={member.name} image={member.image} color={color} />
      </div>

      {/* Name & Role */}
      <p className="mt-3 text-sm font-semibold leading-tight text-white">
        {member.name}
      </p>
      <p className="mt-1 text-xs leading-snug text-white/45">{member.role}</p>

      {/* Social links — only rendered when at least one exists */}
      {hasSocial && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
              className="rounded-full border border-white/10 p-1.5 text-white/40 transition hover:border-white/25 hover:text-white/80"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="rounded-full border border-white/10 p-1.5 text-white/40 transition hover:border-white/25 hover:text-white/80"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      )}

      {/* Dept colour dot — subtle accent in bottom corner */}
      <span
        className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full opacity-60"
        style={{ background: color }}
      />
    </motion.div>
  );
}

// ── Team section ───────────────────────────────────────────────────────
export default function Team({ members }: { members: TeamMember[] }) {
  // Group by department, preserving order
  const grouped = DEPT_ORDER.reduce<Record<string, TeamMember[]>>((acc, key) => {
    acc[key] = members.filter((m) => m.department === key);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  // Only render departments that have at least one member
  const activeDepts = DEPT_ORDER.filter((d) => grouped[d].length > 0);

  return (
    <section id="team" className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
      <Container>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-14 max-w-xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
            The Team
          </p>
          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            The people behind GDSC ANU
          </h2>
          <p className="mt-4 text-base leading-7 text-white/55">
            A student-run committee that plans, builds, and runs everything you see.
          </p>
        </motion.div>

        {/* Department groups */}
        {activeDepts.length === 0 ? (
          <p className="text-sm text-white/30">Team details coming soon.</p>
        ) : (
          <div className="space-y-14">
            {activeDepts.map((deptKey, dIdx) => {
              const dept    = DEPTS[deptKey];
              const group   = grouped[deptKey];

              return (
                <div key={deptKey}>
                  {/* Department label */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: dIdx * 0.05, ease: EASE }}
                    className="mb-6 flex items-center gap-3"
                  >
                    {/* Coloured bar accent */}
                    <span
                      className="block h-5 w-1 rounded-full"
                      style={{ background: dept.color }}
                    />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                      {dept.label}
                    </h3>
                    <span className="text-xs text-white/25">
                      {group.length} {group.length === 1 ? "member" : "members"}
                    </span>
                  </motion.div>

                  {/* Cards grid */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {group.map((member, i) => (
                      <MemberCard
                        key={member.name}
                        member={member}
                        color={dept.color}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
