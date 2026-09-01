import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

import heroNight from "@/assets/hero-night.jpg";
import { Reveal } from "@/components/site/Reveal";
import { featuredStories, stories, storyCategories } from "@/lib/stories";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success stories — ELITƎ campaigns, creators and numbers" },
      {
        name: "description",
        content:
          "Real ELITƎ campaigns with real creators and real numbers. Filter influencer marketing case studies by category and market.",
      },
      { property: "og:title", content: "ELITƎ success stories" },
      {
        property: "og:description",
        content: "Campaign case studies: reach, creator counts and markets across the Gulf.",
      },
    ],
  }),
  component: SuccessStories,
});

function SuccessStories() {
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(
    () => (category === "All" ? stories : stories.filter((s) => s.category === category)),
    [category],
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroNight}
          alt="An exclusive dinner overlooking a Gulf skyline"
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover object-[70%_center] opacity-70"
        />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-veil)" }} aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-52">
          <p className="eyebrow rise text-gold">Success in action</p>
          <h1 className="rise mt-8 max-w-3xl text-[clamp(2.6rem,7vw,5.6rem)] font-extrabold leading-[0.95]">
            Stories from
            <br />
            <span className="font-serif font-normal italic text-gold-gradient">our clients.</span>
          </h1>
          <p className="rise mt-10 max-w-xl text-base leading-relaxed text-muted-foreground">
            Real campaigns, real creators, real numbers. Filter by category to find work close to
            yours.
          </p>
        </div>
      </section>

      {/* featured */}
      <section className="border-b border-border bg-[color:var(--ink)] py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="eyebrow text-gold">Featured work</p>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            {featuredStories.map((story, i) => (
              <Reveal key={story.brand} delay={i * 110} className="bg-[color:var(--ink)]">
                <article className="group flex h-full flex-col justify-between p-8 transition-colors duration-500 hover:bg-card/60">
                  <div className="flex h-16 items-center">
                    {story.logo && (
                      <img
                        src={story.logo}
                        alt={`${story.brand} logo`}
                        loading="lazy"
                        width={160}
                        height={64}
                        className="logo-plate max-h-10 w-auto object-contain group-hover:logo-plate-hover"
                      />
                    )}
                  </div>
                  <div className="mt-10">
                    <h2 className="text-2xl font-extrabold tracking-tight">{story.brand}</h2>
                    <p className="eyebrow mt-3">
                      {story.market} · {story.category}
                    </p>
                    <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                      {story.note}
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
                      <div>
                        <p className="text-3xl font-extrabold">{story.reach}</p>
                        <p className="eyebrow mt-2">Followers</p>
                      </div>
                      <div>
                        <p className="text-3xl font-extrabold text-gold">{story.creators}</p>
                        <p className="eyebrow mt-2">Creators</p>
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
            {storyCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full border px-5 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  category === c
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-14 border-t border-border">
            {filtered.map((story, i) => (
              <Reveal key={`${story.brand}-${i}`} delay={Math.min(i, 8) * 60}>
                <article className="group grid grid-cols-[1fr_auto] items-center gap-6 border-b border-border py-7 transition-colors hover:border-gold/50 sm:grid-cols-[2rem_10rem_1fr_auto_auto] sm:gap-10">
                  <span className="hidden font-serif text-lg italic text-gold/60 sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="hidden h-10 items-center sm:flex">
                    {story.logo && (
                      <img
                        src={story.logo}
                        alt={`${story.brand} logo`}
                        loading="lazy"
                        width={140}
                        height={56}
                        className="logo-plate max-h-8 w-auto object-contain group-hover:logo-plate-hover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight sm:text-xl">{story.brand}</h3>
                    <p className="eyebrow mt-2">
                      {story.market} · {story.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-extrabold sm:text-2xl">{story.reach}</p>
                    <p className="eyebrow mt-1">Followers</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-extrabold text-gold sm:text-2xl">{story.creators}</p>
                    <p className="eyebrow mt-1">Creators</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-[color:var(--ink)] py-24 text-center lg:py-32">
        <Reveal className="mx-auto max-w-2xl px-6">
          <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05]">
            Your campaign
            <br />
            <span className="font-serif font-normal italic text-gold-gradient">next.</span>
          </h2>
          <Link
            to="/contact"
            className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-gold)] px-9 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start a campaign
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
