import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import VisualizationGallery from "@/components/VisualizationGallery";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "visualizations.hero" });
  return { title: t("eyebrow"), description: t("body") };
}

export default async function VisualizationsPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("visualizations");

  const types = [
    {
      key: "exterior" as const,
      icon: (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 36V17L19 5L34 17V36H4Z" />
          <path d="M14 36V25H24V36" />
          <path d="M9 19H15V25H9Z" />
          <path d="M23 19H29V25H23Z" />
        </svg>
      ),
    },
    {
      key: "interior" as const,
      icon: (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 33V5H33" />
          <path d="M9 33H33V9" />
          <rect x="12" y="21" width="18" height="8" />
          <path d="M12 21V17H15" />
          <path d="M30 21V17H27" />
        </svg>
      ),
    },
    {
      key: "aerial" as const,
      icon: (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="4" width="13" height="13" />
          <rect x="21" y="4" width="13" height="13" />
          <rect x="4" y="21" width="13" height="13" />
          <rect x="21" y="21" width="13" height="13" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="container-x">
          <p className="ticker text-ink-muted mb-10">
            {t("hero.eyebrow")} — הדמיות / 02
          </p>
          <h1 className="text-display-2xl font-bold text-balance max-w-[18ch]">
            {t("hero.title")}
          </h1>
          <div className="mt-12 md:mt-14 grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-7 max-w-[52ch] text-lg md:text-xl text-ink-soft leading-relaxed text-pretty">
              {t("hero.body")}
            </p>
            <div className="md:col-span-5 ticker text-ink-muted md:text-end">
              EXTERIOR / INTERIOR / AERIAL
            </div>
          </div>
        </div>
      </section>

      {/* TYPES — dark inverted grid */}
      <section className="section-pad bg-ink text-paper">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
            <div className="md:col-span-4">
              <p className="ticker text-paper/60 mb-4">01 — סוגי הדמיות</p>
              <p className="index-big" style={{ color: "rgb(255 255 255 / 0.08)" }}>01</p>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-display-lg font-semibold text-balance max-w-[18ch]">
                {t("types.title")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper/15">
            {types.map(({ key, icon }, i) => (
              <div key={key} className="bg-ink p-10 md:p-12 min-h-[360px] flex flex-col">
                <p className="ticker text-paper/45 mb-6">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="text-paper/80 mb-6">{icon}</div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                  {t(`types.${key}.title`)}
                </h3>
                <p className="text-paper/65 leading-relaxed text-sm md:text-base flex-1">
                  {t(`types.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-pad">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-8 mb-14 border-b border-ink">
            <div>
              <p className="ticker text-ink-muted mb-4">02 — גלריה</p>
              <h2 className="text-display-lg font-semibold">
                {t("gallery.title")}
              </h2>
            </div>
            <p className="ticker text-ink-muted">120+ פרויקטים</p>
          </div>
          <VisualizationGallery />
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-paper-warm">
        <div className="container-x text-center max-w-3xl mx-auto">
          <p className="ticker text-ink-muted mb-6">03 — בואו נתחיל</p>
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
