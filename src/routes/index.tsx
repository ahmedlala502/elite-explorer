import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import heroNight from "@/assets/hero-night.jpg";
import creatorFilming from "@/assets/creator-filming.jpg";
import skylineNight from "@/assets/skyline-night.jpg";
import textureNoir from "@/assets/texture-noir.jpg";
import { CampaignFilms } from "@/components/site/CampaignFilms";
import { ClientMarquee } from "@/components/site/ClientMarquee";
import { Reveal } from "@/components/site/Reveal";
import { en } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

/** Brand files exported for dark backgrounds need a dark plate. */
const onDark = (url: string) => url.includes("new_brand_logo");
import { featuredStories } from "@/lib/stories";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: en.home.title },
      { name: "description", content: en.home.description },
      { property: "og:title", content: en.home.title },
      { property: "og:description", content: en.home.description },
    ],
  }),
  component: Home,
});

function Home() {
  const { c, term } = useI18n();

  const stats = [
    { value: "52+", label: c.common.countries },
    { value: "50B+", label: c.common.reach },
    { value: "85K+", label: c.common.creators },
    { value: "1500+", label: c.common.brandsServed },
  ];

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
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
        <div className="grain-overlay pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-16 pt-40 lg:px-10 lg:pb-24">
          <p className="eyebrow rise text-gold">{c.home.eyebrow}</p>
          <h1 className="rise mt-8 max-w-[54rem] text-[clamp(3rem,9vw,7.5rem)] font-extrabold leading-[0.92] text-on-media">
            {c.home.heroLine1}
            <br />
            <span className="font-serif font-normal italic text-gold-gradient">
              {c.home.heroLine2}
            </span>
          </h1>
          <div className="hairline line-draw mt-10 max-w-md" />
          <p className="rise mt-8 max-w-lg text-base leading-relaxed text-on-media/70 sm:text-lg">
            {c.home.heroBody}
          </p>
          <div className="rise mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-gold)] px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {c.common.startCampaign}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100" />
            </Link>
            <Link
              to="/success-stories"
              className="inline-flex items-center gap-3 rounded-full border border-on-media/35 px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-on-media transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              {c.common.seeStories}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- stats ---------------- */}
      <section className="border-y border-border bg-surface-alt">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 px-6 lg:grid-cols-4 lg:px-10">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 90}
              className={`border-border py-10 lg:py-14 ${
                i % 2 === 1 ? "border-s ps-6" : "lg:border-s lg:ps-6"
              } ${i < 2 ? "border-b lg:border-b-0" : ""}`}
            >
              <p className="text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-none">
                {stat.value.replace("+", "")}
                <span className="text-gold">+</span>
              </p>
              <p className="eyebrow mt-4">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- trusted by ---------------- */}
      <section className="py-20 lg:py-28">
        <p className="eyebrow mb-12 text-center">{c.home.trusted}</p>
        <ClientMarquee />
        <div className="mt-14 text-center">
          <Link
            to="/clients"
            className="group inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold"
          >
            {c.common.viewClients}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100" />
          </Link>
        </div>
      </section>

      {/* ---------------- pillars ---------------- */}
      <section className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <p className="eyebrow text-gold">{c.home.whyEyebrow}</p>
              <h2 className="mt-8 text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02]">
                {c.home.whyLine1}
                <br />
                <span className="font-serif font-normal italic text-muted-foreground">
                  {c.home.whyLine2}
                </span>
              </h2>
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {c.home.whyBody}
              </p>
            </Reveal>

            <div>
              {c.home.pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 100}>
                  <div className="group grid grid-cols-[auto_1fr] gap-6 border-t border-border py-8 transition-colors hover:border-gold/50 sm:gap-10">
                    <span className="font-serif text-2xl italic text-gold/70">0{i + 1}</span>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- services ---------------- */}
      <section className="relative border-t border-border bg-surface-alt py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <Reveal>
              <p className="eyebrow text-gold">{c.home.servicesEyebrow}</p>
              <h2 className="mt-8 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02]">
                {c.home.servicesLine1}
                <br />
                <span className="font-serif font-normal italic text-muted-foreground">
                  {c.home.servicesLine2}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-sm leading-relaxed text-muted-foreground lg:pb-4">
                {c.home.servicesBody}
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="grid gap-px bg-border sm:grid-cols-2">
              {c.home.services.map((service, i) => (
                <Reveal key={service.title} delay={i * 90} className="bg-surface-alt">
                  <div className="group h-full p-8 transition-colors duration-500 hover:bg-card/60">
                    <p className="font-serif text-3xl italic text-gold/60">0{i + 1}</p>
                    <h3 className="mt-6 text-lg font-bold uppercase tracking-[0.08em]">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {service.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={160}>
              <figure className="relative h-full min-h-[420px] overflow-hidden">
                <img
                  src={creatorFilming}
                  alt={c.home.filmAlt}
                  loading="lazy"
                  width={1280}
                  height={1600}
                  className="size-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-scrim to-transparent p-8">
                  <p className="eyebrow text-gold">{c.home.filmEyebrow}</p>
                  <p className="mt-3 max-w-xs text-sm text-on-media">
                    {c.home.filmBody}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- process ---------------- */}
      <section className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow text-gold">{c.home.processEyebrow}</p>
            <h2 className="mt-8 max-w-3xl text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02]">
              {c.home.processLine1}
              <br />
              <span className="font-serif font-normal italic text-muted-foreground">
                {c.home.processLine2}
              </span>
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-px bg-border md:grid-cols-4">
            {c.home.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 110} className="bg-background">
                <div className="relative h-full pe-8 pt-8">
                  <span className="absolute start-0 top-0 h-px w-full bg-[image:var(--gradient-gold)] opacity-40" />
                  <p className="eyebrow">
                    {c.home.step} 0{i + 1}
                  </p>
                  <h3 className="mt-6 text-2xl font-extrabold tracking-tight">{step.title}</h3>
                  <p className="mt-4 pb-10 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- stories ---------------- */}
      <section className="border-t border-border bg-surface-alt py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <p className="eyebrow text-gold">{c.home.storiesEyebrow}</p>
              <h2 className="mt-8 text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02]">
                {c.home.storiesLine1}
                <br />
                <span className="font-serif font-normal italic text-muted-foreground">
                  {c.home.storiesLine2}
                </span>
              </h2>
            </Reveal>
            <Link
              to="/success-stories"
              className="group inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold"
            >
              {c.common.allStories}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100" />
            </Link>
          </div>

          <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
            {featuredStories.map((story, i) => (
              <Reveal key={story.brand} delay={i * 110} className="bg-surface-alt">
                <article className="group flex h-full flex-col justify-between p-8 transition-colors duration-500 hover:bg-card/60">
                  <div className={`${onDark(story.logo) ? "logo-tile-dark" : "logo-tile"} h-28 w-full group-hover:logo-tile-hover`}>
                    <img
                      src={story.logo}
                      alt={`${story.brand} logo`}
                      loading="lazy"
                      width={260}
                      height={112}
                      className="logo-img-color max-h-20"
                    />
                  </div>
                  <div className="mt-10">
                    <h3 className="text-2xl font-extrabold tracking-tight">{story.brand}</h3>
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
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- campaign films ---------------- */}
      <section className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow text-gold">{c.home.reelsEyebrow}</p>
            <h2 className="mt-8 text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02]">
              {c.home.reelsLine1}
              <br />
              <span className="font-serif font-normal italic text-muted-foreground">
                {c.home.reelsLine2}
              </span>
            </h2>
          </Reveal>
          <div className="mt-16">
            <CampaignFilms />
          </div>
        </div>
      </section>

      {/* ---------------- dashboard band ---------------- */}
      <section className="relative overflow-hidden border-t border-border">
        <img
          src={skylineNight}
          alt={c.home.skylineAlt}
          loading="lazy"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-scrim/80" aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold">{c.home.dashEyebrow}</p>
            <h2 className="mt-8 text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02] text-on-media">
              {c.home.dashLine1}
              <br />
              <span className="font-serif font-normal italic text-on-media/70">
                {c.home.dashLine2}
              </span>
            </h2>
            <ul className="mt-10 space-y-4 text-sm text-on-media/75">
              {c.home.dashPoints.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-2 h-px w-8 shrink-0 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden border-t border-border">
        <img
          src={textureNoir}
          alt=""
          aria-hidden
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover opacity-60 dark:opacity-70"
        />
        <div className="absolute inset-0 bg-background/70 dark:bg-transparent" aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 text-center lg:px-10 lg:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[1.02]">
              {c.home.ctaLine1}
              <br />
              <span className="font-serif font-normal italic text-gold-gradient">
                {c.home.ctaLine2}
              </span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {c.home.ctaBody}
            </p>
            <Link
              to="/contact"
              className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-gold)] px-9 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {c.common.startCampaign}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
