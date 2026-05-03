import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Project, ProjectStatus } from "@/data/projects";

const STATUS_MAP: Record<ProjectStatus, { he: string; en: string; color: string }> = {
  planning:     { he: "תכנון ראשוני",    en: "Initial Planning",    color: "bg-amber-100 text-amber-800" },
  licensing:    { he: "בשלב רישוי",      en: "Licensing",           color: "bg-blue-100 text-blue-800" },
  construction: { he: "בשלבי ביצוע",    en: "Under Construction",  color: "bg-orange-100 text-orange-800" },
  completed:    { he: "הושלם",           en: "Completed",           color: "bg-green-100 text-green-800" },
};

export default function ArchProjectCard({
  project,
  locale,
  index,
}: { project: Project; locale: "he" | "en"; index?: number }) {
  const status = project.status ? STATUS_MAP[project.status] : null;
  const num = typeof index === "number" ? String(index).padStart(2, "0") : undefined;

  return (
    <article className="group flex flex-col">
      <Link
        href={`/architecture/${project.slug}`}
        className="block overflow-hidden bg-paper-warm relative aspect-[16/10]"
        aria-label={project.title[locale]}
      >
        <Image
          src={project.cover}
          alt={`${project.title[locale]} — ${project.location[locale]}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
        {/* Status badge on image */}
        {status && (
          <span className={`absolute top-3 ltr:left-3 rtl:right-3 px-3 py-1 text-[10px] font-medium uppercase tracking-wider rounded-sm ${status.color}`}>
            {status[locale]}
          </span>
        )}
      </Link>

      <div className="mt-4 pt-4 border-t border-ink">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {num && <p className="ticker text-ink-muted text-[10px] mb-1.5">{num}</p>}
            <h3 className="text-lg md:text-xl font-semibold tracking-tight leading-snug">
              <Link href={`/architecture/${project.slug}`} className="hover:opacity-70 transition-opacity">
                {project.title[locale]}
              </Link>
            </h3>
          </div>
          <p className="ticker text-ink-muted text-[10px] whitespace-nowrap mt-1">{project.year}</p>
        </div>

        <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          <div className="flex gap-1.5 items-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted flex-shrink-0" aria-hidden="true">
              <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <dd className="text-sm text-ink-muted">{project.location[locale]}</dd>
          </div>
          {project.client && (
            <div className="flex gap-1.5 items-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted flex-shrink-0" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <dd className="text-sm text-ink-muted">{project.client[locale]}</dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}
