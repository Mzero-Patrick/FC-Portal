import { stadiumName, upcomingFixtures } from "@/lib/club-data";

export type Sector = {
  id: string;
  name: string;
  tier: "Lower Bowl" | "Upper Bowl" | "VIP" | "CIP" | "Executive";
  priceRwf: number;
  rows: number;
  seatsPerRow: number;
  /** token name used for the legend / map colour */
  tone: "lower" | "upper" | "vip" | "cip" | "exec";
  /** grid placement on the stadium map */
  area: string;
};

export const sectors: Sector[] = [
  {
    id: "lb-north",
    name: "Lower Bowl North",
    tier: "Lower Bowl",
    priceRwf: 3000,
    rows: 6,
    seatsPerRow: 12,
    tone: "lower",
    area: "north",
  },
  {
    id: "lb-south",
    name: "Lower Bowl South",
    tier: "Lower Bowl",
    priceRwf: 3000,
    rows: 6,
    seatsPerRow: 12,
    tone: "lower",
    area: "south",
  },
  {
    id: "ub-east",
    name: "Upper Bowl East",
    tier: "Upper Bowl",
    priceRwf: 2000,
    rows: 8,
    seatsPerRow: 14,
    tone: "upper",
    area: "east-outer",
  },
  {
    id: "ub-west",
    name: "Upper Bowl West",
    tier: "Upper Bowl",
    priceRwf: 2000,
    rows: 8,
    seatsPerRow: 14,
    tone: "upper",
    area: "west-outer",
  },
  {
    id: "vip-west",
    name: "VIP West Stand",
    tier: "VIP",
    priceRwf: 20000,
    rows: 4,
    seatsPerRow: 10,
    tone: "vip",
    area: "west-inner",
  },
  {
    id: "cip-central",
    name: "CIP Centre",
    tier: "CIP",
    priceRwf: 45000,
    rows: 3,
    seatsPerRow: 8,
    tone: "cip",
    area: "east-inner",
  },
  {
    id: "exec-boxes",
    name: "Executive Boxes",
    tier: "Executive",
    priceRwf: 100000,
    rows: 2,
    seatsPerRow: 6,
    tone: "exec",
    area: "boxes",
  },
];

export const toneClass: Record<Sector["tone"], string> = {
  lower: "bg-sector-lower text-sector-lower-foreground",
  upper: "bg-sector-upper text-sector-upper-foreground",
  vip: "bg-sector-vip text-sector-vip-foreground",
  cip: "bg-sector-cip text-sector-cip-foreground",
  exec: "bg-sector-exec text-sector-exec-foreground",
};

export type MatchOption = {
  id: string;
  label: string;
  date: string;
  kickoff: string;
  venue: string;
  competition: string;
};

export const ticketMatches: MatchOption[] = upcomingFixtures.map((f) => ({
  id: f.id,
  label: `${f.home} vs ${f.away}`,
  date: f.date,
  kickoff: f.kickoff,
  venue: f.venue,
  competition: f.competition,
}));

export const rowLabel = (index: number) => String.fromCharCode(65 + index);

export const seatLabel = (row: number, seat: number) =>
  `${rowLabel(row)}${seat + 1}`;

export const formatRwf = (amount: number) =>
  `RWF ${amount.toLocaleString("en-US")}`;

export type CartSeat = {
  sectorId: string;
  sectorName: string;
  seatLabel: string;
  priceRwf: number;
  holderName: string;
  holderEmail: string;
};

export const hospitalityPackages = [
  {
    id: "vip-lounge",
    name: "Gikundiro VIP Lounge",
    priceRwf: 20000,
    per: "per matchday",
    perks: [
      "Padded seat in the VIP West Stand",
      "Pre-match buffet and drinks",
      "Dedicated stadium entrance",
      "Matchday programme",
    ],
  },
  {
    id: "cip-suite",
    name: "CIP Centre Suite",
    priceRwf: 45000,
    per: "per matchday",
    perks: [
      "Halfway-line CIP seating",
      "Private lounge with host service",
      "Signed jersey raffle entry",
      "Post-match player meet and greet",
    ],
  },
  {
    id: "exec-season",
    name: "Executive Box — Season",
    priceRwf: 100000,
    per: "per matchday seat",
    perks: [
      "Reserved seasonal seating for every home match",
      "Private box with catering",
      "Signed jersey and player autograph session",
      "Priority away-match and cup ticket access",
    ],
  },
] as const;

export const seasonPerks = [
  "Reserved seat kept for you all season",
  "Signed jerseys and player autographs",
  "Exclusive invites to open training days",
  "Discounted club shop purchases",
  "Free stadium drink spin after every purchase",
];

export const spinPrizes = [
  "Free bottled water",
  "Free soft drink",
  "Free Rwandan tea",
  "Free fruit juice",
  "Two free soft drinks",
  "Free coffee",
  "Free energy drink",
  "Free milkshake",
];

export const defaultVenue = stadiumName;
