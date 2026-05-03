import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ClientsCarousel from "@/components/ClientsCarousel";
import { clientLogos } from "@/data/clients";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.hero" });
  return { title: t("eyebrow"), description: t("body") };
}

export default async function AboutPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("about");

  return (
    <>
      {/* HERO */}
      <section className="pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="container-x">
          <p className="ticker text-ink-muted mb-10">
            {t("hero.eyebrow")} — אודות / 03
          </p>
          <h1 className="text-display-2xl font-bold text-balance max-w-[16ch]">
            {t("hero.title")}
          </h1>
          <div className="mt-12 md:mt-14 grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-7 max-w-[52ch] text-lg md:text-xl text-ink-soft leading-relaxed text-pretty">
              {t("hero.body")}
            </p>
            <div className="md:col-span-5 ticker text-ink-muted md:text-end">
              ELIYA STUDIO / EST. 2018
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="section-pad border-t border-ink">
        <div className="container-x grid md:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="md:col-span-4">
            <p className="ticker text-ink-muted mb-4">01 — סיפור</p>
            <p className="index-big">01</p>
            <h2 className="mt-2 text-display-lg font-semibold">{t("story.title")}</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-lg md:text-xl text-ink-soft leading-relaxed text-pretty max-w-[60ch]">
              {t("story.body")}
            </p>
          </div>
        </div>
      </section>

      {/* STATS — dark inverted */}
      <section className="bg-ink text-paper">
        <div className="container-x">
          <div className="grid md:grid-cols-3 divide-paper/15 md:divide-x rtl:md:divide-x-reverse">
            <Stat number="120+" label={t("stats.projects")} />
            <Stat number="08" label={t("stats.years")} />
            <Stat number="100%" label={t("stats.clients")} />
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="section-pad">
        <div className="container-x grid md:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="md:col-span-4">
            <p className="ticker text-ink-muted mb-4">02 — אדריכלות</p>
            <p className="index-big">02</p>
            <h2 className="mt-2 text-display-lg font-semibold">{t("arch.title")}</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-6 max-w-[60ch]">
            <p className="text-lg text-ink-soft leading-relaxed text-pretty">{t("arch.body1")}</p>
            <p className="text-lg text-ink-soft leading-relaxed text-pretty">{t("arch.body2")}</p>
            <p className="text-lg text-ink-soft leading-relaxed text-pretty">{t("arch.body3")}</p>
          </div>
        </div>
      </section>

      {/* VISUALIZATION */}
      <section className="section-pad bg-paper-warm">
        <div className="container-x grid md:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="md:col-span-4">
            <p className="ticker text-ink-muted mb-4">03 — הדמיות</p>
            <p className="index-big">03</p>
            <h2 className="mt-2 text-display-lg font-semibold">{t("viz.title")}</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-6 max-w-[60ch]">
            <p className="text-lg text-ink-soft leading-relaxed text-pretty">{t("viz.body1")}</p>
            <p className="text-lg text-ink-soft leading-relaxed text-pretty">{t("viz.body2")}</p>
            <p className="text-lg text-ink-soft leading-relaxed text-pretty">{t("viz.body3")}</p>
            <p className="ticker text-ink-muted mt-2">{t("viz.clients")}</p>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <ClientsCarousel logos={clientLogos} title={t("clientsTitle")} />

      {/* CTA */}
      <section className="section-pad bg-ink text-paper">
        <div className="container-x text-center max-w-3xl mx-auto">
          <p className="ticker text-paper/60 mb-6">04 — בואו נתחיל</p>
          <h2 className="text-display-xl font-semibold text-balance">{t("cta.title")}</h2>
          <p className="mt-7 text-lg md:text-xl text-paper/70 text-pretty">{t("cta.body")}</p>
          <Link href="/contact" className="btn-on-dark mt-10">
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="px-6 py-16 md:py-20 text-center">
      <p className="text-[clamp(4rem,9vw,8rem)] font-extralight tracking-tightest leading-none tabular-nums">
        {number}
      </p>
      <p className="mt-5 ticker text-paper/55">{label}</p>
    </div>
  );
}
