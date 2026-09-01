import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SquadSection } from "@/components/squad";
import { squads } from "@/lib/squad-data";

export const Route = createFileRoute("/teams/juniors")({
  head: () => ({
    meta: [
      { title: "Junior Teams: U20 & U17 Squads | Rayon Sports FC" },
      {
        name: "description",
        content:
          "Rayon Sports FC junior teams — U20 and U17 squad lists, player profiles, positions and youth-league stats from the academy pathway.",
      },
      {
        property: "og:title",
        content: "Junior Teams: U20 & U17 Squads | Rayon Sports FC",
      },
      {
        property: "og:description",
        content:
          "U20 and U17 squad lists, player profiles and youth-league stats from the Rayon Sports academy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell>
      <SquadSection squad={squads.juniors} />
    </PageShell>
  ),
});
