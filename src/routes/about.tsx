import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import skylineNight from "@/assets/skyline-night.jpg";
import creatorFilming from "@/assets/creator-filming.jpg";
import { Reveal } from "@/components/site/Reveal";
import { en } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: en.about.title },
      { name: "description", content: en.about.description },
      { property: "og:title", content: en.about.title },
      { property: "og:description", content: en.about.description },
    ],
  }),
  component: About,
});

function About() {
  const { c } = useI18n();

  const stats = [
    { value: "10+", label: c.common.years },
    { value: "52+", label: c.common.countries },
    { value: "85K+", label: c.common.creators },
    { value: "1500+", label: c.common.brandsServed },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={skylineNight}
          alt={c.home.skylineAlt}
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover [filter:var(--hero-media-filter)]"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--gradient-veil)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-52">
          <p className="eyebrow rise text-gold">{c.about.eyebrow}</p>
          <h1 className="rise mt-8 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.95] text-hero-fg">
            {c.about.heroLine1}
            <br />
            <span className="font-serif font-normal italic text-gold-gradient">
              {c.about.heroLine2}
            </span>
          </h1>
          <p className="rise mt-10 max-w-xl text-base leading-relaxed text-hero-fg/75">
            {c.about.heroBody}
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-[color:var(--ink)]">
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

      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <p className="eyebrow text-gold">{c.about.missionEyebrow}</p>
            <h2 className="mt-8 text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.05]">
              {c.about.missionTitle}
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {c.about.missionBody}
            </p>
            <div className="hairline my-12 max-w-sm" />
            <p className="eyebrow text-gold">{c.about.approachEyebrow}</p>
            <h2 className="mt-8 text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.05]">
              {c.about.approachTitle}
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {c.about.approachBody}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <figure className="relative h-full min-h-[460px] overflow-hidden">
              <img
                src={creatorFilming}
                alt={c.about.figureAlt}
                loading="lazy"
                width={1280}
                height={1600}
                className="size-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.12_0.006_70)] to-transparent p-8 font-serif text-xl italic text-[oklch(0.97_0.006_85)]">
                {c.about.quote}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-[color:var(--ink)] py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow text-gold">{c.about.whyEyebrow}</p>
            <h2 className="mt-8 text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02]">
              {c.about.whyLine1}
              <br />
              <span className="font-serif font-normal italic text-muted-foreground">
                {c.about.whyLine2}
              </span>
            </h2>
          </Reveal>

          <div className="mt-16">
            {c.about.reasons.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 90}>
                <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-border py-8 transition-colors hover:border-gold/50 sm:grid-cols-[6rem_1fr] sm:gap-12">
                  <span className="font-serif text-2xl italic text-gold/70">0{i + 1}</span>
                  <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr] lg:items-baseline">
                    <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{reason.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{reason.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24 text-center lg:py-32">
        <Reveal className="mx-auto max-w-2xl px-6">
          <h2 className="text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.05]">
            {c.about.ctaLine1}
            <br />
            <span className="font-serif font-normal italic text-gold-gradient">
              {c.about.ctaLine2}
            </span>
          </h2>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{c.about.ctaBody}</p>
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
