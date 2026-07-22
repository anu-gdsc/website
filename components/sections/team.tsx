"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Container from "@/components/ui/container";

export interface TeamMember {
  name:       string;
  role:       string;
  department: "leadership" | "operations" | "projects";
  image?:     string | null;
  github?:    string | null;
  linkedin?:  string | null;
}

const DEPTS = {
  leadership: { label: "Leadership", color: "#4285F4" },
  operations: { label: "Operations", color: "#FBBC05" },
  projects:   { label: "Projects",   color: "#34A853" },
} as const;

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── Avatar ─────────────────────────────────────────────────────────────
function Avatar({ name, image, color }: { name: string; image?: string | null; color: string }) {
  if (image) {
    return <img src={image} alt={name} className="h-full w-full object-cover" />;
  }
  const initials = name
    .split(/[\s/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div
      className="flex h-full w-full items-center justify-center text-sm font-bold text-white"
      style={{ background: `linear-gradient(135deg, ${color}55, ${color}22)` }}
    >
      {initials}
    </div>
  );
}

// ── Member card ─────────────────────────────────────────────────────────
function MemberCard({ member, color, index }: { member: TeamMember; color: string; index: number }) {
  const hasSocial = !!(member.github || member.linkedin);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: EASE }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 text-center transition-colors hover:border-white/20 hover:bg-white/[0.06]"
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}18`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
      style={{ boxShadow: "none" }}
    >
      <div
        className="h-11 w-11 overflow-hidden rounded-full border-2"
        style={{ borderColor: `${color}40` }}
      >
        <Avatar name={member.name} image={member.image} color={color} />
      </div>
      <p className="mt-2 text-xs font-semibold leading-tight text-white">{member.name}</p>
      <p className="mt-0.5 text-[11px] leading-snug text-white/40">{member.role}</p>
      {hasSocial && (
        <div className="mt-2 flex items-center justify-center gap-1.5">
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
              className="rounded-full border border-white/10 p-1 text-white/35 transition hover:border-white/25 hover:text-white/75"
            >
              <Github className="h-2.5 w-2.5" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="rounded-full border border-white/10 p-1 text-white/35 transition hover:border-white/25 hover:text-white/75"
            >
              <Linkedin className="h-2.5 w-2.5" />
            </a>
          )}
        </div>
      )}
      <span
        className="absolute right-2 top-2 h-1 w-1 rounded-full"
        style={{ background: color, opacity: 0.7 }}
      />
    </motion.div>
  );
}

// ── Dept box ─────────────────────────────────────────────────────────────
function DeptBox({
  dept,
  members,
  color,
  delay,
}: {
  dept: string;
  members: TeamMember[];
  color: string;
  delay: number;
}) {
  if (members.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
    >
      {/* Dept header */}
      <div className="mb-4 flex items-center gap-2">
        <span className="block h-3.5 w-0.5 rounded-full" style={{ background: color }} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          {dept}
        </span>
        <span className="text-[11px] text-white/20">{members.length}</span>
      </div>
      {/* Grid of cards */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {members.map((m, i) => (
          <MemberCard key={m.name} member={m} color={color} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Org connectors (desktop only) ─────────────────────────────────────────
function OrgConnectors({ hasOps, hasProj }: { hasOps: boolean; hasProj: boolean }) {
  const both = hasOps && hasProj;
  return (
    <div aria-hidden="true" className="relative hidden h-16 w-full md:block">
      {/* Vertical down from leadership */}
      <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-px bg-white/10" />
      {both && (
        <>
          {/* Horizontal crossbar */}
          <div className="absolute left-[25%] right-[25%] top-8 h-px bg-white/10" />
          {/* Left drop to Operations */}
          <div className="absolute left-[25%] top-8 h-8 w-px -translate-x-px bg-white/10" />
          {/* Right drop to Projects */}
          <div className="absolute right-[25%] top-8 h-8 w-px translate-x-px bg-white/10" />
        </>
      )}
      {!both && (
        /* Single drop when only one sub-dept */
        <div className="absolute left-1/2 top-8 h-8 w-px -translate-x-px bg-white/10" />
      )}
    </div>
  );
}

// ── Team section ──────────────────────────────────────────────────────────
export default function Team({ members }: { members: TeamMember[] }) {
  const leadership = members.filter(m => m.department === "leadership");
  const operations = members.filter(m => m.department === "operations");
  const projects   = members.filter(m => m.department === "projects");
  const hasSubDepts = operations.length > 0 || projects.length > 0;

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
            The people behind GDG ANU
          </h2>
          <p className="mt-4 text-base leading-7 text-white/55">
            A student-run committee that plans, builds, and runs everything you see.
          </p>
        </motion.div>

        {members.length === 0 ? (
          <p className="text-sm text-white/30">Team details coming soon.</p>
        ) : (
          <div className="flex flex-col items-center">

            {/* ── Leadership row ─────────────────────────── */}
            {leadership.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span
                    className="block h-3.5 w-0.5 rounded-full"
                    style={{ background: DEPTS.leadership.color }}
                  />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                    Leadership
                  </span>
                  <span className="text-[11px] text-white/20">{leadership.length}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {leadership.map((m, i) => (
                    <div key={m.name} className="w-28 shrink-0 sm:w-32">
                      <MemberCard member={m} color={DEPTS.leadership.color} index={i} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Connector lines ─────────────────────────── */}
            {leadership.length > 0 && hasSubDepts && (
              <OrgConnectors
                hasOps={operations.length > 0}
                hasProj={projects.length > 0}
              />
            )}

            {/* ── Operations + Projects ───────────────────── */}
            {hasSubDepts && (
              <div className={`w-full gap-5 mt-8 md:mt-0 ${
                operations.length > 0 && projects.length > 0
                  ? "grid md:grid-cols-2"
                  : "flex justify-center"
              }`}>
                <DeptBox
                  dept="Operations"
                  members={operations}
                  color={DEPTS.operations.color}
                  delay={0.1}
                />
                <DeptBox
                  dept="Projects"
                  members={projects}
                  color={DEPTS.projects.color}
                  delay={0.18}
                />
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
