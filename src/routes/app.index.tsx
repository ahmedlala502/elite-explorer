import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Check,
  Clock,
  Download,
  Image as ImageIcon,
  Info,
  MapPin,
  Megaphone,
  Plus,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

import {
  Alert,
  AppButton,
  ArrowLink,
  Badge,
  ColumnChart,
  Delta,
  Donut,
  Feed,
  Meter,
  PageHead,
  Panel,
  PanelBody,
  PanelFoot,
  PanelHead,
  Pipeline,
  RichText,
  StatCard,
  Td,
  TableWrap,
  Th,
  appButtonClass,
} from "@/components/app/ui";
import {
  activity,
  attention,
  campaigns,
  coverageByFormat,
  coverageTrend,
  dashboardStats,
  liveCampaignIds,
  pipelineStages,
  workspace,
} from "@/lib/app-data";
import { demo } from "@/lib/demo";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard | ELITƎ workspace" }] }),
  component: AppDashboard,
});

const statIcons = [Megaphone, Users, ImageIcon, TrendingUp];
const attentionIcons = {
  warn: Clock,
  danger: AlertTriangle,
  ok: Check,
  neutral: ImageIcon,
} as const;
const activityIcons = {
  check: Check,
  pin: MapPin,
  user: User,
  image: ImageIcon,
  megaphone: Megaphone,
};

function AppDashboard() {
  const [stage, setStage] = useState<string | null>(null);
  const live = liveCampaignIds
    .map((id) => campaigns.find((c) => c.id === id))
    .filter((c) => c !== undefined);
  const totalCoverage = coverageByFormat.reduce((sum, row) => sum + row.value, 0);

  return (
    <>
      <PageHead
        eyebrow="Thursday, 24 August"
        title={`Good morning, ${workspace.user.name.split(" ")[0]}`}
        lede="Three campaigns are live and four creators are waiting on you."
        actions={
          <>
            <AppButton onClick={() => demo("Exporting this month as a PDF report")}>
              <Download className="size-4" /> Export
            </AppButton>
            <Link to="/app/campaigns" className={appButtonClass("primary")}>
              <Plus className="size-4" /> New campaign
            </Link>
          </>
        }
      />

      <section
        aria-label="This month at a glance"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {dashboardStats.map((stat, i) => {
          const Icon = statIcons[i] ?? Megaphone;
          return (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              delta={stat.delta}
              dir={stat.dir}
              foot={stat.foot}
              icon={<Icon />}
            />
          );
        })}
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Panel>
          <PanelHead
            title="Creator pipeline"
            sub="Every creator across all live campaigns, by stage"
            actions={<ArrowLink to="/app/campaigns">All campaigns</ArrowLink>}
          />
          <PanelBody>
            <Pipeline
              stages={pipelineStages}
              selected={stage}
              onSelect={(name) => setStage((prev) => (prev === name ? null : name))}
            />
            <p className="mt-5 text-xs text-muted-foreground">
              {stage
                ? `Filtering the creator list by “${stage}”. 354 creators tracked this month.`
                : "Select a stage to filter the creator list. 354 creators tracked this month."}
            </p>
          </PanelBody>
        </Panel>

        <Panel id="attention">
          <PanelHead title="Needs your attention" sub={`${attention.length} items`} />
          <PanelBody>
            <div className="grid gap-2">
              {attention.map((item) => {
                const Icon = attentionIcons[item.tone as keyof typeof attentionIcons] ?? ImageIcon;
                const body = (
                  <>
                    <span className="grid size-9 shrink-0 place-content-center rounded-full border border-border">
                      <Icon className="size-4 text-gold" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{item.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {item.meta}
                      </span>
                    </span>
                  </>
                );
                const className =
                  "flex items-center gap-3 rounded-xl border border-transparent p-2.5 transition-colors hover:border-border hover:bg-muted/50";

                return item.campaignId ? (
                  <Link
                    key={item.title}
                    to="/app/campaigns/$campaignId"
                    params={{ campaignId: item.campaignId }}
                    className={className}
                  >
                    {body}
                  </Link>
                ) : (
                  <Link key={item.title} to={item.to} className={className}>
                    {body}
                  </Link>
                );
              })}
            </div>
          </PanelBody>
        </Panel>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Panel>
          <PanelHead
            title="Live campaigns"
            sub="Coverage against target"
            actions={<ArrowLink to="/app/campaigns">View all</ArrowLink>}
          />
          <PanelBody flush>
            <TableWrap>
              <thead>
                <tr>
                  <Th>Campaign</Th>
                  <Th>Status</Th>
                  <Th num>Creators</Th>
                  <Th>Coverage</Th>
                  <Th>Ends</Th>
                </tr>
              </thead>
              <tbody>
                {live.map((c) => (
                  <tr key={c.id}>
                    <Td>
                      <Link
                        to="/app/campaigns/$campaignId"
                        params={{ campaignId: c.id }}
                        className="font-semibold transition-colors hover:text-gold"
                      >
                        {c.name}
                      </Link>
                      <span className="block text-xs text-muted-foreground">{c.branches}</span>
                    </Td>
                    <Td>
                      <Badge tone={c.statusTone}>{c.statusLabel}</Badge>
                    </Td>
                    <Td num>{c.creators}</Td>
                    <Td className="min-w-[10rem]">
                      <span className="flex items-center gap-3">
                        <Meter value={c.pct} />
                        <span className="text-xs font-semibold tabular-nums">{c.pctLabel}</span>
                      </span>
                    </Td>
                    <Td>
                      <time className="text-xs text-muted-foreground">{c.ends}</time>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHead title="Coverage by format" sub={`${totalCoverage} posts this month`} />
          <PanelBody>
            <Donut
              pct={coverageByFormat[0].pct}
              label={`${coverageByFormat[0].pct}%`}
              caption={coverageByFormat[0].name}
              legend={coverageByFormat}
            />
          </PanelBody>
        </Panel>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Panel>
          <PanelHead
            title="Coverage published"
            sub="Last 8 weeks, all campaigns"
            actions={<Delta value="34%" dir="up" />}
          />
          <PanelBody>
            <ColumnChart data={coverageTrend} />
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHead title="Recent activity" />
          <PanelBody>
            <Feed
              items={activity.map((item) => {
                const Icon = activityIcons[item.icon as keyof typeof activityIcons];
                return {
                  icon: <Icon />,
                  text: <RichText value={item.text} />,
                  time: item.time,
                };
              })}
            />
          </PanelBody>
          <PanelFoot>
            <ArrowLink to="/app/reports">Full activity log</ArrowLink>
          </PanelFoot>
        </Panel>
      </section>
    </>
  );
}
