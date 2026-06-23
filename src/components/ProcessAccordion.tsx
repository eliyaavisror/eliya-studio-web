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
    <div className="grid grid-cols-[auto_1fr]">
      {/* Numbers strip — column 1: RIGHT in RTL, LEFT in LTR */}
      <div className="w-14 md:w-16 flex flex-col bg-ink divide-y divide-paper/10">
        {steps.map((step, i) => {
          const isActive = i === openIndex;
          return (
            <button
              key={step.number}
              onClick={() => setOpenIndex(i)}
              aria-label={step.title}
              aria-pressed={isActive}
              className={`flex-1 flex items-center justify-center transition-colors duration-200 ${
                isActive
                  ? "bg-paper/12 text-paper"
                  : "text-paper/30 hover:text-paper/60"
              }`}
            >
              <span
                className={`text-xs tabular-nums tracking-[0.15em] ${
                  isActive ? "font-semibold" : "font-light"
                }`}
              >
                {step.number}
              </span>
            </button>
          );
        })}
      </div>

      {/* Image + text overlay — column 2 */}
      <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] overflow-hidden bg-ink">
        {/* Background images — crossfade */}
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
              sizes="(max-width: 1024px) 100vw, 95vw"
              className="object-cover"
              style={{
                filter:
                  "grayscale(1) brightness(0.85) contrast(0.75) saturate(0)",
              }}
              aria-hidden="true"
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

        {/* Text overlay — one per step, fades in/out */}
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`absolute bottom-0 inset-x-0 p-8 md:p-12 transition-all duration-500 ${
              i === openIndex
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <h3 className="text-paper text-xl md:text-2xl lg:text-[1.75rem] font-semibold tracking-tight leading-snug text-balance mb-3">
              {step.title}
            </h3>
            <p className="text-paper/65 text-sm md:text-base leading-relaxed max-w-[55ch]">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
