import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import textureNoir from "@/assets/texture-noir.jpg";
import { Reveal } from "@/components/site/Reveal";
import { clients } from "@/lib/clients";
import { en } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: en.clients.title },
      { name: "description", content: en.clients.description },
      { property: "og:title", content: en.clients.title },
      { property: "og:description", content: en.clients.description },
    ],
  }),
  component: Clients,
});

const markets = ["Saudi Arabia", "Kuwait", "United Arab Emirates", "Qatar", "Bahrain"];

function Clients() {
  const { c, term } = useI18n();
  const [query, setQuery] = useState("");

  const stats = [
    { value: "85K+", label: c.common.creators },
    { value: "930", label: c.common.campaigns },
    { value: "52+", label: c.common.countriesReached },
    { value: "10+", label: c.common.yearsRunning },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter((client) => client.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <section className="border-b border-border pb-20 pt-40 lg:pb-24 lg:pt-52">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="eyebrow rise text-gold">{c.clients.eyebrow}</p>
          <h1 className="rise mt-8 max-w-3xl text-[clamp(2.6rem,7vw,5.6rem)] font-extrabold leading-[0.95]">
            {c.clients.heroLine1}
            <br />
            <span className="font-serif font-normal italic text-gold-gradient">
              {c.clients.heroLine2}
            </span>
          </h1>
          <p className="rise mt-10 max-w-xl text-base leading-relaxed text-muted-foreground">
            {c.clients.heroBody}
          </p>
          <div className="rise mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {markets.map((market) => (
              <span key={market} className="eyebrow">
                {term("markets", market)}
              </span>
            ))}
          </div>
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
              <p className="text-[clamp(2rem,4.6vw,3.2rem)] font-extrabold leading-none">
                {stat.value.replace("+", "")}
                {stat.value.includes("+") && <span className="text-gold">+</span>}
              </p>
              <p className="eyebrow mt-4">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <p className="eyebrow text-gold">
              {c.clients.roster} · {clients.length} {c.clients.brands}
            </p>
            <label className="flex w-full max-w-xs items-center gap-3 border-b border-border pb-3 focus-within:border-gold sm:w-auto">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={c.clients.search}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-20 border-t border-border pt-16 text-center">
              <p className="font-serif text-2xl italic text-foreground">{c.clients.emptyTitle}</p>
              <p className="mt-4 text-sm text-muted-foreground">{c.clients.emptyBody}</p>
            </div>
          ) : (
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((client, i) => (
                <Reveal key={client.name} delay={Math.min(i, 12) * 40}>
                  <div className="group flex flex-col items-center gap-4">
                    <div className="logo-tile h-40 w-full group-hover:logo-tile-hover">
                      <img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        loading="lazy"
                        width={280}
                        height={140}
                        className="logo-img max-h-24"
                      />
                    </div>
                    <span className="text-center text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {client.name}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

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
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 text-center lg:px-10 lg:py-32">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05]">
              {c.clients.ctaLine1}
              <br />
              <span className="font-serif font-normal italic text-gold-gradient">
                {c.clients.ctaLine2}
              </span>
            </h2>
            <Link
              to="/contact"
              className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-gold)] px-9 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {c.clients.ctaButton}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
