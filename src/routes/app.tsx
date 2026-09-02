import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/app/AppShell";

/** Demo workspace shell: sidebar, app bar, mobile tab bar. No account needed. */
export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Workspace | ELITƎ" },
      {
        name: "description",
        content:
          "Explore the ELITƎ workspace with sample data: live campaigns, creator pipeline, coverage and what needs your attention.",
      },
    ],
  }),
  component: AppShell,
});
