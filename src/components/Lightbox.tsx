"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/data/gallery";

interface Props {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const current = images[index];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Counter */}
      <div className="absolute top-4 ltr:left-1/2 rtl:left-1/2 -translate-x-1/2 text-paper/60 text-xs tracking-widest select-none">
        {index + 1} / {images.length}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="סגור"
        className="absolute top-4 ltr:right-4 rtl:left-4 w-11 h-11 flex items-center justify-center text-paper/70 hover:text-paper transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="תמונה קודמת"
        className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-paper/60 hover:text-paper transition-colors"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M17 6l-8 8 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="תמונה הבאה"
        className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-paper/60 hover:text-paper transition-colors"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M11 6l8 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center px-14"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          <Image
            key={current.src}
            src={current.src}
            alt={current.title}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Title */}
      {current.title && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-paper/80 text-sm tracking-wide text-center px-6">
          {current.title}
        </div>
      )}
    </div>
  );
}
