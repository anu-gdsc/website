import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";

type FaqItem = { q: string; a: string };

export default function FAQ({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section id="faq" className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
      <Container>
        <SectionTitle
          eyebrow="FAQ"
          title="Questions, answered"
          description="Simple answers for attendees before they register."
        />

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-3xl border border-white/10 bg-black p-6">
              <h3 className="text-lg font-semibold">{faq.q}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{faq.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
