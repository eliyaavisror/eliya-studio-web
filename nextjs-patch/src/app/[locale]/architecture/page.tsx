import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProjectsByType } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
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
  return <Content />;
}

function Content() {
  const t = useTranslations("architecture");
  const locale = useLocale() as "he" | "en";
  const projects = getProjectsByType("architecture");
  const steps = t.raw("process.steps") as Array<{ number: string; title: string; body: string }>;
  const specialties = t.raw("specialties.items") as string[];

  return (
    <>
      {/* HERO */}
      <section className="pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="container-x">
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
            <div className="md:col-span-5 ticker text-ink-muted md:text-end">
              EST. 2018 / TEL AVIV
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-pad border-t border-ink">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-24 items-end">
            <div className="md:col-span-4">
              <p className="ticker text-ink-muted mb-4">01 — תהליך</p>
              <p className="index-big">01</p>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-display-lg font-semibold text-balance max-w-[18ch]">
                {t("process.title")}
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15">
            {steps.map((step) => (
              <div key={step.number} className="bg-paper p-8 md:p-10 min-h-[300px] flex flex-col">
                <p className="text-[56px] md:text-[72px] font-extralight tracking-tightest leading-none mb-6 text-paper-line">
                  {step.number}
                </p>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-4">
                  {step.title}
                </h3>
                <p className="text-ink-soft leading-relaxed text-sm md:text-base">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
        <section className="section-pad">
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
