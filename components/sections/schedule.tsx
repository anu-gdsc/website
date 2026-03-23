import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

const items = [
    { time: "09:00 AM", title: "Registration & Welcome", desc: "Check-in and opening remarks." },
    { time: "10:00 AM", title: "Keynote Session", desc: "A big-picture talk on technology and innovation." },
    { time: "11:30 AM", title: "Track Sessions", desc: "Choose sessions across web, cloud, AI, and career growth." },
    { time: "01:00 PM", title: "Lunch & Networking", desc: "Connect with speakers, peers, and organisers." },
    { time: "02:00 PM", title: "Hands-on Workshops", desc: "Build with guided, practical sessions." },
    { time: "04:00 PM", title: "Closing & Community Connect", desc: "Wrap-up and next steps with GDSC ANU." },
];

export default function Schedule() {
    return (
        <section id="schedule" className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
            <Container>
                <SectionTitle
                    eyebrow="Schedule"
                    title="A full day designed with momentum"
                    description="A sample event flow you can later replace with final timings."
                />

                <div className="mt-12 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.time + item.title}
                            className="grid gap-4 rounded-3xl border border-white/10 bg-black p-6 md:grid-cols-[180px_1fr]"
                        >
                            <div className="text-sm font-semibold text-white/60">{item.time}</div>
                            <div>
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="mt-2 text-sm leading-7 text-white/70">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}