import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

const tracks = [
    {
        title: "AI & Machine Learning",
        desc: "Explore practical AI workflows, tooling, and student-first innovation.",
    },
    {
        title: "Cloud & DevOps",
        desc: "Learn how modern apps are built, shipped, and scaled in production.",
    },
    {
        title: "Web & Product",
        desc: "From frontend craft to product execution, design better digital experiences.",
    },
    {
        title: "Career & Community",
        desc: "Discover growth paths, open source, teamwork, and developer communities.",
    },
];

export default function Tracks() {
    return (
        <section id="tracks" className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
            <Container>
                <SectionTitle
                    eyebrow="Tracks"
                    title="What you will explore"
                    description="A curated set of tracks covering the most relevant topics for modern student developers."
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