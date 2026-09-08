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
    competition: "Rwanda Premier League",
    coach: "Rayon Sports technical bench",
    players: [
      p("m1", 1, "Junior Kameni", "Goalkeeper", "Cameroon", 27, 62, 0, 0, "Commanding first-choice goalkeeper and vocal organiser of the back line.", true),
      p("m16", 16, "Dande Junior", "Goalkeeper", "DR Congo", 24, 21, 0, 0, "Agile shot-stopper pushing hard for a starting berth."),
      p("m4", 4, "Mohamed Ouattara", "Defender", "Ivory Coast", 26, 48, 3, 2, "Composed centre-back who steps out with the ball."),
      p("m5", 5, "Charles Tchouplaou", "Defender", "Cameroon", 28, 55, 4, 1, "Physical defender and a real threat from set pieces.", true),
      p("m3", 3, "Ndayishimiye Didier", "Defender", "Rwanda", 25, 71, 1, 6, "Attacking full back with the lungs to run the flank all game."),
      p("m2", 2, "Zubeli Hakizimana", "Defender", "Rwanda", 23, 39, 0, 3, "Quick, aggressive defender comfortable on either side."),
      p("m15", 15, "Moise Sandja Bulaya", "Defender", "DR Congo", 27, 44, 2, 2, "Experienced reader of the game at the heart of defence."),
      p("m6", 6, "Muderi Akbar", "Midfielder", "Rwanda", 24, 58, 5, 8, "Ball-winning midfielder who keeps the tempo ticking."),
      p("m8", 8, "Boris Gbenou", "Midfielder", "Benin", 28, 63, 7, 11, "Deep-lying playmaker and the side's passing metronome.", true),
      p("m14", 14, "Issa Djiguiba", "Midfielder", "Ivory Coast", 25, 41, 4, 6, "Box-to-box engine with a powerful long-range strike."),
      p("m20", 20, "Ibrahim Djingarey", "Midfielder", "Niger", 26, 37, 6, 9, "Creative wide midfielder who thrives in tight spaces."),
      p("m18", 18, "Muhoza Daniel", "Midfielder", "Rwanda", 22, 33, 3, 5, "Academy graduate with a fearless attitude in midfield."),
      p("m10", 10, "Antonio Atisso Kodjo", "Midfielder", "Togo", 27, 52, 12, 14, "Number ten and chief creator, deadly from dead balls.", true),
      p("m17", 17, "Nizeyimana Mubarak", "Midfielder", "Rwanda", 23, 29, 2, 4, "Energetic runner who presses relentlessly from the front."),
      p("m21", 21, "Nkundimana Fabio", "Midfielder", "Rwanda", 21, 24, 3, 3, "Young midfielder with an eye for a forward pass."),
      p("m7", 7, "Matumona Wakonda", "Forward", "DR Congo", 26, 46, 18, 7, "Direct winger who takes on defenders every time.", true),
      p("m9", 9, "Nisingizwe Christian", "Forward", "Rwanda", 24, 51, 21, 6, "Sharp centre forward with excellent movement in the box.", true),
      p("m11", 11, "Nshuti Didier", "Forward", "Rwanda", 25, 44, 14, 9, "Left-footed attacker with a fierce shot from the edge."),
      p("m19", 19, "Mokono Elie Eldinho", "Forward", "DR Congo", 23, 31, 11, 5, "Pacy forward who stretches defences in behind."),
      p("m23", 23, "Iradukunda Elie Tatou", "Forward", "Rwanda", 21, 19, 6, 4, "Exciting young striker breaking into the first team."),
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
