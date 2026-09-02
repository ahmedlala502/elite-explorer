import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  LayoutGrid,
  MapPin,
  Megaphone,
  ScanLine,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/site/Reveal";
import { en } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { demoViews, piecesLabel } from "@/lib/platform-demo";

export const Route = createFileRoute("/_site/dashboard")({
  head: () => ({
    meta: [
      { title: en.platform.title },
      { name: "description", content: en.platform.description },
      { property: "og:title", content: en.platform.title },
      { property: "og:description", content: en.platform.description },
    ],
  }),
  component: Platform,
});

function Platform() {
  const { c, lang } = useI18n();
  const p = c.platform;
  const [viewId, setViewId] = useState(demoViews[0].id);
  const view = demoViews.find((v) => v.id === viewId) ?? demoViews[0];

  const kpis = [
    {
      label: p.kpis.branchesLabel,
      sub: p.kpis.branchesSub,
      value: view.kpis.branches,
      icon: LayoutGrid,
    },
    {
      label: p.kpis.creatorsLabel,
      sub: p.kpis.creatorsSub,
      value: view.kpis.creators,
      icon: Users,
    },
    {
      label: p.kpis.campaignsLabel,
      sub: p.kpis.campaignsSub,
      value: view.kpis.campaigns,
      icon: Megaphone,
    },
    {
      label: p.kpis.coverageLabel,
      sub: p.kpis.coverageSub,
      value: view.kpis.coverage,
      icon: TrendingUp,
    },
  ];

  const stages = [
    { name: p.pipeline.pending, value: view.stages.pending },
    { name: p.pipeline.confirmed, value: view.stages.confirmed },
    { name: p.pipeline.visited, value: view.stages.visited },
    { name: p.pipeline.delivered, value: view.stages.delivered },
    { name: p.pipeline.postCreation, value: view.stages.postCreation },
    { name: p.pipeline.shared, value: view.stages.shared },
    { name: p.pipeline.covered, value: view.stages.covered },
  ];

  const formats = [
    { name: p.panels.story, value: view.coverage.story },
    { name: p.panels.post, value: view.coverage.post },
    { name: p.panels.video, value: view.coverage.video },
  ];

  const features = [
    { title: p.features.influencersTitle, copy: p.features.influencersCopy, icon: Users },
    { title: p.features.branchesTitle, copy: p.features.branchesCopy, icon: MapPin },
    { title: p.features.scannerTitle, copy: p.features.scannerCopy, icon: ScanLine },
    { title: p.features.campaignsTitle, copy: p.features.campaignsCopy, icon: Megaphone },
    { title: p.features.reportingTitle, copy: p.features.reportingCopy, icon: BarChart3 },
    { title: p.features.supportTitle, copy: p.features.supportCopy, icon: ShieldCheck },
  ];

  return (
    <>
      <section className="border-b border-border pb-16 pt-36 text-center lg:pb-24 lg:pt-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <h1 className="text-4xl font-semibold tracking-[0.18em] lg:text-6xl">
              {p.hero.heading}
            </h1>
            <p className="eyebrow mt-5">{p.hero.tag}</p>
            <p className="mx-auto mt-6 max-w-[62ch] text-base text-muted-foreground lg:text-lg">
              {p.hero.lede}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/app"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-7 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                {p.hero.ctaPrimary}
                <ArrowRight className="size-4 rtl:-scale-x-100" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-12 items-center rounded-full border border-border px-7 text-sm font-semibold transition-colors hover:border-gold/60 hover:text-gold"
              >
                {p.hero.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground">{p.demo.note}</p>
              <div
                role="group"
                aria-label={p.demo.switchAriaLabel}
                className="inline-flex rounded-full border border-border p-1"
              >
                {demoViews.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    aria-pressed={v.id === viewId}
                    onClick={() => setViewId(v.id)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                      v.id === viewId
                        ? "bg-gold text-[color:var(--primary-foreground)]"
                        : "text-muted-foreground hover:text-gold"
                    }`}
                  >
                    {v.label[lang]}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="font-semibold">{view.campaign[lang]}</span>
              <span className="text-muted-foreground">{view.period[lang]}</span>
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi) => (
              <article key={kpi.label} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {kpi.label}
                  </span>
                  <kpi.icon className="size-4 text-gold" />
                </div>
                <p className="mt-5 text-4xl font-semibold tabular-nums">{kpi.value}</p>
                <p className="mt-2 text-xs text-muted-foreground">{kpi.sub}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-[color:var(--surface-alt)] py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow">{p.overview.eyebrow}</span>
            <h2 className="mt-4 text-3xl font-semibold lg:text-4xl">{p.overview.heading}</h2>
            <p className="mt-4 max-w-[62ch] text-muted-foreground">{p.overview.lede}</p>
          </Reveal>

          <ol
            aria-label={p.overview.pipelineAriaLabel}
            className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
          >
            {stages.map((stage) => (
              <li key={stage.name} className="rounded-xl border border-border bg-card p-4">
                <span className="block text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {stage.name}
                </span>
                <span className="mt-2 block text-2xl font-semibold tabular-nums">
                  {stage.value}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">{p.panels.recentCampaigns}</h3>
                <span className="text-xs text-muted-foreground">
                  {p.panels.recentCampaignsBadge}
                </span>
              </div>
              <div className="mt-6 grid gap-3">
                {view.campaigns.map((item) => (
                  <div
                    key={item.name.en}
                    className="flex items-center justify-between gap-4 rounded-xl border border-border p-4"
                  >
                    <div className="min-w-0">
                      <b className="block truncate text-sm font-semibold">{item.name[lang]}</b>
                      <span className="block truncate text-xs text-muted-foreground">
                        {item.meta[lang]}
                      </span>
                    </div>
                    <em className="shrink-0 text-xs not-italic text-gold">{item.state[lang]}</em>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold">{p.panels.coverageDetails}</h3>
                <span className="text-xs text-muted-foreground">
                  {view.kpis.coverage} {piecesLabel[lang]}
                </span>
              </div>
              <div className="mt-8 grid gap-4">
                {formats.map((format) => (
                  <div
                    key={format.name}
                    className="grid grid-cols-[5rem_1fr_3rem] items-center gap-3 text-sm"
                  >
                    <span className="truncate text-muted-foreground">{format.name}</span>
                    <span className="block h-1.5 overflow-hidden rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full bg-[image:var(--gradient-gold)] transition-[width] duration-500"
                        style={{ width: `${(format.value / view.kpis.coverage) * 100}%` }}
                      />
                    </span>
                    <span className="text-end font-semibold tabular-nums">{format.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-xs text-muted-foreground">{p.panels.coverageNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="text-center">
              <span className="eyebrow">{p.features.eyebrow}</span>
              <h2 className="mt-4 text-3xl font-semibold lg:text-4xl">{p.features.heading}</h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-gold/50"
              >
                <span className="grid size-11 place-content-center rounded-full border border-border text-gold">
                  <feature.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{feature.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="rounded-3xl border border-border bg-[color:var(--surface-alt)] px-8 py-14 text-center">
            <h2 className="text-2xl font-semibold lg:text-3xl">{p.cta.heading}</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-muted-foreground">{p.cta.copy}</p>
            <Link
              to="/contact"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-gold px-7 text-sm font-semibold text-[color:var(--primary-foreground)] transition-opacity hover:opacity-90"
            >
              {p.cta.button}
              <ArrowRight className="size-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
