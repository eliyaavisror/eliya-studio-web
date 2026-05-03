import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.hero" });
  return { title: t("eyebrow"), description: t("body") };
}

export default async function ContactPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("contact");

  return (
    <>
      {/* HERO */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28">
        <div className="container-x">
          <p className="ticker text-ink-muted mb-10">
            {t("hero.eyebrow")} — צרו קשר / 04
          </p>
          <h1 className="text-display-2xl font-bold text-balance max-w-[16ch]">
            {t("hero.title")}
          </h1>
          <div className="mt-12 md:mt-14 grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-7 max-w-[52ch] text-lg md:text-xl text-ink-soft leading-relaxed text-pretty">
              {t("hero.body")}
            </p>
            <div className="md:col-span-5 ticker text-ink-muted md:text-end">
              N34.7818 / E32.0853
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="pb-20 md:pb-32 border-t border-ink pt-16 md:pt-20">
        <div className="container-x grid md:grid-cols-12 gap-12 md:gap-16">
          <aside className="md:col-span-4">
            <p className="ticker text-ink-muted mb-8">01 — פרטי התקשרות</p>
            <dl className="border-y border-ink/15">
              <ContactItem label={t("info.phoneLabel")}>
                <a href={`tel:${siteConfig.contact.phone}`} className="link-underline text-2xl md:text-3xl font-semibold tracking-tight">
                  {siteConfig.contact.phoneDisplay}
                </a>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="mt-3 inline-flex items-center gap-2 ticker text-ink-muted hover:text-ink transition-colors"
                >
                  → {t("callNow")}
                </a>
              </ContactItem>

              <ContactItem label={t("info.emailLabel")}>
                <a href={`mailto:${siteConfig.contact.email}`} className="link-underline text-base md:text-lg break-all">
                  {siteConfig.contact.email}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-3 inline-flex items-center gap-2 ticker text-ink-muted hover:text-ink transition-colors"
                >
                  → {t("emailNow")}
                </a>
              </ContactItem>

              <ContactItem label="WhatsApp">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-base md:text-lg"
                >
                  +{siteConfig.contact.whatsapp.replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, "$1-$2-$3-$4")}
                </a>
              </ContactItem>

              <ContactItem label={t("info.hoursLabel")}>
                <p className="text-base md:text-lg">{t("info.hoursValue")}</p>
              </ContactItem>
            </dl>
          </aside>

          <div className="md:col-span-8">
            <p className="ticker text-ink-muted mb-4">02 — שלחו פנייה</p>
            <h2 className="text-display-lg font-semibold mb-10">
              {t("form.title")}
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-7 border-b last:border-b-0 border-ink/15">
      <dt className="ticker text-ink-muted mb-3">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
