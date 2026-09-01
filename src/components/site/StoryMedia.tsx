import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

import storyBeauty from "@/assets/story-beauty.jpg";
import storyDining from "@/assets/story-dining.jpg";
import storyRetail from "@/assets/story-retail.jpg";
import type { Story } from "@/lib/stories";

const fallbacks: Record<NonNullable<Story["fallback"]>, string> = {
  dining: storyDining,
  retail: storyRetail,
  beauty: storyBeauty,
};

/** Thumbnail guaranteed for every story: archive still, else editorial fallback. */
export function storyThumb(story: Story) {
  return story.poster || story.shots[0] || fallbacks[story.fallback ?? "dining"];
}

/**
 * Campaign media panel for a success story: plays the archive film when one
 * exists, otherwise cross-fades the campaign stills into a motion reel.
 * A poster/thumbnail is always rendered first so nothing ever loads blank.
 */
export function StoryMedia({
  story,
  className = "aspect-[4/5]",
  label,
}: {
  story: Story;
  className?: string;
  label: string;
}) {
  const thumb = storyThumb(story);
  const frames = story.shots.length > 1 ? story.shots : [];
  const videoRef = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setInView(entry.isIntersecting && entry.intersectionRatio > 0.3);
      },
      { threshold: [0, 0.3, 0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) void el.play().catch(() => undefined);
    else el.pause();
  }, [inView]);

  useEffect(() => {
    if (story.video || frames.length < 2 || !inView) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % frames.length), 3200);
    return () => window.clearInterval(id);
  }, [frames.length, inView, story.video]);

  return (
    <div
      ref={boxRef}
      className={`relative overflow-hidden bg-[color:var(--ink)] ${className}`}
    >
      {story.video ? (
        <video
          ref={videoRef}
          poster={thumb}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          className="size-full object-cover"
        >
          <source src={story.video} type="video/mp4" />
        </video>
      ) : frames.length > 1 ? (
        frames.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === 0 ? label : ""}
            loading="lazy"
            className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${
              i === frame ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: i === frame ? "scale(1.04)" : "scale(1)", transitionProperty: "opacity, transform" }}
          />
        ))
      ) : (
        <img
          src={thumb}
          alt={label}
          loading="lazy"
          className="size-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0.14_0.01_60/0.72),transparent_55%)]"
        aria-hidden
      />

      {story.video ? (
        <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[oklch(0.14_0.01_60/0.55)] px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[oklch(0.97_0.006_85)] backdrop-blur">
          <Play className="size-3 fill-current" />
          Film
        </span>
      ) : null}

      <p className="pointer-events-none absolute inset-x-4 bottom-4 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[oklch(0.97_0.006_85/0.86)]">
        {story.brand}
      </p>
    </div>
  );
}
