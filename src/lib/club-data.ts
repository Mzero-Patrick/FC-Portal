export const clubName = "Stamford Blues FC";
export const stadiumName = "The Bridge Stadium";

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
    competition: "Premier League",
    date: "Sat 22 Aug 2026",
    home: clubName,
    away: "Riverside Rovers",
    homeScore: 3,
    awayScore: 1,
  },
  {
    id: "r2",
    competition: "Premier League",
    date: "Sat 15 Aug 2026",
    home: "Northgate United",
    away: clubName,
    homeScore: 1,
    awayScore: 1,
  },
  {
    id: "r3",
    competition: "Continental Cup",
    date: "Tue 11 Aug 2026",
    home: clubName,
    away: "FC Continentale",
    homeScore: 2,
    awayScore: 0,
  },
  {
    id: "r4",
    competition: "Premier League",
    date: "Sat 8 Aug 2026",
    home: "Harbour City",
    away: clubName,
    homeScore: 2,
    awayScore: 0,
  },
  {
    id: "r5",
    competition: "Friendly",
    date: "Sat 1 Aug 2026",
    home: clubName,
    away: "Kingsmead Athletic",
    homeScore: 4,
    awayScore: 2,
  },
];

export const upcomingFixtures: Fixture[] = [
  {
    id: "f1",
    competition: "Continental Cup",
    date: "Wed 2 Sep 2026",
    kickoff: "20:00",
    home: clubName,
    away: "Sporting Vallee",
    venue: stadiumName,
  },
  {
    id: "f2",
    competition: "Premier League",
    date: "Sun 6 Sep 2026",
    kickoff: "16:30",
    home: "Eastfield Wanderers",
    away: clubName,
    venue: "Eastfield Park",
  },
  {
    id: "f3",
    competition: "Premier League",
    date: "Sat 12 Sep 2026",
    kickoff: "15:00",
    home: clubName,
    away: "Old Ferry Rovers",
    venue: stadiumName,
  },
  {
    id: "f4",
    competition: "National Cup",
    date: "Wed 16 Sep 2026",
    kickoff: "19:45",
    home: "Brackwell Town",
    away: clubName,
    venue: "The Meadow",
  },
  {
    id: "f5",
    competition: "Premier League",
    date: "Sun 20 Sep 2026",
    kickoff: "14:00",
    home: clubName,
    away: "Westmount FC",
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
