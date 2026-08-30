import { Clock, MapPin, Ticket } from "lucide-react";
import {
  clubName,
  recentResults,
  upcomingFixtures,
  type Fixture,
  type MatchResult,
} from "@/lib/club-data";

function ResultCard({ result }: { result: MatchResult }) {
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
    <article className="w-[280px] shrink-0 snap-start rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-bold uppercase tracking-wide text-primary">
          {result.competition}
        </span>
        <span className="shrink-0 text-muted-foreground">{result.date}</span>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <span
          className={`truncate text-sm font-semibold ${
            home ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {result.home}
        </span>
        <span className="font-display text-3xl font-bold tracking-tight text-foreground">
          {result.homeScore}<span className="mx-1 text-muted-foreground">–</span>{result.awayScore}
        </span>
        <span
          className={`truncate text-right text-sm font-semibold ${
            home ? "text-muted-foreground" : "text-foreground"
          }`}
        >
          {result.away}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${badgeClass}`}
          aria-label={`Result: ${outcome === "W" ? "Win" : outcome === "D" ? "Draw" : "Loss"}`}
        >
          {outcome}
        </span>
        <a
          href="#"
          className="text-xs font-semibold uppercase tracking-wide text-primary hover:underline"
        >
          Match report
        </a>
      </div>
    </article>
  );
}

function FixtureCard({ fixture }: { fixture: Fixture }) {
  const home = fixture.home === clubName;

  return (
    <article className="flex w-[280px] shrink-0 snap-start flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-bold uppercase tracking-wide text-primary">
          {fixture.competition}
        </span>
        <span className="shrink-0 text-muted-foreground">{fixture.date}</span>
      </div>

      <div className="mt-4 flex-1">
        <span
          className={`block truncate text-sm font-semibold ${
            home ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {fixture.home}
        </span>
        <span className="my-0.5 block font-display text-xl font-bold uppercase text-muted-foreground/70">
          vs
        </span>
        <span
          className={`block truncate text-sm font-semibold ${
            home ? "text-muted-foreground" : "text-foreground"
          }`}
        >
          {fixture.away}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock size={13} /> {fixture.kickoff}
        </span>
        <span className="flex min-w-0 items-center gap-1.5">
          <MapPin size={13} className="shrink-0" />
          <span className="truncate">{fixture.venue}</span>
        </span>
        <a
          href="#tickets"
          aria-label={`Tickets for ${fixture.home} vs ${fixture.away}`}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Ticket size={14} />
        </a>
      </div>
    </article>
  );
}

function Rail({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-foreground">
        {heading}
        <span className="h-px flex-1 bg-border" />
      </h3>
      <div className="no-scrollbar mt-4 flex snap-x gap-4 overflow-x-auto pb-2">
        {children}
      </div>
    </div>
  );
}

export function MatchCenter() {
  return (
    <section id="match-center" className="bg-secondary/50 py-14">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Match Center
        </p>
        <h2 className="mt-1 font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
          Results & Fixtures
        </h2>

        <Rail heading="Recent Results">
          {recentResults.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </Rail>

        <Rail heading="Upcoming Fixtures">
          {upcomingFixtures.map((fixture) => (
            <FixtureCard key={fixture.id} fixture={fixture} />
          ))}
        </Rail>
      </div>
    </section>
  );
}
