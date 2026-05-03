export type GalleryCategory = "exterior" | "interior";

export interface GalleryImage {
  src: string;
  title: string;
  category: GalleryCategory;
}

const EXT = "/images/projects/visualizations/exterior";
const INT = "/images/projects/visualizations/interior";

export const galleryImages: GalleryImage[] = [
  // ── EXTERIOR ─────────────────────────────────────────────────
  { src: `${EXT}/וילה מודרנית.webp`,              title: "וילה מודרנית",          category: "exterior" },
  { src: `${EXT}/02.webp`,                         title: "וילה מודרנית",          category: "exterior" },
  { src: `${EXT}/1122.webp`,                       title: "וילה מודרנית",          category: "exterior" },
  { src: `${EXT}/מבט פנטהאוס copy.webp`,           title: "פנטהאוס",               category: "exterior" },
  { src: `${EXT}/03-2.webp`,                       title: "פנטהאוס",               category: "exterior" },
  { src: `${EXT}/04-2.webp`,                       title: "פנטהאוס",               category: "exterior" },
  { src: `${EXT}/מלון כפרי.webp`,                 title: "מלון כפרי",             category: "exterior" },
  { src: `${EXT}/Shazap view 01 copy.webp`,        title: "שזף",                   category: "exterior" },
  { src: `${EXT}/A FINAL copy.webp`,               title: "פרויקט מגורים",         category: "exterior" },
  { src: `${EXT}/B_copy.webp`,                     title: "פרויקט מגורים",         category: "exterior" },
  { src: `${EXT}/C NEW copy.webp`,                 title: "פרויקט מגורים",         category: "exterior" },
  { src: `${EXT}/מסחרי שבות1.webp`,               title: "שבות מסחרי",            category: "exterior" },
  { src: `${EXT}/מסחרי שבות2.webp`,               title: "שבות מסחרי",            category: "exterior" },
  { src: `${EXT}/מסחרי שבות3.webp`,               title: "שבות מסחרי",            category: "exterior" },
  { src: `${EXT}/Hospital_Export_05-people1.webp`, title: "בניין ציבורי",          category: "exterior" },
  { src: `${EXT}/בניין .webp`,                    title: "בניין ציבורי",          category: "exterior" },
  { src: `${EXT}/SF1_02_002.webp`,                 title: "מגדל מגורים",           category: "exterior" },
  { src: `${EXT}/TF2_02_002.webp`,                 title: "מגדל מגורים",           category: "exterior" },
  { src: `${EXT}/01 copy.webp`,                    title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/01-VIEW.jpg`,                     title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/010101 copy.webp`,                title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/01_002 copy.webp`,                title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/01_image_V2 copy.webp`,           title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/02 copy.webp`,                    title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/02-VIEW copy.webp`,               title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/02_002 copy.webp`,                title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/02_image_V2 copy.webp`,           title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/03_002 copy.webp`,                title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/FF03 copy.webp`,                  title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/20250825-20250812-Mugan_Export_07 copy.webp`, title: "מוגן", category: "exterior" },
  { src: `${EXT}/יפו 2 copy.webp`,                title: "יפו",                   category: "exterior" },
  { src: `${EXT}/view 03_V3 copy fg3y.webp`,       title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/view 04_V3 copy 3.webp`,          title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/vilaq3.webp`,                     title: "וילה",                  category: "exterior" },
  { src: `${EXT}/לאתרx.webp`,                     title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/מבט כללי5.jpg`,                  title: "מבט כללי",              category: "exterior" },
  { src: `${EXT}/final.jpg`,                       title: "הדמיית חוץ",            category: "exterior" },
  { src: `${EXT}/03fine קרקע.jpg`,                title: "תוכנית קרקע",           category: "exterior" },

  // ── INTERIOR ─────────────────────────────────────────────────
  { src: `${INT}/מכללת אפקה - לובי.webp`,          title: "מכללת אפקה — לובי",     category: "interior" },
  { src: `${INT}/מכללת אפקה - ספריה.webp`,         title: "מכללת אפקה — ספריה",    category: "interior" },
  { src: `${INT}/מכללת אפקה - קפיטריה.webp`,       title: "מכללת אפקה — קפיטריה", category: "interior" },
  { src: `${INT}/405-1-.webp`,                      title: "דירת יוקרה",            category: "interior" },
  { src: `${INT}/405-2 copy.webp`,                  title: "דירת יוקרה",            category: "interior" },
  { src: `${INT}/405-5B-gigapixel-redefine-2x copy.webp`, title: "דירת יוקרה",   category: "interior" },
  { src: `${INT}/406-4.webp`,                       title: "דירת יוקרה",            category: "interior" },
  { src: `${INT}/406-5A.png`,                       title: "דירת יוקרה",            category: "interior" },
  { src: `${INT}/a-club 1.webp`,                    title: "A-Club",                category: "interior" },
  { src: `${INT}/a-club 2.webp`,                    title: "A-Club",                category: "interior" },
  { src: `${INT}/Kitchen.webp`,                     title: "מטבח",                  category: "interior" },
  { src: `${INT}/מטבח 3-סופי.jpg`,                 title: "מטבח",                  category: "interior" },
  { src: `${INT}/מטבח 4.webp`,                      title: "מטבח",                  category: "interior" },
  { src: `${INT}/מטבח משרדי.webp`,                 title: "מטבח משרדי",            category: "interior" },
  { src: `${INT}/סלון copy.webp`,                   title: "סלון",                  category: "interior" },
  { src: `${INT}/סלון copy.jpg`,                    title: "סלון",                  category: "interior" },
  { src: `${INT}/סלון מטבח-gigapixel-redefine-1x copy.webp`, title: "סלון מטבח", category: "interior" },
  { src: `${INT}/FViewLayer0001גגג copy.webp`,       title: "סלון",                  category: "interior" },
  { src: `${INT}/ViewLayer0001 copy.webp`,           title: "סלון",                  category: "interior" },
  { src: `${INT}/magnifics_upscale-YiVLCo2VmuEF0kIzrs8o-חדר שינה1 copy.webp`, title: "חדר שינה", category: "interior" },
  { src: `${INT}/מרפסת1.webp`,                      title: "מרפסת",                 category: "interior" },
  { src: `${INT}/משרדים.webp`,                      title: "משרדים",                category: "interior" },
  { src: `${INT}/image copy.webp`,                   title: "הדמיית פנים",           category: "interior" },
  { src: `${INT}/image copy2.webp`,                  title: "הדמיית פנים",           category: "interior" },
  { src: `${INT}/סופי.effectsResult copy.webp`,      title: "הדמיית פנים",           category: "interior" },
  { src: `${INT}/שירותים copy.webp`,                title: "חדר אמבטיה",            category: "interior" },
];

export const getByCategory = (cat: GalleryCategory) =>
  galleryImages.filter((i) => i.category === cat);
