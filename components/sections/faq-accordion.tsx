"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = { q: string; a: string };

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

export default function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => {
        const key = faq.q;
        return (
          <FAQAccordionItem
            key={key}
            question={faq.q}
            answer={faq.a}
            isOpen={!!openItems[key]}
            onToggle={() => toggleItem(key)}
          />
        );
      })}
    </div>
  );
}
