/**
 * Global media de-duplication.
 *
 * Every campaign film, poster and still in the archive is claimed by exactly
 * one slot in the whole site: a film in the homepage reel never reappears in
 * the Success Stories reel, a story used as a featured card on one page is
 * never featured on another, and no thumbnail image is shown twice anywhere.
 *
 * The plan is computed once from static data, so it is deterministic and
 * identical on the server and the client.
 */

import storyBeauty from "@/assets/story-beauty.jpg";
import storyDining from "@/assets/story-dining.jpg";
import storyRetail from "@/assets/story-retail.jpg";

import { films, type Film } from "./films";
import { stories, type Story } from "./stories";

export type StoryMediaPlan =
  | { kind: "video"; src: string; poster: string }
  | { kind: "reel"; shots: string[]; poster: string }
  | { kind: "still"; src: string }
  | { kind: "plate" };

export type PlannedStory = Story & { media: StoryMediaPlan };

const claimed = new Set<string>();
const free = (url?: string) => Boolean(url) && !claimed.has(url as string);
const claim = (...urls: (string | undefined)[]) => {
  for (const url of urls) if (url) claimed.add(url);
};

/* ---------- 1. films: split the reel between the two pages ---------- */

export const homeFilms: Film[] = films.slice(0, 3);
export const storyFilms: Film[] = films.slice(3);

// every film's video + poster is now spoken for
for (const film of films) claim(film.src, film.poster);

/* ---------- 2. stories: resolve unique media per story ---------- */

const fallbackPool: { key: string; src: string }[] = [
  { key: "fallback:dining", src: storyDining },
  { key: "fallback:retail", src: storyRetail },
  { key: "fallback:beauty", src: storyBeauty },
];

function resolve(story: Story): StoryMediaPlan {
  if (free(story.video)) {
    const poster = free(story.poster) ? story.poster : (story.shots.find(free) ?? "");
    claim(story.video, poster);
    return { kind: "video", src: story.video as string, poster };
  }

  const shots = story.shots.filter(free);
  if (shots.length > 1) {
    claim(...shots);
    return { kind: "reel", shots, poster: shots[0] as string };
  }
  if (shots.length === 1) {
    claim(shots[0]);
    return { kind: "still", src: shots[0] as string };
  }
  if (free(story.poster)) {
    claim(story.poster);
    return { kind: "still", src: story.poster };
  }

  const slot = fallbackPool.find((f) => free(f.key));
  if (slot) {
    claim(slot.key);
    return { kind: "still", src: slot.src };
  }

  // no unique visual left — render the brand as a typographic plate
  return { kind: "plate" };
}

const planned: PlannedStory[] = stories.map((story) => ({
  ...story,
  media: resolve(story),
}));

const isRich = (s: PlannedStory) => s.media.kind === "video" || s.media.kind === "reel";

/** Featured trio on the homepage. */
export const homeFeaturedStories = planned.filter(isRich).slice(0, 3);

const homeFeaturedBrands = new Set(homeFeaturedStories.map((s) => s.brand));

/** Featured trio on Success Stories — never repeats the homepage trio. */
export const storiesFeaturedStories = planned
  .filter((s) => isRich(s) && !homeFeaturedBrands.has(s.brand))
  .slice(0, 3);

const featuredBrands = new Set([
  ...homeFeaturedBrands,
  ...storiesFeaturedStories.map((s) => s.brand),
]);

/** Full roster grid — excludes stories already featured above it. */
export const storyGridStories = planned.filter((s) => !featuredBrands.has(s.brand));

/** All planned stories, for filtering by market. */
export const plannedStories = planned;
