import { clients } from "@/lib/clients";

function Row({ items, reverse }: { items: typeof clients; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
      {loop.map((client, i) => (
        <div
          key={`${client.name}-${i}`}
          className="logo-tile group mx-3 h-28 w-56 shrink-0 hover:logo-tile-hover"
        >
          <img
            src={client.logo}
            alt={`${client.name} logo`}
            loading="lazy"
            width={220}
            height={96}
            className="logo-img max-h-14"
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
      <div className="h-4" />
      <Row items={clients.slice(half)} reverse />
      <div className="pointer-events-none absolute inset-y-0 start-0 w-32 bg-gradient-to-r from-background to-transparent rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-32 bg-gradient-to-l from-background to-transparent rtl:bg-gradient-to-r" />
    </div>
  );
}
