import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, ArrowUpDown, MapPin, Plus } from "lucide-react";
import { useState } from "react";

import {
  AppButton,
  Badge,
  Count,
  EmptyState,
  Meter,
  PageHead,
  Panel,
  PanelBody,
  SearchField,
  TableWrap,
  Td,
  Th,
  thClass,
  Toolbar,
} from "@/components/app/ui";
import { branches } from "@/lib/app-data";
import { demo } from "@/lib/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/branches")({
  head: () => ({ meta: [{ title: "Branches | ELITƎ workspace" }] }),
  component: Branches,
});

type SortKey = "name" | "covers";
type Sort = { key: SortKey; dir: "asc" | "desc" };

/**
 * `Th` doesn't forward `aria-sort`, so sortable headers render their own `<th>`
 * with the same classes. The icon carries the same state as `aria-sort` for
 * anyone reading the table by sight rather than by screen reader.
 */
function SortHeader({
  label,
  sort,
  sortKey,
  onToggle,
  num,
}: {
  label: string;
  sort: Sort | null;
  sortKey: SortKey;
  onToggle: () => void;
  num?: boolean;
}) {
  const active = sort?.key === sortKey ? sort : null;
  const Icon = !active ? ArrowUpDown : active.dir === "asc" ? ArrowUp : ArrowDown;

  return (
    <th
      scope="col"
      aria-sort={!active ? "none" : active.dir === "asc" ? "ascending" : "descending"}
      className={cn(thClass, num && "text-end")}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "inline-flex items-center gap-1.5 transition-colors hover:text-gold",
          active && "text-gold",
        )}
      >
        {label}
        <Icon aria-hidden className="size-3.5" />
      </button>
    </th>
  );
}

function Branches() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort | null>(null);

  const needle = query.trim().toLowerCase();
  const found = branches.filter(
    (b) => needle === "" || `${b.name} ${b.city}`.toLowerCase().includes(needle),
  );

  /** Without a sort the table keeps the group's own branch order. */
  const shown = sort
    ? [...found].sort((a, b) => {
        const cmp = sort.key === "name" ? a.name.localeCompare(b.name) : a.covers - b.covers;
        return sort.dir === "asc" ? cmp : -cmp;
      })
    : found;

  function toggleSort(key: SortKey) {
    setSort((prev) =>
      prev?.key === key && prev.dir === "asc" ? { key, dir: "desc" } : { key, dir: "asc" },
    );
  }

  return (
    <>
      <PageHead
        crumbs={[{ label: "Dashboard", to: "/app" }, { label: "Branches" }]}
        title="Branches"
        lede="Every venue in your group, with coverage and creator check-ins tracked per location."
        actions={
          <AppButton tone="primary" onClick={() => demo("Opening the add-branch form")}>
            <Plus className="size-4" /> Add branch
          </AppButton>
        }
      />

      <Toolbar>
        <SearchField
          id="branch-search"
          label="Search branches"
          placeholder="Search branches or cities"
          value={query}
          onChange={setQuery}
        />
        <Count>
          {shown.length} {shown.length === 1 ? "branch" : "branches"}
        </Count>
      </Toolbar>

      <h2 className="sr-only">Branch results</h2>

      {shown.length === 0 ? (
        <EmptyState
          icon={<MapPin />}
          title="No branches match that search"
          body="Try a branch name or a city."
          action={
            <AppButton size="sm" onClick={() => setQuery("")}>
              Clear search
            </AppButton>
          }
        />
      ) : (
        <Panel>
          <PanelBody flush>
            <TableWrap>
              <caption className="sr-only">Branches with coverage and reach</caption>
              <thead>
                <tr>
                  <SortHeader
                    label="Branch"
                    sortKey="name"
                    sort={sort}
                    onToggle={() => toggleSort("name")}
                  />
                  <Th>City</Th>
                  <SortHeader
                    label="Covers"
                    sortKey="covers"
                    sort={sort}
                    onToggle={() => toggleSort("covers")}
                    num
                  />
                  <Th num>Reach</Th>
                  <Th>Share of coverage</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {shown.map((b) => (
                  <tr key={b.name}>
                    <Td className="font-semibold">{b.name}</Td>
                    <Td className="text-muted-foreground">{b.city}</Td>
                    <Td num>{b.covers}</Td>
                    <Td num>{b.reach}</Td>
                    <Td className="min-w-[10rem]">
                      <Meter value={b.share} tone={b.tone === "warn" ? "warn" : "gold"} />
                    </Td>
                    <Td>
                      <Badge tone={b.tone}>{b.status}</Badge>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          </PanelBody>
        </Panel>
      )}
    </>
  );
}
