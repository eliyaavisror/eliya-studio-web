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
      {/* HEADER */}
      <section className="pt-32 md:pt-40 pb-10 md:pb-14 border-b border-ink">
        <div className="container-x">
          <Link href="/architecture" className="ticker text-ink-muted hover:text-ink transition-colors text-[10px] mb-8 inline-flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            {locale === "he" ? "תכנון אדריכלי" : "Architecture"}
          </Link>
          <h1 className="text-display-xl font-bold text-balance max-w-[20ch]">
            {project.title[locale]}
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-pad">
        <div className="container-x grid md:grid-cols-12 gap-12 md:gap-16">

          {/* Sidebar — metadata */}
          <aside className="md:col-span-3 md:sticky md:top-32 self-start">
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

            <Link href="/contact" className="btn-primary w-full mt-8 justify-center">
              {locale === "he" ? "צרו קשר" : "Get in touch"}
            </Link>
          </aside>

          {/* Main — rich sections or description + images */}
          <div className="md:col-span-9">
            {project.sections ? (
              <ProjectRichContent
                sections={project.sections}
                title={project.title[locale]}
                locale={locale}
              />
            ) : (
              <>
                {project.description && (
                  <p className="text-lg md:text-xl text-ink-soft leading-relaxed text-pretty max-w-[60ch] mb-12">
                    {project.description[locale]}
                  </p>
                )}
                {project.imageGroups ? (
                  <ProjectImageTabs
                    groups={project.imageGroups}
                    title={project.title[locale]}
                    locale={locale}
                  />
                ) : (
                  <div className="grid gap-3">
                    {project.images.map((src, i) => (
                      <div key={src} className={`relative overflow-hidden bg-paper-warm ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                        <Image
                          src={src}
                          alt={`${project.title[locale]} — ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 75vw"
                          className="object-cover"
                          priority={i === 0}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Back CTA */}
      <section className="py-16 border-t border-ink/10">
        <div className="container-x flex items-center justify-between gap-8">
          <Link href="/architecture" className="ticker link-underline text-ink-muted hover:text-ink transition-colors">
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
