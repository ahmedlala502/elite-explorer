import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import textureNoir from "@/assets/texture-noir.jpg";
import { Reveal } from "@/components/site/Reveal";
import { EliteMark } from "@/components/brand/EliteWordmark";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Start a campaign — Contact ELITƎ" },
      {
        name: "description",
        content:
          "Tell ELITƎ your goal and market. We come back with the creator roster, the campaign plan and the numbers.",
      },
      { property: "og:title", content: "Start a campaign with ELITƎ" },
      {
        property: "og:description",
        content: "Brief us on your brand and goal — we handle discovery, production and reporting.",
      },
    ],
  }),
  component: Contact,
});

const fields = [
  { name: "name", label: "Full name", type: "text", placeholder: "Your name" },
  { name: "brand", label: "Brand", type: "text", placeholder: "Brand or company" },
  { name: "email", label: "Email", type: "email", placeholder: "you@brand.com" },
  { name: "market", label: "Market", type: "text", placeholder: "Saudi Arabia, Kuwait, UAE…" },
] as const;

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={textureNoir}
          alt=""
          aria-hidden
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-52">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
            <div>
              <p className="eyebrow rise text-gold">Start a campaign</p>
              <h1 className="rise mt-8 text-[clamp(2.6rem,6vw,4.8rem)] font-extrabold leading-[0.96]">
                Tell us the goal.
                <br />
                <span className="font-serif font-normal italic text-gold-gradient">
                  We'll bring the numbers.
                </span>
              </h1>
              <p className="rise mt-10 max-w-md text-base leading-relaxed text-muted-foreground">
                Share your brand, market and objective. We come back with the creator roster, the
                plan and the projected reach — usually within two working days.
              </p>
              <div className="hairline my-12 max-w-xs" />
              <ul className="space-y-4 text-sm text-muted-foreground">
                {[
                  "85K+ creators across 52+ countries",
                  "Campaign management with 24/7 live support",
                  "Coverage tracking and end-of-campaign reporting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-2 h-px w-8 shrink-0 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <EliteMark className="mt-16 h-8 w-auto text-gold/40" />
            </div>

            <Reveal delay={120}>
              <div className="border border-border bg-card/50 p-8 backdrop-blur-sm lg:p-12">
                {sent ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <span className="flex size-14 items-center justify-center rounded-full border border-gold/50 text-gold">
                      <Check className="size-6" />
                    </span>
                    <p className="mt-8 font-serif text-2xl italic">Brief received.</p>
                    <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                      Our team will be in touch shortly with creators and a plan for your market.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="space-y-8"
                  >
                    <div className="grid gap-8 sm:grid-cols-2">
                      {fields.map((field) => (
                        <label key={field.name} className="block">
                          <span className="eyebrow">{field.label}</span>
                          <input
                            required
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            className="mt-3 w-full border-b border-border bg-transparent pb-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-gold focus:outline-none"
                          />
                        </label>
                      ))}
                    </div>
                    <label className="block">
                      <span className="eyebrow">Your goal</span>
                      <textarea
                        required
                        rows={5}
                        name="goal"
                        placeholder="What are you launching, and what does success look like?"
                        className="mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-gold focus:outline-none"
                      />
                    </label>
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-gold)] px-9 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      Send the brief
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
