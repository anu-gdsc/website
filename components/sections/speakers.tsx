import Link from "next/link";
import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";
import { speakers } from "@/data/speakers";

const colorStyles = {
  blue: "bg-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.6)]",
  green: "bg-green-500/50 shadow-[0_0_25px_rgba(34,197,94,0.6)]",
  yellow: "bg-yellow-400/40 shadow-[0_0_25px_rgba(250,204,21,0.6)]",
  red: "bg-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.6)]",
};

export default function Speakers() {
  return (
    <section id="speakers" className="border-b border-white/10 bg-black py-20 md:py-28">
      <Container>
        <SectionTitle
          eyebrow="Speakers"
          title="Meet the voices shaping the day"
          description="Learn from industry leaders across AI, Cloud, and Open Source."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {speakers.map((speaker) => (
            <div key={speaker.name} className={`rounded-3xl p-[2px] ${colorStyles[speaker.color]}`}>
              <div className="rounded-3xl bg-black p-5">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="aspect-[4/5] w-full rounded-2xl object-cover"
                />
                <div className="mt-5">
                  <h3 className="text-lg font-semibold">{speaker.name}</h3>
                  <p className="mt-1 text-sm text-white/65">{speaker.topic}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/speakers"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Meet all speakers
          </Link>
        </div>
      </Container>
    </section>
  );
}
