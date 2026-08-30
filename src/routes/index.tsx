import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { MatchCenter } from "@/components/match-center";
import { NewsGrid } from "@/components/news-grid";
import { SponsorBanner } from "@/components/sponsor-banner";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Stamford Blues FC | Official Site: News, Fixtures & Tickets",
      },
      {
        name: "description",
        content:
          "Official home of Stamford Blues FC — latest club news, match results, upcoming fixtures, tickets and hospitality at The Bridge Stadium.",
      },
      {
        property: "og:title",
        content: "Stamford Blues FC | Official Site: News, Fixtures & Tickets",
      },
      {
        property: "og:description",
        content:
          "Latest club news, match results, upcoming fixtures, tickets and hospitality at The Bridge Stadium.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <MatchCenter />
        <NewsGrid />
      </main>
      <SponsorBanner />
      <SiteFooter />
    </div>
  );
}
