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
      {/* ── HERO ── title + meta + description + cover image ── */}
      <section className="pt-32 md:pt-40 border-b border-ink">
        <div className="container-x">

          {/* Breadcrumb */}
          <Link
            href="/architecture"
            className="ticker text-ink-muted hover:text-ink transition-colors text-[10px] mb-8 inline-flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            {locale === "he" ? "תכנון אדריכלי" : "Architecture"}
          </Link>

          {/* Title */}
          <h1 className="text-display-xl font-bold text-balance max-w-[20ch] mb-10 md:mb-14">
            {project.title[locale]}
          </h1>

          {/* Hero grid: meta + description | cover image */}
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 md:gap-16 pb-16 md:pb-20 items-start">

            {/* Left column — metadata + description + CTA */}
            <div className="flex flex-col gap-8">
              <dl className="divide-y divide-ink/10 border-y border-ink/10">
                {status && (
                  <MetaItem label={locale === "he" ? "סטטוס" : "Status"}>
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${status.dot}`} />
                      <span className="font-medium">{status[locale]}</span>
                    </span>
                  </MetaItem>
                )}
                <MetaItem label={locale === "he" ? "מיקום" : "Location"}>
                  {project.location[locale]}
                </MetaItem>
                {project.client && (
                  <MetaItem label={locale === "he" ? "יזם" : "Client"}>
                    {project.client[locale]}
                  </MetaItem>
                )}
                <MetaItem label={locale === "he" ? "שנה" : "Year"}>
                  {project.year}
                </MetaItem>
              </dl>

              {project.description && (
                <p className="text-base md:text-lg text-ink-soft leading-relaxed text-pretty">
                  {project.description[locale]}
                </p>
              )}

              <Link href="/contact" className="btn-primary self-start">
                {locale === "he" ? "צרו קשר" : "Get in touch"}
              </Link>
            </div>

            {/* Right column — cover image */}
            <div className="relative min-h-[260px] md:min-h-0 md:self-stretch overflow-hidden bg-paper-warm">
              <Image
                src={project.cover}
                alt={project.title[locale]}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
                priority
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── CONTENT ── rich sections or image gallery ── */}
      {project.sections ? (
        <section className="section-pad">
          <div className="container-x">
            <ProjectRichContent
              sections={project.sections}
              title={project.title[locale]}
              locale={locale}
            />
          </div>
        </section>
      ) : (project.imageGroups || project.images.length > 0) && (
        <section className="section-pad">
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

      {/* ── BACK CTA ── */}
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

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-4">
      <dt className="ticker text-ink-muted text-[10px] mb-1.5">{label}</dt>
      <dd className="text-sm font-medium">{children}</dd>
    </div>
  );
}
