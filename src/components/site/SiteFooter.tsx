import { Link } from "@tanstack/react-router";

import { EliteWordmark, EliteMark } from "@/components/brand/EliteWordmark";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-[color:var(--ink)]">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <EliteWordmark className="h-5 w-auto text-foreground" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Influencer marketing for premium brands. We launch, run and measure your campaigns
              with 24/7 live support across 52+ countries.
            </p>
            <p className="eyebrow mt-8 text-gold">Niche mastery redefined</p>
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="transition-colors hover:text-foreground">
                  Success stories
                </Link>
              </li>
              <li>
                <Link to="/clients" className="transition-colors hover:text-foreground">
                  Our clients
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Company</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="transition-colors hover:text-foreground">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-foreground">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Markets</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Saudi Arabia · Kuwait · United Arab Emirates · Qatar · Bahrain — and 47 more.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs tracking-wide text-muted-foreground">
            © {new Date().getFullYear()} ELITƎ. All rights reserved.
          </p>
          <EliteMark className="h-6 w-auto text-gold/60" />
        </div>
      </div>
    </footer>
  );
}
