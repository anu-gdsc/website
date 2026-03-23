import Container from "@/components/ui/container";

const stats = [
    { value: "500+", label: "Expected Attendees" },
    { value: "15+", label: "Speakers" },
    { value: "8", label: "Sessions & Workshops" },
    { value: "4", label: "Core Tracks" },
];

export default function Stats() {
    return (
        <section className="border-b border-white/10 bg-zinc-950">
            <Container>
                <div className="grid gap-6 py-14 sm:grid-cols-2 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <p className="text-3xl font-semibold md:text-4xl">{stat.value}</p>
                            <p className="mt-2 text-sm text-white/65">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}