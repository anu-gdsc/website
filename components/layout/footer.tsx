import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/container";
import { GDG_COMMUNITY_URL, INSTAGRAM_URL, REGISTER_URL, NAV_LINKS } from "@/data/site";
import { PRESIDENT, PRESIDENT_PATH } from "@/data/person";

const MORE = [
  { name: "Speakers", href: "/speakers" },
  { name: "Schedule", href: "/schedule" },
  { name: "FAQ", href: "/faq" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 pb-10 pt-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:pt-20">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="" width={36} height={36} />
              <p className="text-lg font-semibold">
                GDG <span className="accent-text">ANU</span>
              </p>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">
              A student-run developer community at the Australian National University.
              Build, learn and connect.
            </p>
          </div>

          <FooterCol title="Explore">
            {NAV_LINKS.map((l) => (
              <FooterLink key={l.name} href={l.href}>{l.name}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Event">
            <FooterLink href={REGISTER_URL} external>Register</FooterLink>
            {MORE.map((l) => (
              <FooterLink key={l.name} href={l.href}>{l.name}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Follow">
            <FooterLink href={INSTAGRAM_URL} external>Instagram</FooterLink>
            <FooterLink href={GDG_COMMUNITY_URL} external>GDG Community</FooterLink>
          </FooterCol>
        </div>

        {/* Oversized wordmark */}
        <p
          aria-hidden="true"
          className="select-none whitespace-nowrap text-center font-[family-name:var(--font-google)] text-[clamp(4.5rem,21vw,17rem)] font-bold leading-[0.8] tracking-tighter text-white/[0.045]"
        >
          GDG ANU
        </p>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Google Developer Group on Campus, ANU.</p>
          <p>
            President:{" "}
            <Link href={PRESIDENT_PATH} className="text-white/60 underline-offset-2 transition hover:text-white hover:underline">
              {PRESIDENT.name}
            </Link>
            . Independent student community, not an official Google or ANU site.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label-mono text-white/35">{title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = "group inline-flex items-center gap-1 text-sm text-white/70 transition hover:text-white";
  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
          <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
        </a>
      ) : (
        <Link href={href} className={cls}>{children}</Link>
      )}
    </li>
  );
}
