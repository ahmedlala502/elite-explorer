/** Success stories, sourced from the ELITƎ case-study archive. */

import { films } from "./films";


export type Story = {
  brand: string;
  market: string;
  /** total follower reach */
  reach: string;
  /** number of creators involved */
  creators: string;
  logo: string;
  /** thumbnail for the campaign media panel */
  poster: string;
  /** campaign stills used for the motion reel */
  shots: string[];
  /** campaign film, when one exists in the archive */
  video?: string;
  /** editorial fallback visual when the archive has no stills */
  fallback?: "dining" | "retail" | "beauty";
};

export const stories: Story[] = [
  {
    "brand": "Black Tap",
    "market": "Egypt",
    "reach": "90M",
    "creators": "+899",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2026-02/1855916107715085.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828915652880701.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828915652880701.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828915651319749.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828915652097642.png"
    ]
  },
  {
    "brand": "Sobhy Kaber",
    "market": "Saudi Arabia",
    "reach": "80M",
    "creators": "+871",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2024-12/1819315693214655.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828921057450054.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828921057450054.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828921055166584.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828921056636254.png"
    ]
  },
  {
    "brand": "Mr. Chow",
    "market": "United Arab Emirates",
    "reach": "60M",
    "creators": "+569",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2026-02/1855915970553783.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832360211302435.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832360211302435.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832360209889465.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832360210606317.png"
    ]
  },
  {
    "brand": "Jon & Vinny's",
    "market": "Saudi Arabia",
    "reach": "60M",
    "creators": "+556",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2026-02/1855915661877074.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828923098336965.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828923098336965.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828923096744007.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828923097556622.png"
    ]
  },
  {
    "brand": "Crazy Pizza",
    "market": "Saudi Arabia",
    "reach": "50.2M",
    "creators": "+478",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/08_new_brand_logo/crazypizza.saudi.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827931111931288.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827931111931288.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827931109129161.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827931111383801.png"
    ]
  },
  {
    "brand": "A.O.K Kitchen",
    "market": "Saudi Arabia",
    "reach": "40M",
    "creators": "+309",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-02/1824464000863070.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1829008475137983.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1829008475137983.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828923719790630.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828923720401586.png"
    ]
  },
  {
    "brand": "Nawader Al Oud",
    "market": "Qatar",
    "reach": "29.2M",
    "creators": "+166",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/07_new_brand_logo/AlKhudirOud.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827662902823986.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827662902823986.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827662900788836.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827662902025589.png"
    ]
  },
  {
    "brand": "Beefbar",
    "market": "Saudi Arabia",
    "reach": "25M",
    "creators": "+238",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-01/1821299506202206.jpg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827935391985958.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827935391985958.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827935390451007.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827935391245914.png"
    ]
  },
  {
    "brand": "Enigmaku",
    "market": "Kuwait",
    "reach": "24.9M",
    "creators": "+186",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-04/1829293951041501.jfif",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861094962669770.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861094962669770.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861094960989853.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861094958627998.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861094959488837.png"
    ],
    "video": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861094955247019.mp4"
  },
  {
    "brand": "Rüya",
    "market": "Saudi Arabia",
    "reach": "24M",
    "creators": "+213",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-04/1829838337518292.jpg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1828016073376061.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1828016073376061.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1828016073017121.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1828016073215086.png"
    ]
  },
  {
    "brand": "tabl.to",
    "market": "Saudi Arabia",
    "reach": "19.7M",
    "creators": "+360",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2026-01/1855635817194466.jpg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1860994175649128.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1860994175649128.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1860994178423578.png"
    ],
    "video": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1860994169424703.mp4"
  },
  {
    "brand": "KAYZŌ",
    "market": "Saudi Arabia",
    "reach": "19.2M",
    "creators": "+185",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2024-12/1819511376220843.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827742319764336.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827742319764336.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827742317101540.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827742319105276.png"
    ]
  },
  {
    "brand": "Tashas Cafe",
    "market": "Saudi Arabia",
    "reach": "17.9M",
    "creators": "+87",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2026-01/1853457970803878.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861001857416124.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861001857416124.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861001856101836.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861001854215021.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861001855027616.png"
    ],
    "video": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861001850605665.mp4"
  },
  {
    "brand": "Iris",
    "market": "Saudi Arabia",
    "reach": "17M",
    "creators": "+125",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-05/1832465413773712.jpg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832465481091629.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832465481091629.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832465479788664.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832465480436664.png"
    ]
  },
  {
    "brand": "Clap",
    "market": "Saudi Arabia",
    "reach": "17M",
    "creators": "+120",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-05/1831262966054741.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832377207677634.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832377207677634.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832377205829348.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832377206714677.png"
    ]
  },
  {
    "brand": "Brute",
    "market": "Saudi Arabia",
    "reach": "15M",
    "creators": "+93",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-05/1832369322978865.jpg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832372589506696.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832372589506696.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832372588017452.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832372588722459.png"
    ]
  },
  {
    "brand": "Lavenue",
    "market": "Saudi Arabia",
    "reach": "15M",
    "creators": "+89",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-03/1827046089073328.jpeg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828924436399983.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828924436399983.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828924435005761.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828924435588976.png"
    ]
  },
  {
    "brand": "Beit El Sabban",
    "market": "Saudi Arabia",
    "reach": "13.9M",
    "creators": "+58",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-04/1829841142556666.jpg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861005288314998.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861005288314998.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861005287657865.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861005285833577.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861005286693766.png"
    ],
    "video": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861005282291885.mp4"
  },
  {
    "brand": "Jones the Grocer",
    "market": "Saudi Arabia",
    "reach": "12M",
    "creators": "+118",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-05/1832465679080023.jpg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832466431523462.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832466431523462.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832466429846960.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832466430888165.png"
    ],
    "video": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-05/1832466427021874.mp4"
  },
  {
    "brand": "Urth Caffe",
    "market": "Saudi Arabia",
    "reach": "12M",
    "creators": "+134",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2024-12/1818133327998975.jpg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828931005826631.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828931005826631.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828931004476058.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828931005251019.png"
    ]
  },
  {
    "brand": "Zuma",
    "market": "Saudi Arabia",
    "reach": "12M",
    "creators": "+56",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2026-02/1855915346951024.jpeg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827478045478257.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827478045478257.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827478044063312.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827478044739924.png"
    ]
  },
  {
    "brand": "Maryool",
    "market": "Kuwait",
    "reach": "9M",
    "creators": "+11",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-02/1823237413682751.png",
    "poster": "",
    "shots": [],
    "fallback": "retail"
  },
  {
    "brand": "Swaikhat And Tanoor",
    "market": "Kuwait",
    "reach": "7M",
    "creators": "+10",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-04/1828937691156605.jpg",
    "poster": "",
    "shots": [],
    "fallback": "dining"
  },
  {
    "brand": "Roka",
    "market": "Saudi Arabia",
    "reach": "6.5M",
    "creators": "+136",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/08_new_brand_logo/Roka.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827661148644875.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827661148644875.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827661145008889.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827661307769861.png"
    ]
  },
  {
    "brand": "Il Baretto",
    "market": "Saudi Arabia",
    "reach": "5.2M",
    "creators": "+44",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2026-02/1855915839383646.jpeg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827744997199987.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827744997199987.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1827744997442998.png"
    ]
  },
  {
    "brand": "Signor Sassi",
    "market": "Saudi Arabia",
    "reach": "5M",
    "creators": "+7",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-04/1828932143680109.jpg",
    "poster": "",
    "shots": [],
    "fallback": "dining"
  },
  {
    "brand": "ROBATA",
    "market": "Saudi Arabia",
    "reach": "5M",
    "creators": "+5",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-04/1829007936575073.jpg",
    "poster": "",
    "shots": [],
    "fallback": "dining"
  },
  {
    "brand": "MYAZŪ",
    "market": "Saudi Arabia",
    "reach": "5M",
    "creators": "+6",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-04/1828932964088372.jpg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828929162182732.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828929162182732.png"
    ]
  },
  {
    "brand": "Agio",
    "market": "Saudi Arabia",
    "reach": "4M",
    "creators": "+3",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-04/1828931333150707.jpg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828927900404937.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-04/1828927900404937.png"
    ]
  },
  {
    "brand": "Maserati",
    "market": "Kuwait",
    "reach": "4M",
    "creators": "+32",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/08_new_brand_logo/maserati.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-06/1835891456247351.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-06/1835891456247351.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-06/1835891454505625.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-06/1835891455584881.png"
    ]
  },
  {
    "brand": "Coya",
    "market": "Saudi Arabia",
    "reach": "3M",
    "creators": "+3",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-02/1824209271246703.png",
    "poster": "",
    "shots": [],
    "fallback": "dining"
  },
  {
    "brand": "Kiko",
    "market": "Saudi Arabia",
    "reach": "2.1M",
    "creators": "+1",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-11/1849298978115382.png",
    "poster": "",
    "shots": [],
    "video": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1861000132801022.mp4",
    "fallback": "beauty"
  },
  {
    "brand": "St. Regis Hotels",
    "market": "Bahrain",
    "reach": "2M",
    "creators": "+17",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/08_new_brand_logo/stregishotels.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1828017904279249.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1828017904279249.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1828017905734559.png"
    ]
  },
  {
    "brand": "Million Riyal Menu",
    "market": "Saudi Arabia",
    "reach": "571.5K",
    "creators": "+8",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2026-02/1856726442503833.png",
    "poster": "",
    "shots": [],
    "video": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1860920513399519.mp4",
    "fallback": "dining"
  },
  {
    "brand": "Panerai",
    "market": "Saudi Arabia",
    "reach": "536.1K",
    "creators": "+1",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-11/1849298418738385.jpeg",
    "poster": "",
    "shots": [],
    "fallback": "retail"
  },
  {
    "brand": "Fred",
    "market": "Saudi Arabia",
    "reach": "206.2K",
    "creators": "+1",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-11/1849298812811393.jpeg",
    "poster": "",
    "shots": [],
    "fallback": "retail"
  },
  {
    "brand": "Gia",
    "market": "Kuwait",
    "reach": "149.2K",
    "creators": "+8",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/07_new_brand_logo/gia_gc.png",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1828023938608269.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1828023938608269.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1828023939929494.png"
    ]
  },
  {
    "brand": "Rituals Cosmetics",
    "market": "Saudi Arabia",
    "reach": "98.5K",
    "creators": "+2",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-11/1849302888070172.jpg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1860999806249719.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1860999806249719.png"
    ],
    "video": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2026-03/1860999803298860.mp4"
  },
  {
    "brand": "The Back Burner",
    "market": "Kuwait",
    "reach": "95K",
    "creators": "+10",
    "logo": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/brands/2025-01/1822509787720194.jpg",
    "poster": "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1828022486114157.png",
    "shots": [
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1828022486114157.png",
      "https://grand-community.fra1.digitaloceanspaces.com/uploads-live/f_s3/photos/case_studies/2025-03/1828022486830815.png"
    ]
  }
];

/**
 * Featured home cards never repeat media shown elsewhere on the page:
 * they exclude brands whose film runs in the campaign-films strip.
 */
const filmBrands = new Set(films.map((f) => f.brand.toLowerCase()));

export const featuredStories = stories
  .filter((s) => !filmBrands.has(s.brand.toLowerCase()))
  .filter((s) => s.video || s.shots.length > 0)
  .slice(0, 3);


export const storyMarkets = [
  "All",
  ...Array.from(new Set(stories.map((s) => s.market))),
];
