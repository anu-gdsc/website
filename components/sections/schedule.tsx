import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

type ScheduleItem = { time: string; title: string; desc: string };

export default function Schedule({ items }: { items: ScheduleItem[] }) {
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
