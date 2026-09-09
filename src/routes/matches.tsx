import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, Shield, Ticket } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SponsorBanner } from "@/components/sponsor-banner";
import {
  clubName,
  leagueStandings,
  recentResults,
  upcomingFixtures,
  type Fixture,
  type MatchResult,
} from "@/lib/club-data";

type Tab = "fixtures" | "results" | "standings";

const tabs: { id: Tab; label: string }[] = [
  { id: "fixtures", label: "Fixtures" },
  { id: "results", label: "Results" },
  { id: "standings", label: "Standings" },
];

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "Fixtures, Results & Standings | Stamford Blues FC" },
      {
        name: "description",
        content:
          "Stamford Blues FC fixtures, latest results and league standings — kick-off times, venues and match centre for every Blues team.",
      },
      {
        property: "og:title",
        content: "Fixtures, Results & Standings | Stamford Blues FC",
      },
      {
        property: "og:description",
        content:
          "Kick-off times, venues, results and league standings for Stamford Blues FC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/matches" }],
  }),
  component: MatchesPage,
});

function MiniCrest({ highlighted = false }: { highlighted?: boolean }) {
  return (
    <div
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
        highlighted
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground"
      }`}
      aria-hidden="true"
    >
      <Shield className="h-1/2 w-1/2" fill="currentColor" strokeWidth={1} />
    </div>
  );
}

function FixtureRow({ fixture }: { fixture: Fixture }) {
  const home = fixture.home === clubName;
  return (
    <article className="rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-bold uppercase tracking-wide text-primary">
          {fixture.competition}
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
          <CalendarDays size={13} /> {fixture.date}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        <div className="flex min-w-0 items-center justify-end gap-3">
          <span
            className={`truncate text-sm font-semibold sm:text-base ${
              home ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {fixture.home}
          </span>
          <MiniCrest highlighted={home} />
        </div>
        <div className="rounded-md bg-secondary px-3 py-1.5 text-center">
          <span className="block font-display text-lg font-bold leading-none text-foreground">
            {fixture.kickoff}
          </span>
          <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Kick-off
          </span>
        </div>
        <div className="flex min-w-0 items-center gap-3">
          <MiniCrest highlighted={!home} />
          <span
            className={`truncate text-sm font-semibold sm:text-base ${
              home ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            {fixture.away}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="flex min-w-0 items-center gap-1.5">
          <MapPin size={13} className="shrink-0" />
          <span className="truncate">{fixture.venue}</span>
        </span>
        <a
          href="/#tickets"
          className="flex shrink-0 items-center gap-1.5 font-semibold uppercase tracking-wide text-primary hover:underline"
        >
          <Ticket size={13} /> Tickets
        </a>
      </div>
    </article>
  );
}

function ResultRow({ result }: { result: MatchResult }) {
  const home = result.home === clubName;
  const forGoals = home ? result.homeScore : result.awayScore;
  const against = home ? result.awayScore : result.homeScore;
  const outcome = forGoals > against ? "W" : forGoals === against ? "D" : "L";
  const badgeClass =
    outcome === "W"
      ? "bg-win/15 text-win"
      : outcome === "D"
        ? "bg-muted text-muted-foreground"
        : "bg-loss/15 text-loss";

  return (
    <article className="rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-bold uppercase tracking-wide text-primary">
          {result.competition}
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
          <CalendarDays size={13} /> {result.date}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        <div className="flex min-w-0 items-center justify-end gap-3">
          <span
            className={`truncate text-sm font-semibold sm:text-base ${
              home ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {result.home}
          </span>
          <MiniCrest highlighted={home} />
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-navy-deep px-3 py-1.5 font-display text-lg font-bold leading-none text-navy-foreground">
            {result.homeScore} – {result.awayScore}
          </span>
          <span
            className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${badgeClass}`}
            aria-label={`Result: ${outcome === "W" ? "Win" : outcome === "D" ? "Draw" : "Loss"}`}
          >
            {outcome}
          </span>
        </div>
        <div className="flex min-w-0 items-center gap-3">
          <MiniCrest highlighted={!home} />
          <span
            className={`truncate text-sm font-semibold sm:text-base ${
              home ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            {result.away}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock size={13} /> Full time
        </span>
        <a
          href="#"
          className="shrink-0 font-semibold uppercase tracking-wide text-primary hover:underline"
        >
          Match report
        </a>
      </div>
    </article>
  );
}

function StandingsTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-bold">Pos</th>
            <th className="px-4 py-3 font-bold">Club</th>
            <th className="px-2 py-3 text-center font-bold">MP</th>
            <th className="px-2 py-3 text-center font-bold">W</th>
            <th className="px-2 py-3 text-center font-bold">D</th>
            <th className="px-2 py-3 text-center font-bold">L</th>
            <th className="px-2 py-3 text-center font-bold">GF</th>
            <th className="px-2 py-3 text-center font-bold">GA</th>
            <th className="px-2 py-3 text-center font-bold">GD</th>
            <th className="px-4 py-3 text-center font-bold">Pts</th>
          </tr>
        </thead>
        <tbody>
          {leagueStandings.map((row) => {
            const isClub = row.team === clubName;
            return (
              <tr
                key={row.pos}
                className={`border-b border-border/60 last:border-0 ${
                  isClub ? "bg-primary/5 font-semibold" : ""
                }`}
              >
                <td className="px-4 py-3 text-muted-foreground">{row.pos}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2">
                    <Shield
                      size={14}
                      className={isClub ? "text-primary" : "text-muted-foreground"}
                      fill="currentColor"
                      strokeWidth={1}
                    />
                    <span className={isClub ? "text-foreground" : "text-muted-foreground"}>
                      {row.team}
                    </span>
                  </span>
                </td>
                <td className="px-2 py-3 text-center">{row.played}</td>
                <td className="px-2 py-3 text-center">{row.won}</td>
                <td className="px-2 py-3 text-center">{row.drawn}</td>
                <td className="px-2 py-3 text-center">{row.lost}</td>
                <td className="px-2 py-3 text-center">{row.gf}</td>
                <td className="px-2 py-3 text-center">{row.ga}</td>
                <td className="px-2 py-3 text-center">
                  {row.gd > 0 ? `+${row.gd}` : row.gd}
                </td>
                <td className="px-4 py-3 text-center font-bold text-foreground">
                  {row.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function MatchesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("fixtures");

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Page header */}
        <section className="bg-navy-deep py-12 text-navy-foreground">
          <div className="mx-auto max-w-5xl px-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Stamford Blues FC
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
              Fixtures &amp; Results
            </h1>

            {/* Filter tabs */}
            <div
              className="mt-6 flex gap-1 rounded-lg bg-navy-foreground/10 p-1"
              role="tablist"
              aria-label="Match views"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 rounded-md px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                    activeTab === tab.id
                      ? "bg-gold text-navy-deep"
                      : "text-navy-foreground/70 hover:text-navy-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab content */}
        <section className="mx-auto max-w-5xl px-4 py-10">
          {activeTab === "fixtures" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {upcomingFixtures.map((fixture) => (
                <FixtureRow key={fixture.id} fixture={fixture} />
              ))}
            </div>
          )}

          {activeTab === "results" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {recentResults.map((result) => (
                <ResultRow key={result.id} result={result} />
              ))}
            </div>
          )}

          {activeTab === "standings" && <StandingsTable />}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Looking for tickets?{" "}
            <Link
              to="/"
              hash="tickets"
              className="font-semibold text-primary hover:underline"
            >
              Visit Tickets &amp; Hospitality
            </Link>
          </p>
        </section>
      </main>
      <SponsorBanner />
      <SiteFooter />
    </div>
  );
}
