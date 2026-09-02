import type { Lang } from "./content";

/**
 * Illustrative datasets behind the `/dashboard` product preview. Numbers are
 * language-independent; every label ships with the Arabic the static site
 * used, so switching language never leaks English into the RTL layout.
 */

type Bilingual = Record<Lang, string>;

export type DemoView = {
  id: "launch" | "growth" | "opening";
  label: Bilingual;
  campaign: Bilingual;
  period: Bilingual;
  kpis: { branches: number; creators: number; campaigns: number; coverage: number };
  stages: Record<
    "pending" | "confirmed" | "visited" | "delivered" | "postCreation" | "shared" | "covered",
    number
  >;
  coverage: { story: number; post: number; video: number };
  campaigns: { name: Bilingual; meta: Bilingual; state: Bilingual }[];
};

const inProgress: Bilingual = { en: "In progress", ar: "قيد التنفيذ" };
const coverageLive: Bilingual = { en: "Coverage live", ar: "التغطية جارية" };

export const demoViews: [DemoView, DemoView, DemoView] = [
  {
    id: "launch",
    label: { en: "Summer launch", ar: "إطلاق الصيف" },
    campaign: { en: "Summer launch · Riyadh", ar: "إطلاق الصيف · الرياض" },
    period: { en: "01–30 Jun 2026", ar: "1-30 يونيو 2026" },
    kpis: { branches: 4, creators: 128, campaigns: 7, coverage: 346 },
    stages: {
      pending: 12,
      confirmed: 28,
      visited: 24,
      delivered: 19,
      postCreation: 16,
      shared: 14,
      covered: 11,
    },
    coverage: { story: 201, post: 82, video: 63 },
    campaigns: [
      {
        name: { en: "Summer launch", ar: "إطلاق الصيف" },
        meta: { en: "Riyadh · 48 creators", ar: "الرياض · 48 صانع محتوى" },
        state: inProgress,
      },
      {
        name: { en: "The Beauty Edit", ar: "مختارات الجمال" },
        meta: { en: "Jeddah · 26 creators", ar: "جدة · 26 صانع محتوى" },
        state: coverageLive,
      },
      {
        name: { en: "Night Market", ar: "سوق الليل" },
        meta: { en: "Al Khobar · 18 creators", ar: "الخبر · 18 صانع محتوى" },
        state: { en: "Brief approved", ar: "اعتُمد الموجز" },
      },
    ],
  },
  {
    id: "growth",
    label: { en: "Always-on growth", ar: "نمو مستمر" },
    campaign: { en: "Always-on growth · GCC", ar: "نمو مستمر · دول الخليج" },
    period: { en: "01 Jul – 30 Sep 2026", ar: "1 يوليو-30 سبتمبر 2026" },
    kpis: { branches: 6, creators: 214, campaigns: 11, coverage: 589 },
    stages: {
      pending: 18,
      confirmed: 42,
      visited: 37,
      delivered: 31,
      postCreation: 29,
      shared: 25,
      covered: 21,
    },
    coverage: { story: 344, post: 141, video: 104 },
    campaigns: [
      {
        name: { en: "Always-on growth", ar: "نمو مستمر" },
        meta: { en: "GCC · 72 creators", ar: "دول الخليج · 72 صانع محتوى" },
        state: inProgress,
      },
      {
        name: { en: "Weekend edit", ar: "مختارات نهاية الأسبوع" },
        meta: { en: "Dubai · 32 creators", ar: "دبي · 32 صانع محتوى" },
        state: coverageLive,
      },
      {
        name: { en: "New collection", ar: "التشكيلة الجديدة" },
        meta: { en: "Kuwait · 24 creators", ar: "الكويت · 24 صانع محتوى" },
        state: { en: "Ready to launch", ar: "جاهزة للإطلاق" },
      },
    ],
  },
  {
    id: "opening",
    label: { en: "New location", ar: "فرع جديد" },
    campaign: { en: "New location · Jeddah", ar: "فرع جديد · جدة" },
    period: { en: "14–28 Aug 2026", ar: "14-28 أغسطس 2026" },
    kpis: { branches: 2, creators: 76, campaigns: 4, coverage: 184 },
    stages: {
      pending: 8,
      confirmed: 17,
      visited: 15,
      delivered: 13,
      postCreation: 10,
      shared: 8,
      covered: 6,
    },
    coverage: { story: 112, post: 43, video: 29 },
    campaigns: [
      {
        name: { en: "Jeddah opening", ar: "افتتاح جدة" },
        meta: { en: "Jeddah · 35 creators", ar: "جدة · 35 صانع محتوى" },
        state: inProgress,
      },
      {
        name: { en: "VIP preview", ar: "معاينة كبار الضيوف" },
        meta: { en: "Jeddah · 14 creators", ar: "جدة · 14 صانع محتوى" },
        state: coverageLive,
      },
      {
        name: { en: "Founder dinner", ar: "عشاء المؤسسين" },
        meta: { en: "Jeddah · 9 creators", ar: "جدة · 9 صانع محتوى" },
        state: { en: "Confirmed", ar: "مؤكدة" },
      },
    ],
  },
];

export const piecesLabel: Bilingual = { en: "pieces", ar: "قطعة محتوى" };
