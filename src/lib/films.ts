/** Campaign films, hosted on the ELITƎ media CDN (as on the original site). */

export type Film = {
  brand: string;
  market: string;
  category: string;
  poster: string;
  src: string;
};

const base =
  "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies";

export const films: Film[] = [
  {
    brand: "Enigmaku",
    market: "Saudi Arabia",
    category: "Restaurant",
    poster: `${base}/2026-03/1861094962669770.png`,
    src: `${base}/2026-03/1861094955247019.mp4`,
  },
  {
    brand: "tabl.to",
    market: "Saudi Arabia",
    category: "Restaurant",
    poster: `${base}/2026-03/1860994175649128.png`,
    src: `${base}/2026-03/1860994169424703.mp4`,
  },
  {
    brand: "Tashas Cafe",
    market: "United Arab Emirates",
    category: "Café",
    poster: `${base}/2026-03/1861001857416124.png`,
    src: `${base}/2026-03/1861001850605665.mp4`,
  },
  {
    brand: "Beit El Sabban",
    market: "Egypt",
    category: "Restaurant",
    poster: `${base}/2026-03/1861005288314998.png`,
    src: `${base}/2026-03/1861005282291885.mp4`,
  },
  {
    brand: "Jones the Grocer",
    market: "United Arab Emirates",
    category: "Café",
    poster: `${base}/2025-05/1832466431523462.png`,
    src: `${base}/2025-05/1832466427021874.mp4`,
  },
  {
    brand: "Rituals Cosmetics",
    market: "Saudi Arabia",
    category: "Beauty",
    poster: `${base}/2026-03/1860999806249719.png`,
    src: `${base}/2026-03/1860999803298860.mp4`,
  },
];
