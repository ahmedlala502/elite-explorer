import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Download,
  FileText,
  Image as ImageIcon,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  AppButton,
  BarList,
  ColumnChart,
  Count,
  Delta,
  PageHead,
  Panel,
  PanelBody,
  PanelHead,
  Person,
  Segmented,
  StatCard,
  TableWrap,
  Td,
  Th,
  Toolbar,
} from "@/components/app/ui";
import {
  branches,
  creators,
  reportRanges,
  reportStats,
  reportTrend,
  topCreators,
} from "@/lib/app-data";

/** Leaderboard names link to a profile only when that creator is browsable. */
const inNetwork = (handle: string) => creators.some((c) => c.handle === handle);
import { demo } from "@/lib/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [{ title: "Reports | ELITƎ workspace" }] }),
  component: Reports,
});

const statIcons = [ImageIcon, TrendingUp, Users, Target];

/** The two `data-sortable` columns the prototype marked up. */
type SortColumn = "creator" | "covers";
type SortDir = "asc" | "desc";

/**
 * `Th` has no prop for `aria-sort`, and the attribute belongs on the header
 * cell rather than the button inside it — so the sortable headers render their
 * own `th` with the same class recipe.
 */
function SortTh({
  children,
  column,
  num,
  sort,
  onSort,
}: {
  children: string;
  column: SortColumn;
  num?: boolean;
  sort: { column: SortColumn; dir: SortDir };
  onSort: (column: SortColumn) => void;
}) {
  const active = sort.column === column;
  const Icon = active ? (sort.dir === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
  return (
    <th
      scope="col"
      aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
      className={cn(
        "border-b border-border px-5 py-3 text-start text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground",
        num && "text-end",
      )}
    >
      <button
        type="button"
        onClick={() => onSort(column)}
        className={cn(
          "inline-flex items-center gap-1.5 uppercase tracking-[0.12em] transition-colors hover:text-gold",
          active && "text-gold",
        )}
      >
        {children}
        <Icon className="size-3.5" />
      </button>
    </th>
  );
}

function Reports() {
  // The prototype only ever carried one period of figures, so switching the
  // range acknowledges the intent and leaves the numbers below unchanged.
  const [range, setRange] = useState<string>("6 months");
  const [sort, setSort] = useState<{ column: SortColumn; dir: SortDir }>({
    column: "covers",
    dir: "desc",
  });

  const rows = useMemo(() => {
    // `slice()` widens the const-asserted tuple to a plain array we can order.
    const sorted = topCreators
      .slice()
      .sort((a, b) =>
        sort.column === "creator"
          ? a.name.localeCompare(b.name)
          : Number(a.covers) - Number(b.covers),
      );
    if (sort.dir === "desc") sorted.reverse();
    return sorted;
  }, [sort]);

  const toggleSort = (column: SortColumn) =>
    setSort((prev) =>
      prev.column === column
        ? { column, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { column, dir: column === "creator" ? "asc" : "desc" },
    );

  return (
    <>
      <PageHead
        crumbs={[{ label: "Dashboard", to: "/app" }, { label: "Reports" }]}
        title="Reports"
        lede="Coverage, reach and cost across every campaign — ready to share with your stakeholders."
        actions={
          <>
            <AppButton onClick={() => demo("Exporting as PDF")}>
              <FileText className="size-4" /> PDF
            </AppButton>
            <AppButton tone="primary" onClick={() => demo("Exporting as CSV")}>
              <Download className="size-4" /> Export CSV
            </AppButton>
          </>
        }
      />

      <Toolbar>
        <Segmented
          label="Date range"
          options={reportRanges}
          value={range}
          onChange={(next) => {
            if (next === range) return;
            setRange(next);
            demo(`Showing the last ${next}`);
          }}
        />
        <Count>
          <time>01 Mar – 24 Aug 2026</time> · all campaigns
        </Count>
      </Toolbar>

      <section aria-label="Period summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reportStats.map((stat, i) => {
          const Icon = statIcons[i] ?? ImageIcon;
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

      <Panel className="mt-6">
        <PanelHead
          title="Coverage published"
          sub="Monthly, all campaigns"
          actions={<Delta value="69% since March" dir="up" />}
        />
        <PanelBody>
          <ColumnChart data={reportTrend} height={230} />
        </PanelBody>
      </Panel>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Panel>
          <PanelHead title="Top creators" sub="By coverage delivered in the period" />
          <PanelBody flush>
            <TableWrap>
              <caption className="sr-only">Top creators by coverage delivered</caption>
              <thead>
                <tr>
                  <Th num className="w-px">
                    #
                  </Th>
                  <SortTh column="creator" sort={sort} onSort={toggleSort}>
                    Creator
                  </SortTh>
                  <SortTh column="covers" num sort={sort} onSort={toggleSort}>
                    Covers
                  </SortTh>
                  <Th num>Reach</Th>
                  <Th num>Eng.</Th>
                  <Th num>Cost / cover</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((creator, i) => (
                  <tr key={creator.handle}>
                    <Td num className="w-px text-muted-foreground">
                      {i + 1}
                    </Td>
                    <Td>
                      {inNetwork(creator.handle) ? (
                        <Link
                          to="/app/influencers/$influencerId"
                          params={{ influencerId: creator.handle.replace(/^@/, "") }}
                          className="transition-colors hover:text-[color:var(--accent-text)]"
                        >
                          <Person
                            name={creator.name}
                            meta={creator.handle}
                            avatar={creator.avatar}
                          />
                        </Link>
                      ) : (
                        <Person name={creator.name} meta={creator.handle} avatar={creator.avatar} />
                      )}
                    </Td>
                    <Td num>{creator.covers}</Td>
                    <Td num>{creator.reach}</Td>
                    <Td num>{creator.eng}</Td>
                    <Td num>{creator.cost}</Td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHead title="Coverage by branch" />
          <PanelBody>
            <BarList
              rows={branches.map((branch) => ({
                name: branch.name,
                value: branch.covers,
                pct: branch.share,
              }))}
            />
            <p className="mt-8 text-sm text-muted-foreground">
              Al Khobar is running well behind the other branches — it has had 6 creators against an
              average of 14.
            </p>
          </PanelBody>
        </Panel>
      </section>
    </>
  );
}
