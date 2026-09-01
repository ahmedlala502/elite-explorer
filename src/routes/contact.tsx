import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import textureNoir from "@/assets/texture-noir.jpg";
import { Reveal } from "@/components/site/Reveal";
import { EliteMark } from "@/components/brand/EliteWordmark";
import { en } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: en.contact.title },
      { name: "description", content: en.contact.description },
      { property: "og:title", content: en.contact.title },
      { property: "og:description", content: en.contact.description },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { c } = useI18n();
  const [sent, setSent] = useState(false);

  const fields = [
    { name: "name", label: c.contact.fields.name, type: "text", ph: c.contact.fields.namePh },
    { name: "brand", label: c.contact.fields.brand, type: "text", ph: c.contact.fields.brandPh },
    { name: "email", label: c.contact.fields.email, type: "email", ph: c.contact.fields.emailPh },
    { name: "market", label: c.contact.fields.market, type: "text", ph: c.contact.fields.marketPh },
  ];

  return (
    <section className="relative overflow-hidden">
      <img
        src={textureNoir}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover opacity-50 dark:opacity-70"
      />
      <div className="absolute inset-0 bg-background/70 dark:bg-transparent" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-52">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <p className="eyebrow rise text-gold">{c.contact.eyebrow}</p>
            <h1 className="rise mt-8 text-[clamp(2.6rem,6vw,4.8rem)] font-extrabold leading-[0.96]">
              {c.contact.heroLine1}
              <br />
              <span className="font-serif font-normal italic text-gold-gradient">
                {c.contact.heroLine2}
              </span>
            </h1>
            <p className="rise mt-10 max-w-md text-base leading-relaxed text-muted-foreground">
              {c.contact.heroBody}
            </p>
            <div className="hairline my-12 max-w-xs" />
            <ul className="space-y-4 text-sm text-muted-foreground">
              {c.contact.points.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-2 h-px w-8 shrink-0 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <EliteMark className="mt-16 h-8 w-auto text-gold/40" />
          </div>

          <Reveal delay={120}>
            <div className="border border-border bg-card/70 p-8 backdrop-blur-sm lg:p-12">
              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="flex size-14 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <Check className="size-6" />
                  </span>
                  <p className="mt-8 font-serif text-2xl italic">{c.contact.sentTitle}</p>
                  <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                    {c.contact.sentBody}
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
                          placeholder={field.ph}
                          className="mt-3 w-full border-b border-border bg-transparent pb-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none"
                        />
                      </label>
                    ))}
                  </div>
                  <label className="block">
                    <span className="eyebrow">{c.contact.fields.goal}</span>
                    <textarea
                      required
                      rows={5}
                      name="goal"
                      placeholder={c.contact.fields.goalPh}
                      className="mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none"
                    />
                  </label>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-gold)] px-9 py-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {c.contact.submit}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
  );
}
