import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import skylineNight from "@/assets/skyline-night.jpg";
import creatorFilming from "@/assets/creator-filming.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ELITƎ — A decade of influence in 52+ countries" },
      {
        name: "description",
        content:
          "ELITƎ designs bespoke influencer campaigns for the region's most discerning brands, with over ten years of relationships across 52+ countries.",
      },
      { property: "og:title", content: "About ELITƎ" },
      {
        property: "og:description",
        content:
          "Over a decade of influencer marketing for premium brands across the Gulf and beyond.",
      },
    ],
  }),
  component: About,
});

const stats = [
  { value: "10+", label: "Years" },
  { value: "52+", label: "Countries" },
  { value: "85K+", label: "Creators" },
  { value: "1500+", label: "Brands served" },
];

const reasons = [
  {
    title: "Decade of excellence",
    body: "With over ten years in the industry, ELITƎ brings deep knowledge and expertise to every campaign we undertake.",
  },
  {
    title: "Global reach",
    body: "Our presence in over 52 countries connects brands with influencers and audiences on a global scale.",
  },
  {
    title: "Elite partnerships",
    body: "Exclusive relationships with high-end brands and elite influencers give our clients access to the best talent worldwide.",
  },
  {
    title: "Measurable results",
    body: "We are committed to results that drive real business growth and a return you can point to.",
  },
  {
    title: "Exceptional quality",
    body: "From conception to execution, we hold the highest standards of quality and professionalism throughout.",
  },
];

function About() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={skylineNight}
          alt="Gulf skyline at night"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[color:var(--ink)]/70" aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-52">
          <p className="eyebrow rise text-gold">About us</p>
          <h1 className="rise mt-8 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.95]">
            A decade of influence,
            <br />
            <span className="font-serif font-normal italic text-gold-gradient">
              in more than 52 countries.
            </span>
          </h1>
          <p className="rise mt-10 max-w-xl text-base leading-relaxed text-muted-foreground">
            With over ten years of experience and relationships across more than 52 countries, ELITƎ
            delivers bespoke influencer campaigns for the region's most discerning brands.
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
                i % 2 === 1 ? "border-l pl-6" : "lg:border-l lg:pl-6"
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
            <p className="eyebrow text-gold">Our mission</p>
            <h2 className="mt-8 text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.05]">
              Simple, yet powerful.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
              To design tailored influencer strategies that amplify your brand message, connect with
              the right creators and deliver measurable return.
            </p>
            <div className="hairline my-12 max-w-sm" />
            <p className="eyebrow text-gold">Our approach</p>
            <h2 className="mt-8 text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.05]">
              Exceptional strategies.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Exceptional results demand exceptional strategy. We connect our clients directly with
              elite talent and high-end brands through bespoke global campaigns.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <figure className="relative h-full min-h-[460px] overflow-hidden">
              <img
                src={creatorFilming}
                alt="A creator capturing a fine-dining dish for a brand campaign"
                loading="lazy"
                width={1280}
                height={1600}
                className="size-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--ink)] to-transparent p-8 font-serif text-xl italic text-foreground">
                “The right creator, in the right market, at the right moment.”
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-[color:var(--ink)] py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow text-gold">Why choose ELITƎ</p>
            <h2 className="mt-8 text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02]">
              Five reasons
              <br />
              <span className="font-serif font-normal italic text-muted-foreground">
                brands stay.
              </span>
            </h2>
          </Reveal>

          <div className="mt-16">
            {reasons.map((reason, i) => (
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
            Let's talk about
            <br />
            <span className="font-serif font-normal italic text-gold-gradient">
              your next campaign.
            </span>
          </h2>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Tell us what you want to achieve. We will assemble the creator roster, the strategy and
            the numbers.
          </p>
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
