import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  Plus,
  SearchX,
  X,
} from "lucide-react";
import { useState } from "react";

import {
  AppButton,
  Badge,
  Chips,
  Count,
  EmptyState,
  PageHead,
  SearchField,
  Toolbar,
  appButtonClass,
} from "@/components/app/ui";
import { creatorCategories, creatorTotal, creators } from "@/lib/app-data";
import { demo } from "@/lib/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/influencers/")({
  head: () => ({ meta: [{ title: "Influencers | ELITƎ workspace" }] }),
  component: Influencers,
});

/**
 * Each card's cover is a soft directional wash rather than a flat band. Six
 * variants, all mixed from the theme's own champagne and surface tokens.
 */
const coverStyle: Record<number, string> = {
  1: "linear-gradient(120deg, color-mix(in oklab, var(--gold) 22%, transparent), color-mix(in oklab, var(--gold) 5%, transparent))",
  2: "linear-gradient(120deg, color-mix(in oklab, var(--gold) 34%, transparent), color-mix(in oklab, var(--gold-deep) 12%, transparent))",
  3: "linear-gradient(120deg, color-mix(in oklab, var(--foreground) 12%, transparent), color-mix(in oklab, var(--gold) 10%, transparent))",
  4: "linear-gradient(120deg, color-mix(in oklab, var(--foreground) 8%, transparent), transparent)",
  5: "linear-gradient(120deg, color-mix(in oklab, var(--gold-soft) 26%, transparent), color-mix(in oklab, var(--foreground) 7%, transparent))",
  6: "linear-gradient(120deg, color-mix(in oklab, var(--foreground) 14%, transparent), color-mix(in oklab, var(--gold) 6%, transparent))",
};

/** Profile URLs carry the handle minus the “@”: @hessa.m → /app/influencers/hessa.m */
const profileParam = (handle: string) => handle.replace(/^@/, "");
const middlePages = [2, 3];
const lastPage = 78;

function parseCompactNumber(value: string) {
  const number = Number.parseFloat(value);
  if (!Number.isFinite(number)) return 0;
  if (/m$/i.test(value)) return number * 1_000_000;
  if (/k$/i.test(value)) return number * 1_000;
  return number;
}

function Influencers() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [onlySaved, setOnlySaved] = useState(false);
  const [sortBy, setSortBy] = useState<"reach" | "name" | "engagement">("reach");
  const [shortlistModal, setShortlistModal] = useState(false);
  const [shortlistName, setShortlistName] = useState("");
  const [saved, setSaved] = useState(
    () => new Set(creators.filter((c) => c.saved).map((c) => c.handle)),
  );

  const needle = query.trim().toLowerCase();
  const shown = creators
    .filter((c) => {
      const inSaved = !onlySaved || saved.has(c.handle);
      const inCategory = category === "all" || c.category === category;
      const inSearch =
        needle === "" || `${c.name} ${c.handle} ${c.city}`.toLowerCase().includes(needle);
      return inSaved && inCategory && inSearch;
    })
    .sort((a, b) => {
      if (sortBy === "reach") {
        return parseCompactNumber(b.followers) - parseCompactNumber(a.followers);
      }
      if (sortBy === "engagement") {
        return parseCompactNumber(b.engagement) - parseCompactNumber(a.engagement);
      }
      return a.name.localeCompare(b.name);
    });

  function toggleSave(handle: string, name: string) {
    setSaved((prev) => {
      const next = new Set(prev);
      const wasSaved = next.has(handle);
      if (wasSaved) {
        next.delete(handle);
        demo(`Removed ${name} from wishlist`);
      } else {
        next.add(handle);
        demo(`Saved ${name} to wishlist`, "Creator bookmarked for future campaigns.");
      }
      return next;
    });
  }

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setOnlySaved(false);
  }

  function handleCreateShortlist(e: React.FormEvent) {
    e.preventDefault();
    if (!shortlistName.trim()) return;
    setShortlistModal(false);
    demo(`Shortlist "${shortlistName}" created`, `${saved.size} creators added to shortlist.`);
    setShortlistName("");
  }

  return (
    <>
      <PageHead
        crumbs={[{ label: "Dashboard", to: "/app" }, { label: "Influencers" }]}
        title="Influencers"
        lede="Browse the ELITƎ network, save creators to your wishlist and build shortlists your whole team can see."
        actions={
          <>
            <AppButton onClick={() => demo("Exporting current creator directory as CSV")}>
              <Download className="size-4" /> Export CSV
            </AppButton>
            <AppButton tone="primary" onClick={() => setShortlistModal(true)}>
              <Plus className="size-4" /> New shortlist
            </AppButton>
          </>
        }
      />

      {/* Network Stats Bar */}
      <section className="grid gap-3 sm:grid-cols-3 mb-6">
        <div className="rounded-xl border border-border bg-[color:var(--bg-raised)] p-4">
          <p className="text-xs text-muted-foreground">Network Talent</p>
          <p className="mt-1 text-2xl font-bold">85,400+</p>
        </div>
        <div className="rounded-xl border border-border bg-[color:var(--bg-raised)] p-4">
          <p className="text-xs text-muted-foreground">Wishlisted Creators</p>
          <p className="mt-1 text-2xl font-bold text-gold">{saved.size}</p>
        </div>
        <div className="rounded-xl border border-border bg-[color:var(--bg-raised)] p-4">
          <p className="text-xs text-muted-foreground">Countries Reached</p>
          <p className="mt-1 text-2xl font-bold">52+</p>
        </div>
      </section>

      {/* The live count is what turns a filter from a guess into feedback. */}
      <Toolbar>
        <SearchField
          id="creator-search"
          label="Search creators by name, handle or city"
          placeholder="Search creators, handles or cities"
          value={query}
          onChange={setQuery}
        />
        <Chips
          label="Filter by category"
          options={creatorCategories}
          value={category}
          onChange={setCategory}
        />
        <div className="flex items-center gap-2 ms-auto">
          <button
            type="button"
            onClick={() => setOnlySaved((s) => !s)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
              onlySaved
                ? "border-gold bg-gold/10 text-gold font-semibold"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            <Bookmark className="size-3" />
            <span>Wishlist ({saved.size})</span>
          </button>
          <Count>
            {shown.length} {shown.length === 1 ? "creator" : "creators"}
          </Count>
        </div>
      </Toolbar>

      <h2 className="sr-only">Creator results</h2>

      {shown.length === 0 ? (
        <EmptyState
          icon={<SearchX />}
          title="No creators match those filters"
          body="Try a different category, or search for a city like Riyadh or Dubai."
          action={
            <AppButton size="sm" onClick={clearFilters}>
              Clear filters
            </AppButton>
          }
        />
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((c) => {
              const isSaved = saved.has(c.handle);
              return (
                <article
                  key={c.handle}
                  className="panel-surface group flex flex-col overflow-hidden rounded-[var(--r-md)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent-line)] hover:shadow-[var(--shadow-panel-hover)]"
                >
                  <div
                    className="relative h-[6.5rem]"
                    style={{ backgroundImage: coverStyle[c.art] ?? coverStyle[4] }}
                  >
                    <span aria-hidden className="grain-overlay absolute inset-0 opacity-70" />
                    <button
                      type="button"
                      onClick={() => toggleSave(c.handle, c.name)}
                      aria-pressed={isSaved}
                      aria-label={
                        isSaved
                          ? `Remove ${c.name} from your wishlist`
                          : `Save ${c.name} to your wishlist`
                      }
                      className="absolute end-3 top-3 grid size-9 place-content-center rounded-full border border-border bg-[color:color-mix(in_oklab,var(--bg-raised)_85%,transparent)] text-muted-foreground backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
                    >
                      <Heart className={cn("size-4", isSaved && "fill-gold text-gold")} />
                    </button>
                  </div>

                  <div className="relative -mt-14 grid justify-items-center px-5 pb-5 text-center">
                    <span className="rounded-full bg-[image:var(--gradient-gold)] p-[2.5px] shadow-[var(--shadow-float)]">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        width={320}
                        height={320}
                        loading="lazy"
                        decoding="async"
                        className="size-[6.5rem] rounded-full object-cover ring-[3px] ring-[color:var(--bg-raised)]"
                      />
                    </span>
                    <h3 className="mt-3.5 text-[1.08rem] font-semibold tracking-[-0.015em]">
                      <Link
                        to="/app/influencers/$influencerId"
                        params={{ influencerId: profileParam(c.handle) }}
                        className="transition-colors after:absolute after:inset-0 hover:text-[color:var(--accent-text)]"
                      >
                        {c.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {c.handle} · {c.city}
                    </p>

                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      <Badge outline>{c.categoryLabel}</Badge>
                      <Badge tone="gold">{c.platform}</Badge>
                    </div>

                    <dl className="mt-4 grid w-full grid-cols-3 divide-x divide-[color:var(--border-subtle)] rounded-[var(--r-sm)] border border-[color:var(--border-subtle)] bg-[color:var(--bg-sunken)] py-3 rtl:divide-x-reverse">
                      {(
                        [
                          ["Followers", c.followers],
                          ["Engagement", c.engagement],
                          ["Covers", c.covers],
                        ] as const
                      ).map(([term, value]) => (
                        <div key={term} className="px-1">
                          <dt className="text-[0.6rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                            {term}
                          </dt>
                          <dd className="mt-1 text-sm font-semibold tabular-nums">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/*
                    The card title carries the profile link via a stretched
                    pseudo-element, so the whole card is one target. These two
                    buttons sit above it and stay independently clickable.
                  */}
                  <div className="relative z-10 mt-auto flex gap-2 border-t border-[color:var(--border-subtle)] bg-[color:var(--bg-sunken)] px-5 py-3">
                    <Link
                      to="/app/influencers/$influencerId"
                      params={{ influencerId: profileParam(c.handle) }}
                      className={cn(appButtonClass("ghost", "sm"), "flex-1")}
                    >
                      View profile
                    </Link>
                    <AppButton
                      tone="dark"
                      size="sm"
                      className="flex-1"
                      onClick={() => demo(`Adding ${c.name} to a campaign shortlist`)}
                    >
                      Add to campaign
                    </AppButton>
                  </div>
                </article>
              );
            })}
          </div>

          <nav
            aria-label="Creator pages"
            className="mt-6 flex flex-wrap items-center justify-between gap-3"
          >
            <span className="text-xs text-muted-foreground">
              Showing 1–{shown.length} of {creatorTotal} creators
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                aria-disabled="true"
                aria-label="Previous page"
                className="grid size-9 place-content-center rounded-full border border-border text-muted-foreground opacity-50"
              >
                <ChevronLeft className="size-4 rtl:-scale-x-100" />
              </button>
              <span
                aria-current="page"
                className="grid size-9 place-content-center rounded-full border border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] text-xs font-semibold text-[color:var(--accent-text)]"
              >
                1
              </span>
              {middlePages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => demo(`Loading page ${page}`)}
                  className="grid size-9 place-content-center rounded-full border border-border text-xs font-semibold text-muted-foreground transition-colors hover:border-[color:var(--accent-line)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent-text)]"
                >
                  {page}
                </button>
              ))}
              <span aria-hidden className="px-1.5 text-xs text-muted-foreground">
                …
              </span>
              <button
                type="button"
                onClick={() => demo(`Loading page ${lastPage}`)}
                className="grid size-9 place-content-center rounded-full border border-border text-xs font-semibold text-muted-foreground transition-colors hover:border-[color:var(--accent-line)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent-text)]"
              >
                {lastPage}
              </button>
              <button
                type="button"
                aria-label="Next page"
                onClick={() => demo("Loading page 2")}
                className="grid size-9 place-content-center rounded-full border border-border text-muted-foreground transition-colors hover:border-[color:var(--accent-line)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent-text)]"
              >
                <ChevronRight className="size-4 rtl:-scale-x-100" />
              </button>
            </div>
          </nav>
        </>
      )}

      {/* Shortlist Builder Modal */}
      {shortlistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-border bg-[color:var(--bg-raised)] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-base font-bold">New Creator Shortlist</h3>
                <p className="text-xs text-muted-foreground">
                  Curate creators for your next campaign
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShortlistModal(false)}
                className="rounded-full p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShortlist} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground">
                  Shortlist Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Riyadh Fine Dining VIPs"
                  value={shortlistName}
                  onChange={(e) => setShortlistName(e.target.value)}
                  className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-gold"
                />
              </div>

              <div className="rounded-lg border border-border bg-[color:var(--bg-sunken)] p-3 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Included Creators ({saved.size})</p>
                <p className="mt-1">
                  All {saved.size} creators currently saved to your wishlist will be initialized
                  into this shortlist.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShortlistModal(false)}
                  className="rounded-lg px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[image:var(--gradient-gold)] px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-gold)]"
                >
                  Save Shortlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
