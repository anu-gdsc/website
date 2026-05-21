import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";
import Image from "next/image";

type Sponsor = { name: string; type: string; logo?: string; website?: string };

export default function Sponsors({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <section id="sponsors" className="border-b border-white/10 bg-black py-20 md:py-28">
      <Container>
        <SectionTitle
          eyebrow="Sponsors"
          title="Backed by community and ecosystem partners"
          description="Showcase the institutions, companies, and communities powering the event."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {sponsors.map((sponsor) => {
            const inner = sponsor.logo ? (
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={120}
                height={48}
                className="max-h-12 w-auto object-contain"
              />
            ) : (
              <span className="text-sm font-medium text-white/75">{sponsor.name}</span>
            );

            return (
              <div
                key={sponsor.name}
                className="flex h-28 items-center justify-center rounded-3xl border border-white/10 bg-white/5 transition hover:border-white/20"
              >
                {sponsor.website ? (
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
