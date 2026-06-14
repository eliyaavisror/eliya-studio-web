import Image from "next/image";
import type { ContentSection } from "@/data/projects";

interface Props {
  sections: ContentSection[];
  title: string;
  locale: "he" | "en";
}

export default function ProjectRichContent({ sections, title, locale }: Props) {
  const [intro, ...rest] = sections;

  return (
    <div>
      {/* Intro — large text + full-width image */}
      {intro && (
        <div className="mb-20 md:mb-28">
          <p className="text-xl md:text-2xl text-ink-soft leading-relaxed text-pretty max-w-[55ch] mb-10 md:mb-14">
            {intro[locale]}
          </p>
          {intro.image && (
            <div className="relative aspect-[16/9] overflow-hidden bg-paper-warm">
              <Image
                src={intro.image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 75vw"
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      )}

      {/* Numbered sections */}
      <div className="space-y-0">
        {rest.map((section, i) => (
          <div key={section.id} className="border-t border-ink/10 py-14 md:py-20">
            {/* Section header */}
            <div className="mb-8 md:mb-10">
              <p className="index-big leading-none mb-3 select-none">
                {String(i + 1).padStart(2, "0")}
              </p>
              {section.title && (
                <h2 className="text-display-lg font-bold tracking-tight">
                  {section.title[locale]}
                </h2>
              )}
            </div>

            {/* Content — 2-col with image, or full-width text */}
            {section.image ? (
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                <p className="text-base md:text-lg text-ink-soft leading-relaxed text-pretty">
                  {section[locale]}
                </p>
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-warm">
                  <Image
                    src={section.image}
                    alt={section.title?.[locale] ?? title}
                    fill
                    sizes="(max-width: 768px) 100vw, 37vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <p className="text-base md:text-lg text-ink-soft leading-relaxed text-pretty max-w-[60ch]">
                {section[locale]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
