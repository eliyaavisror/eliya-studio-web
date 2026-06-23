"use client";

import { useState } from "react";

type Step = { number: string; title: string; body: string };

export default function ProcessAccordion({ steps }: { steps: Step[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-ink/15">
      {steps.map((step, i) => {
        const isOpen = openIndex === i;
        return (
          <button
            key={step.number}
            onClick={() => setOpenIndex(isOpen ? null : i)}
            className="bg-paper p-5 md:p-6 flex flex-col text-start w-full hover:bg-paper-warm transition-colors duration-200"
            aria-expanded={isOpen}
          >
            <p className="text-[28px] md:text-[34px] font-extralight tracking-tightest leading-none mb-2 text-paper-line">
              {step.number}
            </p>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base md:text-lg font-semibold tracking-tight leading-snug">
                {step.title}
              </h3>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`flex-shrink-0 mt-0.5 text-ink-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <path d="M2 4.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-ink-soft leading-relaxed text-sm">{step.body}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
