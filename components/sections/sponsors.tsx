import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

const sponsors = ["Google", "ANU", "Startup Partner", "Community Partner", "Tech Sponsor"];

export default function Sponsors() {
    return (
        <section id="sponsors" className="border-b border-white/10 bg-black py-20 md:py-28">
            <Container>
                <SectionTitle
                    eyebrow="Sponsors"
                    title="Backed by community and ecosystem partners"
                    description="Showcase the institutions, companies, and communities powering the event."
                />

                <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                    {sponsors.map((sponsor) => (
                        <div
                            key={sponsor}
                            className="flex h-28 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-sm font-medium text-white/75"
                        >
                            {sponsor}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}