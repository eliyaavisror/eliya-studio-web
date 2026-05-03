"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Logo from "./Logo";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/architecture", label: t("architecture") },
    { href: "/visualizations", label: t("visualizations") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isHome = pathname === "/";
  const useLight = isHome && !scrolled && !mobileOpen;

  const headerBg = mobileOpen
    ? "bg-white"
    : scrolled
    ? "bg-paper/95 backdrop-blur-md border-b border-paper-line"
    : "bg-transparent";

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-smooth ${headerBg}`}>
        <div className="container-x">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Link href="/" aria-label="ELIYA Studio — home" className="block">
              <Logo variant={useLight ? "light" : "dark"} />
            </Link>

            {/* Desktop nav — Variation B: uppercase, tracked-out */}
            <nav aria-label="Primary" className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ticker link-underline transition-opacity ${
                    useLight ? "text-paper" : "text-ink"
                  } ${isActive(item.href) ? "opacity-100" : "opacity-55 hover:opacity-100"}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <LocaleSwitcher colorClass={useLight ? "text-paper" : "text-ink"} />

              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? t("close") : t("openMenu")}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="lg:hidden min-h-[48px] min-w-[48px] inline-flex items-center justify-center"
              >
                <span className="relative flex flex-col gap-[5px] w-5">
                  <span className={`block h-px transition-all duration-300 ${useLight ? "bg-paper" : "bg-ink"} ${mobileOpen ? "translate-y-[6px] rotate-45" : ""}`} />
                  <span className={`block h-px transition-all duration-300 ${useLight ? "bg-paper" : "bg-ink"} ${mobileOpen ? "opacity-0" : ""}`} />
                  <span className={`block h-px transition-all duration-300 ${useLight ? "bg-paper" : "bg-ink"} ${mobileOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-smooth ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm" />
        <nav aria-label="Mobile" className="relative container-x pt-28 md:pt-36 pb-20 h-full overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-4 text-display-lg font-semibold text-ink transition-all duration-500 ${
                    mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  } ${isActive(item.href) ? "" : "!opacity-50"}`}
                  style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
