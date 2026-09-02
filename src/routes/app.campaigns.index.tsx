import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpDown, Megaphone, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

import {
  AppButton,
  Badge,
  Chips,
  Count,
  EmptyState,
  Meter,
  PageHead,
  SearchField,
  Toolbar,
} from "@/components/app/ui";
import { campaignFilters, campaigns as initialCampaigns, type Campaign } from "@/lib/app-data";
import { demo } from "@/lib/demo";

export const Route = createFileRoute("/app/campaigns/")({
  head: () => ({ meta: [{ title: "Campaigns | ELITƎ workspace" }] }),
  component: Campaigns,
});

function Campaigns() {
  const [campaignList, setCampaignList] = useState(initialCampaigns);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "pct" | "creators">("pct");
  const [modalOpen, setModalOpen] = useState(false);

  // New campaign form state
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("Riyadh · KAFD");
  const [newCreators, setNewCreators] = useState("12");
  const [newTarget, setNewTarget] = useState("24");

  /** Chip counts come from the data, not the markup, so they stay honest. */
  const counts = useMemo(() => {
    const byStatus: Record<string, number> = { all: campaignList.length };
    for (const c of campaignList) byStatus[c.status] = (byStatus[c.status] ?? 0) + 1;
    return byStatus;
  }, [campaignList]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = campaignList.filter((c) => {
      if (status !== "all" && c.status !== status) return false;
      if (!q) return true;
      return `${c.name} ${c.where}`.toLowerCase().includes(q);
    });

    return result.sort((a, b) => {
      if (sortBy === "pct") return b.pct - a.pct;
      if (sortBy === "creators") return b.creators - a.creators;
      return a.name.localeCompare(b.name);
    });
  }, [campaignList, query, status, sortBy]);

  function handleCreateCampaign(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newCamp: Campaign = {
      id: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: newTitle,
      status: "briefing" as const,
      statusLabel: "Briefing",
      statusTone: "info" as const,
      where: newLocation,
      dates: "Sep – Oct 2026",
      ends: "31 Oct",
      creators: parseInt(newCreators) || 12,
      covered: 0,
      target: parseInt(newTarget) || 24,
      pct: 0,
      pctLabel: "0%",
      branches: newLocation.split("·")[0]?.trim() || newLocation.trim(),
    };

    setCampaignList((prev) => [newCamp, ...prev]);
    setModalOpen(false);
    setNewTitle("");
    demo(`Created campaign "${newTitle}"`, "Brief initialized and creator matching active.");
  }

  return (
    <>
      <PageHead
        crumbs={[{ label: "Dashboard", to: "/app" }, { label: "Campaigns" }]}
        title="Campaigns"
        lede="Brief, approve and monitor every campaign in one timeline — from shortlist to published coverage."
        actions={
          <AppButton tone="primary" onClick={() => setModalOpen(true)}>
            <Plus className="size-4" /> New campaign
          </AppButton>
        }
      />

      {/* KPI Overview Summary */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="rounded-xl border border-border bg-[color:var(--bg-raised)] p-4">
          <p className="text-xs text-muted-foreground">Total Campaigns</p>
          <p className="mt-1 text-2xl font-bold">{campaignList.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-[color:var(--bg-raised)] p-4">
          <p className="text-xs text-muted-foreground">Active in Field</p>
          <p className="mt-1 text-2xl font-bold text-gold">
            {campaignList.filter((c) => c.status === "active").length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-[color:var(--bg-raised)] p-4">
          <p className="text-xs text-muted-foreground">Creators Engaged</p>
          <p className="mt-1 text-2xl font-bold">
            {campaignList.reduce((acc, c) => acc + c.creators, 0)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-[color:var(--bg-raised)] p-4">
          <p className="text-xs text-muted-foreground">Average Completion</p>
          <p className="mt-1 text-2xl font-bold text-ok">
            {campaignList.length > 0
              ? `${Math.round(
                  campaignList.reduce((total, campaign) => total + campaign.pct, 0) /
                    campaignList.length,
                )}%`
              : "0%"}
          </p>
        </div>
      </section>

      <Toolbar>
        <SearchField
          id="camp-search"
          label="Search campaigns"
          placeholder="Search campaigns"
          value={query}
          onChange={setQuery}
        />
        <Chips
          options={campaignFilters}
          value={status}
          onChange={setStatus}
          label="Filter by status"
          counts={counts}
        />
        <div className="flex items-center gap-2 ms-auto">
          <button
            type="button"
            onClick={() =>
              setSortBy((s) => (s === "pct" ? "creators" : s === "creators" ? "name" : "pct"))
            }
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUpDown className="size-3 text-gold" />
            <span>
              Sort: {sortBy === "pct" ? "Progress" : sortBy === "creators" ? "Creators" : "Name"}
            </span>
          </button>
          <Count>
            {filtered.length} {filtered.length === 1 ? "campaign" : "campaigns"}
          </Count>
        </div>
      </Toolbar>

      <h2 className="sr-only">Campaign results</h2>

      {filtered.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {filtered.map((c) => (
            <Link
              key={c.id}
              to="/app/campaigns/$campaignId"
              params={{ campaignId: c.id }}
              className="panel-surface panel-sheen flex flex-col gap-4 rounded-[var(--r-md)] p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent-line)] hover:shadow-[var(--shadow-panel-hover)]"
            >
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold">{c.name}</h3>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {c.where} · <time>{c.dates}</time>
                  </p>
                </div>
                <span className="ms-auto shrink-0">
                  <Badge tone={c.statusTone}>{c.statusLabel}</Badge>
                </span>
              </div>

              <dl className="grid grid-cols-3 gap-3">
                {(
                  [
                    ["Creators", c.creators],
                    ["Covered", c.covered],
                    ["Target", c.target],
                  ] as const
                ).map(([term, value]) => (
                  <div key={term}>
                    <dt className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {term}
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex items-center gap-3">
                <Meter value={c.pct} tone={c.status === "completed" ? "ok" : "gold"} />
                <span className="shrink-0 text-xs font-semibold tabular-nums">{c.pctLabel}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Megaphone />}
          title="No campaigns match those filters"
          body="Clear the filters to see all campaigns, or create a new campaign brief."
          action={
            <AppButton
              size="sm"
              onClick={() => {
                setQuery("");
                setStatus("all");
              }}
            >
              Clear filters
            </AppButton>
          }
        />
      )}

      {/* New Campaign Creation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-[color:var(--bg-raised)] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold">New Campaign Brief</h3>
                <p className="text-xs text-muted-foreground">
                  Launch an influencer marketing campaign with ELITƎ
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground">
                  Campaign Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rüya Riyadh — Autumn Tasting"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground">
                  Location &amp; Venue
                </label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground">
                    Target Creators
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newCreators}
                    onChange={(e) => setNewCreators(e.target.value)}
                    className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground">
                    Deliverables Target
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[image:var(--gradient-gold)] px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-gold)]"
                >
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
