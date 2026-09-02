import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ChevronRight,
  Clock,
  Heart,
  Image as ImageIcon,
  Info,
  MessageCircle,
  Play,
  Plus,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

import {
  AppButton,
  ArrowLink,
  Badge,
  DefList,
  EmptyState,
  Feed,
  Meter,
  PageHead,
  Panel,
  PanelBody,
  PanelFoot,
  PanelHead,
  Person,
  Segmented,
  StatCard,
  TableWrap,
  Td,
  Th,
} from "@/components/app/ui";
import { checkIns, creators, topCreators } from "@/lib/app-data";
import { creatorContent, type CreatorMedia } from "@/lib/creator-content";
import { demo } from "@/lib/demo";
import { cn } from "@/lib/utils";

/** Profile URLs carry the creator's handle minus the “@”: @hessa.m → /app/influencers/hessa.m */
const byParam = (param: string) => creators.find((c) => c.handle === `@${param}`);

export const Route = createFileRoute("/app/influencers/$influencerId")({
  loader: ({ params }) => {
    const creator = byParam(params.influencerId);
    if (!creator) throw notFound();
    return creator;
  },
  head: ({ params }) => {
    const creator = byParam(params.influencerId);
    return { meta: [{ title: `${creator?.name ?? "Creator"} | ELITƎ workspace` }] };
  },
  component: InfluencerProfile,
  notFoundComponent: InfluencerNotFound,
});

function InfluencerNotFound() {
  return (
    <Panel>
      <PanelBody>
        <h1 className="text-2xl font-semibold">Creator not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          That creator is not in the ELITƎ network — the link may be stale, or they may no longer be
          listed.
        </p>
        <p className="mt-5">
          <ArrowLink to="/app/influencers">Back to influencers</ArrowLink>
        </p>
      </PanelBody>
    </Panel>
  );
}

function InfluencerProfile() {
  const creator = Route.useLoaderData();
  const [isSaved, setIsSaved] = useState(creator.saved);

  /*
    Content, coverage and the totals underneath them are all derived from the
    creator's handle, so a profile is the same every time it loads and no two
    creators share a grid. Check-ins stay authored — they come off the scanner.
  */
  const { posts, reels, storyFrames, coverage, totals } = creatorContent(creator.handle);
  const visits = checkIns.filter((v) => v.name === creator.name);
  const top = topCreators.find((t) => t.handle === creator.handle);
  const similar = creators
    .filter((c) => c.category === creator.category && c.handle !== creator.handle)
    .slice(0, 4);

  const stats: { label: string; value: string; foot?: string; icon: LucideIcon }[] = [
    { label: "Followers", value: creator.followers, foot: creator.platform, icon: Users },
    { label: "Engagement", value: creator.engagement, icon: TrendingUp },
    {
      label: "Covers",
      value: creator.covers,
      foot: `${totals.campaigns} ${totals.campaigns === 1 ? "campaign" : "campaigns"}`,
      icon: ImageIcon,
    },
    ...(top
      ? [
          {
            label: "Cost per cover",
            value: top.cost,
            foot: "Average across campaigns",
            icon: Target,
          },
        ]
      : []),
  ];

  const facts: (readonly [string, ReactNode])[] = [
    ["Handle", creator.handle],
    ["Category", creator.categoryLabel],
    ["City", creator.city],
    ["Platform", creator.platform],
    ["Followers", creator.followers],
    ["Engagement", creator.engagement],
    ...(top ? ([["Avg. cost per cover", top.cost] as const] as const) : []),
  ];

  return (
    <>
      <PageHead
        crumbs={[
          { label: "Dashboard", to: "/app" },
          { label: "Influencers", to: "/app/influencers" },
          { label: creator.name },
        ]}
        eyebrow="Creator profile"
        title={creator.name}
        meta={
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
            <img
              src={creator.avatar}
              alt=""
              width={160}
              height={160}
              className="size-14 rounded-full object-cover ring-2 ring-[color:var(--accent-line)] ring-offset-2 ring-offset-[color:var(--surface-alt)]"
            />
            <span className="flex flex-wrap items-center gap-2.5">
              <Badge outline>{creator.categoryLabel}</Badge>
              <Badge tone="gold">{creator.platform}</Badge>
              <span className="text-sm text-muted-foreground">
                {creator.handle} · {creator.city}
              </span>
            </span>
          </div>
        }
        actions={
          <>
            <AppButton aria-pressed={isSaved} onClick={() => setIsSaved((v) => !v)}>
              <Heart className={cn("size-4", isSaved && "fill-gold text-gold")} />
              {isSaved ? "Saved" : "Save"}
            </AppButton>
            <AppButton
              tone="primary"
              onClick={() => demo(`Adding ${creator.name} to a campaign shortlist`)}
            >
              <Plus className="size-4" /> Add to campaign
            </AppButton>
          </>
        }
      />

      <section
        aria-label="Creator performance"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              foot={stat.foot}
              icon={<Icon />}
            />
          );
        })}
      </section>

      <StoryRail creator={creator.name} avatar={creator.avatar} frames={storyFrames} />

      <section className="mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <ContentPanel posts={posts} reels={reels} />

        <div className="grid content-start gap-5">
          <Panel>
            <PanelHead title="Profile" />
            <PanelBody>
              <DefList rows={facts} />
            </PanelBody>
          </Panel>

          <Panel>
            <PanelHead
              title={`More in ${creator.categoryLabel}`}
              sub="Creators with a similar audience"
            />
            <PanelBody>
              <div className="grid gap-1">
                {similar.map((c) => (
                  <Link
                    key={c.handle}
                    to="/app/influencers/$influencerId"
                    params={{ influencerId: c.handle.replace(/^@/, "") }}
                    className="-mx-2 block rounded-xl px-2 py-2 transition-colors hover:bg-[color:var(--bg-sunken)]"
                  >
                    <Person
                      name={c.name}
                      meta={`${c.handle} · ${c.followers} followers`}
                      avatar={c.avatar}
                    />
                  </Link>
                ))}
              </div>
            </PanelBody>
            <PanelFoot>
              <ArrowLink to="/app/influencers">Browse all creators</ArrowLink>
            </PanelFoot>
          </Panel>

          <Panel>
            <PanelHead title="Latest check-ins" sub="Logged by the branch scanner" />
            <PanelBody>
              {visits.length > 0 ? (
                <Feed
                  items={visits.map((v) => ({
                    icon: <Clock />,
                    text: `Checked in · ${v.campaign}`,
                    time: v.time,
                  }))}
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {creator.name} hasn’t been scanned in at a venue during this reporting period.{" "}
                  <Link
                    to="/app/scanner"
                    className="font-semibold text-[color:var(--accent-text)] hover:opacity-80"
                  >
                    Open the scanner
                  </Link>
                </p>
              )}
            </PanelBody>
          </Panel>
        </div>
      </section>

      <div className="mt-6">
        <CoveragePanel name={creator.name} coverage={coverage} totals={totals} />
      </div>
    </>
  );
}

/* ---------------------------------- stories ----------------------------------- */

/**
 * Story frames expire, so they get a rail rather than a grid — a row you scan
 * left to right and lose, not a library. The ring is the platform's own idiom
 * for "still live", and it doubles as the only affordance a frame needs.
 */
function StoryRail({
  creator,
  avatar,
  frames,
}: {
  creator: string;
  avatar: string;
  frames: CreatorMedia[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Panel className="mt-6">
      <PanelHead
        title="Stories"
        sub={`${frames.length} frames live now · expires within 24 hours`}
        actions={
          <AppButton size="sm" tone="quiet" onClick={() => demo("Archiving these story frames")}>
            Save to archive
          </AppButton>
        }
      />
      <PanelBody>
        <ul className="-mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-2">
          {frames.map((frame, i) => (
            <li key={frame.id} className="w-[7.5rem] shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setOpen((prev) => (prev === i ? null : i))}
                aria-expanded={open === i}
                className="group block w-full text-start"
              >
                <span className="block rounded-[var(--r-sm)] bg-[image:var(--gradient-gold)] p-[2px] transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="block overflow-hidden rounded-[calc(var(--r-sm)-2px)] bg-[color:var(--bg-raised)] p-[2px]">
                    <img
                      src={frame.image}
                      alt={`${creator} story — ${frame.caption}`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[9/16] w-full rounded-[calc(var(--r-sm)-4px)] object-cover"
                    />
                  </span>
                </span>
                <span className="mt-2 block truncate text-[0.7rem] font-medium text-muted-foreground">
                  {frame.expires}
                </span>
                <span className="block truncate text-[0.7rem] text-muted-foreground/70">
                  {frame.views} views
                </span>
              </button>
            </li>
          ))}
        </ul>

        {open !== null && frames[open] && (
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-[var(--r-sm)] border border-[color:var(--border-subtle)] bg-[color:var(--bg-sunken)] px-4 py-3 text-sm">
            <img
              src={avatar}
              alt=""
              className="size-8 rounded-full object-cover"
              width={64}
              height={64}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">{frames[open].caption}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {frames[open].campaign}
              </span>
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">
              {frames[open].views} views · {frames[open].likes} reactions
            </span>
          </div>
        )}
      </PanelBody>
    </Panel>
  );
}

/* ---------------------------------- content ----------------------------------- */

/**
 * Posts and reels share one grid and one metric strip; only the aspect ratio
 * and the play affordance differ. Reels swap to a real `<video>` on click so
 * the demo can be driven rather than just looked at.
 */
function ContentPanel({ posts, reels }: { posts: CreatorMedia[]; reels: CreatorMedia[] }) {
  const [tab, setTab] = useState<"Posts" | "Reels">("Posts");
  const items = tab === "Posts" ? posts : reels;

  return (
    <Panel>
      <PanelHead
        title="Recent content"
        sub={`${posts.length} posts · ${reels.length} reels published for your campaigns`}
        actions={
          <Segmented
            label="Content type"
            options={["Posts", "Reels"]}
            value={tab}
            onChange={(v) => setTab(v as "Posts" | "Reels")}
          />
        }
      />
      <PanelBody>
        <ul
          className={cn(
            "grid gap-3",
            tab === "Posts" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3",
          )}
        >
          {items.map((item) => (
            <MediaTile key={item.id} item={item} />
          ))}
        </ul>
      </PanelBody>
      <PanelFoot>
        <span className="text-xs text-muted-foreground">
          Sample content, published against live ELITƎ campaigns.
        </span>
      </PanelFoot>
    </Panel>
  );
}

function MediaTile({ item }: { item: CreatorMedia }) {
  const [playing, setPlaying] = useState(false);
  const isReel = item.kind === "reel";

  return (
    <li className="group relative overflow-hidden rounded-[var(--r-sm)] border border-[color:var(--border-subtle)] bg-[color:var(--bg-sunken)]">
      <div className={cn("relative w-full", isReel ? "aspect-[9/16]" : "aspect-square")}>
        {playing && item.video ? (
          <video
            src={item.video}
            poster={item.image}
            controls
            autoPlay
            playsInline
            className="size-full object-cover"
          />
        ) : (
          <>
            <img
              src={item.image}
              alt={item.caption}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {isReel && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play reel — ${item.caption}`}
                className="absolute inset-0 grid place-content-center bg-[color:color-mix(in_oklab,var(--scrim)_35%,transparent)] transition-colors hover:bg-[color:color-mix(in_oklab,var(--scrim)_15%,transparent)]"
              >
                <span className="grid size-11 place-content-center rounded-full bg-[color:var(--on-media)]/90 text-[color:var(--scrim)] shadow-[var(--shadow-float)] transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-5 translate-x-px fill-current" />
                </span>
              </button>
            )}
            {/* Metrics sit on a gradient rather than a plate, so they read at a
                glance without hiding a third of the image. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,oklch(0_0_0/0.78),transparent)] p-2.5 pt-8">
              <p className="flex items-center gap-3 text-[0.7rem] font-semibold tabular-nums text-white">
                <span className="inline-flex items-center gap-1">
                  <Heart className="size-3" /> {item.likes}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="size-3" /> {item.comments}
                </span>
                <span className="ms-auto opacity-80">{item.views} views</span>
              </p>
            </div>
          </>
        )}
      </div>
      <div className="p-2.5">
        <p className="truncate text-[0.78rem] font-medium">{item.caption}</p>
        <p className="mt-0.5 truncate text-[0.7rem] text-muted-foreground">
          {item.campaign} · {item.when}
        </p>
      </div>
    </li>
  );
}

/* ---------------------------------- coverage ---------------------------------- */

/**
 * The record behind the headline "covers" number: which campaigns the creator
 * was booked on, what they delivered on each, and how far through the brief
 * they are. Every row links back to the campaign it came from.
 */
function CoveragePanel({
  name,
  coverage,
  totals,
}: {
  name: string;
  coverage: ReturnType<typeof creatorContent>["coverage"];
  totals: ReturnType<typeof creatorContent>["totals"];
}) {
  return (
    <Panel>
      <PanelHead
        title="Campaign coverage"
        sub={`${totals.posts} posts, ${totals.reels} reels and ${totals.stories} stories across ${totals.campaigns} ${
          totals.campaigns === 1 ? "campaign" : "campaigns"
        }`}
        actions={<ArrowLink to="/app/campaigns">All campaigns</ArrowLink>}
      />
      {coverage.length === 0 ? (
        <PanelBody>
          <EmptyState
            icon={<Info />}
            title="No campaign activity yet"
            body={`${name} isn’t on a live campaign in this demo workspace. Add them to a shortlist and their coverage will show up here.`}
            action={<ArrowLink to="/app/campaigns">Browse campaigns</ArrowLink>}
          />
        </PanelBody>
      ) : (
        <PanelBody flush>
          <TableWrap>
            <thead>
              <tr>
                <Th>Campaign</Th>
                <Th>Stage</Th>
                <Th num>Posts</Th>
                <Th num>Reels</Th>
                <Th num>Stories</Th>
                <Th num>Reach</Th>
                <Th>Delivered</Th>
              </tr>
            </thead>
            <tbody>
              {coverage.map((row) => (
                <tr key={row.campaignId}>
                  <Td>
                    <Link
                      to="/app/campaigns/$campaignId"
                      params={{ campaignId: row.campaignId }}
                      className="group inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-[color:var(--accent-text)]"
                    >
                      {row.name}
                      <ChevronRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100 rtl:-scale-x-100" />
                    </Link>
                    <span className="block text-xs text-muted-foreground">
                      {row.branch} · {row.dates}
                    </span>
                  </Td>
                  <Td>
                    <Badge tone={row.stageTone}>{row.stage}</Badge>
                  </Td>
                  <Td num>{row.posts}</Td>
                  <Td num>{row.reels}</Td>
                  <Td num>{row.stories}</Td>
                  <Td num>{row.reach}</Td>
                  <Td className="min-w-[9rem]">
                    <span className="flex items-center gap-3">
                      <Meter value={row.pct} tone={row.pct >= 100 ? "ok" : "gold"} />
                      <span className="text-xs font-semibold tabular-nums">{row.pct}%</span>
                    </span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </PanelBody>
      )}
      <PanelFoot>
        <span className="text-xs text-muted-foreground">
          Engagement is measured against each campaign’s own briefed deliverables.
        </span>
      </PanelFoot>
    </Panel>
  );
}
