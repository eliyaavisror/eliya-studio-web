import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getArchProjects, getArchProjectBySlug, type ProjectStatus } from "@/data/projects";
import ProjectImageTabs from "@/components/ProjectImageTabs";
import ProjectRichContent from "@/components/ProjectRichContent";
import type { Metadata } from "next";

const STATUS_MAP: Record<ProjectStatus, { he: string; en: string; dot: string }> = {
  planning:     { he: "תכנון ראשוני",  en: "Initial Planning",   dot: "bg-amber-400" },
  licensing:    { he: "בשלב רישוי",    en: "Licensing",          dot: "bg-blue-400" },
  construction: { he: "בשלבי ביצוע",  en: "Under Construction", dot: "bg-orange-400" },
  completed:    { he: "הושלם",         en: "Completed",          dot: "bg-green-500" },
};

export async function generateStaticParams() {
  return getArchProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getArchProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title.he, description: project.description?.he };
}

export default async function ArchProjectPage({
  params,
}: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getArchProjectBySlug(slug);
  if (!project) notFound();
  return <Content slug={slug} />;
}

function Content({ slug }: { slug: string }) {
  const locale = useLocale() as "he" | "en";
  const project = getArchProjectBySlug(slug)!;
  const status = project.status ? STATUS_MAP[project.status] : null;

  return (
    <>
      {/* ══ HERO ══ cinematic title over background image ══ */}
      <section className="relative isolate flex min-h-[68vh] md:min-h-[78vh] flex-col justify-end overflow-hidden bg-ink">
        {project.titleBackground && (
          <Image
            src={project.titleBackground}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-90"
            priority
          />
        )}
        {/* Tonal overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(40,40,40,0.55) 0%, rgba(40,40,40,0) 55%)" }}
        />

        <div className="container-x relative z-10 pb-12 md:pb-20 pt-36">
          <Link
            href="/architecture"
            className="ticker text-paper/70 hover:text-paper transition-colors text-[10px] mb-8 inline-flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {locale === "he" ? "תכנון אדריכלי" : "Architecture"}
          </Link>

          {status && (
            <div className="mb-5 inline-flex items-center gap-2 border border-paper/25 px-3 py-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              <span className="ticker text-[10px] text-paper/85">{status[locale]}</span>
            </div>
          )}

          <h1 className="text-display-2xl font-bold text-paper text-balance max-w-[16ch] leading-[0.9]">
            {project.title[locale]}
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-2 text-paper/80">
            <HeroFact label={locale === "he" ? "מיקום" : "Location"} value={project.location[locale]} />
            {project.client && (
              <HeroFact label={locale === "he" ? "יזם" : "Client"} value={project.client[locale]} />
            )}
            <HeroFact label={locale === "he" ? "שנה" : "Year"} value={String(project.year)} />
          </div>
        </div>
      </section>

      {/* ══ OVERVIEW ══ full description + project image ══ */}
      <section className="section-pad">
        <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Text column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-7">
              <span className="h-px w-10 bg-accent" />
              <span className="ticker text-[10px] text-accent-dark">
                {locale === "he" ? "על הפרויקט" : "About the project"}
              </span>
            </div>

            {project.description && (
              <p className="text-lg md:text-xl text-ink-soft leading-relaxed text-pretty mb-10">
                {project.description[locale]}
              </p>
            )}

            <Link href="/contact" className="btn-primary">
              {locale === "he" ? "צרו קשר" : "Get in touch"}
            </Link>
          </div>

          {/* Image column */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-paper-warm">
              <Image
                src={project.cover}
                alt={project.title[locale]}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ NUMBERED SECTIONS ══ */}
      {project.sections ? (
        <ProjectRichContent
          sections={project.sections}
          title={project.title[locale]}
          locale={locale}
        />
      ) : (project.imageGroups || project.images.length > 0) && (
        <section className="pb-20 md:pb-32">
          <div className="container-x">
            {project.imageGroups ? (
              <ProjectImageTabs
                groups={project.imageGroups}
                title={project.title[locale]}
                locale={locale}
              />
            ) : (
              <div className="grid gap-3">
                {project.images.map((src, i) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden bg-paper-warm ${
                      i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${project.title[locale]} — ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 75vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══ BACK CTA ══ */}
      <section className="py-16 border-t border-ink/10">
        <div className="container-x flex items-center justify-between gap-8">
          <Link
            href="/architecture"
            className="ticker link-underline text-ink-muted hover:text-ink transition-colors"
          >
            ← {locale === "he" ? "כל הפרויקטים" : "All projects"}
          </Link>
          <Link href="/contact" className="btn-secondary">
            {locale === "he" ? "בואו נדבר על הפרויקט שלכם" : "Let's talk about your project"}
          </Link>
        </div>
      </section>
    </>
  );
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex flex-col gap-0.5">
      <span className="ticker text-[9px] text-paper/55">{label}</span>
      <span className="text-sm font-medium text-paper">{value}</span>
    </span>
  );
}
