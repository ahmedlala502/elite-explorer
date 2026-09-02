/**
 * Workspace primitives — the `/app/*` design language expressed with the site's
 * semantic tokens. Ported from the static prototype's app.css so the workspace
 * and the marketing site share one palette in both themes.
 */
import { Link } from "@tanstack/react-router";
import { ChevronRight, Search, TrendingDown, TrendingUp } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/app-data";

/* ----------------------------------- page ------------------------------------ */

export function PageHead({
  crumbs,
  title,
  lede,
  actions,
  meta,
  eyebrow,
}: {
  crumbs?: { label: string; to?: string }[];
  title: string;
  lede?: string;
  actions?: ReactNode;
  meta?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end gap-x-5 gap-y-4">
      <div className="min-w-0 flex-[1_1_340px]">
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-3 flex flex-wrap items-center gap-2 text-[0.8rem]"
          >
            {crumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden className="text-muted-foreground/50">
                    /
                  </span>
                )}
                {crumb.to ? (
                  <Link
                    to={crumb.to}
                    className="text-muted-foreground transition-colors hover:text-[color:var(--accent-text)]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-foreground">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <div className="mb-2.5">
            <AppEyebrow>{eyebrow}</AppEyebrow>
          </div>
        )}
        <h1 className="text-[clamp(1.55rem,2.4vw,2.1rem)] font-bold leading-[1.12] tracking-[-0.035em]">
          {title}
        </h1>
        {lede && (
          <p className="mt-2.5 max-w-[62ch] text-[0.95rem] leading-relaxed text-muted-foreground">
            {lede}
          </p>
        )}
        {meta}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}

/** Gold label with the prototype's 22px leading rule. */
export function AppEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-[9px] text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-text)]">
      <span aria-hidden className="h-px w-[22px] bg-current opacity-60" />
      {children}
    </p>
  );
}

/* ---------------------------------- buttons ----------------------------------- */

/*
  Four visual weights, deliberately far apart: a solid champagne primary, a
  bordered ghost, an inverted "dark" for the second action in a pair, and two
  chromeless tones. Anything in between reads as indecision at this density.
*/
const buttonTones = {
  primary:
    "border border-transparent bg-gold text-[color:var(--primary-foreground)] shadow-[0_1px_2px_oklch(0_0_0/0.14)] hover:bg-gold-soft active:translate-y-px",
  ghost:
    "border border-border bg-[color:var(--bg-raised)] text-foreground hover:border-[color:var(--accent-line)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent-text)] active:translate-y-px",
  dark: "border border-transparent bg-foreground text-background hover:bg-foreground/85 active:translate-y-px",
  quiet:
    "border border-transparent bg-transparent text-muted-foreground hover:bg-[color:var(--bg-sunken)] hover:text-[color:var(--accent-text)]",
  danger: "border border-transparent bg-transparent text-destructive hover:bg-destructive/10",
} as const;

export type ButtonTone = keyof typeof buttonTones;

const buttonSizes = {
  sm: "h-8 px-3.5 text-xs",
  md: "h-10 px-4.5 text-sm",
  lg: "h-12 px-6 text-sm",
} as const;

export function appButtonClass(
  tone: ButtonTone = "ghost",
  size: keyof typeof buttonSizes = "md",
  block = false,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,border-color,color,transform,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50",
    buttonTones[tone],
    buttonSizes[size],
    block && "w-full",
  );
}

export function AppButton({
  tone = "ghost",
  size = "md",
  block,
  className,
  ...props
}: ComponentProps<"button"> & {
  tone?: ButtonTone;
  size?: keyof typeof buttonSizes;
  block?: boolean;
}) {
  return (
    <button type="button" className={cn(appButtonClass(tone, size, block), className)} {...props} />
  );
}

/* ----------------------------------- panel ------------------------------------ */

export function Panel({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("panel-surface panel-sheen flex flex-col rounded-[var(--r-md)]", className)}
    >
      {children}
    </section>
  );
}

export function PanelHead({
  title,
  sub,
  actions,
}: {
  title: string;
  sub?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[color:var(--border-subtle)] px-6 py-[1.1rem]">
      <div className="min-w-0">
        <h2 className="text-[1rem] font-semibold tracking-[-0.02em]">{title}</h2>
        {sub && <p className="mt-0.5 text-[0.82rem] text-muted-foreground">{sub}</p>}
      </div>
      {actions && <div className="ms-auto flex items-center gap-2">{actions}</div>}
    </header>
  );
}

export function PanelBody({
  children,
  flush,
  className,
}: {
  children: ReactNode;
  flush?: boolean;
  className?: string;
}) {
  return <div className={cn(flush ? "p-0" : "p-6", className)}>{children}</div>;
}

export function PanelFoot({ children }: { children: ReactNode }) {
  return (
    <div className="mt-auto rounded-b-[var(--r-md)] border-t border-[color:var(--border-subtle)] bg-[color:var(--bg-sunken)] px-6 py-3.5 text-sm">
      {children}
    </div>
  );
}

/* ---------------------------------- stat card --------------------------------- */

export function StatCard({
  label,
  value,
  suffix,
  delta,
  dir,
  foot,
  icon,
}: {
  label: string;
  value: string;
  suffix?: string | undefined;
  delta?: string | undefined;
  dir?: "up" | "down" | "flat" | undefined;
  foot?: string | undefined;
  icon?: ReactNode | undefined;
}) {
  return (
    <article className="panel-surface panel-sheen group flex flex-col gap-3 overflow-hidden rounded-[var(--r-md)] px-6 pb-5 pt-[1.15rem] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent-line)] hover:shadow-[var(--shadow-panel-hover)]">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[0.84rem] font-medium text-muted-foreground">{label}</span>
        {icon && (
          <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-[color:var(--accent-soft)] text-[color:var(--accent-text)] ring-1 ring-inset ring-[color:var(--accent-line)] transition-colors duration-300 group-hover:bg-gold/20 [&>svg]:size-[17px]">
            {icon}
          </span>
        )}
      </div>
      <p className="text-[2.15rem] font-bold leading-none tracking-[-0.045em] tabular-nums">
        {value}
        {suffix && <span className="text-base font-medium text-muted-foreground">{suffix}</span>}
      </p>
      {(delta || foot) && (
        <p className="flex flex-wrap items-center gap-2 text-[0.83rem] text-muted-foreground">
          {delta && <Delta value={delta} dir={dir ?? "flat"} />}
          {foot && <span>{foot}</span>}
        </p>
      )}
    </article>
  );
}

export function Delta({ value, dir }: { value: string; dir: "up" | "down" | "flat" }) {
  if (dir === "flat") return <span className="font-semibold text-muted-foreground">{value}</span>;
  const up = dir === "up";
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <span
      className="inline-flex items-center gap-1 font-semibold"
      style={{ color: up ? "var(--ok)" : "var(--danger)" }}
    >
      <Icon className="size-3.5" />
      {value}
    </span>
  );
}

/* ----------------------------------- badge ------------------------------------ */

/**
 * One component, six tones. Every tone carries a dot as well as colour, so
 * status is never communicated by hue alone.
 */
const toneVars: Record<Tone, { bg: string; fg: string }> = {
  neutral: { bg: "var(--neutral-soft)", fg: "var(--neutral)" },
  ok: { bg: "var(--ok-soft)", fg: "var(--ok)" },
  warn: { bg: "var(--warn-soft)", fg: "var(--warn)" },
  info: { bg: "var(--info-soft)", fg: "var(--info)" },
  danger: { bg: "var(--danger-soft)", fg: "var(--danger)" },
  gold: { bg: "var(--accent-soft)", fg: "var(--accent-text)" },
};

export function Badge({
  tone = "neutral",
  children,
  outline,
  plain,
}: {
  tone?: Tone;
  children: ReactNode;
  outline?: boolean;
  plain?: boolean;
}) {
  const v = toneVars[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[7px] whitespace-nowrap rounded-full border border-transparent py-[5px] pe-[11px] ps-[9px] text-[0.79rem] font-semibold",
        outline && "border-[color:var(--border-strong)]",
      )}
      style={{ background: outline ? "transparent" : v.bg, color: v.fg }}
    >
      {!plain && !outline && (
        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-current" />
      )}
      {children}
    </span>
  );
}

/* ----------------------------------- meter ------------------------------------ */

export function Meter({ value, tone = "gold" }: { value: number; tone?: "gold" | "ok" | "warn" }) {
  const fill = tone === "warn" ? "var(--warn)" : tone === "ok" ? "var(--ok)" : "var(--gold)";
  return (
    <span
      role="img"
      aria-label={`${value}%`}
      className="block h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--bg-inset)] ring-1 ring-inset ring-[color:var(--border-subtle)]"
    >
      <span
        className="block h-full rounded-full transition-[width] duration-700 ease-out"
        style={{ width: `${value}%`, background: fill }}
      />
    </span>
  );
}

export function BarList({
  rows,
}: {
  rows: readonly { name: string; value: number | string; pct: number }[];
}) {
  return (
    <div className="grid gap-4">
      {rows.map((row) => (
        <div key={row.name} className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3 text-sm">
          <span className="truncate text-muted-foreground">{row.name}</span>
          <Meter value={row.pct} />
          <span className="text-end font-semibold tabular-nums">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------- pipeline ---------------------------------- */

export function Pipeline({
  stages,
  onSelect,
  selected,
}: {
  stages: readonly { name: string; value: number; share: number }[];
  onSelect?: (name: string) => void;
  selected?: string | null;
}) {
  return (
    <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))]">
      {stages.map((stage) => {
        const on = selected === stage.name;
        return (
          <button
            key={stage.name}
            type="button"
            aria-pressed={on}
            onClick={() => onSelect?.(stage.name)}
            className={cn(
              "min-w-0 rounded-[var(--r-sm)] border p-3.5 text-start transition-[border-color,background-color,transform] duration-200",
              on
                ? "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)]"
                : "border-border bg-[color:var(--bg-sunken)] hover:-translate-y-0.5 hover:border-[color:var(--border-strong)]",
            )}
          >
            {/* Fixed two-line box: a wrapped stage name keeps every number and meter on one baseline. */}
            <span className="block min-h-[1.8rem] text-[0.66rem] font-semibold uppercase leading-[0.9rem] tracking-[0.1em] text-muted-foreground">
              {stage.name}
            </span>
            <span
              className={cn(
                "mt-1 block text-[1.35rem] font-semibold leading-none tabular-nums transition-colors",
                on && "text-[color:var(--accent-text)]",
              )}
            >
              {stage.value}
            </span>
            <span className="mt-2 block">
              <Meter value={stage.share} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ----------------------------------- chart ------------------------------------ */

export function ColumnChart({
  data,
  height = 200,
}: {
  data: readonly { x: string; label: string; value: number }[];
  height?: number;
}) {
  return (
    <div className="flex items-stretch gap-2" style={{ height }}>
      {data.map((col) => (
        <div key={col.x} className="group relative flex flex-1 flex-col items-center gap-2">
          <span className="float-surface pointer-events-none absolute -top-1 z-10 whitespace-nowrap rounded-md px-2 py-1 text-[0.7rem] opacity-0 transition-opacity group-hover:opacity-100">
            {col.label}
          </span>
          {/* The track owns the height so the bar's percentage has something to resolve against. */}
          <span className="flex w-full flex-1 items-end rounded-t-md bg-[color:color-mix(in_oklab,var(--foreground)_5%,transparent)]">
            <span
              className="w-full rounded-t-md bg-[image:linear-gradient(180deg,var(--gold-soft),var(--gold))] transition-[height,filter] duration-700 ease-out group-hover:brightness-110"
              style={{ height: `${col.value}%` }}
            />
          </span>
          <span className="text-[0.7rem] text-muted-foreground">{col.x}</span>
        </div>
      ))}
    </div>
  );
}

export function Donut({
  pct,
  label,
  caption,
  legend,
}: {
  pct: number;
  label: string;
  caption: string;
  legend: readonly { name: string; value: number }[];
}) {
  const r = 50;
  const circumference = 2 * Math.PI * r;
  const swatches = ["bg-gold", "bg-gold-deep", "bg-muted-foreground"];
  return (
    <div className="grid gap-6">
      <div className="relative mx-auto size-40">
        <svg viewBox="0 0 120 120" aria-hidden className="size-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" strokeWidth="12" className="stroke-muted" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            className="stroke-gold"
            strokeDasharray={`${(pct / 100) * circumference} ${circumference}`}
          />
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <b className="text-xl font-semibold tabular-nums">{label}</b>
          <span className="text-xs text-muted-foreground">{caption}</span>
        </div>
      </div>
      <div className="grid gap-2">
        {legend.map((row, i) => (
          <div key={row.name} className="flex items-center gap-3 text-sm">
            <span className={cn("size-2.5 rounded-full", swatches[i % swatches.length])} />
            <span className="text-muted-foreground">{row.name}</span>
            <span className="ms-auto font-semibold tabular-nums">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- lists and tables ------------------------------ */

export function Toolbar({ children }: { children: ReactNode }) {
  return (
    <div className="panel-surface mb-6 flex flex-wrap items-center gap-3 rounded-[var(--r-md)] p-3">
      {children}
    </div>
  );
}

export function SearchField({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="search" className="relative min-w-[14rem] flex-1">
      <Search className="pointer-events-none absolute inset-y-0 start-3 my-auto size-4 text-muted-foreground" />
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-full border border-border bg-[color:var(--bg-sunken)] ps-10 pe-4 text-sm outline-none transition-colors placeholder:text-muted-foreground hover:border-[color:var(--border-strong)] focus-visible:border-gold focus-visible:bg-[color:var(--bg-raised)]"
      />
    </div>
  );
}

export function Chips({
  options,
  value,
  onChange,
  label,
  counts,
}: {
  options: readonly { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  counts?: Record<string, number>;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          aria-pressed={value === opt.id}
          onClick={() => onChange(opt.id)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200",
            value === opt.id
              ? "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] text-[color:var(--accent-text)]"
              : "border-border text-muted-foreground hover:border-[color:var(--border-strong)] hover:text-foreground",
          )}
        >
          {opt.label}
          {counts && <span className="tabular-nums opacity-70">{counts[opt.id] ?? 0}</span>}
        </button>
      ))}
    </div>
  );
}

export function Segmented({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex rounded-full border border-border bg-[color:var(--bg-sunken)] p-1"
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200",
            value === opt
              ? "bg-gold text-[color:var(--primary-foreground)] shadow-[0_1px_2px_oklch(0_0_0/0.16)]"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function Count({ children }: { children: ReactNode }) {
  return (
    <span role="status" className="ms-auto text-xs text-muted-foreground">
      {children}
    </span>
  );
}

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[38rem] border-collapse text-sm [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-[color:color-mix(in_oklab,var(--foreground)_4%,transparent)] [&_tbody_tr:last-child_td]:border-b-0">
        {children}
      </table>
    </div>
  );
}

/** Shared by `Th` and by any bespoke sortable header, so a table's head row
 *  never splits into two different-looking surfaces. */
export const thClass =
  "border-b border-border bg-[color:var(--bg-sunken)] px-5 py-2.5 text-start text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground";

export function Th({
  children,
  num,
  className,
}: {
  children: ReactNode;
  num?: boolean;
  className?: string;
}) {
  return (
    <th scope="col" className={cn(thClass, num && "text-end", className)}>
      {children}
    </th>
  );
}

export function Td({
  children,
  num,
  className,
}: {
  children: ReactNode;
  num?: boolean;
  className?: string;
}) {
  return (
    <td
      className={cn(
        "border-b border-[color:var(--border-subtle)] px-5 py-3.5 align-middle",
        num && "text-end tabular-nums",
        className,
      )}
    >
      {children}
    </td>
  );
}

export function Person({
  name,
  meta,
  avatar,
  size = "sm",
}: {
  name: ReactNode;
  meta?: ReactNode;
  avatar?: string;
  size?: "sm" | "lg" | "xl";
}) {
  const dims = { sm: "size-9", lg: "size-14", xl: "size-20" }[size];
  return (
    <span className="flex items-center gap-3">
      {avatar && (
        <img
          src={avatar}
          alt=""
          width={160}
          height={160}
          loading="lazy"
          decoding="async"
          className={cn("shrink-0 rounded-full object-cover", dims)}
        />
      )}
      <span className="min-w-0">
        <span className="block truncate font-semibold">{name}</span>
        {meta && <span className="block truncate text-xs text-muted-foreground">{meta}</span>}
      </span>
    </span>
  );
}

export function Feed({
  items,
}: {
  items: readonly { icon: ReactNode; text: ReactNode; time: string }[];
}) {
  return (
    <ul className="grid gap-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-0.5 grid size-8 shrink-0 place-content-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent-text)] ring-1 ring-inset ring-[color:var(--border-subtle)] [&>svg]:size-4">
            {item.icon}
          </span>
          <span className="min-w-0">
            <span className="block text-sm">{item.text}</span>
            <span className="block text-xs text-muted-foreground">{item.time}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function DefList({ rows }: { rows: readonly (readonly [string, ReactNode])[] }) {
  return (
    <dl className="grid">
      {rows.map(([term, value], i) => (
        <div
          key={term}
          className={cn(
            "flex items-center justify-between gap-4 py-2.5 text-sm",
            i > 0 && "border-t border-[color:var(--border-subtle)]",
          )}
        >
          <dt className="text-muted-foreground">{term}</dt>
          <dd className="text-end font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid justify-items-center gap-4 rounded-[var(--r-md)] border border-dashed border-[color:var(--border-strong)] bg-[color:var(--bg-sunken)] px-6 py-12 text-center">
      <span className="grid size-12 place-content-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent-text)] ring-1 ring-inset ring-[color:var(--accent-line)] [&>svg]:size-5">
        {icon}
      </span>
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mx-auto mt-2 max-w-[52ch] text-sm text-muted-foreground">{body}</p>
      </div>
      {action}
    </div>
  );
}

export function Alert({
  tone = "warn",
  children,
  icon,
}: {
  tone?: "warn" | "info";
  children: ReactNode;
  icon: ReactNode;
}) {
  const color = tone === "warn" ? "var(--warn)" : "var(--info)";
  return (
    <div
      className="mb-6 flex gap-3 rounded-[var(--r-md)] border p-4 text-sm"
      style={{
        borderColor: `color-mix(in oklab, ${color} 32%, transparent)`,
        background: tone === "warn" ? "var(--warn-soft)" : "var(--info-soft)",
        color,
      }}
    >
      <span className="mt-0.5 shrink-0 [&>svg]:size-4">{icon}</span>
      <span className="[&_strong]:text-foreground">{children}</span>
    </div>
  );
}

export function ArrowLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-opacity hover:opacity-80"
    >
      {children}
      <ChevronRight className="size-4 rtl:-scale-x-100" />
    </Link>
  );
}

/** Renders **bold** spans in demo activity copy. */
export function RichText({ value }: { value: string }) {
  return (
    <>
      {value.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <b key={i} className="font-semibold">
            {part}
          </b>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
