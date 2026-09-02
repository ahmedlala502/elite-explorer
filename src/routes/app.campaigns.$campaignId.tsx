import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import {
  Check,
  ChevronRight,
  Clock,
  Download,
  Image as ImageIcon,
  Info,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  SearchX,
  Target,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import {
  Alert,
  AppButton,
  ArrowLink,
  Badge,
  BarList,
  Count,
  DefList,
  EmptyState,
  PageHead,
  Panel,
  PanelBody,
  PanelFoot,
  PanelHead,
  Person,
  Pipeline,
  SearchField,
  StatCard,
  TableWrap,
  Td,
  Th,
  Toolbar,
  appButtonClass,
} from "@/components/app/ui";
import { campaignDetail, campaigns, creators, roster } from "@/lib/app-data";
import { demo } from "@/lib/demo";

export const Route = createFileRoute("/app/campaigns/$campaignId")({
  loader: ({ params }) => {
    if (!campaigns.some((c) => c.id === params.campaignId)) throw notFound();
  },
  head: ({ params }) => {
    const campaign = campaigns.find((c) => c.id === params.campaignId);
    return { meta: [{ title: `${campaign?.name ?? "Campaign"} | ELITƎ workspace` }] };
  },
  component: CampaignDetail,
  notFoundComponent: CampaignNotFound,
});

/** Shape the detail stats share, whether they are authored or derived. */
type DetailStat = {
  label: string;
  value: string;
  suffix?: string;
  delta?: string;
  dir?: "up" | "down" | "flat";
  foot?: string;
};

const authoredStats: readonly DetailStat[] = campaignDetail.stats;
const statIcons = [ImageIcon, Users, TrendingUp, Target];

function CampaignNotFound() {
  return (
    <Panel>
      <PanelBody>
        <h1 className="text-2xl font-semibold">Campaign not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          That campaign is not in this workspace — it may have been archived or the link may be
          stale.
        </p>
        <p className="mt-5">
          <ArrowLink to="/app/campaigns">Back to campaigns</ArrowLink>
        </p>
      </PanelBody>
    </Panel>
  );
}

/** Roster rows carry names that may or may not be in the browsable network. */
const inNetwork = (handle: string) => creators.some((c) => c.handle === handle);

function CampaignDetail() {
  const { campaignId } = Route.useParams();
  const campaign = campaigns.find((c) => c.id === campaignId);

  const [stage, setStage] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [openRow, setOpenRow] = useState<string | null>(null);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);

  /* Row menus are dismissible the way every other menu is: click away, or Escape. */
  useEffect(() => {
    if (!openRow) return;
    const onPointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenRow(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenRow(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openRow]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return roster.filter((row) => {
      if (stage && row.stage !== stage) return false;
      if (!q) return true;
      return `${row.name} ${row.handle} ${row.branch}`.toLowerCase().includes(q);
    });
  }, [query, stage]);

  if (!campaign) return <CampaignNotFound />;

  /*
    The detail figures — roster, pipeline, brief, manager — are authored for one
    campaign only. For every other campaign we show what the campaign record
    itself can honestly support and omit the rest, rather than presenting Rüya's
    roster and reach under someone else's name.
  */
  const authored = campaign.id === campaignDetail.id;
  const authoredName =
    campaigns.find((c) => c.id === campaignDetail.id)?.name ?? "the demo campaign";

  const stats: readonly DetailStat[] = authored
    ? authoredStats
    : [
        {
          label: "Coverage",
          value: String(campaign.covered),
          suffix: ` / ${campaign.target}`,
          delta: campaign.pctLabel,
          dir: campaign.pct > 0 ? "up" : "flat",
          foot: "of target",
        },
        { label: "Creators", value: String(campaign.creators), foot: campaign.branches },
      ];

  return (
    <>
      <PageHead
        crumbs={[
          { label: "Dashboard", to: "/app" },
          { label: "Campaigns", to: "/app/campaigns" },
          { label: campaign.name },
        ]}
        title={campaign.name}
        meta={
          <p className="mt-4 flex flex-wrap items-center gap-2.5">
            <Badge tone={campaign.statusTone}>{campaign.statusLabel}</Badge>
            <span className="text-sm text-muted-foreground">
              {campaign.where} · <time>{campaign.dates}</time>
              {authored && ` · ${campaignDetail.remaining}`}
            </span>
          </p>
        }
        actions={
          <>
            <AppButton onClick={() => demo("Exporting this campaign report")}>
              <Download className="size-4" /> Export report
            </AppButton>
            <AppButton tone="primary" onClick={() => demo("Opening the creator shortlist")}>
              <Plus className="size-4" /> Add creators
            </AppButton>
          </>
        }
      />

      {/* The one time-critical thing on this page goes first. */}
      {authored && (
        <Alert icon={<Clock />}>
          <strong className="font-semibold">{campaignDetail.alert.title}</strong>{" "}
          {campaignDetail.alert.body}{" "}
          <a href="#roster" className="underline">
            {campaignDetail.alert.link}
          </a>
          .
        </Alert>
      )}

      <section
        aria-label="Campaign performance"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat, i) => {
          const Icon = statIcons[i] ?? ImageIcon;
          return (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              delta={stat.delta}
              dir={stat.dir}
              foot={stat.foot}
              icon={<Icon />}
            />
          );
        })}
      </section>

      {authored ? (
        <>
          <Panel className="mt-6">
            <PanelHead title="Pipeline" sub="24 creators on this campaign" />
            <PanelBody>
              <Pipeline
                stages={campaignDetail.stages}
                selected={stage}
                onSelect={(name) => setStage((prev) => (prev === name ? null : name))}
              />
              <p className="mt-5 text-xs text-muted-foreground">
                {stage
                  ? `Showing the roster filtered by “${stage}”. Select it again to clear.`
                  : "Select a stage to filter the roster below."}
              </p>
            </PanelBody>
          </Panel>

          <section className="mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <Panel id="roster">
              <PanelHead
                title="Creator roster"
                sub="Search or filter by stage to narrow the list"
              />
              <PanelBody className="p-5 pb-0">
                <Toolbar>
                  <SearchField
                    id="roster-search"
                    label="Search this roster"
                    placeholder="Search this roster"
                    value={query}
                    onChange={setQuery}
                  />
                  <Count>
                    {rows.length} {rows.length === 1 ? "creator" : "creators"}
                  </Count>
                </Toolbar>
              </PanelBody>

              {rows.length > 0 ? (
                <PanelBody flush>
                  <TableWrap>
                    <caption className="sr-only">Creators on {campaign.name}, by stage</caption>
                    <thead>
                      <tr>
                        <Th>Creator</Th>
                        <Th>Stage</Th>
                        <Th>Branch</Th>
                        <Th num>Posts</Th>
                        <Th num>Reach</Th>
                        <Th>Updated</Th>
                        <Th>
                          <span className="sr-only">Actions</span>
                        </Th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => {
                        const open = openRow === row.handle;
                        /* The table scrolls, so the last rows open their menu upward. */
                        const up = rows.length > 3 && i >= rows.length - 2;
                        return (
                          <tr key={row.handle}>
                            <Td>
                              {inNetwork(row.handle) ? (
                                <Link
                                  to="/app/influencers/$influencerId"
                                  params={{ influencerId: row.handle.replace(/^@/, "") }}
                                  className="transition-colors hover:text-[color:var(--accent-text)]"
                                >
                                  <Person name={row.name} meta={row.handle} avatar={row.avatar} />
                                </Link>
                              ) : (
                                <Person name={row.name} meta={row.handle} avatar={row.avatar} />
                              )}
                            </Td>
                            <Td>
                              <Badge tone={row.tone}>{row.stage}</Badge>
                            </Td>
                            <Td>{row.branch}</Td>
                            <Td num>{row.posts}</Td>
                            <Td num>{row.reach}</Td>
                            <Td>
                              <time className="text-xs text-muted-foreground">{row.updated}</time>
                            </Td>
                            <Td>
                              <div
                                className="relative flex justify-end"
                                ref={open ? menuRef : undefined}
                              >
                                <button
                                  type="button"
                                  aria-haspopup="menu"
                                  aria-expanded={open}
                                  aria-label={`Actions for ${row.name}`}
                                  onClick={() => setOpenRow(open ? null : row.handle)}
                                  className="grid size-8 place-content-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
                                >
                                  <MoreHorizontal className="size-4" />
                                </button>
                                {open && (
                                  <div
                                    role="menu"
                                    className={`float-surface absolute end-0 z-20 w-52 rounded-xl p-1.5 ${
                                      up ? "bottom-9" : "top-9"
                                    }`}
                                  >
                                    <RowAction
                                      icon={<User className="size-4" />}
                                      label="View profile"
                                      onSelect={() => {
                                        setOpenRow(null);
                                        if (inNetwork(row.handle)) {
                                          void navigate({
                                            to: "/app/influencers/$influencerId",
                                            params: {
                                              influencerId: row.handle.replace(/^@/, ""),
                                            },
                                          });
                                        } else {
                                          demo(`${row.name} is not in the ELITƎ network yet`);
                                        }
                                      }}
                                    />
                                    <RowAction
                                      icon={<Check className="size-4" />}
                                      label="Advance stage"
                                      onSelect={() => {
                                        setOpenRow(null);
                                        demo(`Moving ${row.name} to the next stage`);
                                      }}
                                    />
                                    <RowAction
                                      icon={<ImageIcon className="size-4" />}
                                      label="See coverage"
                                      onSelect={() => {
                                        setOpenRow(null);
                                        demo(`Opening the coverage for ${row.name}`);
                                      }}
                                    />
                                    <hr className="my-1.5 border-border" />
                                    <RowAction
                                      danger
                                      icon={<X className="size-4" />}
                                      label="Remove"
                                      onSelect={() => {
                                        setOpenRow(null);
                                        demo(`Removing ${row.name} from this campaign`);
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </Td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </TableWrap>
                </PanelBody>
              ) : (
                <PanelBody>
                  <EmptyState
                    icon={<SearchX />}
                    title="No creators match that search"
                    body="Try a name, a handle or a branch."
                    action={
                      <AppButton
                        size="sm"
                        onClick={() => {
                          setQuery("");
                          setStage(null);
                        }}
                      >
                        Clear search
                      </AppButton>
                    }
                  />
                </PanelBody>
              )}
            </Panel>

            <div className="grid content-start gap-5">
              <Panel>
                <PanelHead title="Coverage by format" />
                <PanelBody>
                  <BarList rows={campaignDetail.formats} />
                </PanelBody>
              </Panel>

              <Panel>
                <PanelHead
                  title="Campaign brief"
                  actions={
                    <AppButton
                      tone="quiet"
                      size="sm"
                      onClick={() => demo("Opening the brief editor")}
                    >
                      Edit
                    </AppButton>
                  }
                />
                <PanelBody>
                  <DefList rows={campaignDetail.brief} />
                </PanelBody>
                <PanelFoot>
                  <button
                    type="button"
                    onClick={() => demo("Opening the full brief")}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-opacity hover:opacity-80"
                  >
                    Full brief
                    <ChevronRight className="size-4 rtl:-scale-x-100" />
                  </button>
                </PanelFoot>
              </Panel>

              <Panel>
                <PanelHead title="Your ELITƎ manager" />
                <PanelBody>
                  <Person
                    size="lg"
                    name={campaignDetail.manager.name}
                    meta={campaignDetail.manager.meta}
                    avatar={campaignDetail.manager.avatar}
                  />
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link to="/contact" className={appButtonClass("dark", "sm")}>
                      <Mail className="size-4" /> Message
                    </Link>
                    <a href="tel:+966000000000" className={appButtonClass("ghost", "sm")}>
                      <Phone className="size-4" /> Call
                    </a>
                  </div>
                </PanelBody>
              </Panel>
            </div>
          </section>
        </>
      ) : (
        <Panel className="mt-6">
          <PanelBody>
            <EmptyState
              icon={<Info />}
              title="Roster and brief aren’t wired up for this campaign"
              body={`Only “${authoredName}” carries a full pipeline, creator roster and brief in this demo workspace. The figures above come straight from this campaign’s own record.`}
              action={<ArrowLink to="/app/campaigns">Back to campaigns</ArrowLink>}
            />
          </PanelBody>
        </Panel>
      )}
    </>
  );
}

function RowAction({
  icon,
  label,
  onSelect,
  danger,
}: {
  icon: ReactNode;
  label: string;
  onSelect: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onSelect}
      className={
        danger
          ? "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-start text-sm text-destructive transition-colors hover:bg-destructive/10"
          : "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-start text-sm transition-colors hover:bg-muted"
      }
    >
      {icon}
      {label}
    </button>
  );
}
