export type Player = {
  id: string;
  name: string;
  number: number;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
  nationality: string;
  age: number;
  appearances: number;
  goals: number;
  assists: number;
  bio: string;
  featured?: boolean;
};

export type SquadKey = "men" | "women" | "juniors";

export type Squad = {
  key: SquadKey;
  name: string;
  tagline: string;
  competition: string;
  coach: string;
  players: Player[];
};

const p = (
  id: string,
  number: number,
  name: string,
  position: Player["position"],
  nationality: string,
  age: number,
  appearances: number,
  goals: number,
  assists: number,
  bio: string,
  featured = false,
): Player => ({
  id,
  number,
  name,
  position,
  nationality,
  age,
  appearances,
  goals,
  assists,
  bio,
  featured,
});

export const squads: Record<SquadKey, Squad> = {
  men: {
    key: "men",
    name: "Men's Team",
    tagline: "Gikundiro — the pride of the nation",
    competition: "Premier League",
    coach: "Emmanuel Ruremesha",
    players: [
      p("m1", 1, "Yves Kamanzi", "Goalkeeper", "Rwanda", 29, 118, 0, 1, "Commanding shot-stopper and vocal leader of the back line."),
      p("m12", 12, "Olivier Nsengiyumva", "Goalkeeper", "Rwanda", 23, 21, 0, 0, "Academy graduate with lightning reflexes on the line."),
      p("m2", 2, "Jean-Paul Habimana", "Defender", "Rwanda", 27, 96, 4, 7, "Overlapping right back who thrives in the final third.", true),
      p("m4", 4, "Thierry Mugisha", "Defender", "Rwanda", 31, 164, 9, 3, "Captain, centre-half and the club's record appearance holder this decade.", true),
      p("m5", 5, "Samuel Okoro", "Defender", "Nigeria", 26, 58, 3, 2, "Aggressive ball-winning centre-back with a long-range pass."),
      p("m3", 3, "Aime Rukundo", "Defender", "Rwanda", 24, 47, 1, 6, "Tireless left back known for his recovery pace."),
      p("m6", 6, "Fiston Bizimana", "Midfielder", "Rwanda", 28, 132, 12, 21, "Metronomic deep-lying playmaker who dictates the tempo.", true),
      p("m8", 8, "Kevin Mutabazi", "Midfielder", "Rwanda", 25, 74, 15, 13, "Box-to-box engine with a habit of arriving late in the area."),
      p("m10", 10, "Didier Nkurunziza", "Midfielder", "Burundi", 27, 89, 24, 30, "Creative number ten and the club's set-piece specialist.", true),
      p("m14", 14, "Patrick Iradukunda", "Midfielder", "Rwanda", 22, 33, 4, 5, "Direct winger who loves to run at full backs."),
      p("m7", 7, "Eric Nshimiyimana", "Forward", "Rwanda", 26, 101, 41, 18, "Quick-footed wide forward with an eye for the spectacular.", true),
      p("m9", 9, "Moussa Traoré", "Forward", "Mali", 28, 66, 38, 9, "Powerful centre forward and the league's leading scorer last season.", true),
      p("m11", 11, "Shema Byiringiro", "Forward", "Rwanda", 21, 28, 9, 6, "Academy-made striker breaking into the first team."),
      p("m17", 17, "Alain Uwase", "Forward", "Rwanda", 24, 44, 12, 11, "Left-footed inverted winger with a fierce shot."),
    ],
  },
  women: {
    key: "women",
    name: "Women's Team",
    tagline: "Building the future of the women's game",
    competition: "Women's Premier League",
    coach: "Clarisse Mukamana",
    players: [
      p("w1", 1, "Josiane Umutoni", "Goalkeeper", "Rwanda", 26, 71, 0, 0, "Assured keeper with outstanding one-on-one numbers."),
      p("w13", 13, "Grace Ingabire", "Goalkeeper", "Rwanda", 20, 12, 0, 0, "Young keeper promoted from the junior setup."),
      p("w2", 2, "Aline Uwimana", "Defender", "Rwanda", 24, 63, 2, 8, "Attack-minded full back and a relentless presser.", true),
      p("w4", 4, "Diane Mukasine", "Defender", "Rwanda", 29, 108, 6, 3, "Captain and organiser of a famously stubborn defence.", true),
      p("w5", 5, "Sandra Achieng", "Defender", "Kenya", 25, 52, 4, 2, "Dominant in the air at both ends of the pitch."),
      p("w6", 6, "Peace Nyirahabimana", "Midfielder", "Rwanda", 23, 58, 7, 12, "Elegant midfielder who breaks lines with her passing.", true),
      p("w8", 8, "Solange Kayitesi", "Midfielder", "Rwanda", 27, 94, 19, 16, "Tenacious ball-winner and long-range threat."),
      p("w10", 10, "Marie Uwase", "Midfielder", "Rwanda", 22, 41, 14, 18, "Playmaker with vision beyond her years.", true),
      p("w7", 7, "Chantal Mutesi", "Forward", "Rwanda", 25, 77, 33, 14, "Explosive winger who stretches every back line.", true),
      p("w9", 9, "Esther Nabatanzi", "Forward", "Uganda", 24, 61, 40, 7, "Clinical striker with a superb near-post run."),
      p("w11", 11, "Yvette Umuhoza", "Forward", "Rwanda", 20, 24, 8, 6, "Junior graduate with searing acceleration."),
    ],
  },
  juniors: {
    key: "juniors",
    name: "Junior Teams",
    tagline: "U20 and U17 pathway to the first team",
    competition: "National Youth League",
    coach: "Bernard Habyarimana",
    players: [
      p("j1", 1, "Elie Ntwari", "Goalkeeper", "Rwanda", 19, 34, 0, 0, "U20 first-choice keeper, already training with the seniors."),
      p("j12", 12, "Innocent Rwema", "Goalkeeper", "Rwanda", 16, 18, 0, 0, "U17 keeper with an impressive save percentage."),
      p("j2", 2, "Cedric Manzi", "Defender", "Rwanda", 18, 41, 1, 5, "U20 right back with excellent crossing technique.", true),
      p("j4", 4, "Bruno Gasana", "Defender", "Rwanda", 19, 45, 3, 1, "U20 captain and a composed centre-back."),
      p("j5", 5, "Ismael Niyonzima", "Defender", "Rwanda", 17, 26, 2, 2, "U17 defender with a mature reading of the game."),
      p("j6", 6, "Herve Kwizera", "Midfielder", "Rwanda", 18, 39, 6, 9, "Energetic U20 midfielder and academy player of the year.", true),
      p("j8", 8, "Bosco Tuyishime", "Midfielder", "Rwanda", 16, 22, 4, 7, "U17 playmaker with exceptional close control."),
      p("j10", 10, "Divin Hakizimana", "Midfielder", "Rwanda", 19, 48, 13, 15, "U20 number ten tipped for a senior debut this season.", true),
      p("j7", 7, "Kevin Mugabo", "Forward", "Rwanda", 17, 29, 17, 6, "U17 top scorer with a devastating first touch.", true),
      p("j9", 9, "Frank Ishimwe", "Forward", "Rwanda", 18, 37, 21, 8, "U20 striker leading the youth league scoring charts.", true),
      p("j11", 11, "Gilbert Nkusi", "Forward", "Rwanda", 16, 15, 5, 4, "U17 winger with fearless one-versus-one ability."),
    ],
  },
};

export const positionOrder: Player["position"][] = [
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Forward",
];
