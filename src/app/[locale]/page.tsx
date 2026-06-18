import React from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getHeroImage } from "@/lib/heroImage";

export default async function HomePage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const heroImage = getHeroImage("home") ?? "/images/hero/home/TO LR copy.webp";
  return <Content heroImage={heroImage} />;
}

function Content({ heroImage }: { heroImage: string }) {
  const t = useTranslations("home");

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col pt-28 md:pt-36 pb-8 md:pb-10 text-paper">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt=""
            fill priority sizes="100vw"
            className="object-cover"
            style={{ filter: "grayscale(1) brightness(1.2) contrast(0.65) saturate(0)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-ink/25 via-ink/50 to-ink/75" />
        </div>

        {/* Main content — vertically centered in remaining viewport space */}
        <div className="container-x relative flex-1 flex flex-col justify-center">
          <p className="ticker text-paper/70 mb-8">
            {t("hero.eyebrow")} — 2018 / {new Date().getFullYear()}
          </p>

          <h1 className="text-display-2xl font-bold text-balance max-w-[16ch]">
            {t("hero.title")}
          </h1>

          <div className="mt-12 md:mt-14 flex flex-wrap gap-2">
            <Link href="/architecture" className="btn border border-paper text-paper hover:bg-paper/20">{t("hero.ctaArch")}</Link>
            <Link href="/visualizations" className="btn border border-paper text-paper hover:bg-paper/20">{t("hero.ctaViz")}</Link>
          </div>
        </div>

        {/* Stats bar — pinned to bottom */}
        <div className="container-x relative pt-5 border-t border-paper/20 flex flex-wrap items-center justify-between gap-4 ticker text-paper/55">
          <span>100+ פרויקטים</span>
          <span className="hidden md:inline">אדריכלות / הדמיות</span>
          <span>↓ גלול</span>
        </div>
      </section>

      {/* SERVICES — dark inverted grid, 2 cards */}
      <section className="section-pad bg-ink text-paper">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-8 mb-14 md:mb-16 border-b border-paper/20">
            <div>
              <h2 className="text-display-lg font-semibold">{t("services.title")}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-paper/15">
            <ServiceCard
              icon={
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
                  <path d="M9 21V12h6v9"/>
                </svg>
              }
              title={t("services.architecture.title")} body={t("services.architecture.body")} tags={["בתים","ציבור","משרדים"]} />
            <ServiceCard
              icon={
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              }
              title={t("services.visualizations.title")} body={t("services.visualizations.body")} tags={["חוץ","פנים","אווירה"]} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-paper-warm">
        <div className="container-x text-center max-w-3xl mx-auto">
          <h2 className="text-display-xl font-semibold text-balance">{t("cta.title")}</h2>
          <p className="mt-7 text-lg md:text-xl text-ink-soft text-pretty max-w-[42ch] mx-auto">
            {t("cta.body")}
          </p>
          <div className="mt-10 flex justify-center gap-2 flex-wrap">
            <Link href="/contact" className="btn-primary">{t("cta.button")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ icon, title, body, tags }: { icon: React.ReactNode; title: string; body: string; tags: string[] }) {
  return (
    <div className="bg-ink p-10 md:p-12 lg:p-14 min-h-[380px] flex flex-col">
      <div className="mb-8 text-paper/80">
        {icon}
      </div>
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{title}</h3>
      <p className="text-paper/65 leading-relaxed text-sm md:text-base flex-1">{body}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="ticker text-[10px] text-paper/55 border border-paper/25 px-2.5 py-1.5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
