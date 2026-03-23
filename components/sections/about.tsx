import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

export default function About() {
    return (
        <section id="about" className="border-b border-white/10 bg-black py-20 md:py-28">
            <Container>
                <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
                    <SectionTitle
                        eyebrow="About"
                        title="A student-led developer event designed for builders."
                        description="GDSC ANU brings together students, developers, designers, and builders for a day of ideas, practical learning, and community. Expect engaging talks, technical workshops, product thinking, and real conversations with peers and industry speakers."
                    />

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                        <h3 className="text-xl font-semibold">What to expect</h3>
                        <ul className="mt-6 space-y-4 text-white/70">
                            <li>Hands-on workshops across modern developer tools</li>
                            <li>Sessions on AI, cloud, web engineering, and product</li>
                            <li>Networking with peers, mentors, and community builders</li>
                            <li>Opportunities to explore projects and collaborations</li>
                        </ul>
                    </div>
                </div>
            </Container>
        </section>
    );
}