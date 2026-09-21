"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Container from "@/components/ui/container";
import SectionHead from "@/components/ui/section-head";
import Link from "next/link";
import type { TeamMember } from "@/data/team";
import { PROFILE_LINKS } from "@/data/person";

const DEPT = {
  leadership: { label: "Leadership", color: "#4285F4" },
  operations: { label: "Operations", color: "#FBBC05" },
  projects:   { label: "Projects",   color: "#34A853" },
} as const;

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

type TreeNode = { member: TeamMember; children: TreeNode[] };

/** President → execs → team leads (operations under the VP Operations, projects under the VP Projects). */
function buildTree(members: TeamMember[]): TreeNode | null {
  const leadership = members.filter((m) => m.department === "leadership");
  const president = leadership.find((m) => /president/i.test(m.role) && !/vice|vp/i.test(m.role)) ?? leadership[0];
  if (!president) return null;

  const execs = leadership.filter((m) => m !== president);
  const vpOps = execs.find((m) => /operations/i.test(m.role));
  const vpProj = execs.find((m) => /projects/i.test(m.role));

  const attach = (dept: TeamMember["department"], parent: TeamMember | undefined): TreeNode[] =>
    parent ? [] : members.filter((m) => m.department === dept).map((m) => ({ member: m, children: [] }));

  const nodeFor = (m: TeamMember): TreeNode => ({
    member: m,
    children:
      m === vpOps
        ? members.filter((x) => x.department === "operations").map((x) => ({ member: x, children: [] }))
        : m === vpProj
          ? members.filter((x) => x.department === "projects").map((x) => ({ member: x, children: [] }))
          : [],
  });

  // Keep VPs in the middle, secretary/treasurer-style roles on the outside.
  const vps = execs.filter((m) => m === vpOps || m === vpProj);
  const others = execs.filter((m) => m !== vpOps && m !== vpProj);
  const left = others.filter((_, i) => i % 2 === 0);
  const right = others.filter((_, i) => i % 2 === 1);
  const ordered = [...left, ...vps, ...right];

  return {
    member: president,
    children: [
      ...ordered.map(nodeFor),
      ...attach("operations", vpOps),
      ...attach("projects", vpProj),
    ],
  };
}

export default function TeamTree({ members }: { members: TeamMember[] }) {
  const tree = buildTree(members);

  return (
    <section id="team" data-nav-tone="light" className="relative scroll-mt-20 overflow-hidden bg-paper-2 py-24 text-ink md:py-32">
      <Container>
        <SectionHead
          tone="light"
          index="05"
          eyebrow="Meet the team"
          title="The students"
          accent="behind GDG ANU."
          description="A volunteer committee that plans, builds and runs everything you see. Every one of them started as a member."
          color="#34A853"
        />

        {tree ? (
          <>
            {/* Desktop: real hierarchy */}
            <div className="mt-16 hidden overflow-x-auto pb-4 lg:block">
              <div className="mx-auto w-max min-w-full">
                <ul className="org">
                  <TreeItem node={tree} depth={0} />
                </ul>
              </div>
            </div>

            {/* Mobile: grouped list */}
            <div className="mt-12 space-y-10 lg:hidden">
              {(Object.keys(DEPT) as (keyof typeof DEPT)[]).map((d) => {
                const list = members.filter((m) => m.department === d);
                if (!list.length) return null;
                return (
                  <div key={d}>
                    <p className="label-mono mb-4 flex items-center gap-2 text-ink/55">
                      <span className="h-2 w-2 rounded-full" style={{ background: DEPT[d].color }} />
                      {DEPT[d].label}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {list.map((m, i) => (
                        <MemberCard key={m.name} member={m} index={i} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className="mt-10 text-sm text-ink/50">Team details coming soon.</p>
        )}

        <p className="label-mono mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-ink/45">
          {(Object.keys(DEPT) as (keyof typeof DEPT)[]).map((d) => (
            <span key={d} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: DEPT[d].color }} />
              {DEPT[d].label}
            </span>
          ))}
        </p>
      </Container>
    </section>
  );
}

function TreeItem({ node, depth }: { node: TreeNode; depth: number }) {
  return (
    <li>
      <MemberCard member={node.member} index={depth} big={depth === 0} />
      {node.children.length > 0 && (
        <ul>
          {node.children.map((c) => (
            <TreeItem key={c.member.name} node={c} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

function MemberCard({ member, index, big = false }: { member: TeamMember; index: number; big?: boolean }) {
  const color = DEPT[member.department].color;
  const initials = member.name
    .split(/[\s/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.08, ease: EASE }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className={`relative flex flex-col items-center rounded-2xl border border-ink/10 bg-white text-center shadow-[0_1px_0_rgba(11,11,13,0.04),0_12px_30px_-18px_rgba(11,11,13,0.25)] ${
        big ? "w-44 p-5" : "w-full p-3.5 lg:w-[7rem] xl:w-[9rem]"
      }`}
    >
      <span className="absolute inset-x-6 top-0 h-[3px] rounded-b-full" style={{ background: color }} />
      <div
        className={`overflow-hidden rounded-full ${big ? "h-16 w-16" : "h-12 w-12"}`}
        style={{ boxShadow: `0 0 0 3px ${color}33` }}
      >
        {member.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={member.image} alt={member.name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center font-[family-name:var(--font-google)] text-sm font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)` }}
          >
            {initials}
          </div>
        )}
      </div>
      {PROFILE_LINKS[member.name] ? (
        <Link
          href={PROFILE_LINKS[member.name]}
          className={`mt-3 font-semibold leading-tight underline-offset-2 hover:underline ${big ? "text-base" : "text-sm"}`}
        >
          {member.name}
        </Link>
      ) : (
        <p className={`mt-3 font-semibold leading-tight ${big ? "text-base" : "text-sm"}`}>{member.name}</p>
      )}
      <p className="mt-0.5 text-xs leading-snug text-ink/55">{member.role}</p>
      {(member.github || member.linkedin) && (
        <div className="mt-2.5 flex gap-1.5">
          {member.github && (
            <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on GitHub`}
              className="rounded-full border border-ink/10 p-1.5 text-ink/40 transition hover:border-ink/30 hover:text-ink">
              <Github className="h-3 w-3" />
            </a>
          )}
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`}
              className="rounded-full border border-ink/10 p-1.5 text-ink/40 transition hover:border-ink/30 hover:text-ink">
              <Linkedin className="h-3 w-3" />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
