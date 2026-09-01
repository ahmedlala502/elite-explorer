import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import heroNight from "@/assets/hero-night.jpg";
import creatorFilming from "@/assets/creator-filming.jpg";
import skylineNight from "@/assets/skyline-night.jpg";
import textureNoir from "@/assets/texture-noir.jpg";
import { ClientMarquee } from "@/components/site/ClientMarquee";
import { Reveal } from "@/components/site/Reveal";
import { featuredStories } from "@/lib/stories";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ELITƎ — Niche mastery, redefined" },
      {
        name: "description",
        content:
          "ELITƎ connects premium brands with the creators their audience already trusts, then runs and measures the whole campaign across 52+ countries.",
      },
      { property: "og:title", content: "ELITƎ — Niche mastery, redefined" },
      {
        property: "og:description",
        content:
          "Influencer marketing for premium brands. 85K creators, 52+ countries, 1500 brands served.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "52+", label: "Countries" },
  { value: "50B+", label: "Follower reach" },
  { value: "85K+", label: "Creators" },
  { value: "1500+", label: "Brands served" },
];

const pillars = [
  {
    title: "A decade of excellence",
    body: "Over ten years running influencer campaigns for high-end brands. The playbook is already written.",
  },
  {
    title: "Global reach",
    body: "A presence in more than 52 countries connects your brand with the right audience, wherever it lives.",
  },
  {
    title: "Elite partnerships",
    body: "Exclusive relationships with elite creators and premium brands mean access others simply don't have.",
  },
  {
    title: "Measurable results",
    body: "Every campaign is tracked end to end, so growth is something you can see, not something you're told.",
  },
];

const services = [
  {
    title: "Influencer discovery",
    body: "Tap into our network to find creators who match your brand and audience, lifting engagement and affinity.",
  },
  {
    title: "Campaign strategy",
    body: "Design campaigns with our strategists around your goals, markets and budget for results that resonate.",
  },
  {
    title: "Content creation",
    body: "Creators produce compelling content in their own voice, reviewed against your brand guidelines.",
  },
  {
    title: "Performance tracking",
    body: "Actionable insight into coverage and return, so strategy is optimised while the campaign is live.",
  },
];

const steps = [
  {
    title: "Match",
    body: "We shortlist creators from our network whose audience genuinely overlaps with yours.",
  },
  {
    title: "Plan",
    body: "Objectives, budget, markets and deliverables become a campaign brief everyone signs off.",
  },
  {
    title: "Create",
    body: "Creators produce content in their own voice, reviewed against your brand guidelines.",
  },
  {
    title: "Measure",
    body: "Live coverage tracking and post-campaign reporting show exactly what the spend returned.",
  },
];

function Home() {
  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img
          src={heroNight}
          alt="Guests at an exclusive rooftop dinner overlooking a Gulf skyline"
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
          <p className="eyebrow rise text-gold">Influencer marketing · 52+ countries</p>
          <h1 className="rise mt-8 max-w-[54rem] text-[clamp(3rem,9vw,7.5rem)] font-extrabold leading-[0.92]">
            Niche mastery,
            <br />
            <span className="font-serif font-normal italic text-gold-gradient">redefined.</span>
          </h1>
          <div className="hairline line-draw mt-10 max-w-md" />
          <p className="rise mt-8 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            ELITƎ connects premium brands with the creators their audience already trusts, then runs
            and measures the whole campaign for you.
          </p>
          <div className="rise mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-gold)] px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a campaign
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/success-stories"
              className="inline-flex items-center gap-3 rounded-full border border-border px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              See success stories
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- stats ---------------- */}
      <section className="border-y border-border bg-[color:var(--ink)]">
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

      {/* ---------------- trusted by ---------------- */}
      <section className="py-20 lg:py-28">
        <p className="eyebrow mb-12 text-center">
          Trusted by category leaders across the Gulf and beyond
        </p>
        <ClientMarquee />
        <div className="mt-14 text-center">
          <Link
            to="/clients"
            className="group inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold"
          >
            View our clients
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </section>

      {/* ---------------- pillars ---------------- */}
      <section className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <p className="eyebrow text-gold">Why ELITƎ</p>
              <h2 className="mt-8 text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02]">
                Exceptional results need
                <br />
                <span className="font-serif font-normal italic text-muted-foreground">
                  exceptional strategy.
                </span>
              </h2>
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Ten years of relationships with elite influencers and high-end brands, put to work on
                your campaign.
              </p>
            </Reveal>

            <div>
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 100}>
                  <div className="group grid grid-cols-[auto_1fr] gap-6 border-t border-border py-8 transition-colors hover:border-gold/50 sm:gap-10">
                    <span className="font-serif text-2xl italic text-gold/70">
                      0{i + 1}
                    </span>
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
      <section className="relative border-t border-border bg-[color:var(--ink)] py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <Reveal>
              <p className="eyebrow text-gold">Service solutions</p>
              <h2 className="mt-8 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02]">
                Everything a campaign needs,
                <br />
                <span className="font-serif font-normal italic text-muted-foreground">
                  under one roof.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-sm leading-relaxed text-muted-foreground lg:pb-4">
                From finding the right creator to proving the return — four services that run as one
                process.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="grid gap-px bg-border sm:grid-cols-2">
              {services.map((service, i) => (
                <Reveal key={service.title} delay={i * 90} className="bg-[color:var(--ink)]">
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
                  alt="A creator filming a plated dish in a dimly lit fine-dining restaurant"
                  loading="lazy"
                  width={1280}
                  height={1600}
                  className="size-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--ink)] to-transparent p-8">
                  <p className="eyebrow text-gold">Campaigns on film</p>
                  <p className="mt-3 max-w-xs text-sm text-foreground">
                    Content shot in the creator's own voice, on brand, on schedule.
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
            <p className="eyebrow text-gold">The process</p>
            <h2 className="mt-8 max-w-3xl text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02]">
              Four steps.
              <br />
              <span className="font-serif font-normal italic text-muted-foreground">
                One clear line to results.
              </span>
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-px bg-border md:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 110} className="bg-background">
                <div className="relative h-full pt-8 pr-8">
                  <span className="absolute left-0 top-0 h-px w-full bg-[image:var(--gradient-gold)] opacity-40" />
                  <p className="eyebrow">Step 0{i + 1}</p>
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
      <section className="border-t border-border bg-[color:var(--ink)] py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <p className="eyebrow text-gold">Success in action</p>
              <h2 className="mt-8 text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02]">
                Stories from
                <br />
                <span className="font-serif font-normal italic text-muted-foreground">
                  our clients.
                </span>
              </h2>
            </Reveal>
            <Link
              to="/success-stories"
              className="group inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold"
            >
              See all stories
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
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
                    <h3 className="text-2xl font-extrabold tracking-tight">{story.brand}</h3>
                    <p className="eyebrow mt-3">{story.market}</p>
                    <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
                      <div>
                        <p className="text-3xl font-extrabold">{story.reach}</p>
                        <p className="eyebrow mt-2">Reach</p>
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

      {/* ---------------- dashboard band ---------------- */}
      <section className="relative overflow-hidden border-t border-border">
        <img
          src={skylineNight}
          alt="Gulf city skyline at night"
          loading="lazy"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[color:var(--ink)]/70" aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold">The ELITƎ dashboard</p>
            <h2 className="mt-8 text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.02]">
              Your whole campaign,
              <br />
              <span className="font-serif font-normal italic text-muted-foreground">
                on one screen.
              </span>
            </h2>
            <ul className="mt-10 space-y-4 text-sm text-muted-foreground">
              {[
                "Track every creator from pending to covered",
                "Story, post and video coverage counted automatically",
                "Wishlists, branches and scanner tools built in",
                "24/7 live support behind every campaign",
              ].map((item) => (
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
          className="absolute inset-0 size-full object-cover opacity-60"
        />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 text-center lg:px-10 lg:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-[1.02]">
              Ready to elevate
              <br />
              <span className="font-serif font-normal italic text-gold-gradient">your brand?</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Tell us the goal. We'll come back with the creators, the plan and the numbers —
              wherever in the world you are.
            </p>
            <Link
              to="/contact"
              className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-gold)] px-9 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a campaign
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
