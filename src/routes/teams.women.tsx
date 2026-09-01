import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { SquadSection } from "@/components/squad";
import { squads } from "@/lib/squad-data";

export const Route = createFileRoute("/teams/women")({
  head: () => ({
    meta: [
      { title: "Women's Team Squad & Player Profiles | Rayon Sports FC" },
      {
        name: "description",
        content:
          "Meet the Rayon Sports FC women's squad — player profiles, jersey numbers, positions, appearances, goals and assists.",
      },
      {
        property: "og:title",
        content: "Women's Team Squad & Player Profiles | Rayon Sports FC",
      },
      {
        property: "og:description",
        content:
          "Player profiles, positions and season stats for the Rayon Sports women's team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell>
      <SquadSection squad={squads.women} />
    </PageShell>
  ),
});
