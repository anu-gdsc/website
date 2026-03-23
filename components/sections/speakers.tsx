import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

const speakers = [
    { name: "Aarav Mehta", role: "Software Engineer", company: "Google" },
    { name: "Riya Sharma", role: "Product Designer", company: "Canva" },
    { name: "Daniel Lee", role: "Cloud Advocate", company: "Google Cloud" },
    { name: "Emily Chen", role: "Founder", company: "Startup Community" },
];

export default function Speakers() {
    return (
        <section id="speakers" className="border-b border-white/10 bg-black py-20 md:py-28">
            <Container>
                <SectionTitle
                    eyebrow="Speakers"
                    title="Meet the voices shaping the day"
                    description="A mix of engineers, builders, designers, and community leaders."
                />

                <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {speakers.map((speaker) => (
                        <div
                            key={speaker.name}
                            className="rounded-3xl border border-white/10 bg-white/5 p-5"
                        >
                            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-white/10 to-white/5" />
                            <div className="mt-5">
                                <h3 className="text-lg font-semibold">{speaker.name}</h3>
                                <p className="mt-1 text-sm text-white/65">{speaker.role}</p>
                                <p className="text-sm text-white/50">{speaker.company}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}