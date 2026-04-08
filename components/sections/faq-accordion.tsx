"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck, Ticket } from "lucide-react";

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
          "No. The event is structured for a mix of beginners, intermediate learners, and more experienced student builders — everyone is welcome.",
      },
      {
        question: "How do I register?",
        answer:
          "Registration is open via Hellorubric. Head to the Register page and click the Register Now button to secure your spot.",
      },
      {
        question: "Will registration be free?",
        answer:
          "Yes, the event is free to attend for students. Registration is required to secure your spot.",
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
          "Yes. The event structure supports both speaker-led sessions and hands-on workshops so attendees can learn and actively engage.",
      },
      {
        question: "Will there be opportunities to network?",
        answer:
          "Yes. The event is designed to create space for attendees to connect with peers, organisers, mentors, and guest speakers throughout the day.",
      },
      {
        question: "Is this only for developers?",
        answer:
          "Not at all. The event is also valuable for designers, product-minded students, founders, and anyone interested in technology and building useful things.",
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
          "The event will be held at the Australian National University, Canberra. Specific venue and room details will be confirmed closer to the date.",
      },
      {
        question: "Will the final schedule be shared before the event?",
        answer:
          "Yes. A confirmed schedule with session timings, speakers, and room details will be shared on this website ahead of the event.",
      },
      {
        question: "What should attendees bring?",
        answer:
          "We recommend bringing a laptop for the hands-on workshop sessions, along with your registration confirmation. Student ID may be required for ANU venue access.",
      },
      {
        question: "Will accessibility information be available?",
        answer:
          "Yes. Venue accessibility information will be shared before the event. If you have specific accessibility requirements, please reach out to us on Instagram.",
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

export default function FAQAccordion() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-12">
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
  );
}
