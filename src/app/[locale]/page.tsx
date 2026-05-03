import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
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
  const featured = getFeaturedProjects();

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

          <div className="mt-12 md:mt-14 grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end">
            <p className="max-w-[46ch] text-base md:text-lg text-paper/75 leading-relaxed text-pretty">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/architecture" className="btn border border-paper text-paper hover:bg-paper/20">{t("hero.ctaArch")}</Link>
              <Link href="/visualizations" className="btn border border-paper text-paper hover:bg-paper/20">{t("hero.ctaViz")}</Link>
              <Link href="/contact" className="btn-outline-light">{t("hero.ctaSecondary")}</Link>
            </div>
          </div>
        </div>

        {/* Stats bar — pinned to bottom */}
        <div className="container-x relative pt-5 border-t border-paper/20 flex flex-wrap items-center justify-between gap-4 ticker text-paper/55">
          <span>100+ פרויקטים</span>
          <span className="hidden md:inline">אדריכלות / הדמיות</span>
          <span>↓ גלול</span>
        </div>
      </section>

      {/* INTRO */}
      <section className="section-pad">
        <div className="container-x grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-4">
            <p className="ticker text-ink-muted mb-6">01 — פתיחה</p>
            <p className="index-big">01</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="text-display-lg font-semibold text-balance max-w-[18ch]">
              {t("intro.title")}
            </h2>
            <p className="mt-8 max-w-[60ch] text-lg md:text-xl text-ink-soft leading-relaxed text-pretty">
              {t("intro.body")}
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES — dark inverted grid, 2 cards */}
      <section className="section-pad bg-ink text-paper">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-8 mb-14 md:mb-16 border-b border-paper/20">
            <div>
              <p className="ticker text-paper/60 mb-4">02 — שירותים</p>
              <h2 className="text-display-lg font-semibold">{t("services.title")}</h2>
            </div>
            <p className="text-sm text-paper/60 max-w-[32ch]">שני תחומי ליבה תחת קורת גג אחת.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-paper/15">
            <ServiceCard num="01" title={t("services.architecture.title")} body={t("services.architecture.body")} tags={["בתים","ציבור","משרדים"]} />
            <ServiceCard num="02" title={t("services.visualizations.title")} body={t("services.visualizations.body")} tags={["חוץ","פנים","אווירה"]} />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section-pad">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-8 mb-14 md:mb-16 border-b border-ink">
            <div>
              <p className="ticker text-ink-muted mb-4">03 — נבחרים</p>
              <h2 className="text-display-lg font-semibold">{t("featured.title")}</h2>
            </div>
            <Link href="/visualizations" className="ticker link-underline">
              {t("featured.viewAll")} →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} priority={i < 2} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-paper-warm">
        <div className="container-x text-center max-w-3xl mx-auto">
          <p className="ticker text-ink-muted mb-6">04 — בואו נתחיל</p>
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

function ServiceCard({ num, title, body, tags }: { num: string; title: string; body: string; tags: string[] }) {
  return (
    <div className="bg-ink p-10 md:p-12 lg:p-14 min-h-[380px] flex flex-col">
      <p className="text-[64px] md:text-[88px] font-extralight tracking-tightest leading-none mb-8 text-paper/85">
        {num}
      </p>
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
