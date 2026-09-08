export const clubName = "Rayon Sports FC";
export const stadiumName = "Amahoro Stadium";

export type MatchResult = {
  id: string;
  competition: string;
  date: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
};

export type Fixture = {
  id: string;
  competition: string;
  date: string;
  kickoff: string;
  home: string;
  away: string;
  venue: string;
};

export const recentResults: MatchResult[] = [
  {
    id: "r1",
    competition: "Rwanda Premier League",
    date: "Sat 22 Aug 2026",
    home: clubName,
    away: "Gasogi United",
    homeScore: 2,
    awayScore: 0,
  },
  {
    id: "r2",
    competition: "Rwanda Premier League",
    date: "Sat 15 Aug 2026",
    home: "AS Kigali",
    away: clubName,
    homeScore: 1,
    awayScore: 1,
  },
  {
    id: "r3",
    competition: "Peace Cup",
    date: "Tue 11 Aug 2026",
    home: clubName,
    away: "Musanze FC",
    homeScore: 3,
    awayScore: 1,
  },
  {
    id: "r4",
    competition: "Rwanda Premier League",
    date: "Sat 8 Aug 2026",
    home: "APR FC",
    away: clubName,
    homeScore: 1,
    awayScore: 0,
  },
  {
    id: "r5",
    competition: "CECAFA Kagame Cup",
    date: "Sat 1 Aug 2026",
    home: clubName,
    away: "SC Kiyovu",
    homeScore: 2,
    awayScore: 1,
  },
];

export const upcomingFixtures: Fixture[] = [
  {
    id: "f1",
    competition: "Rwanda Premier League",
    date: "Wed 2 Sep 2026",
    kickoff: "20:00",
    home: clubName,
    away: "Sunrise FC",
    venue: stadiumName,
  },
  {
    id: "f2",
    competition: "CAF Confederation Cup",
    date: "Sun 6 Sep 2026",
    kickoff: "16:30",
    home: "Panthère du Ndé",
    away: clubName,
    venue: "Stade de Bafoussam",
  },
  {
    id: "f3",
    competition: "Rwanda Premier League",
    date: "Sat 12 Sep 2026",
    kickoff: "15:00",
    home: clubName,
    away: "Gorilla FC",
    venue: stadiumName,
  },
  {
    id: "f4",
    competition: "Peace Cup",
    date: "Wed 16 Sep 2026",
    kickoff: "19:45",
    home: "Police FC",
    away: clubName,
    venue: "Kigali Pelé Stadium",
  },
  {
    id: "f5",
    competition: "Rwanda Premier League",
    date: "Sun 20 Sep 2026",
    kickoff: "14:00",
    home: clubName,
    away: "Mukura Victory Sports",
    venue: stadiumName,
  },
];

export type NewsItem = {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
};

export const newsItems: NewsItem[] = [
  {
    id: "n1",
    category: "First Team",
    date: "23 Aug 2026",
    title: "Late winner seals dramatic comeback under the lights",
    excerpt:
      "A stoppage-time strike capped a second-half turnaround as the Blues roared back in front of a sold-out home crowd.",
  },
  {
    id: "n2",
    category: "Academy",
    date: "21 Aug 2026",
    title: "Academy intake announced as scholarship class is confirmed",
    excerpt:
      "Ten young talents sign professional terms with the club as the next generation of Blues begins pre-season training.",
  },
  {
    id: "n3",
    category: "Club",
    date: "18 Aug 2026",
    title: "Blues lift pre-season cup after unbeaten summer campaign",
    excerpt:
      "An unbeaten run across four fixtures secured silverware and momentum ahead of the new league season.",
  },
];

export type StandingRow = {
  pos: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
};

export const leagueStandings: StandingRow[] = [
  { pos: 1, team: "APR FC", played: 5, won: 4, drawn: 1, lost: 0, gf: 11, ga: 3, gd: 8, points: 13 },
  { pos: 2, team: clubName, played: 5, won: 3, drawn: 2, lost: 0, gf: 9, ga: 3, gd: 6, points: 11 },
  { pos: 3, team: "Mukura Victory Sports", played: 5, won: 3, drawn: 1, lost: 1, gf: 8, ga: 5, gd: 3, points: 10 },
  { pos: 4, team: "SC Kiyovu", played: 5, won: 2, drawn: 2, lost: 1, gf: 6, ga: 5, gd: 1, points: 8 },
  { pos: 5, team: "Police FC", played: 5, won: 2, drawn: 1, lost: 2, gf: 5, ga: 5, gd: 0, points: 7 },
  { pos: 6, team: "Musanze FC", played: 5, won: 1, drawn: 2, lost: 2, gf: 4, ga: 6, gd: -2, points: 5 },
  { pos: 7, team: "AS Kigali", played: 5, won: 1, drawn: 1, lost: 3, gf: 4, ga: 8, gd: -4, points: 4 },
  { pos: 8, team: "Gasogi United", played: 5, won: 0, drawn: 2, lost: 3, gf: 2, ga: 9, gd: -7, points: 2 },
];
