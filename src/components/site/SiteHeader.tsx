import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { EliteWordmark } from "@/components/brand/EliteWordmark";
import { SiteControls } from "@/components/site/SiteControls";
import { useI18n } from "@/lib/i18n";

export function SiteHeader() {
  const { c } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/", label: c.nav.home },
    { to: "/success-stories", label: c.nav.stories },
    { to: "/clients", label: c.nav.clients },
    { to: "/about", label: c.nav.about },
    { to: "/contact", label: c.nav.contact },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-6 px-6 lg:px-10">
        <Link to="/" aria-label="ELITƎ" className="group flex items-center gap-3">
          <EliteWordmark className="h-4 w-auto text-foreground transition-colors duration-500 group-hover:text-gold" />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
              <span className="absolute -bottom-2 start-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <SiteControls />
          <Link
            to="/contact"
            className="rounded-full bg-[image:var(--gradient-gold)] px-6 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {c.nav.cta}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <SiteControls />
          <button
            type="button"
            aria-label={open ? c.nav.closeMenu : c.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
            className="text-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 px-6 py-6 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-5">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-3 text-center text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary-foreground"
            >
              {c.nav.cta}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
