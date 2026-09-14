import { createServerFn } from "@tanstack/react-start";
import {
  clubName,
  leagueStandings,
  recentResults,
  upcomingFixtures,
  type Fixture,
  type MatchResult,
  type StandingRow,
} from "@/lib/club-data";

export type LeagueData = {
  standings: StandingRow[];
  fixtures: Fixture[];
  results: MatchResult[];
  /** true when the payload came from the live football API */
  live: boolean;
  /** short note shown to visitors when we fall back to stored data */
  notice?: string;
};

const API_BASE = "https://v3.football.api-sports.io";
// Rwanda Premier League (API-Football league id)
const LEAGUE_ID = 415;

type ApiTeam = { name: string };

function seasonForNow(now = new Date()): number {
  // African league seasons start mid-year.
  return now.getUTCMonth() >= 6 ? now.getUTCFullYear() : now.getUTCFullYear() - 1;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Kigali",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Kigali",
  });
}

function fallback(notice: string): LeagueData {
  return {
    standings: leagueStandings,
    fixtures: upcomingFixtures,
    results: recentResults,
    live: false,
    notice,
  };
}

async function apiGet(path: string, apiKey: string): Promise<any> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "x-apisports-key": apiKey },
  });
  if (!res.ok) throw new Error(`Football API responded ${res.status}`);
  const json = (await res.json()) as { response?: unknown; errors?: unknown };
  const errors = json.errors;
  if (errors && !Array.isArray(errors) && Object.keys(errors as object).length > 0) {
    throw new Error(Object.values(errors as Record<string, string>).join(", "));
  }
  return json.response ?? [];
}

export const getLeagueData = createServerFn({ method: "GET" }).handler(
  async (): Promise<LeagueData> => {
    const apiKey = process.env["API_FOOTBALL_KEY"];
    if (!apiKey) {
      return fallback("Showing stored data — live league feed not connected yet.");
    }

    const season = seasonForNow();

    try {
      const [standingsRes, nextRes, lastRes] = await Promise.all([
        apiGet(`/standings?league=${LEAGUE_ID}&season=${season}`, apiKey),
        apiGet(`/fixtures?league=${LEAGUE_ID}&season=${season}&next=10`, apiKey),
        apiGet(`/fixtures?league=${LEAGUE_ID}&season=${season}&last=10`, apiKey),
      ]);

      const table: any[] = standingsRes?.[0]?.league?.standings?.[0] ?? [];
      const standings: StandingRow[] = table.map((row: any) => ({
        pos: row.rank,
        team: row.team?.name ?? "",
        played: row.all?.played ?? 0,
        won: row.all?.win ?? 0,
        drawn: row.all?.draw ?? 0,
        lost: row.all?.lose ?? 0,
        gf: row.all?.goals?.for ?? 0,
        ga: row.all?.goals?.against ?? 0,
        gd: row.goalsDiff ?? 0,
        points: row.points ?? 0,
      }));

      const mapTeams = (teams: { home: ApiTeam; away: ApiTeam }) => ({
        home: teams.home?.name ?? "",
        away: teams.away?.name ?? "",
      });

      const fixtures: Fixture[] = (nextRes as any[]).map((item, index) => ({
        id: String(item.fixture?.id ?? `f${index}`),
        competition: item.league?.name ?? "Rwanda Premier League",
        date: formatDate(item.fixture?.date),
        kickoff: formatTime(item.fixture?.date),
        ...mapTeams(item.teams),
        venue: item.fixture?.venue?.name ?? "TBC",
      }));

      const results: MatchResult[] = (lastRes as any[]).map((item, index) => ({
        id: String(item.fixture?.id ?? `r${index}`),
        competition: item.league?.name ?? "Rwanda Premier League",
        date: formatDate(item.fixture?.date),
        ...mapTeams(item.teams),
        homeScore: item.goals?.home ?? 0,
        awayScore: item.goals?.away ?? 0,
      }));

      if (standings.length === 0 && fixtures.length === 0 && results.length === 0) {
        return fallback("Live feed returned no matches yet — showing stored data.");
      }

      return {
        standings: standings.length ? standings : leagueStandings,
        fixtures: fixtures.length ? fixtures : upcomingFixtures,
        results: results.length ? results : recentResults,
        live: true,
      };
    } catch {
      return fallback("Live league feed is unavailable right now — showing stored data.");
    }
  },
);

export function findClubRow(standings: StandingRow[]): StandingRow | undefined {
  return standings.find((row) => row.team.toLowerCase().includes("rayon")) ??
    standings.find((row) => row.team === clubName);
}
