import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getProjectsByType } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { getHeroImage } from "@/lib/heroImage";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "architecture.hero" });
  return { title: t("eyebrow"), description: t("body") };
}

export default async function ArchitecturePage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const heroImage = getHeroImage("architecture") ?? "/images/projects/visualizations/exterior/A FINAL copy.webp";
  return <Content heroImage={heroImage} />;
}

function Content({ heroImage }: { heroImage: string }) {
  const t = useTranslations("architecture");
  const locale = useLocale() as "he" | "en";
  const projects = getProjectsByType("architecture");
  const steps = t.raw("process.steps") as Array<{ number: string; title: string; body: string }>;
  const specialties = t.raw("specialties.items") as string[];

  return (
    <>
      <div className="flex flex-col min-h-screen">
      {/* HERO */}
      <section className="relative min-h-[60vh] flex flex-col justify-end pt-28 md:pt-36 pb-10 md:pb-14">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "grayscale(1) brightness(1.2) contrast(0.65) saturate(0)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/20 via-paper/55 to-paper/85" />
        </div>
        <div className="container-x relative">
          <p className="ticker text-ink-muted mb-10">
            {t("hero.eyebrow")} — אדריכלות / 01
          </p>
          <h1 className="text-display-2xl font-bold text-balance max-w-[18ch]">
            {t("hero.title")}
          </h1>
          <div className="mt-12 md:mt-14 grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-7 max-w-[52ch] text-lg md:text-xl text-ink-soft leading-relaxed text-pretty">
              {t("hero.body")}
            </p>
          </div>
        </div>
        <a
          href="#projects"
          aria-label={locale === "he" ? "גללו לפרויקטים" : "Scroll to projects"}
          className="absolute right-6 md:right-10 bottom-8 hidden md:flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity duration-300"
        >
          <span className="ticker text-ink text-[9px]" style={{ writingMode: "vertical-rl" }}>
            {locale === "he" ? "גללו" : "scroll"}
          </span>
          <div className="w-px h-12 bg-ink/35 mt-1" />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" className="text-ink" aria-hidden="true">
            <path d="M1 1l4 4 4-4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>

      {/* PROCESS */}
      <section className="flex-1 py-10 md:py-14 border-t border-ink">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 mb-8 md:mb-10 items-end">
            <div className="md:col-span-4">
              <p className="ticker text-ink-muted mb-3">01 — תהליך</p>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-display-lg font-semibold text-balance max-w-[18ch]">
                {t("process.title")}
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15">
            {steps.map((step) => (
              <div key={step.number} className="bg-paper p-6 md:p-8 flex flex-col">
                <p className="text-[36px] md:text-[44px] font-extralight tracking-tightest leading-none mb-3 text-paper-line">
                  {step.number}
                </p>
                <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-ink-soft leading-relaxed text-sm">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* SPECIALTIES — dark inverted */}
      <section className="section-pad bg-ink text-paper">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-12 md:mb-16">
            <div className="md:col-span-4">
              <p className="ticker text-paper/60 mb-4">02 — תמחויות</p>
              <h2 className="text-display-lg font-semibold">
                {t("specialties.title")}
              </h2>
            </div>
            <div className="md:col-span-8">
              <ul className="border-y border-paper/20">
                {specialties.map((item, i) => (
                  <li
                    key={item}
                    className="border-b last:border-b-0 border-paper/15 py-6 md:py-7 flex items-baseline gap-8 group"
                  >
                    <span className="ticker text-paper/45 tabular-nums w-12 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-2xl md:text-3xl font-semibold tracking-tight transition-transform duration-300 ease-smooth group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED PROJECTS */}
      {projects.length > 0 && (
        <section id="projects" className="section-pad">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6 pb-8 mb-14 border-b border-ink">
              <div>
                <p className="ticker text-ink-muted mb-4">03 — נבחרים</p>
                <h2 className="text-display-lg font-semibold">
                  {locale === "he" ? "פרויקטים נבחרים" : "Selected projects"}
                </h2>
              </div>
              <Link href="/visualizations" className="ticker link-underline">
                {locale === "he" ? "כל הפרויקטים" : "All projects"} →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {projects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i + 1} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-pad bg-paper-warm">
        <div className="container-x text-center max-w-3xl mx-auto">
          <p className="ticker text-ink-muted mb-6">04 — בואו נתחיל</p>
          <h2 className="text-display-xl font-semibold text-balance">{t("cta.title")}</h2>
          <p className="mt-7 text-lg md:text-xl text-ink-soft text-pretty">{t("cta.body")}</p>
          <Link href="/contact" className="btn-primary mt-10">
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </>
  );
}
