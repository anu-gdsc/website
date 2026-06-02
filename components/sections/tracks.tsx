import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

type Track = { title: string; desc: string };

export default function Tracks({ tracks }: { tracks: Track[] }) {
  return (
    <section id="projects" className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
      <Container>
        <SectionTitle
          eyebrow="Projects"
          title="What you will build"
          description="Hands-on project tracks where students and members collaborate to build real things together."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="rounded-3xl border border-white/10 bg-black p-6 transition hover:border-white/20 hover:bg-white/[0.03]"
            >
              <div className="mb-5 h-2 w-16 rounded-full bg-[linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)]" />
              <h3 className="text-xl font-semibold">{track.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{track.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
