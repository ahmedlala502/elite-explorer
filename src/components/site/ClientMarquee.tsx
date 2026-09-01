import { clients } from "@/lib/clients";

function Row({ items, reverse }: { items: typeof clients; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
      {loop.map((client, i) => (
        <div
          key={`${client.name}-${i}`}
          className="group mx-3 flex h-24 w-44 shrink-0 items-center justify-center border border-border/70 bg-card/40 px-6"
        >
          <img
            src={client.logo}
            alt={`${client.name} logo`}
            loading="lazy"
            width={160}
            height={64}
            className="logo-plate max-h-10 w-auto object-contain group-hover:logo-plate-hover"
          />
        </div>
      ))}
    </div>
  );
}

export function ClientMarquee() {
  const half = Math.ceil(clients.length / 2);
  return (
    <div className="relative overflow-hidden py-2">
      <Row items={clients.slice(0, half)} />
      <div className="h-3" />
      <Row items={clients.slice(half)} reverse />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
