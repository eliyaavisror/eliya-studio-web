"use client";

import { useState } from "react";
import Image from "next/image";

type Step = { number: string; title: string; body: string };

// PLACEHOLDERS — replace with /public/images/process/step-01.webp … step-05.webp
const STEP_IMAGES = [
  "/images/hero/architecture/2תכנון חוות סוסים.png",
  "/images/projects/visualizations/exterior/renewal/A FINAL copy.webp",
  "/images/projects/visualizations/exterior/renewal/FF03 copy.webp",
  "/images/projects/architecture/office-building/01.webp",
  "/images/projects/architecture/office-building/02.webp",
];

export default function ProcessAccordion({ steps }: { steps: Step[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="grid lg:grid-cols-[3fr_2fr]">
      {/* Image panel */}
      <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[460px] overflow-hidden bg-ink/10">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === openIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={STEP_IMAGES[i] ?? STEP_IMAGES[0]}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              style={{
                filter: "grayscale(1) brightness(1.1) contrast(0.75) saturate(0)",
              }}
              aria-hidden="true"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        <p className="absolute bottom-5 start-7 text-paper/20 text-[clamp(5rem,9vw,7.5rem)] font-extralight leading-none tabular-nums select-none pointer-events-none">
          {steps[openIndex]?.number}
        </p>
      </div>

      {/* Steps list */}
      <div className="bg-paper divide-y divide-ink/10 border-t border-ink/10 lg:border-t-0 lg:border-s border-ink/10">
        {steps.map((step, i) => {
          const isOpen = openIndex === i;
          return (
            <button
              key={step.number}
              onClick={() => setOpenIndex(i)}
              className={`w-full px-6 py-5 flex flex-col text-start transition-colors duration-200 ${
                isOpen ? "bg-ink text-paper" : "hover:bg-paper-warm"
              }`}
              aria-expanded={isOpen}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`text-[11px] tabular-nums font-light tracking-[0.2em] ${
                    isOpen ? "text-paper/45" : "text-ink-muted"
                  }`}
                >
                  {step.number}
                </span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-paper/40" : "text-ink-muted"
                  }`}
                  aria-hidden="true"
                >
                  <path
                    d="M2 4l4.5 5L11 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-sm md:text-base font-semibold tracking-tight leading-snug">
                {step.title}
              </h3>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p
                    className={`leading-relaxed text-sm ${
                      isOpen ? "text-paper/70" : "text-ink-soft"
                    }`}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
