import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

import heroNight from "@/assets/hero-night.jpg";
import { CampaignFilms } from "@/components/site/CampaignFilms";
import { Reveal } from "@/components/site/Reveal";
import { en } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { featuredStories, stories, storyMarkets } from "@/lib/stories";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: en.stories.title },
      { name: "description", content: en.stories.description },
      { property: "og:title", content: en.stories.title },
      { property: "og:description", content: en.stories.description },
    ],
  }),
  component: SuccessStories,
});

function SuccessStories() {
  const { c, term } = useI18n();
  const [market, setMarket] = useState<string>("All");

  const filtered = useMemo(
    () => (market === "All" ? stories : stories.filter((s) => s.market === market)),
    [market],
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroNight}
          alt={c.home.heroAlt}
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover object-[70%_center]"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--gradient-veil)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-52">
          <p className="eyebrow rise text-gold">{c.stories.eyebrow}</p>
          <h1 className="rise mt-8 max-w-3xl text-[clamp(2.6rem,7vw,5.6rem)] font-extrabold leading-[0.95] text-[oklch(0.97_0.006_85)]">
            {c.stories.heroLine1}
            <br />
            <span className="font-serif font-normal italic text-gold-gradient">
              {c.stories.heroLine2}
            </span>
          </h1>
          <p className="rise mt-10 max-w-xl text-base leading-relaxed text-[oklch(0.97_0.006_85/0.72)]">
            {c.stories.heroBody}
          </p>
        </div>
      </section>

      {/* featured */}
      <section className="border-b border-border bg-[color:var(--ink)] py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="eyebrow text-gold">{c.stories.featured}</p>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            {featuredStories.map((story, i) => (
              <Reveal key={story.brand} delay={i * 110} className="bg-[color:var(--ink)]">
                <article className="group flex h-full flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={story.poster}
                      alt={`${story.brand} campaign`}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-8">
                    <div className="logo-tile h-28 w-full group-hover:logo-tile-hover">
                      <img
                        src={story.logo}
                        alt={`${story.brand} logo`}
                        loading="lazy"
                        className="logo-img max-h-16"
                      />
                    </div>
                    <div className="mt-8">
                      <h2 className="text-2xl font-extrabold tracking-tight">{story.brand}</h2>
                      <p className="eyebrow mt-3">{term("markets", story.market)}</p>
                      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
                        <div>
                          <p className="text-3xl font-extrabold">{story.reach}</p>
                          <p className="eyebrow mt-2">{c.common.followers}</p>
                        </div>
                        <div>
                          <p className="text-3xl font-extrabold text-gold">{story.creators}</p>
                          <p className="eyebrow mt-2">{c.common.creators}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* all stories */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-3">
            {storyMarkets.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMarket(m)}
                className={`rounded-full border px-5 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  market === m
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                }`}
              >
                {m === "All" ? c.categories["All"] : term("markets", m)}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((story, i) => (
              <Reveal
                key={`${story.brand}-${i}`}
                delay={Math.min(i, 8) * 60}
                className="bg-background"
              >
                <article className="group flex h-full flex-col gap-6 p-6 transition-colors duration-500 hover:bg-card/60">
                  <div className="logo-tile h-32 w-full group-hover:logo-tile-hover">
                    <img
                      src={story.logo}
                      alt={`${story.brand} logo`}
                      loading="lazy"
                      className="logo-img max-h-20"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-end">
                    <h3 className="text-lg font-bold tracking-tight sm:text-xl">{story.brand}</h3>
                    <p className="eyebrow mt-2">{term("markets", story.market)}</p>
                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
                      <div>
                        <p className="text-2xl font-extrabold">{story.reach}</p>
                        <p className="eyebrow mt-1">{c.common.followers}</p>
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold text-gold">{story.creators}</p>
                        <p className="eyebrow mt-1">{c.common.creators}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* films */}
      <section className="border-t border-border bg-[color:var(--ink)] py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow text-gold">{c.stories.filmsEyebrow}</p>
            <h2 className="mt-8 text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02]">
              {c.stories.filmsLine1}
              <br />
              <span className="font-serif font-normal italic text-muted-foreground">
                {c.stories.filmsLine2}
              </span>
            </h2>
          </Reveal>
          <div className="mt-16">
            <CampaignFilms />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24 text-center lg:py-32">
        <Reveal className="mx-auto max-w-2xl px-6">
          <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05]">
            {c.stories.ctaLine1}
            <br />
            <span className="font-serif font-normal italic text-gold-gradient">
              {c.stories.ctaLine2}
            </span>
          </h2>
          <Link
            to="/contact"
            className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-gold)] px-9 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {c.common.startCampaign}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
