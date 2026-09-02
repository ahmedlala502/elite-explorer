/**
 * Demo data for the ELITƎ workspace (`/app/*`).
 *
 * The workspace has no backend: every figure here is illustrative sample data
 * for design review, ported verbatim from the static prototype. The workspace
 * UI is English-only in this phase, so this module deliberately sits outside
 * the bilingual `content.ts` — an Arabic workspace would be a lie right now.
 * Layout direction still follows the site-wide language toggle.
 */

export type Tone = "neutral" | "ok" | "warn" | "info" | "danger" | "gold";

export const workspace = {
  org: "Rüya Group",
  plan: "Enterprise",
  branchCount: 6,
  manager: "Ahmed Kassem",
  user: {
    name: "Layla Al-Rashid",
    role: "Brand admin",
    email: "layla@ruyagroup.com",
    phone: "+966 5X XXX XXXX",
    avatar: "/creators/inf-layla.webp",
  },
} as const;

export const demoNotice =
  "Every figure on this page is sample data for design review. Connect your account to see Rüya Group.";

/* ---------------------------------- dashboard --------------------------------- */

export const dashboardStats = [
  { label: "Active campaigns", value: "3", delta: "1", dir: "up", foot: "vs last month" },
  { label: "Creators engaged", value: "74", delta: "12", dir: "up", foot: "across 3 campaigns" },
  { label: "Coverage published", value: "412", delta: "34%", dir: "up", foot: "posts this month" },
  { label: "Estimated reach", value: "8.4M", delta: "6%", dir: "down", foot: "vs last month" },
] as const;

export const pipelineStages = [
  { name: "Pending", value: 14, share: 6 },
  { name: "Confirmed", value: 22, share: 9 },
  { name: "Visited", value: 18, share: 7 },
  { name: "Delivered", value: 16, share: 7 },
  { name: "Post creation", value: 9, share: 4 },
  { name: "Shared", value: 31, share: 13 },
  { name: "Covered", value: 244, share: 100 },
] as const;

/**
 * `campaignId` targets the campaign detail route; entries without it link to
 * the list route named in `to`.
 */
export const attention = [
  {
    tone: "warn" as Tone,
    title: "4 creators awaiting your approval",
    meta: "Rüya Riyadh — Season Launch · oldest waiting 3 days",
    to: "/app/campaigns" as const,
    campaignId: "ruya-riyadh-season-launch",
  },
  {
    tone: "danger" as Tone,
    title: "Beefbar Jeddah is 2 days from its end date",
    meta: "9 of 14 deliverables covered",
    to: "/app/campaigns" as const,
    campaignId: "beefbar-jeddah-ramadan-menu",
  },
  {
    tone: "ok" as Tone,
    title: "Morini — Chef’s Table brief is ready to send",
    meta: "12 creators shortlisted, budget approved",
    to: "/app/campaigns" as const,
  },
  {
    tone: "neutral" as Tone,
    title: "17 new posts to verify",
    meta: "Uploaded in the last 24 hours",
    to: "/app/reports" as const,
  },
];

export const coverageByFormat = [
  { name: "Stories", value: 186, pct: 45 },
  { name: "Posts", value: 142, pct: 34 },
  { name: "Reels & video", value: 84, pct: 21 },
] as const;

export const coverageTrend = [
  { x: "W1", label: "38 posts", value: 51 },
  { x: "W2", label: "44 posts", value: 59 },
  { x: "W3", label: "41 posts", value: 55 },
  { x: "W4", label: "57 posts", value: 77 },
  { x: "W5", label: "62 posts", value: 84 },
  { x: "W6", label: "51 posts", value: 69 },
  { x: "W7", label: "68 posts", value: 92 },
  { x: "W8", label: "74 posts", value: 100 },
] as const;

export const activity = [
  {
    icon: "check",
    text: "**Noor Al-Fahad** published a Reel for **Rüya Riyadh**",
    time: "18 minutes ago",
  },
  {
    icon: "pin",
    text: "**Hessa Al-Mutairi** checked in at **Rüya — Al Faisaliah**",
    time: "1 hour ago",
  },
  {
    icon: "user",
    text: "**Faisal Al-Otaibi** accepted the invitation to **Beefbar Jeddah**",
    time: "3 hours ago",
  },
  {
    icon: "image",
    text: "**Dana Sabbagh** submitted 4 stories for approval",
    time: "Yesterday, 21:40",
  },
  {
    icon: "megaphone",
    text: "**Coya Riyadh — Anniversary** closed with 118% of target coverage",
    time: "Yesterday, 09:12",
  },
] as const;

/* ---------------------------------- campaigns --------------------------------- */

export type Campaign = {
  id: string;
  name: string;
  where: string;
  dates: string;
  status: "briefing" | "active" | "scheduled" | "completed";
  statusLabel: string;
  statusTone: Tone;
  creators: number;
  covered: number;
  target: number;
  pct: number;
  pctLabel: string;
  branches: string;
  ends: string;
};

export const campaigns: Campaign[] = [
  {
    id: "ruya-riyadh-season-launch",
    name: "Rüya Riyadh — Season Launch",
    where: "6 branches · Riyadh",
    dates: "01 Feb – 12 Mar",
    status: "active",
    statusLabel: "Active",
    statusTone: "ok",
    creators: 24,
    covered: 68,
    target: 110,
    pct: 62,
    pctLabel: "62%",
    branches: "6 branches",
    ends: "12 Mar",
  },
  {
    id: "beefbar-jeddah-ramadan-menu",
    name: "Beefbar Jeddah — Ramadan Menu",
    where: "2 branches · Jeddah",
    dates: "28 Jan – 26 Feb",
    status: "active",
    statusLabel: "Ending soon",
    statusTone: "warn",
    creators: 14,
    covered: 41,
    target: 64,
    pct: 64,
    pctLabel: "64%",
    branches: "2 branches",
    ends: "26 Feb",
  },
  {
    id: "morini-chefs-table",
    name: "Morini — Chef’s Table",
    where: "1 branch · Riyadh",
    dates: "02 Apr – 30 Apr",
    status: "scheduled",
    statusLabel: "Scheduled",
    statusTone: "info",
    creators: 12,
    covered: 0,
    target: 48,
    pct: 0,
    pctLabel: "0%",
    branches: "1 branch",
    ends: "02 Apr",
  },
  {
    id: "coya-riyadh-anniversary",
    name: "Coya Riyadh — Anniversary",
    where: "1 branch · Riyadh",
    dates: "05 Dec – 20 Jan",
    status: "completed",
    statusLabel: "Completed",
    statusTone: "ok",
    creators: 31,
    covered: 142,
    target: 120,
    pct: 100,
    pctLabel: "118%",
    branches: "1 branch",
    ends: "20 Jan",
  },
  {
    id: "tashas-cafe-winter-menu",
    name: "Tashas Cafe — Winter Menu",
    where: "4 branches · Riyadh, Jeddah",
    dates: "10 Nov – 18 Dec",
    status: "completed",
    statusLabel: "Completed",
    statusTone: "ok",
    creators: 19,
    covered: 88,
    target: 90,
    pct: 98,
    pctLabel: "98%",
    branches: "4 branches",
    ends: "18 Dec",
  },
];

/** The three campaigns surfaced on the dashboard table, in dashboard order. */
export const liveCampaignIds = [
  "ruya-riyadh-season-launch",
  "beefbar-jeddah-ramadan-menu",
  "morini-chefs-table",
] as const;

export const campaignFilters = [
  { id: "all", label: "All" },
  { id: "briefing", label: "Briefing" },
  { id: "active", label: "Active" },
  { id: "scheduled", label: "Scheduled" },
  { id: "completed", label: "Completed" },
] as const;

/* ------------------------------ campaign detail ------------------------------- */

export const campaignDetail = {
  id: "ruya-riyadh-season-launch",
  remaining: "16 days remaining",
  alert: {
    title: "4 creators are waiting for your approval",
    body: "The oldest has been waiting 3 days. Approvals hold up the visit schedule.",
    link: "Review them below",
  },
  stats: [
    {
      label: "Coverage",
      value: "68",
      suffix: " / 110",
      delta: "62%",
      dir: "up",
      foot: "of target",
    },
    { label: "Creators", value: "24", foot: "18 covered · 6 in progress" },
    { label: "Estimated reach", value: "3.1M", delta: "18%", dir: "up", foot: "vs forecast" },
    {
      label: "Cost per cover",
      value: "SAR 640",
      delta: "9%",
      dir: "down",
      foot: "lower is better",
    },
  ],
  stages: [
    { name: "Pending", value: 1, share: 6 },
    { name: "Confirmed", value: 1, share: 6 },
    { name: "Visited", value: 1, share: 6 },
    { name: "Delivered", value: 1, share: 6 },
    { name: "Post creation", value: 1, share: 6 },
    { name: "Shared", value: 1, share: 6 },
    { name: "Covered", value: 18, share: 100 },
  ],
  formats: [
    { name: "Stories", value: 31, pct: 71 },
    { name: "Posts", value: 23, pct: 52 },
    { name: "Reels", value: 14, pct: 32 },
  ],
  brief: [
    ["Objective", "Seasonal menu awareness"],
    ["Branches", "6 · Riyadh"],
    ["Deliverables", "2 stories + 1 post"],
    ["Budget", "SAR 70,400"],
    ["Owner", "Layla Al-Rashid"],
  ],
  manager: {
    name: "Ahmed Kassem",
    meta: "Campaign manager · replies in ~20 min",
    avatar: "/creators/inf-ahmed.webp",
  },
} as const;

export type RosterRow = {
  name: string;
  handle: string;
  avatar: string;
  stage: string;
  tone: Tone;
  branch: string;
  posts: string;
  reach: string;
  updated: string;
};

export const roster: RosterRow[] = [
  {
    name: "Noor Al-Fahad",
    handle: "@nooralfahad",
    avatar: "/creators/inf-nour.webp",
    stage: "Covered",
    tone: "ok",
    branch: "Al Faisaliah",
    posts: "6",
    reach: "412K",
    updated: "22 Aug",
  },
  {
    name: "Hessa Al-Mutairi",
    handle: "@hessa.m",
    avatar: "/creators/inf-mariam.webp",
    stage: "Covered",
    tone: "ok",
    branch: "Al Faisaliah",
    posts: "4",
    reach: "298K",
    updated: "22 Aug",
  },
  {
    name: "Ghada Al-Amri",
    handle: "@ghadaalamri",
    avatar: "/creators/inf-yara.webp",
    stage: "Shared",
    tone: "ok",
    branch: "Kingdom Centre",
    posts: "3",
    reach: "187K",
    updated: "21 Aug",
  },
  {
    name: "Faisal Al-Otaibi",
    handle: "@faisalotaibi",
    avatar: "/creators/inf-karim.webp",
    stage: "Post creation",
    tone: "warn",
    branch: "Kingdom Centre",
    posts: "2",
    reach: "—",
    updated: "21 Aug",
  },
  {
    name: "Reem Haddad",
    handle: "@reemhaddad",
    avatar: "/creators/inf-yara.webp",
    stage: "Delivered",
    tone: "warn",
    branch: "Tahlia",
    posts: "0",
    reach: "—",
    updated: "20 Aug",
  },
  {
    name: "Bader Al-Qahtani",
    handle: "@baderq",
    avatar: "/creators/inf-omar.webp",
    stage: "Visited",
    tone: "info",
    branch: "Tahlia",
    posts: "0",
    reach: "—",
    updated: "19 Aug",
  },
  {
    name: "Sara Mansour",
    handle: "@saramansour",
    avatar: "/creators/inf-salma.webp",
    stage: "Confirmed",
    tone: "info",
    branch: "Roshn Front",
    posts: "0",
    reach: "—",
    updated: "18 Aug",
  },
  {
    name: "Talal Al-Harbi",
    handle: "@talalharbi",
    avatar: "/creators/inf-ahmed.webp",
    stage: "Pending",
    tone: "neutral",
    branch: "Roshn Front",
    posts: "0",
    reach: "—",
    updated: "—",
  },
];

/* --------------------------------- influencers -------------------------------- */

export type Creator = {
  name: string;
  handle: string;
  city: string;
  category: string;
  categoryLabel: string;
  platform: string;
  avatar: string;
  art: number;
  saved: boolean;
  followers: string;
  engagement: string;
  covers: string;
};

export const creatorCategories = [
  { id: "all", label: "All" },
  { id: "food", label: "Food & dining" },
  { id: "fashion", label: "Fashion" },
  { id: "beauty", label: "Beauty" },
  { id: "travel", label: "Travel" },
  { id: "lifestyle", label: "Lifestyle" },
] as const;

export const creators: Creator[] = [
  {
    name: "Noor Al-Fahad",
    handle: "@nooralfahad",
    city: "Riyadh",
    category: "food",
    categoryLabel: "Food & dining",
    platform: "Instagram",
    avatar: "/creators/inf-nour.webp",
    art: 3,
    saved: true,
    followers: "1.2M",
    engagement: "4.8%",
    covers: "38",
  },
  {
    name: "Hessa Al-Mutairi",
    handle: "@hessa.m",
    city: "Riyadh",
    category: "lifestyle",
    categoryLabel: "Lifestyle",
    platform: "Instagram",
    avatar: "/creators/inf-mariam.webp",
    art: 4,
    saved: true,
    followers: "860K",
    engagement: "6.1%",
    covers: "27",
  },
  {
    name: "Yousef Kanaan",
    handle: "@yousefkanaan",
    city: "Kuwait",
    category: "food",
    categoryLabel: "Food & dining",
    platform: "Instagram",
    avatar: "/creators/inf-karim.webp",
    art: 3,
    saved: false,
    followers: "742K",
    engagement: "5.2%",
    covers: "24",
  },
  {
    name: "Dana Sabbagh",
    handle: "@danasabbagh",
    city: "Dubai",
    category: "fashion",
    categoryLabel: "Fashion",
    platform: "Instagram",
    avatar: "/creators/inf-dina.webp",
    art: 5,
    saved: true,
    followers: "1.9M",
    engagement: "3.4%",
    covers: "41",
  },
  {
    name: "Omar Al-Shehri",
    handle: "@omar.shehri",
    city: "Jeddah",
    category: "travel",
    categoryLabel: "Travel",
    platform: "Instagram",
    avatar: "/creators/inf-omar.webp",
    art: 3,
    saved: false,
    followers: "530K",
    engagement: "7.3%",
    covers: "19",
  },
  {
    name: "Reem Haddad",
    handle: "@reemhaddad",
    city: "Riyadh",
    category: "beauty",
    categoryLabel: "Beauty",
    platform: "Instagram",
    avatar: "/creators/inf-yara.webp",
    art: 4,
    saved: true,
    followers: "1.4M",
    engagement: "4.1%",
    covers: "33",
  },
  {
    name: "Faisal Al-Otaibi",
    handle: "@faisalotaibi",
    city: "Riyadh",
    category: "food",
    categoryLabel: "Food & dining",
    platform: "Instagram",
    avatar: "/creators/inf-karim.webp",
    art: 2,
    saved: false,
    followers: "398K",
    engagement: "8.9%",
    covers: "16",
  },
  {
    name: "Layan Nasser",
    handle: "@layannasser",
    city: "Dubai",
    category: "beauty",
    categoryLabel: "Beauty",
    platform: "Instagram",
    avatar: "/creators/inf-salma.webp",
    art: 5,
    saved: false,
    followers: "2.3M",
    engagement: "2.9%",
    covers: "47",
  },
  {
    name: "Bader Al-Qahtani",
    handle: "@baderq",
    city: "Dammam",
    category: "lifestyle",
    categoryLabel: "Lifestyle",
    platform: "Instagram",
    avatar: "/creators/inf-omar.webp",
    art: 3,
    saved: true,
    followers: "612K",
    engagement: "5.7%",
    covers: "22",
  },
  {
    name: "Sara Mansour",
    handle: "@saramansour",
    city: "Kuwait",
    category: "fashion",
    categoryLabel: "Fashion",
    platform: "Instagram",
    avatar: "/creators/inf-salma.webp",
    art: 5,
    saved: false,
    followers: "980K",
    engagement: "4.4%",
    covers: "29",
  },
  {
    name: "Talal Al-Harbi",
    handle: "@talalharbi",
    city: "Jeddah",
    category: "travel",
    categoryLabel: "Travel",
    platform: "Instagram",
    avatar: "/creators/inf-ahmed.webp",
    art: 4,
    saved: false,
    followers: "445K",
    engagement: "6.8%",
    covers: "18",
  },
  {
    name: "Ghada Al-Amri",
    handle: "@ghadaalamri",
    city: "Riyadh",
    category: "food",
    categoryLabel: "Food & dining",
    platform: "Instagram",
    avatar: "/creators/inf-yara.webp",
    art: 6,
    saved: true,
    followers: "1.1M",
    engagement: "5.0%",
    covers: "31",
  },
];

export const creatorTotal = 930;

/* ---------------------------------- branches ---------------------------------- */

export const branches = [
  {
    name: "Al Faisaliah",
    city: "Riyadh",
    covers: 24,
    reach: "1.1M",
    share: 96,
    status: "On track",
    tone: "ok" as Tone,
  },
  {
    name: "Kingdom Centre",
    city: "Riyadh",
    covers: 19,
    reach: "870K",
    share: 78,
    status: "On track",
    tone: "ok" as Tone,
  },
  {
    name: "Tahlia",
    city: "Riyadh",
    covers: 14,
    reach: "612K",
    share: 61,
    status: "On track",
    tone: "ok" as Tone,
  },
  {
    name: "Roshn Front",
    city: "Riyadh",
    covers: 9,
    reach: "398K",
    share: 44,
    status: "Behind",
    tone: "warn" as Tone,
  },
  {
    name: "Jeddah Corniche",
    city: "Jeddah",
    covers: 12,
    reach: "540K",
    share: 55,
    status: "On track",
    tone: "ok" as Tone,
  },
  {
    name: "Al Khobar",
    city: "Dammam",
    covers: 6,
    reach: "245K",
    share: 31,
    status: "Behind",
    tone: "warn" as Tone,
  },
];

/* ----------------------------------- scanner ---------------------------------- */

export const checkIns = [
  { name: "Noor Al-Fahad", time: "13:42", campaign: "Rüya Riyadh — Season Launch" },
  { name: "Hessa Al-Mutairi", time: "12:05", campaign: "Rüya Riyadh — Season Launch" },
  { name: "Ghada Al-Amri", time: "11:18", campaign: "Rüya Riyadh — Season Launch" },
] as const;

/* ----------------------------------- reports ---------------------------------- */

export const reportStats = [
  { label: "Total coverage", value: "392", delta: "27%", dir: "up", foot: "vs previous 6 months" },
  { label: "Total reach", value: "21.4M", delta: "19%", dir: "up", foot: "vs previous 6 months" },
  {
    label: "Creators activated",
    value: "118",
    delta: "—",
    dir: "flat",
    foot: "across 9 campaigns",
  },
  {
    label: "Avg cost per cover",
    value: "SAR 587",
    delta: "12%",
    dir: "down",
    foot: "lower is better",
  },
] as const;

export const reportRanges = ["30 days", "6 months", "12 months"] as const;

export const reportTrend = [
  { x: "Mar", label: "52 covers", value: 59 },
  { x: "Apr", label: "61 covers", value: 69 },
  { x: "May", label: "48 covers", value: 55 },
  { x: "Jun", label: "74 covers", value: 84 },
  { x: "Jul", label: "69 covers", value: 78 },
  { x: "Aug", label: "88 covers", value: 100 },
] as const;

export const topCreators = [
  {
    name: "Noor Al-Fahad",
    handle: "@nooralfahad",
    avatar: "/creators/inf-nour.webp",
    covers: "38",
    reach: "1.9M",
    eng: "5.4%",
    cost: "SAR 512",
  },
  {
    name: "Layan Nasser",
    handle: "@layannasser",
    avatar: "/creators/inf-salma.webp",
    covers: "34",
    reach: "2.6M",
    eng: "3.1%",
    cost: "SAR 780",
  },
  {
    name: "Dana Sabbagh",
    handle: "@danasabbagh",
    avatar: "/creators/inf-dina.webp",
    covers: "31",
    reach: "2.2M",
    eng: "3.6%",
    cost: "SAR 704",
  },
  {
    name: "Reem Haddad",
    handle: "@reemhaddad",
    avatar: "/creators/inf-yara.webp",
    covers: "28",
    reach: "1.5M",
    eng: "4.3%",
    cost: "SAR 596",
  },
  {
    name: "Ghada Al-Amri",
    handle: "@ghadaalamri",
    avatar: "/creators/inf-yara.webp",
    covers: "26",
    reach: "1.2M",
    eng: "5.1%",
    cost: "SAR 488",
  },
  {
    name: "Hessa Al-Mutairi",
    handle: "@hessa.m",
    avatar: "/creators/inf-mariam.webp",
    covers: "22",
    reach: "940K",
    eng: "6.2%",
    cost: "SAR 421",
  },
] as const;

/* ----------------------------------- account ---------------------------------- */

export const team = [
  {
    name: "Layla Al-Rashid",
    email: "layla@ruyagroup.com",
    role: "Brand admin",
    tone: "ok" as Tone,
    avatar: "/creators/inf-layla.webp",
  },
  {
    name: "Omar Zaid",
    email: "omar@ruyagroup.com",
    role: "Editor",
    tone: "info" as Tone,
    avatar: "/creators/inf-omar.webp",
  },
  {
    name: "Nada Sultan",
    email: "nada@ruyagroup.com",
    role: "Viewer",
    tone: "neutral" as Tone,
    avatar: "/creators/inf-nour.webp",
  },
  {
    name: "Ahmed Kassem",
    email: "ahmed@gc-elite.com",
    role: "Elite manager",
    tone: "gold" as Tone,
    avatar: "/creators/inf-ahmed.webp",
  },
];

export const notificationPrefs = [
  { label: "Creator awaiting approval", on: true },
  { label: "Campaign ending in 3 days", on: true },
  { label: "New coverage published", on: true },
  { label: "Weekly summary email", on: false },
];
