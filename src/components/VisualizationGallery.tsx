"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { galleryImages, type GalleryCategory } from "@/data/gallery";
import Lightbox from "./Lightbox";

type Filter = "all" | GalleryCategory;

function MasonryItem({
  src,
  title,
  index,
  onClick,
}: {
  src: string;
  title: string;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="masonry-item"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${(index % 8) * 0.06}s, transform 0.55s ease ${(index % 8) * 0.06}s`,
      }}
    >
      <button
        onClick={onClick}
        aria-label={`פתח תמונה: ${title}`}
        className="group relative block w-full overflow-hidden bg-paper-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
      >
        {/* B&W → color on hover */}
        <div className="gallery-img-wrap relative w-full">
          <Image
            src={src}
            alt={title}
            width={800}
            height={600}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="gallery-img w-full h-auto block"
            loading={index < 12 ? "eager" : "lazy"}
          />
          {/* Title overlay on hover */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-end"
          >
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ink/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-smooth" />
            <span className="relative block w-full px-3 py-2.5 text-paper text-sm font-medium tracking-wide translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-smooth">
              {title}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}

export default function VisualizationGallery() {
  const t = useTranslations("visualizations.gallery");
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return galleryImages;
    return galleryImages.filter((img) => img.category === filter);
  }, [filter]);

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );
  const nextImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length]
  );

  const filters: Array<{ key: Filter; label: string }> = [
    { key: "all",      label: t("filterAll") },
    { key: "exterior", label: t("filterExterior") },
    { key: "interior", label: t("filterInterior") },
  ];

  return (
    <>
      {/* Filter tabs */}
      <div role="tablist" aria-label="סינון עבודות" className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => { setFilter(f.key); setLightboxIndex(null); }}
            className={`px-5 py-2.5 text-sm font-medium tracking-wide border transition-colors min-h-[44px] ${
              filter === f.key
                ? "bg-ink text-paper border-ink"
                : "bg-transparent text-ink border-paper-line hover:border-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="masonry">
        {filtered.map((img, i) => (
          <MasonryItem
            key={img.src}
            src={img.src}
            title={img.title}
            index={i}
            onClick={() => openLightbox(i)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-20 text-ink-muted">—</p>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}
