import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { films } from "@/lib/films";
import { useI18n } from "@/lib/i18n";

function FilmCard({ film, delay }: { film: (typeof films)[number]; delay: number }) {
  const { c, term } = useI18n();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <Reveal delay={delay} className="bg-[color:var(--ink)]">
      <figure className="group relative aspect-[4/5] overflow-hidden">
        <video
          ref={ref}
          poster={film.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={`${film.brand} campaign film`}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        >
          <source src={film.src} type="video/mp4" />
        </video>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.006_70/0.9)] via-transparent to-transparent"
          aria-hidden
        />

        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? c.common.pause : c.common.play}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex size-16 items-center justify-center rounded-full border border-[oklch(1_0_0/0.5)] bg-[oklch(0.12_0.006_70/0.45)] text-[oklch(1_0_0)] backdrop-blur-sm transition-all duration-500 group-hover:border-gold group-hover:text-gold">
            {playing ? <Pause className="size-5" /> : <Play className="size-5 translate-x-px" />}
          </span>
        </button>

        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
          <p className="text-lg font-bold tracking-tight text-[oklch(1_0_0)]">{film.brand}</p>
          <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[oklch(1_0_0/0.7)]">
            {term("markets", film.market)} · {term("categories", film.category)}
          </p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function CampaignFilms({ items = films }: { items?: typeof films }) {
  return (
    <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((film, i) => (
        <FilmCard key={film.brand} film={film} delay={i * 90} />
      ))}
    </div>
  );
}
