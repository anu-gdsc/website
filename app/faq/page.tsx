"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, HelpCircle, Mail, ShieldCheck, Ticket } from "lucide-react";

import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";
import PageHero from "@/components/layout/page-hero";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQGroup = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: FAQItem[];
};

const faqGroups: FAQGroup[] = [
  {
    title: "Registration",
    icon: Ticket,
    items: [
      {
        question: "Who can attend the event?",
        answer:
          "The event is designed for students, aspiring developers, designers, and builders interested in learning, community, and practical exposure to modern technology.",
      },
      {
        question: "Do I need prior experience to register?",
        answer:
          "No. The event can be structured for a mix of beginners, intermediate learners, and more experienced student builders depending on the final sessions.",
      },
      {
        question: "How do I register?",
        answer:
          "You can connect the registration CTA to your preferred Google Form, ticketing platform, or chapter event page when registrations go live.",
      },
      {
        question: "Will registration be free?",
        answer:
          "You can update this based on the final event plan, but this page is ready for either a free registration model or a ticketed flow.",
      },
    ],
  },
  {
    title: "Event Experience",
    icon: HelpCircle,
    items: [
      {
        question: "What can attendees expect from the day?",
        answer:
          "Attendees can expect a mix of talks, workshops, networking, and community-focused moments designed to make the event practical, energising, and relevant.",
      },
      {
        question: "Will there be workshops as well as talks?",
        answer:
          "Yes. The event structure is intended to support both speaker-led sessions and hands-on workshops so attendees can both learn and actively engage.",
      },
      {
        question: "Will there be opportunities to network?",
        answer:
          "Yes. The event is designed to create space for attendees to connect with peers, organisers, mentors, and guest speakers throughout the day.",
      },
      {
        question: "Is this only for developers?",
        answer:
          "Not at all. The event can also be valuable for designers, product-minded students, founders, and anyone interested in technology and building useful things.",
      },
    ],
  },
  {
    title: "Logistics",
    icon: ShieldCheck,
    items: [
      {
        question: "Where will the event take place?",
        answer:
          "The current placeholder location is the Australian National University. You can replace this with the confirmed venue and room details later.",
      },
      {
        question: "Will the final schedule be shared before the event?",
        answer:
          "Yes. The website is structured so you can publish the confirmed schedule, session timings, and speaker details once they are finalised.",
      },
      {
        question: "What should attendees bring?",
        answer:
          "You can keep this simple for now and later add specifics such as a laptop for workshops, student ID, registration confirmation, or anything venue-related.",
      },
      {
        question: "Will accessibility information be available?",
        answer:
          "Yes. This page can be updated with venue accessibility notes, contact details, and any guidance attendees may need before arriving.",
      },
    ],
  },
];

function FAQAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-white md:text-lg">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-white/65 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm leading-7 text-white/70 md:text-base">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered before the event day."
        description="A dedicated FAQ page helps attendees feel informed, confident, and ready before they register or arrive."
      />

      <section className="border-b border-white/10 bg-black py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Quick clarity"
            title="Everything attendees usually ask first"
            description="Organised answers make the event feel easier to understand and more trustworthy."
          />

          <div className="mt-12 space-y-12">
            {faqGroups.map((group) => {
              const Icon = group.icon;

              return (
                <div key={group.title}>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-white/75" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white">{group.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {group.items.map((item) => {
                      const key = `${group.title}-${item.question}`;

                      return (
                        <FAQAccordionItem
                          key={key}
                          question={item.question}
                          answer={item.answer}
                          isOpen={!!openItems[key]}
                          onToggle={() => toggleItem(key)}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-zinc-950 py-20 md:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Ticket className="h-5 w-5 text-white/75" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">Reduce hesitation</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                A clear FAQ helps students understand the event faster and removes common
                uncertainties before they decide to register.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <ShieldCheck className="h-5 w-5 text-white/75" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">Build trust</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                Good event communication signals organisation, seriousness, and care for the
                attendee experience from the first interaction.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Mail className="h-5 w-5 text-white/75" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">Handle the rest directly</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                For edge cases or special questions, you can direct attendees to a chapter email or
                contact page for support.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-black py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,133,244,0.16),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(234,67,53,0.14),transparent_25%)]" />

            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                Still curious?
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                Explore the registration page or contact the organisers.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">
                Move forward with confidence by reviewing registration details or reaching out for
                any unanswered questions.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Go to Register
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Contact Organisers
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}