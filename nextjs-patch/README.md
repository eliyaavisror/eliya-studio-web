# ELIYA — Variation B refresh patch

קבצים מעודכנים לפי וריאציה B מה-mockup. העתק מעל הקבצים המקבילים בקוד שלך:

```
nextjs-patch/src/app/globals.css           → src/app/globals.css
nextjs-patch/tailwind.config.ts            → tailwind.config.ts
nextjs-patch/src/app/[locale]/layout.tsx   → src/app/[locale]/layout.tsx
nextjs-patch/src/app/[locale]/page.tsx     → src/app/[locale]/page.tsx
nextjs-patch/src/components/Header.tsx     → src/components/Header.tsx
nextjs-patch/src/components/ProjectCard.tsx→ src/components/ProjectCard.tsx
nextjs-patch/src/app/[locale]/architecture/page.tsx  → src/app/[locale]/architecture/page.tsx
nextjs-patch/src/app/[locale]/visualizations/page.tsx → src/app/[locale]/visualizations/page.tsx
nextjs-patch/src/app/[locale]/about/page.tsx          → src/app/[locale]/about/page.tsx
nextjs-patch/src/app/[locale]/contact/page.tsx        → src/app/[locale]/contact/page.tsx
```

## עיקרי השינויים

- **טיפוגרפיה**: Heebo עם משקלים 200/800 נוספו. Display scale הודק (line-height 0.86, letter-spacing -0.045em). כותרות עוברות ל-`font-semibold`/`font-bold` במקום `font-light`.
- **Eyebrow → Ticker**: tracking 0.4em, uppercase, גודל 11px. שימוש ב-`ticker` class חדש; `eyebrow` הישן נשמר אך מוקטן ל-tracking 0.3em.
- **כפתורים**: ריבועיים (rounded:0), uppercase, 11px עם letter-spacing 0.15em. ארבעה variants: `btn-primary`, `btn-secondary`, `btn-on-dark`, `btn-outline-light`.
- **Index numerals**: class חדש `.index-big` — Heebo 200, clamp(4rem,10vw,9rem), צבע paper-line, לתפקיד "01" / "02" ברוחב הצד.
- **עמוד הבית**: hero overlay הפך לגרדיאנט שמאלי (from-ink/25 via-ink/50 to-ink/75), סקציית שירותים שחורה inverted עם כרטיסים גדולים + תגיות, מטא-בר תחתון עם מספר פרויקטים.
- **ProjectCard**: מטא חדש — קו עליון + ticker `01 / קטגוריה` במקום מילון "צפה בפרויקט".
- **Header**: ניווט עבר ל-ticker uppercase tracked-out; גובה Header הופחת מ-28 ל-24 (md).

## עמודי פנים שעודכנו

- **architecture** — hero ticker אחיד, process card עם מספר ענק 56-72px ב-paper-line, specialties list על רקע שחור עם hover translate, סיומת CTA cream.
- **visualizations** — types grid הפך לרקע שחור inverted, עם אייקון paper/80 + מספר ענק ענוג ברקע, ticker count בגלריה.
- **about** — story/arch/viz בשלושה bands (לבן/cream) עם מספר ענק 01-03 בצד, סקציית stats עברה לרקע שחור עם מספרים 4-9rem, CTA סופי שחור.
- **contact** — info aside כדמוית רשימת dl עם borders עליון/תחתון, מספר טלפון 24-30px font-semibold, ticker labels.

## מה לא נגעתי

- `Footer.tsx`, `Logo.tsx`, `AccessibilityWidget.tsx`, `WhatsAppFloat.tsx`, `ContactForm.tsx`, `Lightbox.tsx`, `LocaleSwitcher.tsx`, `VisualizationGallery.tsx`, `ClientsCarousel.tsx` — אם תרצה התאמה גם להם תגיד.
