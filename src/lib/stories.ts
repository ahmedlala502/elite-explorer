export type Story = {
  brand: string;
  market: string;
  category: string;
  reach: string;
  creators: string;
  note: string;
  logo?: string;
};

export const featuredStories: Story[] = [
  {
    brand: "Black Tap",
    market: "Egypt",
    category: "Restaurant",
    reach: "90M",
    creators: "+899",
    note: "899 creators across Egypt, reaching 90M followers.",
    logo: "/clients/black-tap.png",
  },
  {
    brand: "Sobhy Kaber",
    market: "Saudi Arabia",
    category: "Restaurant",
    reach: "80M",
    creators: "+871",
    note: "871 creators in Saudi Arabia, reaching 80M followers.",
    logo: "/clients/sobhy-kaber.png",
  },
  {
    brand: "Mr. Chow",
    market: "United Arab Emirates",
    category: "Restaurant",
    reach: "60M",
    creators: "+569",
    note: "569 creators in the UAE, reaching 60M followers.",
    logo: "/clients/mr-chow.png",
  },
];

export const stories: Story[] = [
  ...featuredStories,
  {
    brand: "Jon & Vinny's",
    market: "Saudi Arabia",
    category: "Restaurant",
    reach: "60M",
    creators: "+556",
    note: "556 creators in Saudi Arabia, reaching 60M followers.",
    logo: "/clients/jon-vinny-s.png",
  },
  {
    brand: "Crazy Pizza",
    market: "Saudi Arabia",
    category: "Restaurant",
    reach: "50.2M",
    creators: "+478",
    note: "478 creators in Saudi Arabia, reaching 50.2M followers.",
    logo: "/clients/crazy-pizza.png",
  },
  {
    brand: "A.O.K Kitchen",
    market: "Saudi Arabia",
    category: "Restaurant",
    reach: "40M",
    creators: "+309",
    note: "309 creators in Saudi Arabia, reaching 40M followers.",
    logo: "/clients/a-o-k-kitchen.png",
  },
  {
    brand: "Nawader Aloud",
    market: "Qatar",
    category: "Restaurant",
    reach: "29.2M",
    creators: "+166",
    note: "166 creators in Qatar, reaching 29.2M followers.",
    logo: "/clients/nawader-aloud.png",
  },
  {
    brand: "Beefbar",
    market: "Saudi Arabia",
    category: "Restaurant",
    reach: "25M",
    creators: "+238",
    note: "238 creators in Saudi Arabia, reaching 25M followers.",
    logo: "/clients/beefbar.png",
  },
  {
    brand: "Enigmaku",
    market: "Kuwait",
    category: "Fashion",
    reach: "24.9M",
    creators: "+186",
    note: "186 creators in Kuwait, reaching 24.9M followers.",
    logo: "/clients/enigmaku.png",
  },
  {
    brand: "Rüya",
    market: "Saudi Arabia",
    category: "Restaurant",
    reach: "24M",
    creators: "+213",
    note: "213 creators in Saudi Arabia, reaching 24M followers.",
    logo: "/clients/r-ya.png",
  },
  {
    brand: "tabl.to",
    market: "Saudi Arabia",
    category: "Restaurant",
    reach: "19.7M",
    creators: "+360",
    note: "360 creators in Saudi Arabia, reaching 19.7M followers.",
    logo: "/clients/tabl-to.png",
  },
  {
    brand: "Tashas Cafe",
    market: "Saudi Arabia",
    category: "Café",
    reach: "17.9M",
    creators: "+87",
    note: "87 creators in Saudi Arabia, reaching 17.9M followers.",
    logo: "/clients/tashas-cafe.png",
  },
  {
    brand: "Beit El Sabban",
    market: "Saudi Arabia",
    category: "Restaurant",
    reach: "13.9M",
    creators: "+58",
    note: "58 creators in Saudi Arabia, reaching 13.9M followers.",
    logo: "/clients/beit-el-sabban.png",
  },
  {
    brand: "Jones the Grocer",
    market: "Saudi Arabia",
    category: "Café",
    reach: "12M",
    creators: "+118",
    note: "118 creators in Saudi Arabia, reaching 12M followers.",
    logo: "/clients/jones-the-grocer.png",
  },
  {
    brand: "Kiko",
    market: "Saudi Arabia",
    category: "Beauty",
    reach: "2.1M",
    creators: "+1",
    note: "A single creator in Saudi Arabia, reaching 2.1M followers.",
    logo: "/clients/kiko.png",
  },
  {
    brand: "Rituals Cosmetics",
    market: "Saudi Arabia",
    category: "Beauty",
    reach: "98.5K",
    creators: "+2",
    note: "2 creators in Saudi Arabia, reaching 98.5K followers.",
    logo: "/clients/rituals-cosmetics.png",
  },
];

export const storyCategories = ["All", "Restaurant", "Café", "Fashion", "Beauty"] as const;
