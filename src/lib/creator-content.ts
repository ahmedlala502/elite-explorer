/**
 * Demo content for a creator profile: the grid of posts and reels they have
 * published, the story frames still live, and the campaign-by-campaign
 * coverage record behind their headline numbers.
 *
 * Nothing here is authored per creator. The imagery is drawn from the same
 * case-study archive the marketing site uses, and every figure is derived from
 * a hash of the creator's handle — so each profile is stable across reloads,
 * visibly different from its neighbours, and honest about being sample data.
 */
import { campaigns, creators, roster, type Tone } from "@/lib/app-data";
import { films } from "@/lib/films";
import { stories } from "@/lib/stories";

/* --------------------------------- plumbing --------------------------------- */

/** FNV-1a. Small, stable, and good enough to scatter a dozen demo profiles. */
function hash(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** A stable pseudo-random stream from one seed — same handle, same profile. */
function stream(seed: string) {
  let state = hash(seed) || 1;
  const next = () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 0xffffffff;
  };
  // Nearby seeds ("...:post:1", "...:post:2") produce nearby first draws, which
  // showed up as a dozen creators all reporting the same view count. A short
  // warm-up decorrelates them before anything reads the stream.
  for (let i = 0; i < 6; i++) next();
  return next;
}

/** Index is taken modulo the length, so the result is always present. */
const pick = <T>(list: readonly T[], r: number): T =>
  list[Math.floor(r * list.length) % list.length] as T;
const between = (r: number, min: number, max: number) => Math.round(min + r * (max - min));

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 100_000 ? 0 : 1).replace(/\.0$/, "")}K`;
  return String(n);
}

/** Every still in the case-study archive, deduped — the demo image pool. */
const shotPool: string[] = [...new Set(stories.flatMap((s) => s.shots))];

/* ---------------------------------- content ---------------------------------- */

export type CreatorMediaKind = "post" | "reel" | "story";

export type CreatorMedia = {
  id: string;
  kind: CreatorMediaKind;
  image: string;
  /** Reels carry a real MP4 from the archive so the demo can actually play. */
  video?: string;
  caption: string;
  campaign: string;
  when: string;
  views: string;
  likes: string;
  comments: string;
  /** Story frames only: how much of the 24h window is left. */
  expires?: string;
};

const captions = [
  "Tasting menu night — every course photographed",
  "Behind the pass with the head chef",
  "First look at the new season menu",
  "Table for two, golden hour",
  "The signature dish, plated",
  "Opening night in the private dining room",
  "Weekend brunch, start to finish",
  "A walk through the new interiors",
  "Three dishes I would order again",
  "Late service, full room",
  "The dessert everyone is posting about",
  "Coffee and the corner table",
];

const whenLabels = [
  "2 days ago",
  "4 days ago",
  "6 days ago",
  "1 week ago",
  "2 weeks ago",
  "3 weeks ago",
  "1 month ago",
];

const storyWindows = ["4h left", "7h left", "11h left", "16h left", "21h left"];

function media(
  seed: string,
  kind: CreatorMediaKind,
  index: number,
  campaignNames: string[],
): CreatorMedia {
  const next = stream(`${seed}:${kind}:${index}`);
  const image = pick(shotPool, next());
  const views = between(
    next(),
    kind === "reel" ? 60_000 : 18_000,
    kind === "reel" ? 940_000 : 320_000,
  );
  const likes = Math.round(views * (0.03 + next() * 0.07));
  const comments = Math.round(likes * (0.01 + next() * 0.04));

  return {
    id: `${seed}-${kind}-${index}`,
    kind,
    image,
    ...(kind === "reel" ? { video: pick(films, next()).src } : {}),
    caption: pick(captions, next()),
    campaign: campaignNames.length > 0 ? pick(campaignNames, next()) : "Unassigned",
    when: kind === "story" ? "Today" : pick(whenLabels, next()),
    views: compact(views),
    likes: compact(likes),
    comments: compact(comments),
    ...(kind === "story" ? { expires: pick(storyWindows, next()) } : {}),
  };
}

/* --------------------------------- coverage ---------------------------------- */

export type CreatorCoverage = {
  campaignId: string;
  name: string;
  where: string;
  dates: string;
  statusLabel: string;
  statusTone: Tone;
  /** Where this creator sits in that campaign's pipeline. */
  stage: string;
  stageTone: Tone;
  branch: string;
  posts: number;
  reels: number;
  stories: number;
  reach: string;
  engagement: string;
  /** Deliverables completed against what was briefed, as a percentage. */
  pct: number;
};

const activeStages: { stage: string; tone: Tone }[] = [
  { stage: "Covered", tone: "ok" },
  { stage: "Post creation", tone: "info" },
  { stage: "Visited", tone: "info" },
];

const stagesByStatus: Record<string, { stage: string; tone: Tone }[]> = {
  active: activeStages,
  scheduled: [
    { stage: "Confirmed", tone: "info" },
    { stage: "Pending", tone: "warn" },
  ],
  completed: [
    { stage: "Shared", tone: "ok" },
    { stage: "Covered", tone: "ok" },
  ],
};

const branchNames = [
  "Al Faisaliah",
  "Via Riyadh",
  "Al Nakheel",
  "U Walk",
  "Roshn Front",
  "Corniche",
];

/**
 * Which campaigns a creator worked on. The authored roster wins where it has an
 * opinion — a creator listed on the Rüya campaign really is on it, at the stage
 * and branch the roster records — and the rest are seeded from the handle.
 */
function coverageFor(handle: string): CreatorCoverage[] {
  const next = stream(`${handle}:campaigns`);
  const placement = roster.find((r) => r.handle === handle);

  const chosen: string[] = [];
  if (placement) chosen.push("ruya-riyadh-season-launch");

  const rest = campaigns.filter((c) => !chosen.includes(c.id));
  const want = between(next(), placement ? 1 : 2, 3);
  for (const c of rest) {
    if (chosen.length >= want + (placement ? 1 : 0)) break;
    if (next() > 0.42) chosen.push(c.id);
  }
  // Never leave a profile with an empty record — take the first campaign.
  if (chosen.length === 0 && campaigns[0]) chosen.push(campaigns[0].id);

  return chosen.map((id, i) => {
    const campaign = campaigns.find((c) => c.id === id)!;
    const r = stream(`${handle}:${id}`);
    const authored = placement && id === "ruya-riyadh-season-launch" ? placement : undefined;
    const options = stagesByStatus[campaign.status] ?? activeStages;
    const seeded = pick(options, r());

    const posts = authored ? Number(authored.posts) : between(r(), 2, 9);
    const reels = between(r(), 1, 4);
    const storyCount = between(r(), 3, 12);
    const reachRaw = between(r(), 120_000, 1_400_000);

    return {
      campaignId: campaign.id,
      name: campaign.name,
      where: campaign.where,
      dates: campaign.dates,
      statusLabel: campaign.statusLabel,
      statusTone: campaign.statusTone,
      stage: authored?.stage ?? seeded.stage,
      stageTone: authored?.tone ?? seeded.tone,
      branch: authored?.branch ?? pick(branchNames, r()),
      posts,
      reels,
      stories: storyCount,
      reach: authored?.reach ?? compact(reachRaw),
      engagement: `${(2.4 + r() * 5.2).toFixed(1)}%`,
      pct: campaign.status === "scheduled" && i > 0 ? between(r(), 0, 25) : between(r(), 45, 100),
    };
  });
}

/* ---------------------------------- profile ---------------------------------- */

export type CreatorContent = {
  posts: CreatorMedia[];
  reels: CreatorMedia[];
  storyFrames: CreatorMedia[];
  coverage: CreatorCoverage[];
  /** Totals derived from the coverage rows, so the summary can never drift. */
  totals: { posts: number; reels: number; stories: number; campaigns: number };
};

export function creatorContent(handle: string): CreatorContent {
  const coverage = coverageFor(handle);
  const campaignNames = coverage.map((c) => c.name);
  const next = stream(`${handle}:counts`);

  const postCount = between(next(), 6, 9);
  const reelCount = between(next(), 3, 5);
  const storyCount = between(next(), 4, 6);

  return {
    posts: Array.from({ length: postCount }, (_, i) => media(handle, "post", i, campaignNames)),
    reels: Array.from({ length: reelCount }, (_, i) => media(handle, "reel", i, campaignNames)),
    storyFrames: Array.from({ length: storyCount }, (_, i) =>
      media(handle, "story", i, campaignNames),
    ),
    coverage,
    totals: {
      posts: coverage.reduce((n, c) => n + c.posts, 0),
      reels: coverage.reduce((n, c) => n + c.reels, 0),
      stories: coverage.reduce((n, c) => n + c.stories, 0),
      campaigns: coverage.length,
    },
  };
}

/** Guard against a handle that is not in the network at all. */
export const isKnownCreator = (handle: string) => creators.some((c) => c.handle === handle);
