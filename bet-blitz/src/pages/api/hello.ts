interface Outcome {
    name: string;
    price: number;
  }
  
  interface Market {
    key: string;
    last_update: string;
    outcomes: Outcome[];
  }
  
  interface Bookmaker {
    key: string;
    title: string;
    last_update: string;
    markets: Market[];
  }
  
  interface SportsEvent {
    id: string;
    sport_key: string;
    sport_title: string;
    commence_time: string;
    home_team: string;
    away_team: string;
    bookmakers: Bookmaker[] | null;
  }

const sampleData: SportsEvent[] = [
    {
      "id": "2cf563d81f0ce4bf44b71149bb049c91",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-09-30T22:01:17Z",
      "home_team": "Ole Miss Rebels",
      "away_team": "LSU Tigers",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "LSU Tigers",
                  "price": -120
                },
                {
                  "name": "Ole Miss Rebels",
                  "price": -110
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "LSU Tigers",
                  "price": -122
                },
                {
                  "name": "Ole Miss Rebels",
                  "price": -104
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "LSU Tigers",
                  "price": -121
                },
                {
                  "name": "Ole Miss Rebels",
                  "price": -104
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "LSU Tigers",
                  "price": -121
                },
                {
                  "name": "Ole Miss Rebels",
                  "price": -104
                }
              ]
            }
          ]
        },
        {
          "key": "williamhill_us",
          "title": "William Hill (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "LSU Tigers",
                  "price": -135
                },
                {
                  "name": "Ole Miss Rebels",
                  "price": 105
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "LSU Tigers",
                  "price": -140
                },
                {
                  "name": "Ole Miss Rebels",
                  "price": 110
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "LSU Tigers",
                  "price": -125
                },
                {
                  "name": "Ole Miss Rebels",
                  "price": -105
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:54:54Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:54Z",
              "outcomes": [
                {
                  "name": "LSU Tigers",
                  "price": -125
                },
                {
                  "name": "Ole Miss Rebels",
                  "price": -115
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "b5f6bd71a365b0241696eca227abe7ab",
      "sport_key": "baseball_mlb",
      "sport_title": "MLB",
      "commence_time": "2023-09-30T22:35:00Z",
      "home_team": "Pittsburgh Pirates",
      "away_team": "Miami Marlins",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Miami Marlins",
                  "price": -245
                },
                {
                  "name": "Pittsburgh Pirates",
                  "price": 185
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Miami Marlins",
                  "price": -240
                },
                {
                  "name": "Pittsburgh Pirates",
                  "price": 180
                }
              ]
            }
          ]
        },
        {
          "key": "mybookieag",
          "title": "MyBookie.ag",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Miami Marlins",
                  "price": -222
                },
                {
                  "name": "Pittsburgh Pirates",
                  "price": 170
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Miami Marlins",
                  "price": -225
                },
                {
                  "name": "Pittsburgh Pirates",
                  "price": 175
                }
              ]
            }
          ]
        },
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Miami Marlins",
                  "price": -225
                },
                {
                  "name": "Pittsburgh Pirates",
                  "price": 165
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Miami Marlins",
                  "price": -170
                },
                {
                  "name": "Pittsburgh Pirates",
                  "price": 130
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Miami Marlins",
                  "price": -240
                },
                {
                  "name": "Pittsburgh Pirates",
                  "price": 184
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Miami Marlins",
                  "price": -235
                },
                {
                  "name": "Pittsburgh Pirates",
                  "price": 180
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Miami Marlins",
                  "price": -235
                },
                {
                  "name": "Pittsburgh Pirates",
                  "price": 180
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:52:46Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:52:46Z",
              "outcomes": [
                {
                  "name": "Miami Marlins",
                  "price": -213
                },
                {
                  "name": "Pittsburgh Pirates",
                  "price": 150
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "3487af560e3c102167aa5fb3fb659e40",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-09-30T22:37:29Z",
      "home_team": "Stanford Cardinal",
      "away_team": "Oregon Ducks",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Oregon Ducks",
                  "price": -15000
                },
                {
                  "name": "Stanford Cardinal",
                  "price": 2500
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Oregon Ducks",
                  "price": -10000
                },
                {
                  "name": "Stanford Cardinal",
                  "price": 2200
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Oregon Ducks",
                  "price": -20000
                },
                {
                  "name": "Stanford Cardinal",
                  "price": 1800
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:53:15Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:53:15Z",
              "outcomes": [
                {
                  "name": "Oregon Ducks",
                  "price": -10000
                },
                {
                  "name": "Stanford Cardinal",
                  "price": 3000
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "a3642aa25a56249a12bbdf74b713736a",
      "sport_key": "soccer_chile_campeonato",
      "sport_title": "Primera Divisi\u00f3n - Chile",
      "commence_time": "2023-09-30T22:59:35Z",
      "home_team": "Uni\u00f3n Espa\u00f1ola",
      "away_team": "Curic\u00f3 Unido",
      "bookmakers": [
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:56:13Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:13Z",
              "outcomes": [
                {
                  "name": "Curic\u00f3 Unido",
                  "price": 1200
                },
                {
                  "name": "Uni\u00f3n Espa\u00f1ola",
                  "price": -460
                },
                {
                  "name": "Draw",
                  "price": 410
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:56:13Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:13Z",
              "outcomes": [
                {
                  "name": "Curic\u00f3 Unido",
                  "price": 1500
                },
                {
                  "name": "Uni\u00f3n Espa\u00f1ola",
                  "price": -550
                },
                {
                  "name": "Draw",
                  "price": 460
                }
              ]
            }
          ]
        },
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:56:13Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:13Z",
              "outcomes": [
                {
                  "name": "Curic\u00f3 Unido",
                  "price": 1400
                },
                {
                  "name": "Uni\u00f3n Espa\u00f1ola",
                  "price": -500
                },
                {
                  "name": "Draw",
                  "price": 550
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:56:13Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:13Z",
              "outcomes": [
                {
                  "name": "Curic\u00f3 Unido",
                  "price": 1300
                },
                {
                  "name": "Uni\u00f3n Espa\u00f1ola",
                  "price": -480
                },
                {
                  "name": "Draw",
                  "price": 420
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:56:02Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:02Z",
              "outcomes": [
                {
                  "name": "Curic\u00f3 Unido",
                  "price": 1100
                },
                {
                  "name": "Uni\u00f3n Espa\u00f1ola",
                  "price": -500
                },
                {
                  "name": "Draw",
                  "price": 400
                }
              ]
            }
          ]
        },
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:56:01Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:01Z",
              "outcomes": [
                {
                  "name": "Curic\u00f3 Unido",
                  "price": 1300
                },
                {
                  "name": "Uni\u00f3n Espa\u00f1ola",
                  "price": -551
                },
                {
                  "name": "Draw",
                  "price": 450
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "74912924aab4f835998050eebc93ed13",
      "sport_key": "americanfootball_cfl",
      "sport_title": "CFL",
      "commence_time": "2023-09-30T23:00:00Z",
      "home_team": "Hamilton Tiger-Cats",
      "away_team": "Calgary Stampeders",
      "bookmakers": [
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:55:08Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:08Z",
              "outcomes": [
                {
                  "name": "Calgary Stampeders",
                  "price": -195
                },
                {
                  "name": "Hamilton Tiger-Cats",
                  "price": 150
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:23Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:23Z",
              "outcomes": [
                {
                  "name": "Calgary Stampeders",
                  "price": -170
                },
                {
                  "name": "Hamilton Tiger-Cats",
                  "price": 135
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:24Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:24Z",
              "outcomes": [
                {
                  "name": "Calgary Stampeders",
                  "price": -160
                },
                {
                  "name": "Hamilton Tiger-Cats",
                  "price": 130
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:24Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:24Z",
              "outcomes": [
                {
                  "name": "Calgary Stampeders",
                  "price": -200
                },
                {
                  "name": "Hamilton Tiger-Cats",
                  "price": 150
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:54:40Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:40Z",
              "outcomes": [
                {
                  "name": "Calgary Stampeders",
                  "price": -175
                },
                {
                  "name": "Hamilton Tiger-Cats",
                  "price": 145
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "3fba24cc64b790a332d4647eda49c560",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-09-30T23:00:00Z",
      "home_team": "Georgia Southern Eagles",
      "away_team": "Coastal Carolina Chanticleers",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Coastal Carolina Chanticleers",
                  "price": 114
                },
                {
                  "name": "Georgia Southern Eagles",
                  "price": -145
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Coastal Carolina Chanticleers",
                  "price": 142
                },
                {
                  "name": "Georgia Southern Eagles",
                  "price": -188
                }
              ]
            }
          ]
        },
        {
          "key": "williamhill_us",
          "title": "William Hill (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Coastal Carolina Chanticleers",
                  "price": 125
                },
                {
                  "name": "Georgia Southern Eagles",
                  "price": -160
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Coastal Carolina Chanticleers",
                  "price": 140
                },
                {
                  "name": "Georgia Southern Eagles",
                  "price": -185
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Coastal Carolina Chanticleers",
                  "price": 145
                },
                {
                  "name": "Georgia Southern Eagles",
                  "price": -185
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Coastal Carolina Chanticleers",
                  "price": 140
                },
                {
                  "name": "Georgia Southern Eagles",
                  "price": -180
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "425e275a244865ac060cfe515f2cf390",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-09-30T23:00:00Z",
      "home_team": "Southern Mississippi Golden Eagles",
      "away_team": "Texas State Bobcats",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Southern Mississippi Golden Eagles",
                  "price": 2500
                },
                {
                  "name": "Texas State Bobcats",
                  "price": -15000
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Southern Mississippi Golden Eagles",
                  "price": 1700
                },
                {
                  "name": "Texas State Bobcats",
                  "price": -10000
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Southern Mississippi Golden Eagles",
                  "price": 1450
                },
                {
                  "name": "Texas State Bobcats",
                  "price": -10000
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:53:15Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:53:15Z",
              "outcomes": [
                {
                  "name": "Southern Mississippi Golden Eagles",
                  "price": 3000
                },
                {
                  "name": "Texas State Bobcats",
                  "price": -10000
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "42023e3a06c098df2a2084ceb6c2a32e",
      "sport_key": "soccer_mexico_ligamx",
      "sport_title": "Liga MX",
      "commence_time": "2023-09-30T23:00:58Z",
      "home_team": "Pachuca",
      "away_team": "Necaxa",
      "bookmakers": [
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:44Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:44Z",
              "outcomes": [
                {
                  "name": "Necaxa",
                  "price": 370
                },
                {
                  "name": "Pachuca",
                  "price": 100
                },
                {
                  "name": "Draw",
                  "price": 170
                }
              ]
            }
          ]
        },
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:44Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:44Z",
              "outcomes": [
                {
                  "name": "Necaxa",
                  "price": 400
                },
                {
                  "name": "Pachuca",
                  "price": 100
                },
                {
                  "name": "Draw",
                  "price": 175
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:44Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:44Z",
              "outcomes": [
                {
                  "name": "Necaxa",
                  "price": 380
                },
                {
                  "name": "Pachuca",
                  "price": 105
                },
                {
                  "name": "Draw",
                  "price": 180
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:44Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:44Z",
              "outcomes": [
                {
                  "name": "Necaxa",
                  "price": 340
                },
                {
                  "name": "Pachuca",
                  "price": 107
                },
                {
                  "name": "Draw",
                  "price": 165
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:44Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:44Z",
              "outcomes": [
                {
                  "name": "Necaxa",
                  "price": 340
                },
                {
                  "name": "Pachuca",
                  "price": 107
                },
                {
                  "name": "Draw",
                  "price": 165
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "0ff23b2ffc1a520697ce85bd379d400d",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-09-30T23:01:48Z",
      "home_team": "Rice Owls",
      "away_team": "East Carolina Pirates",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "East Carolina Pirates",
                  "price": 270
                },
                {
                  "name": "Rice Owls",
                  "price": -375
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "East Carolina Pirates",
                  "price": 260
                },
                {
                  "name": "Rice Owls",
                  "price": -375
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "East Carolina Pirates",
                  "price": 280
                },
                {
                  "name": "Rice Owls",
                  "price": -405
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "East Carolina Pirates",
                  "price": 260
                },
                {
                  "name": "Rice Owls",
                  "price": -350
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "East Carolina Pirates",
                  "price": 270
                },
                {
                  "name": "Rice Owls",
                  "price": -390
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "cd1e5ae682c62583b5d64cbe657bd03c",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-09-30T23:02:33Z",
      "home_team": "Colorado State Rams",
      "away_team": "Utah Tech Trailblazers",
      "bookmakers": [
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:53:37Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:53:37Z",
              "outcomes": [
                {
                  "name": "Colorado State Rams",
                  "price": -10000
                },
                {
                  "name": "Utah Tech Trailblazers",
                  "price": 1900
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "f8c89d3fa0966598badab20711611f48",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-09-30T23:02:40Z",
      "home_team": "Georgia State Panthers",
      "away_team": "Troy Trojans",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Georgia State Panthers",
                  "price": 114
                },
                {
                  "name": "Troy Trojans",
                  "price": -145
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Georgia State Panthers",
                  "price": 105
                },
                {
                  "name": "Troy Trojans",
                  "price": -132
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Georgia State Panthers",
                  "price": 135
                },
                {
                  "name": "Troy Trojans",
                  "price": -175
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Georgia State Panthers",
                  "price": -102
                },
                {
                  "name": "Troy Trojans",
                  "price": -128
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Georgia State Panthers",
                  "price": -110
                },
                {
                  "name": "Troy Trojans",
                  "price": -115
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Georgia State Panthers",
                  "price": 100
                },
                {
                  "name": "Troy Trojans",
                  "price": -130
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Georgia State Panthers",
                  "price": 105
                },
                {
                  "name": "Troy Trojans",
                  "price": -132
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "62797e3222dbbb91616d080508e63d12",
      "sport_key": "baseball_mlb",
      "sport_title": "MLB",
      "commence_time": "2023-09-30T23:10:00Z",
      "home_team": "Milwaukee Brewers",
      "away_team": "Chicago Cubs",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Chicago Cubs",
                  "price": -195
                },
                {
                  "name": "Milwaukee Brewers",
                  "price": 150
                }
              ]
            }
          ]
        },
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Chicago Cubs",
                  "price": -190
                },
                {
                  "name": "Milwaukee Brewers",
                  "price": 145
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Chicago Cubs",
                  "price": -175
                },
                {
                  "name": "Milwaukee Brewers",
                  "price": 135
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:20Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:20Z",
              "outcomes": [
                {
                  "name": "Chicago Cubs",
                  "price": -180
                },
                {
                  "name": "Milwaukee Brewers",
                  "price": 140
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Chicago Cubs",
                  "price": -210
                },
                {
                  "name": "Milwaukee Brewers",
                  "price": 160
                }
              ]
            }
          ]
        },
        {
          "key": "mybookieag",
          "title": "MyBookie.ag",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Chicago Cubs",
                  "price": -400
                },
                {
                  "name": "Milwaukee Brewers",
                  "price": 270
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Chicago Cubs",
                  "price": -200
                },
                {
                  "name": "Milwaukee Brewers",
                  "price": 155
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Chicago Cubs",
                  "price": -200
                },
                {
                  "name": "Milwaukee Brewers",
                  "price": 155
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Chicago Cubs",
                  "price": -225
                },
                {
                  "name": "Milwaukee Brewers",
                  "price": 180
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:52:46Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:52:46Z",
              "outcomes": [
                {
                  "name": "Chicago Cubs",
                  "price": -196
                },
                {
                  "name": "Milwaukee Brewers",
                  "price": 135
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "a19e250c3bbea5864b58a02a07f125bd",
      "sport_key": "baseball_mlb",
      "sport_title": "MLB",
      "commence_time": "2023-09-30T23:10:00Z",
      "home_team": "Chicago White Sox",
      "away_team": "San Diego Padres",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Chicago White Sox",
                  "price": 1500
                },
                {
                  "name": "San Diego Padres",
                  "price": -4000
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Chicago White Sox",
                  "price": 1550
                },
                {
                  "name": "San Diego Padres",
                  "price": -3500
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Chicago White Sox",
                  "price": 1300
                },
                {
                  "name": "San Diego Padres",
                  "price": -3500
                }
              ]
            }
          ]
        },
        {
          "key": "mybookieag",
          "title": "MyBookie.ag",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Chicago White Sox",
                  "price": 1000
                },
                {
                  "name": "San Diego Padres",
                  "price": -5000
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Chicago White Sox",
                  "price": 1400
                },
                {
                  "name": "San Diego Padres",
                  "price": -5000
                }
              ]
            }
          ]
        },
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Chicago White Sox",
                  "price": 1400
                },
                {
                  "name": "San Diego Padres",
                  "price": -4000
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Chicago White Sox",
                  "price": 1400
                },
                {
                  "name": "San Diego Padres",
                  "price": -10000
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "77f8753a96e0e309a38c0ba346f0d57a",
      "sport_key": "baseball_mlb",
      "sport_title": "MLB",
      "commence_time": "2023-09-30T23:10:00Z",
      "home_team": "Kansas City Royals",
      "away_team": "New York Yankees",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Kansas City Royals",
                  "price": -345
                },
                {
                  "name": "New York Yankees",
                  "price": 250
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Kansas City Royals",
                  "price": -170
                },
                {
                  "name": "New York Yankees",
                  "price": 130
                }
              ]
            }
          ]
        },
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Kansas City Royals",
                  "price": -290
                },
                {
                  "name": "New York Yankees",
                  "price": 210
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Kansas City Royals",
                  "price": -330
                },
                {
                  "name": "New York Yankees",
                  "price": 240
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Kansas City Royals",
                  "price": -370
                },
                {
                  "name": "New York Yankees",
                  "price": 260
                }
              ]
            }
          ]
        },
        {
          "key": "mybookieag",
          "title": "MyBookie.ag",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Kansas City Royals",
                  "price": -192
                },
                {
                  "name": "New York Yankees",
                  "price": 140
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Kansas City Royals",
                  "price": -278
                },
                {
                  "name": "New York Yankees",
                  "price": 215
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Kansas City Royals",
                  "price": -278
                },
                {
                  "name": "New York Yankees",
                  "price": 215
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Kansas City Royals",
                  "price": -275
                },
                {
                  "name": "New York Yankees",
                  "price": 210
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:52:46Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:52:46Z",
              "outcomes": [
                {
                  "name": "Kansas City Royals",
                  "price": -233
                },
                {
                  "name": "New York Yankees",
                  "price": 160
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "e0a965fc0006c7e843c4770fd7b310d8",
      "sport_key": "baseball_mlb",
      "sport_title": "MLB",
      "commence_time": "2023-09-30T23:10:00Z",
      "home_team": "New York Mets",
      "away_team": "Philadelphia Phillies",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "New York Mets",
                  "price": -850
                },
                {
                  "name": "Philadelphia Phillies",
                  "price": 520
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "New York Mets",
                  "price": -310
                },
                {
                  "name": "Philadelphia Phillies",
                  "price": 225
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "New York Mets",
                  "price": -800
                },
                {
                  "name": "Philadelphia Phillies",
                  "price": 475
                }
              ]
            }
          ]
        },
        {
          "key": "mybookieag",
          "title": "MyBookie.ag",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "New York Mets",
                  "price": -181
                },
                {
                  "name": "Philadelphia Phillies",
                  "price": 140
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "New York Mets",
                  "price": -650
                },
                {
                  "name": "Philadelphia Phillies",
                  "price": 425
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "New York Mets",
                  "price": -700
                },
                {
                  "name": "Philadelphia Phillies",
                  "price": 430
                }
              ]
            }
          ]
        },
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "New York Mets",
                  "price": -700
                },
                {
                  "name": "Philadelphia Phillies",
                  "price": 425
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "New York Mets",
                  "price": -835
                },
                {
                  "name": "Philadelphia Phillies",
                  "price": 500
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "New York Mets",
                  "price": -835
                },
                {
                  "name": "Philadelphia Phillies",
                  "price": 500
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "9e53534c076e937739bb5c8474532d52",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-09-30T23:11:01Z",
      "home_team": "Oklahoma Sooners",
      "away_team": "Iowa State Cyclones",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Iowa State Cyclones",
                  "price": 1800
                },
                {
                  "name": "Oklahoma Sooners",
                  "price": -6500
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Iowa State Cyclones",
                  "price": 2000
                },
                {
                  "name": "Oklahoma Sooners",
                  "price": -50000
                }
              ]
            }
          ]
        },
        {
          "key": "williamhill_us",
          "title": "William Hill (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Iowa State Cyclones",
                  "price": 1400
                },
                {
                  "name": "Oklahoma Sooners",
                  "price": -5000
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Iowa State Cyclones",
                  "price": 1550
                },
                {
                  "name": "Oklahoma Sooners",
                  "price": -10000
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:54:53Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:53Z",
              "outcomes": [
                {
                  "name": "Iowa State Cyclones",
                  "price": 1800
                },
                {
                  "name": "Oklahoma Sooners",
                  "price": -20000
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Iowa State Cyclones",
                  "price": 2000
                },
                {
                  "name": "Oklahoma Sooners",
                  "price": -6000
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:51:37Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:51:37Z",
              "outcomes": [
                {
                  "name": "Iowa State Cyclones",
                  "price": 1100
                },
                {
                  "name": "Oklahoma Sooners",
                  "price": -3335
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "f0ddcdfa68ac2c7d1a33492d436417f1",
      "sport_key": "baseball_mlb",
      "sport_title": "MLB",
      "commence_time": "2023-09-30T23:15:00Z",
      "home_team": "Baltimore Orioles",
      "away_team": "Boston Red Sox",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Baltimore Orioles",
                  "price": -195
                },
                {
                  "name": "Boston Red Sox",
                  "price": 150
                }
              ]
            }
          ]
        },
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Baltimore Orioles",
                  "price": -165
                },
                {
                  "name": "Boston Red Sox",
                  "price": 125
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Baltimore Orioles",
                  "price": -165
                },
                {
                  "name": "Boston Red Sox",
                  "price": 130
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Baltimore Orioles",
                  "price": -164
                },
                {
                  "name": "Boston Red Sox",
                  "price": 128
                }
              ]
            }
          ]
        },
        {
          "key": "mybookieag",
          "title": "MyBookie.ag",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Baltimore Orioles",
                  "price": -133
                },
                {
                  "name": "Boston Red Sox",
                  "price": 100
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Baltimore Orioles",
                  "price": -160
                },
                {
                  "name": "Boston Red Sox",
                  "price": 130
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Baltimore Orioles",
                  "price": -150
                },
                {
                  "name": "Boston Red Sox",
                  "price": 115
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Baltimore Orioles",
                  "price": -157
                },
                {
                  "name": "Boston Red Sox",
                  "price": 125
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Baltimore Orioles",
                  "price": -157
                },
                {
                  "name": "Boston Red Sox",
                  "price": 125
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:54:57Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:57Z",
              "outcomes": [
                {
                  "name": "Baltimore Orioles",
                  "price": -141
                },
                {
                  "name": "Boston Red Sox",
                  "price": 100
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "837e1ac84ef6bdb26bace2852d9940af",
      "sport_key": "baseball_mlb",
      "sport_title": "MLB",
      "commence_time": "2023-09-30T23:15:00Z",
      "home_team": "St. Louis Cardinals",
      "away_team": "Cincinnati Reds",
      "bookmakers": [
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Cincinnati Reds",
                  "price": 950
                },
                {
                  "name": "St. Louis Cardinals",
                  "price": -2500
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:54:33Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:33Z",
              "outcomes": [
                {
                  "name": "Cincinnati Reds",
                  "price": 600
                },
                {
                  "name": "St. Louis Cardinals",
                  "price": -1200
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Cincinnati Reds",
                  "price": 950
                },
                {
                  "name": "St. Louis Cardinals",
                  "price": -2500
                }
              ]
            }
          ]
        },
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Cincinnati Reds",
                  "price": 600
                },
                {
                  "name": "St. Louis Cardinals",
                  "price": -1099
                }
              ]
            }
          ]
        },
        {
          "key": "mybookieag",
          "title": "MyBookie.ag",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Cincinnati Reds",
                  "price": 490
                },
                {
                  "name": "St. Louis Cardinals",
                  "price": -833
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Cincinnati Reds",
                  "price": 830
                },
                {
                  "name": "St. Louis Cardinals",
                  "price": -1600
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Cincinnati Reds",
                  "price": 700
                },
                {
                  "name": "St. Louis Cardinals",
                  "price": -1400
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Cincinnati Reds",
                  "price": 825
                },
                {
                  "name": "St. Louis Cardinals",
                  "price": -1600
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:54:57Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:57Z",
              "outcomes": [
                {
                  "name": "Cincinnati Reds",
                  "price": 655
                },
                {
                  "name": "St. Louis Cardinals",
                  "price": -2500
                }
              ]
            }
          ]
        },
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Cincinnati Reds",
                  "price": 750
                },
                {
                  "name": "St. Louis Cardinals",
                  "price": -1450
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "5d7b1c2b0d8f0780aadb5df759f50207",
      "sport_key": "baseball_mlb",
      "sport_title": "MLB",
      "commence_time": "2023-09-30T23:15:00Z",
      "home_team": "Seattle Mariners",
      "away_team": "Texas Rangers",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Seattle Mariners",
                  "price": -190
                },
                {
                  "name": "Texas Rangers",
                  "price": 145
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Seattle Mariners",
                  "price": -165
                },
                {
                  "name": "Texas Rangers",
                  "price": 130
                }
              ]
            }
          ]
        },
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Seattle Mariners",
                  "price": -190
                },
                {
                  "name": "Texas Rangers",
                  "price": 145
                }
              ]
            }
          ]
        },
        {
          "key": "mybookieag",
          "title": "MyBookie.ag",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Seattle Mariners",
                  "price": -200
                },
                {
                  "name": "Texas Rangers",
                  "price": 150
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Seattle Mariners",
                  "price": -166
                },
                {
                  "name": "Texas Rangers",
                  "price": 130
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Seattle Mariners",
                  "price": -165
                },
                {
                  "name": "Texas Rangers",
                  "price": 132
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Seattle Mariners",
                  "price": -165
                },
                {
                  "name": "Texas Rangers",
                  "price": 132
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Seattle Mariners",
                  "price": -170
                },
                {
                  "name": "Texas Rangers",
                  "price": 130
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Seattle Mariners",
                  "price": -190
                },
                {
                  "name": "Texas Rangers",
                  "price": 150
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:50:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:50:41Z",
              "outcomes": [
                {
                  "name": "Seattle Mariners",
                  "price": -175
                },
                {
                  "name": "Texas Rangers",
                  "price": 125
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "3150f55e92b9ca003e065d721b8bed46",
      "sport_key": "baseball_mlb",
      "sport_title": "MLB",
      "commence_time": "2023-09-30T23:20:00Z",
      "home_team": "Atlanta Braves",
      "away_team": "Washington Nationals",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:54:55Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:55Z",
              "outcomes": [
                {
                  "name": "Atlanta Braves",
                  "price": 120
                },
                {
                  "name": "Washington Nationals",
                  "price": -150
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Atlanta Braves",
                  "price": 124
                },
                {
                  "name": "Washington Nationals",
                  "price": -158
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Atlanta Braves",
                  "price": -115
                },
                {
                  "name": "Washington Nationals",
                  "price": -115
                }
              ]
            }
          ]
        },
        {
          "key": "mybookieag",
          "title": "MyBookie.ag",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Atlanta Braves",
                  "price": -111
                },
                {
                  "name": "Washington Nationals",
                  "price": -117
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Atlanta Braves",
                  "price": 135
                },
                {
                  "name": "Washington Nationals",
                  "price": -175
                }
              ]
            }
          ]
        },
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Atlanta Braves",
                  "price": -100000
                },
                {
                  "name": "Washington Nationals",
                  "price": -100000
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Atlanta Braves",
                  "price": 112
                },
                {
                  "name": "Washington Nationals",
                  "price": -141
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Atlanta Braves",
                  "price": 112
                },
                {
                  "name": "Washington Nationals",
                  "price": -141
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Atlanta Braves",
                  "price": 105
                },
                {
                  "name": "Washington Nationals",
                  "price": -135
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:54:57Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:57Z",
              "outcomes": [
                {
                  "name": "Atlanta Braves",
                  "price": 110
                },
                {
                  "name": "Washington Nationals",
                  "price": -154
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "b449ea903344cf0d48a04aa144e288dd",
      "sport_key": "soccer_usa_mls",
      "sport_title": "MLS",
      "commence_time": "2023-09-30T23:30:00Z",
      "home_team": "Inter Miami CF",
      "away_team": "New York City FC",
      "bookmakers": [
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:43:50Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:43:50Z",
              "outcomes": [
                {
                  "name": "Inter Miami CF",
                  "price": 145
                },
                {
                  "name": "New York City FC",
                  "price": 170
                },
                {
                  "name": "Draw",
                  "price": 230
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "Inter Miami CF",
                  "price": 150
                },
                {
                  "name": "New York City FC",
                  "price": 168
                },
                {
                  "name": "Draw",
                  "price": 250
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:46:46Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:46:46Z",
              "outcomes": [
                {
                  "name": "Inter Miami CF",
                  "price": 150
                },
                {
                  "name": "New York City FC",
                  "price": 170
                },
                {
                  "name": "Draw",
                  "price": 250
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:35Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:35Z",
              "outcomes": [
                {
                  "name": "Inter Miami CF",
                  "price": 145
                },
                {
                  "name": "New York City FC",
                  "price": 165
                },
                {
                  "name": "Draw",
                  "price": 240
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:49:45Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:49:45Z",
              "outcomes": [
                {
                  "name": "Inter Miami CF",
                  "price": 150
                },
                {
                  "name": "New York City FC",
                  "price": 163
                },
                {
                  "name": "Draw",
                  "price": 260
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:49:45Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:49:45Z",
              "outcomes": [
                {
                  "name": "Inter Miami CF",
                  "price": 150
                },
                {
                  "name": "New York City FC",
                  "price": 163
                },
                {
                  "name": "Draw",
                  "price": 260
                }
              ]
            }
          ]
        },
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:33Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:33Z",
              "outcomes": [
                {
                  "name": "Inter Miami CF",
                  "price": 130
                },
                {
                  "name": "New York City FC",
                  "price": 175
                },
                {
                  "name": "Draw",
                  "price": 270
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "f19e69afd5f501343fb45e3b8cf5ba5c",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-09-30T23:35:31Z",
      "home_team": "SMU Mustangs",
      "away_team": "Charlotte 49ers",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Charlotte 49ers",
                  "price": 1400
                },
                {
                  "name": "SMU Mustangs",
                  "price": -3500
                }
              ]
            }
          ]
        },
        {
          "key": "williamhill_us",
          "title": "William Hill (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Charlotte 49ers",
                  "price": 1200
                },
                {
                  "name": "SMU Mustangs",
                  "price": -4000
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Charlotte 49ers",
                  "price": 1200
                },
                {
                  "name": "SMU Mustangs",
                  "price": -3300
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Charlotte 49ers",
                  "price": 1350
                },
                {
                  "name": "SMU Mustangs",
                  "price": -7000
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Charlotte 49ers",
                  "price": 1550
                },
                {
                  "name": "SMU Mustangs",
                  "price": -10000
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Charlotte 49ers",
                  "price": 1300
                },
                {
                  "name": "SMU Mustangs",
                  "price": -3500
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:43:56Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:43:56Z",
              "outcomes": [
                {
                  "name": "Charlotte 49ers",
                  "price": 1400
                },
                {
                  "name": "SMU Mustangs",
                  "price": -10000
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "f8f13a150b02d8e3ac8243f5054db348",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-09-30T23:37:31Z",
      "home_team": "Iowa Hawkeyes",
      "away_team": "Michigan State Spartans",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Iowa Hawkeyes",
                  "price": -445
                },
                {
                  "name": "Michigan State Spartans",
                  "price": 310
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:54:01Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:01Z",
              "outcomes": [
                {
                  "name": "Iowa Hawkeyes",
                  "price": -560
                },
                {
                  "name": "Michigan State Spartans",
                  "price": 370
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Iowa Hawkeyes",
                  "price": -500
                },
                {
                  "name": "Michigan State Spartans",
                  "price": 340
                }
              ]
            }
          ]
        },
        {
          "key": "betus",
          "title": "BetUS",
          "last_update": "2023-09-30T23:41:44Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:41:44Z",
              "outcomes": [
                {
                  "name": "Iowa Hawkeyes",
                  "price": -375
                },
                {
                  "name": "Michigan State Spartans",
                  "price": 295
                }
              ]
            }
          ]
        },
        {
          "key": "williamhill_us",
          "title": "William Hill (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Iowa Hawkeyes",
                  "price": -500
                },
                {
                  "name": "Michigan State Spartans",
                  "price": 350
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Iowa Hawkeyes",
                  "price": -460
                },
                {
                  "name": "Michigan State Spartans",
                  "price": 305
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Iowa Hawkeyes",
                  "price": -450
                },
                {
                  "name": "Michigan State Spartans",
                  "price": 333
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Iowa Hawkeyes",
                  "price": -475
                },
                {
                  "name": "Michigan State Spartans",
                  "price": 320
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Iowa Hawkeyes",
                  "price": -500
                },
                {
                  "name": "Michigan State Spartans",
                  "price": 340
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:54:54Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:54Z",
              "outcomes": [
                {
                  "name": "Iowa Hawkeyes",
                  "price": -435
                },
                {
                  "name": "Michigan State Spartans",
                  "price": 265
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "57a687bf3ecff1dba2af1ee1f802b553",
      "sport_key": "soccer_usa_mls",
      "sport_title": "MLS",
      "commence_time": "2023-09-30T23:39:05Z",
      "home_team": "New York Red Bulls",
      "away_team": "Chicago Fire",
      "bookmakers": [
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:33Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:33Z",
              "outcomes": [
                {
                  "name": "Chicago Fire",
                  "price": 480
                },
                {
                  "name": "New York Red Bulls",
                  "price": -170
                },
                {
                  "name": "Draw",
                  "price": 250
                }
              ]
            }
          ]
        },
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:33Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:33Z",
              "outcomes": [
                {
                  "name": "Chicago Fire",
                  "price": 450
                },
                {
                  "name": "New York Red Bulls",
                  "price": -155
                },
                {
                  "name": "Draw",
                  "price": 255
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "Chicago Fire",
                  "price": 420
                },
                {
                  "name": "New York Red Bulls",
                  "price": -150
                },
                {
                  "name": "Draw",
                  "price": 265
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:05Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:05Z",
              "outcomes": [
                {
                  "name": "Chicago Fire",
                  "price": 450
                },
                {
                  "name": "New York Red Bulls",
                  "price": -145
                },
                {
                  "name": "Draw",
                  "price": 260
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:35Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:35Z",
              "outcomes": [
                {
                  "name": "Chicago Fire",
                  "price": 425
                },
                {
                  "name": "New York Red Bulls",
                  "price": -165
                },
                {
                  "name": "Draw",
                  "price": 240
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "Chicago Fire",
                  "price": 500
                },
                {
                  "name": "New York Red Bulls",
                  "price": -162
                },
                {
                  "name": "Draw",
                  "price": 260
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "Chicago Fire",
                  "price": 500
                },
                {
                  "name": "New York Red Bulls",
                  "price": -162
                },
                {
                  "name": "Draw",
                  "price": 260
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "6a7a3261def63dcbd6d554fb9f65b70d",
      "sport_key": "soccer_usa_mls",
      "sport_title": "MLS",
      "commence_time": "2023-09-30T23:39:06Z",
      "home_team": "Toronto FC",
      "away_team": "FC Cincinnati",
      "bookmakers": [
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:33Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:33Z",
              "outcomes": [
                {
                  "name": "FC Cincinnati",
                  "price": -155
                },
                {
                  "name": "Toronto FC",
                  "price": 380
                },
                {
                  "name": "Draw",
                  "price": 260
                }
              ]
            }
          ]
        },
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:33Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:33Z",
              "outcomes": [
                {
                  "name": "FC Cincinnati",
                  "price": -155
                },
                {
                  "name": "Toronto FC",
                  "price": 400
                },
                {
                  "name": "Draw",
                  "price": 295
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "FC Cincinnati",
                  "price": -141
                },
                {
                  "name": "Toronto FC",
                  "price": 350
                },
                {
                  "name": "Draw",
                  "price": 295
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:05Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:05Z",
              "outcomes": [
                {
                  "name": "FC Cincinnati",
                  "price": -140
                },
                {
                  "name": "Toronto FC",
                  "price": 350
                },
                {
                  "name": "Draw",
                  "price": 280
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:35Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:35Z",
              "outcomes": [
                {
                  "name": "FC Cincinnati",
                  "price": -160
                },
                {
                  "name": "Toronto FC",
                  "price": 350
                },
                {
                  "name": "Draw",
                  "price": 260
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "FC Cincinnati",
                  "price": -159
                },
                {
                  "name": "Toronto FC",
                  "price": 390
                },
                {
                  "name": "Draw",
                  "price": 310
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "FC Cincinnati",
                  "price": -159
                },
                {
                  "name": "Toronto FC",
                  "price": 390
                },
                {
                  "name": "Draw",
                  "price": 310
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "07fa33eac31cc8ddbf9bcc9714661fd4",
      "sport_key": "soccer_usa_mls",
      "sport_title": "MLS",
      "commence_time": "2023-09-30T23:39:07Z",
      "home_team": "Orlando City SC",
      "away_team": "Montreal Impact",
      "bookmakers": [
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:33Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:33Z",
              "outcomes": [
                {
                  "name": "Montreal Impact",
                  "price": 440
                },
                {
                  "name": "Orlando City SC",
                  "price": -165
                },
                {
                  "name": "Draw",
                  "price": 260
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "Montreal Impact",
                  "price": 380
                },
                {
                  "name": "Orlando City SC",
                  "price": -150
                },
                {
                  "name": "Draw",
                  "price": 285
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:05Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:05Z",
              "outcomes": [
                {
                  "name": "Montreal Impact",
                  "price": 380
                },
                {
                  "name": "Orlando City SC",
                  "price": -145
                },
                {
                  "name": "Draw",
                  "price": 280
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:35Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:35Z",
              "outcomes": [
                {
                  "name": "Montreal Impact",
                  "price": 360
                },
                {
                  "name": "Orlando City SC",
                  "price": -155
                },
                {
                  "name": "Draw",
                  "price": 250
                }
              ]
            }
          ]
        },
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:33Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:33Z",
              "outcomes": [
                {
                  "name": "Montreal Impact",
                  "price": 400
                },
                {
                  "name": "Orlando City SC",
                  "price": -155
                },
                {
                  "name": "Draw",
                  "price": 285
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "19328ad062cb5b8c07f85c245fda5f08",
      "sport_key": "soccer_usa_mls",
      "sport_title": "MLS",
      "commence_time": "2023-09-30T23:39:29Z",
      "home_team": "Columbus Crew SC",
      "away_team": "Philadelphia Union",
      "bookmakers": [
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:33Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:33Z",
              "outcomes": [
                {
                  "name": "Columbus Crew SC",
                  "price": -170
                },
                {
                  "name": "Philadelphia Union",
                  "price": 430
                },
                {
                  "name": "Draw",
                  "price": 270
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "Columbus Crew SC",
                  "price": -159
                },
                {
                  "name": "Philadelphia Union",
                  "price": 390
                },
                {
                  "name": "Draw",
                  "price": 300
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:05Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:05Z",
              "outcomes": [
                {
                  "name": "Columbus Crew SC",
                  "price": -155
                },
                {
                  "name": "Philadelphia Union",
                  "price": 425
                },
                {
                  "name": "Draw",
                  "price": 290
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:35Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:35Z",
              "outcomes": [
                {
                  "name": "Columbus Crew SC",
                  "price": -165
                },
                {
                  "name": "Philadelphia Union",
                  "price": 380
                },
                {
                  "name": "Draw",
                  "price": 260
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "Columbus Crew SC",
                  "price": -182
                },
                {
                  "name": "Philadelphia Union",
                  "price": 460
                },
                {
                  "name": "Draw",
                  "price": 320
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "Columbus Crew SC",
                  "price": -182
                },
                {
                  "name": "Philadelphia Union",
                  "price": 460
                },
                {
                  "name": "Draw",
                  "price": 320
                }
              ]
            }
          ]
        },
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:33Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:33Z",
              "outcomes": [
                {
                  "name": "Columbus Crew SC",
                  "price": -175
                },
                {
                  "name": "Philadelphia Union",
                  "price": 450
                },
                {
                  "name": "Draw",
                  "price": 300
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "0b88559de21855e39e4bc62c072c0ea1",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-09-30T23:39:31Z",
      "home_team": "Tennessee Volunteers",
      "away_team": "South Carolina Gamecocks",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "South Carolina Gamecocks",
                  "price": 470
                },
                {
                  "name": "Tennessee Volunteers",
                  "price": -750
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "South Carolina Gamecocks",
                  "price": 480
                },
                {
                  "name": "Tennessee Volunteers",
                  "price": -770
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "South Carolina Gamecocks",
                  "price": 475
                },
                {
                  "name": "Tennessee Volunteers",
                  "price": -770
                }
              ]
            }
          ]
        },
        {
          "key": "williamhill_us",
          "title": "William Hill (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "South Carolina Gamecocks",
                  "price": 550
                },
                {
                  "name": "Tennessee Volunteers",
                  "price": -900
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "South Carolina Gamecocks",
                  "price": 500
                },
                {
                  "name": "Tennessee Volunteers",
                  "price": -750
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "South Carolina Gamecocks",
                  "price": 425
                },
                {
                  "name": "Tennessee Volunteers",
                  "price": -700
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "South Carolina Gamecocks",
                  "price": 475
                },
                {
                  "name": "Tennessee Volunteers",
                  "price": -770
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:54:54Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:54Z",
              "outcomes": [
                {
                  "name": "South Carolina Gamecocks",
                  "price": 380
                },
                {
                  "name": "Tennessee Volunteers",
                  "price": -769
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "f3a6fe4b9fc290497b9aee29e6576739",
      "sport_key": "soccer_usa_mls",
      "sport_title": "MLS",
      "commence_time": "2023-09-30T23:39:38Z",
      "home_team": "New England Revolution",
      "away_team": "Charlotte FC",
      "bookmakers": [
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:33Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:33Z",
              "outcomes": [
                {
                  "name": "Charlotte FC",
                  "price": 240
                },
                {
                  "name": "New England Revolution",
                  "price": 105
                },
                {
                  "name": "Draw",
                  "price": 220
                }
              ]
            }
          ]
        },
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:33Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:33Z",
              "outcomes": [
                {
                  "name": "Charlotte FC",
                  "price": 240
                },
                {
                  "name": "New England Revolution",
                  "price": 110
                },
                {
                  "name": "Draw",
                  "price": 240
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "Charlotte FC",
                  "price": 235
                },
                {
                  "name": "New England Revolution",
                  "price": 110
                },
                {
                  "name": "Draw",
                  "price": 250
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:05Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:05Z",
              "outcomes": [
                {
                  "name": "Charlotte FC",
                  "price": 230
                },
                {
                  "name": "New England Revolution",
                  "price": 115
                },
                {
                  "name": "Draw",
                  "price": 240
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:35Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:35Z",
              "outcomes": [
                {
                  "name": "Charlotte FC",
                  "price": 240
                },
                {
                  "name": "New England Revolution",
                  "price": -105
                },
                {
                  "name": "Draw",
                  "price": 225
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "Charlotte FC",
                  "price": 265
                },
                {
                  "name": "New England Revolution",
                  "price": 104
                },
                {
                  "name": "Draw",
                  "price": 245
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:34Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:34Z",
              "outcomes": [
                {
                  "name": "Charlotte FC",
                  "price": 265
                },
                {
                  "name": "New England Revolution",
                  "price": 104
                },
                {
                  "name": "Draw",
                  "price": 245
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "2b7e5db0f8917700e33879d8e7fcc166",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-09-30T23:44:31Z",
      "home_team": "Duke Blue Devils",
      "away_team": "Notre Dame Fighting Irish",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Duke Blue Devils",
                  "price": 280
                },
                {
                  "name": "Notre Dame Fighting Irish",
                  "price": -395
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Duke Blue Devils",
                  "price": 265
                },
                {
                  "name": "Notre Dame Fighting Irish",
                  "price": -370
                }
              ]
            }
          ]
        },
        {
          "key": "betus",
          "title": "BetUS",
          "last_update": "2023-09-30T23:46:55Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:46:55Z",
              "outcomes": [
                {
                  "name": "Duke Blue Devils",
                  "price": 175
                },
                {
                  "name": "Notre Dame Fighting Irish",
                  "price": -210
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Duke Blue Devils",
                  "price": 225
                },
                {
                  "name": "Notre Dame Fighting Irish",
                  "price": -305
                }
              ]
            }
          ]
        },
        {
          "key": "lowvig",
          "title": "LowVig.ag",
          "last_update": "2023-09-30T23:44:12Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:44:12Z",
              "outcomes": [
                {
                  "name": "Duke Blue Devils",
                  "price": 170
                },
                {
                  "name": "Notre Dame Fighting Irish",
                  "price": -195
                }
              ]
            }
          ]
        },
        {
          "key": "betonlineag",
          "title": "BetOnline.ag",
          "last_update": "2023-09-30T23:45:15Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:45:15Z",
              "outcomes": [
                {
                  "name": "Duke Blue Devils",
                  "price": 170
                },
                {
                  "name": "Notre Dame Fighting Irish",
                  "price": -196
                }
              ]
            }
          ]
        },
        {
          "key": "williamhill_us",
          "title": "William Hill (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Duke Blue Devils",
                  "price": 240
                },
                {
                  "name": "Notre Dame Fighting Irish",
                  "price": -320
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Duke Blue Devils",
                  "price": 230
                },
                {
                  "name": "Notre Dame Fighting Irish",
                  "price": -300
                }
              ]
            }
          ]
        },
        {
          "key": "superbook",
          "title": "SuperBook",
          "last_update": "2023-09-30T23:44:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:44:41Z",
              "outcomes": [
                {
                  "name": "Duke Blue Devils",
                  "price": 185
                },
                {
                  "name": "Notre Dame Fighting Irish",
                  "price": -230
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Duke Blue Devils",
                  "price": 180
                },
                {
                  "name": "Notre Dame Fighting Irish",
                  "price": -240
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Duke Blue Devils",
                  "price": 225
                },
                {
                  "name": "Notre Dame Fighting Irish",
                  "price": -305
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:54:54Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:54Z",
              "outcomes": [
                {
                  "name": "Duke Blue Devils",
                  "price": 265
                },
                {
                  "name": "Notre Dame Fighting Irish",
                  "price": -435
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "21c033251a06917c4befcdd194b429d3",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-10-01T00:00:00Z",
      "home_team": "Air Force Falcons",
      "away_team": "San Diego State Aztecs",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Air Force Falcons",
                  "price": -410
                },
                {
                  "name": "San Diego State Aztecs",
                  "price": 320
                }
              ]
            }
          ]
        },
        {
          "key": "betrivers",
          "title": "BetRivers",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Air Force Falcons",
                  "price": -420
                },
                {
                  "name": "San Diego State Aztecs",
                  "price": 320
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Air Force Falcons",
                  "price": -420
                },
                {
                  "name": "San Diego State Aztecs",
                  "price": 320
                }
              ]
            }
          ]
        },
        {
          "key": "betus",
          "title": "BetUS",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Air Force Falcons",
                  "price": -400
                },
                {
                  "name": "San Diego State Aztecs",
                  "price": 320
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Air Force Falcons",
                  "price": -410
                },
                {
                  "name": "San Diego State Aztecs",
                  "price": 315
                }
              ]
            }
          ]
        },
        {
          "key": "lowvig",
          "title": "LowVig.ag",
          "last_update": "2023-09-30T23:55:22Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:22Z",
              "outcomes": [
                {
                  "name": "Air Force Falcons",
                  "price": -410
                },
                {
                  "name": "San Diego State Aztecs",
                  "price": 330
                }
              ]
            }
          ]
        },
        {
          "key": "betonlineag",
          "title": "BetOnline.ag",
          "last_update": "2023-09-30T23:55:53Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:53Z",
              "outcomes": [
                {
                  "name": "Air Force Falcons",
                  "price": -417
                },
                {
                  "name": "San Diego State Aztecs",
                  "price": 330
                }
              ]
            }
          ]
        },
        {
          "key": "williamhill_us",
          "title": "William Hill (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Air Force Falcons",
                  "price": -420
                },
                {
                  "name": "San Diego State Aztecs",
                  "price": 320
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Air Force Falcons",
                  "price": -430
                },
                {
                  "name": "San Diego State Aztecs",
                  "price": 320
                }
              ]
            }
          ]
        },
        {
          "key": "superbook",
          "title": "SuperBook",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Air Force Falcons",
                  "price": -400
                },
                {
                  "name": "San Diego State Aztecs",
                  "price": 300
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Air Force Falcons",
                  "price": -380
                },
                {
                  "name": "San Diego State Aztecs",
                  "price": 300
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Air Force Falcons",
                  "price": -400
                },
                {
                  "name": "San Diego State Aztecs",
                  "price": 310
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:54:54Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:54Z",
              "outcomes": [
                {
                  "name": "Air Force Falcons",
                  "price": -385
                },
                {
                  "name": "San Diego State Aztecs",
                  "price": 310
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "68b63b162c378e94fba2874b47a5645a",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-10-01T00:00:00Z",
      "home_team": "UL Monroe Warhawks",
      "away_team": "Appalachian State Mountaineers",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Appalachian State Mountaineers",
                  "price": -600
                },
                {
                  "name": "UL Monroe Warhawks",
                  "price": 440
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Appalachian State Mountaineers",
                  "price": -560
                },
                {
                  "name": "UL Monroe Warhawks",
                  "price": 390
                }
              ]
            }
          ]
        },
        {
          "key": "betrivers",
          "title": "BetRivers",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Appalachian State Mountaineers",
                  "price": -560
                },
                {
                  "name": "UL Monroe Warhawks",
                  "price": 390
                }
              ]
            }
          ]
        },
        {
          "key": "betus",
          "title": "BetUS",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Appalachian State Mountaineers",
                  "price": -525
                },
                {
                  "name": "UL Monroe Warhawks",
                  "price": 405
                }
              ]
            }
          ]
        },
        {
          "key": "lowvig",
          "title": "LowVig.ag",
          "last_update": "2023-09-30T23:55:22Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:22Z",
              "outcomes": [
                {
                  "name": "Appalachian State Mountaineers",
                  "price": -526
                },
                {
                  "name": "UL Monroe Warhawks",
                  "price": 420
                }
              ]
            }
          ]
        },
        {
          "key": "betonlineag",
          "title": "BetOnline.ag",
          "last_update": "2023-09-30T23:55:53Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:53Z",
              "outcomes": [
                {
                  "name": "Appalachian State Mountaineers",
                  "price": -526
                },
                {
                  "name": "UL Monroe Warhawks",
                  "price": 420
                }
              ]
            }
          ]
        },
        {
          "key": "williamhill_us",
          "title": "William Hill (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Appalachian State Mountaineers",
                  "price": -550
                },
                {
                  "name": "UL Monroe Warhawks",
                  "price": 400
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Appalachian State Mountaineers",
                  "price": -585
                },
                {
                  "name": "UL Monroe Warhawks",
                  "price": 410
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Appalachian State Mountaineers",
                  "price": -520
                },
                {
                  "name": "UL Monroe Warhawks",
                  "price": 385
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Appalachian State Mountaineers",
                  "price": -550
                },
                {
                  "name": "UL Monroe Warhawks",
                  "price": 400
                }
              ]
            }
          ]
        },
        {
          "key": "superbook",
          "title": "SuperBook",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Appalachian State Mountaineers",
                  "price": -550
                },
                {
                  "name": "UL Monroe Warhawks",
                  "price": 400
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Appalachian State Mountaineers",
                  "price": -525
                },
                {
                  "name": "UL Monroe Warhawks",
                  "price": 400
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:54:54Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:54Z",
              "outcomes": [
                {
                  "name": "Appalachian State Mountaineers",
                  "price": -556
                },
                {
                  "name": "UL Monroe Warhawks",
                  "price": 425
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "9f24e4d540cff6346a0824d6bb6f4783",
      "sport_key": "soccer_brazil_campeonato",
      "sport_title": "Brazil S\u00e9rie A",
      "commence_time": "2023-10-01T00:00:00Z",
      "home_team": "Internacional",
      "away_team": "Atletico Mineiro",
      "bookmakers": [
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:38Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:38Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 120
                },
                {
                  "name": "Internacional",
                  "price": 250
                },
                {
                  "name": "Draw",
                  "price": 220
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:37Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:37Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 120
                },
                {
                  "name": "Internacional",
                  "price": 250
                },
                {
                  "name": "Draw",
                  "price": 220
                }
              ]
            }
          ]
        },
        {
          "key": "betrivers",
          "title": "BetRivers",
          "last_update": "2023-09-30T23:55:38Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:38Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 120
                },
                {
                  "name": "Internacional",
                  "price": 250
                },
                {
                  "name": "Draw",
                  "price": 220
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:37Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:37Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 125
                },
                {
                  "name": "Internacional",
                  "price": 260
                },
                {
                  "name": "Draw",
                  "price": 190
                }
              ]
            }
          ]
        },
        {
          "key": "mybookieag",
          "title": "MyBookie.ag",
          "last_update": "2023-09-30T23:55:37Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:37Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 124
                },
                {
                  "name": "Internacional",
                  "price": 250
                },
                {
                  "name": "Draw",
                  "price": 205
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:38Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:38Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 125
                },
                {
                  "name": "Internacional",
                  "price": 250
                },
                {
                  "name": "Draw",
                  "price": 210
                }
              ]
            }
          ]
        },
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:55:38Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:38Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 125
                },
                {
                  "name": "Internacional",
                  "price": 260
                },
                {
                  "name": "Draw",
                  "price": 195
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:54:32Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:32Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 125
                },
                {
                  "name": "Internacional",
                  "price": 250
                },
                {
                  "name": "Draw",
                  "price": 200
                }
              ]
            }
          ]
        },
        {
          "key": "superbook",
          "title": "SuperBook",
          "last_update": "2023-09-30T23:55:38Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:38Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 125
                },
                {
                  "name": "Internacional",
                  "price": 240
                },
                {
                  "name": "Draw",
                  "price": 200
                }
              ]
            }
          ]
        },
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:37Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:37Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 130
                },
                {
                  "name": "Internacional",
                  "price": 255
                },
                {
                  "name": "Draw",
                  "price": 200
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:37Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:37Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 125
                },
                {
                  "name": "Internacional",
                  "price": 250
                },
                {
                  "name": "Draw",
                  "price": 205
                }
              ]
            }
          ]
        },
        {
          "key": "betus",
          "title": "BetUS",
          "last_update": "2023-09-30T23:55:37Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:37Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 118
                },
                {
                  "name": "Internacional",
                  "price": 256
                },
                {
                  "name": "Draw",
                  "price": 210
                }
              ]
            }
          ]
        },
        {
          "key": "lowvig",
          "title": "LowVig.ag",
          "last_update": "2023-09-30T23:55:39Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:39Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 130
                },
                {
                  "name": "Internacional",
                  "price": 270
                },
                {
                  "name": "Draw",
                  "price": 190
                }
              ]
            }
          ]
        },
        {
          "key": "betonlineag",
          "title": "BetOnline.ag",
          "last_update": "2023-09-30T23:56:07Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:07Z",
              "outcomes": [
                {
                  "name": "Atletico Mineiro",
                  "price": 130
                },
                {
                  "name": "Internacional",
                  "price": 270
                },
                {
                  "name": "Draw",
                  "price": 190
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "d3f8bfb37cd5f12e5d166a9fcb6c71a1",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-10-01T00:00:00Z",
      "home_team": "Virginia Tech Hokies",
      "away_team": "Pittsburgh Panthers",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Pittsburgh Panthers",
                  "price": -155
                },
                {
                  "name": "Virginia Tech Hokies",
                  "price": 130
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Pittsburgh Panthers",
                  "price": -152
                },
                {
                  "name": "Virginia Tech Hokies",
                  "price": 126
                }
              ]
            }
          ]
        },
        {
          "key": "betus",
          "title": "BetUS",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Pittsburgh Panthers",
                  "price": -155
                },
                {
                  "name": "Virginia Tech Hokies",
                  "price": 135
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Pittsburgh Panthers",
                  "price": -157
                },
                {
                  "name": "Virginia Tech Hokies",
                  "price": 128
                }
              ]
            }
          ]
        },
        {
          "key": "betrivers",
          "title": "BetRivers",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Pittsburgh Panthers",
                  "price": -157
                },
                {
                  "name": "Virginia Tech Hokies",
                  "price": 128
                }
              ]
            }
          ]
        },
        {
          "key": "lowvig",
          "title": "LowVig.ag",
          "last_update": "2023-09-30T23:55:22Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:22Z",
              "outcomes": [
                {
                  "name": "Pittsburgh Panthers",
                  "price": -155
                },
                {
                  "name": "Virginia Tech Hokies",
                  "price": 135
                }
              ]
            }
          ]
        },
        {
          "key": "betonlineag",
          "title": "BetOnline.ag",
          "last_update": "2023-09-30T23:55:53Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:53Z",
              "outcomes": [
                {
                  "name": "Pittsburgh Panthers",
                  "price": -156
                },
                {
                  "name": "Virginia Tech Hokies",
                  "price": 135
                }
              ]
            }
          ]
        },
        {
          "key": "williamhill_us",
          "title": "William Hill (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Pittsburgh Panthers",
                  "price": -155
                },
                {
                  "name": "Virginia Tech Hokies",
                  "price": 130
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Pittsburgh Panthers",
                  "price": -150
                },
                {
                  "name": "Virginia Tech Hokies",
                  "price": 130
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Pittsburgh Panthers",
                  "price": -135
                },
                {
                  "name": "Virginia Tech Hokies",
                  "price": 115
                }
              ]
            }
          ]
        },
        {
          "key": "superbook",
          "title": "SuperBook",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Pittsburgh Panthers",
                  "price": -150
                },
                {
                  "name": "Virginia Tech Hokies",
                  "price": 130
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "Pittsburgh Panthers",
                  "price": -150
                },
                {
                  "name": "Virginia Tech Hokies",
                  "price": 130
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:54:54Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:54Z",
              "outcomes": [
                {
                  "name": "Pittsburgh Panthers",
                  "price": -145
                },
                {
                  "name": "Virginia Tech Hokies",
                  "price": 125
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "c7cda1cb1e73666509f004288ab46a35",
      "sport_key": "americanfootball_ncaaf",
      "sport_title": "NCAAF",
      "commence_time": "2023-10-01T00:00:00Z",
      "home_team": "TCU Horned Frogs",
      "away_team": "West Virginia Mountaineers",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "TCU Horned Frogs",
                  "price": -520
                },
                {
                  "name": "West Virginia Mountaineers",
                  "price": 390
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "TCU Horned Frogs",
                  "price": -580
                },
                {
                  "name": "West Virginia Mountaineers",
                  "price": 420
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "TCU Horned Frogs",
                  "price": -560
                },
                {
                  "name": "West Virginia Mountaineers",
                  "price": 400
                }
              ]
            }
          ]
        },
        {
          "key": "betrivers",
          "title": "BetRivers",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "TCU Horned Frogs",
                  "price": -560
                },
                {
                  "name": "West Virginia Mountaineers",
                  "price": 400
                }
              ]
            }
          ]
        },
        {
          "key": "betus",
          "title": "BetUS",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "TCU Horned Frogs",
                  "price": -500
                },
                {
                  "name": "West Virginia Mountaineers",
                  "price": 385
                }
              ]
            }
          ]
        },
        {
          "key": "lowvig",
          "title": "LowVig.ag",
          "last_update": "2023-09-30T23:55:22Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:22Z",
              "outcomes": [
                {
                  "name": "TCU Horned Frogs",
                  "price": -500
                },
                {
                  "name": "West Virginia Mountaineers",
                  "price": 395
                }
              ]
            }
          ]
        },
        {
          "key": "betonlineag",
          "title": "BetOnline.ag",
          "last_update": "2023-09-30T23:55:53Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:53Z",
              "outcomes": [
                {
                  "name": "TCU Horned Frogs",
                  "price": -500
                },
                {
                  "name": "West Virginia Mountaineers",
                  "price": 395
                }
              ]
            }
          ]
        },
        {
          "key": "williamhill_us",
          "title": "William Hill (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "TCU Horned Frogs",
                  "price": -550
                },
                {
                  "name": "West Virginia Mountaineers",
                  "price": 400
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "TCU Horned Frogs",
                  "price": -525
                },
                {
                  "name": "West Virginia Mountaineers",
                  "price": 375
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "TCU Horned Frogs",
                  "price": -550
                },
                {
                  "name": "West Virginia Mountaineers",
                  "price": 400
                }
              ]
            }
          ]
        },
        {
          "key": "superbook",
          "title": "SuperBook",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "TCU Horned Frogs",
                  "price": -550
                },
                {
                  "name": "West Virginia Mountaineers",
                  "price": 400
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:41Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:41Z",
              "outcomes": [
                {
                  "name": "TCU Horned Frogs",
                  "price": -525
                },
                {
                  "name": "West Virginia Mountaineers",
                  "price": 400
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:54:54Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:54Z",
              "outcomes": [
                {
                  "name": "TCU Horned Frogs",
                  "price": -500
                },
                {
                  "name": "West Virginia Mountaineers",
                  "price": 390
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "dbd9aee12c8c88959f8166a6b71b7518",
      "sport_key": "baseball_mlb",
      "sport_title": "MLB",
      "commence_time": "2023-10-01T00:10:00Z",
      "home_team": "Arizona Diamondbacks",
      "away_team": "Houston Astros",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 110
                },
                {
                  "name": "Houston Astros",
                  "price": -130
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 110
                },
                {
                  "name": "Houston Astros",
                  "price": -130
                }
              ]
            }
          ]
        },
        {
          "key": "mybookieag",
          "title": "MyBookie.ag",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 109
                },
                {
                  "name": "Houston Astros",
                  "price": -133
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 110
                },
                {
                  "name": "Houston Astros",
                  "price": -135
                }
              ]
            }
          ]
        },
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 110
                },
                {
                  "name": "Houston Astros",
                  "price": -130
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 114
                },
                {
                  "name": "Houston Astros",
                  "price": -136
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 110
                },
                {
                  "name": "Houston Astros",
                  "price": -130
                }
              ]
            }
          ]
        },
        {
          "key": "betrivers",
          "title": "BetRivers",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 115
                },
                {
                  "name": "Houston Astros",
                  "price": -136
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 115
                },
                {
                  "name": "Houston Astros",
                  "price": -136
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 115
                },
                {
                  "name": "Houston Astros",
                  "price": -136
                }
              ]
            }
          ]
        },
        {
          "key": "williamhill_us",
          "title": "William Hill (US)",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 110
                },
                {
                  "name": "Houston Astros",
                  "price": -130
                }
              ]
            }
          ]
        },
        {
          "key": "betus",
          "title": "BetUS",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 116
                },
                {
                  "name": "Houston Astros",
                  "price": -126
                }
              ]
            }
          ]
        },
        {
          "key": "betonlineag",
          "title": "BetOnline.ag",
          "last_update": "2023-09-30T23:55:54Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:54Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 118
                },
                {
                  "name": "Houston Astros",
                  "price": -128
                }
              ]
            }
          ]
        },
        {
          "key": "lowvig",
          "title": "LowVig.ag",
          "last_update": "2023-09-30T23:55:45Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:45Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 118
                },
                {
                  "name": "Houston Astros",
                  "price": -128
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:54:57Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:57Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 120
                },
                {
                  "name": "Houston Astros",
                  "price": -132
                }
              ]
            }
          ]
        },
        {
          "key": "superbook",
          "title": "SuperBook",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Arizona Diamondbacks",
                  "price": 113
                },
                {
                  "name": "Houston Astros",
                  "price": -133
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "3b636528f5d8227cf9dcc05707735292",
      "sport_key": "baseball_mlb",
      "sport_title": "MLB",
      "commence_time": "2023-10-01T00:10:00Z",
      "home_team": "Colorado Rockies",
      "away_team": "Minnesota Twins",
      "bookmakers": [
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 114
                },
                {
                  "name": "Minnesota Twins",
                  "price": -135
                }
              ]
            }
          ]
        },
        {
          "key": "williamhill_us",
          "title": "William Hill (US)",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 115
                },
                {
                  "name": "Minnesota Twins",
                  "price": -135
                }
              ]
            }
          ]
        },
        {
          "key": "pointsbetus",
          "title": "PointsBet (US)",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 115
                },
                {
                  "name": "Minnesota Twins",
                  "price": -140
                }
              ]
            }
          ]
        },
        {
          "key": "betus",
          "title": "BetUS",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 122
                },
                {
                  "name": "Minnesota Twins",
                  "price": -132
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 115
                },
                {
                  "name": "Minnesota Twins",
                  "price": -135
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 114
                },
                {
                  "name": "Minnesota Twins",
                  "price": -136
                }
              ]
            }
          ]
        },
        {
          "key": "superbook",
          "title": "SuperBook",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 120
                },
                {
                  "name": "Minnesota Twins",
                  "price": -140
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 115
                },
                {
                  "name": "Minnesota Twins",
                  "price": -134
                }
              ]
            }
          ]
        },
        {
          "key": "betrivers",
          "title": "BetRivers",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 115
                },
                {
                  "name": "Minnesota Twins",
                  "price": -134
                }
              ]
            }
          ]
        },
        {
          "key": "mybookieag",
          "title": "MyBookie.ag",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 113
                },
                {
                  "name": "Minnesota Twins",
                  "price": -138
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:56:10Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:10Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 115
                },
                {
                  "name": "Minnesota Twins",
                  "price": -138
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:42Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:42Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 114
                },
                {
                  "name": "Minnesota Twins",
                  "price": -134
                }
              ]
            }
          ]
        },
        {
          "key": "wynnbet",
          "title": "WynnBET",
          "last_update": "2023-09-30T23:54:57Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:57Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 122
                },
                {
                  "name": "Minnesota Twins",
                  "price": -133
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:55:43Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:43Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 110
                },
                {
                  "name": "Minnesota Twins",
                  "price": -135
                }
              ]
            }
          ]
        },
        {
          "key": "lowvig",
          "title": "LowVig.ag",
          "last_update": "2023-09-30T23:55:45Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:45Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 121
                },
                {
                  "name": "Minnesota Twins",
                  "price": -132
                }
              ]
            }
          ]
        },
        {
          "key": "betonlineag",
          "title": "BetOnline.ag",
          "last_update": "2023-09-30T23:55:54Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:54Z",
              "outcomes": [
                {
                  "name": "Colorado Rockies",
                  "price": 121
                },
                {
                  "name": "Minnesota Twins",
                  "price": -132
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "98eb5820f0c3cde454440a75156d72f8",
      "sport_key": "boxing_boxing",
      "sport_title": "Boxing",
      "commence_time": "2023-10-01T00:15:00Z",
      "home_team": "Elijah Garcia",
      "away_team": "Jose Armando Resendiz",
      "bookmakers": [
        {
          "key": "betus",
          "title": "BetUS",
          "last_update": "2023-09-30T23:55:11Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:11Z",
              "outcomes": [
                {
                  "name": "Elijah Garcia",
                  "price": -285
                },
                {
                  "name": "Jose Armando Resendiz",
                  "price": 225
                }
              ]
            }
          ]
        },
        {
          "key": "bovada",
          "title": "Bovada",
          "last_update": "2023-09-30T23:55:25Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:25Z",
              "outcomes": [
                {
                  "name": "Elijah Garcia",
                  "price": -325
                },
                {
                  "name": "Jose Armando Resendiz",
                  "price": 230
                }
              ]
            }
          ]
        },
        {
          "key": "fanduel",
          "title": "FanDuel",
          "last_update": "2023-09-30T23:55:25Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:25Z",
              "outcomes": [
                {
                  "name": "Elijah Garcia",
                  "price": -400
                },
                {
                  "name": "Jose Armando Resendiz",
                  "price": 280
                }
              ]
            }
          ]
        },
        {
          "key": "draftkings",
          "title": "DraftKings",
          "last_update": "2023-09-30T23:55:25Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:25Z",
              "outcomes": [
                {
                  "name": "Elijah Garcia",
                  "price": -400
                },
                {
                  "name": "Jose Armando Resendiz",
                  "price": 290
                }
              ]
            }
          ]
        },
        {
          "key": "lowvig",
          "title": "LowVig.ag",
          "last_update": "2023-09-30T23:55:14Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:14Z",
              "outcomes": [
                {
                  "name": "Elijah Garcia",
                  "price": -285
                },
                {
                  "name": "Jose Armando Resendiz",
                  "price": 225
                }
              ]
            }
          ]
        },
        {
          "key": "betonlineag",
          "title": "BetOnline.ag",
          "last_update": "2023-09-30T23:56:03Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:56:03Z",
              "outcomes": [
                {
                  "name": "Elijah Garcia",
                  "price": -286
                },
                {
                  "name": "Jose Armando Resendiz",
                  "price": 225
                }
              ]
            }
          ]
        },
        {
          "key": "barstool",
          "title": "Barstool Sportsbook",
          "last_update": "2023-09-30T23:55:25Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:25Z",
              "outcomes": [
                {
                  "name": "Elijah Garcia",
                  "price": -350
                },
                {
                  "name": "Jose Armando Resendiz",
                  "price": 250
                }
              ]
            }
          ]
        },
        {
          "key": "betmgm",
          "title": "BetMGM",
          "last_update": "2023-09-30T23:54:09Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:54:09Z",
              "outcomes": [
                {
                  "name": "Elijah Garcia",
                  "price": -375
                },
                {
                  "name": "Jose Armando Resendiz",
                  "price": 275
                },
                {
                  "name": "Draw",
                  "price": 1600
                }
              ]
            }
          ]
        },
        {
          "key": "unibet_us",
          "title": "Unibet",
          "last_update": "2023-09-30T23:55:25Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:25Z",
              "outcomes": [
                {
                  "name": "Elijah Garcia",
                  "price": -400
                },
                {
                  "name": "Jose Armando Resendiz",
                  "price": 280
                }
              ]
            }
          ]
        },
        {
          "key": "twinspires",
          "title": "TwinSpires",
          "last_update": "2023-09-30T23:55:25Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:25Z",
              "outcomes": [
                {
                  "name": "Elijah Garcia",
                  "price": -400
                },
                {
                  "name": "Jose Armando Resendiz",
                  "price": 280
                }
              ]
            }
          ]
        },
        {
          "key": "betrivers",
          "title": "BetRivers",
          "last_update": "2023-09-30T23:55:25Z",
          "markets": [
            {
              "key": "h2h",
              "last_update": "2023-09-30T23:55:25Z",
              "outcomes": [
                {
                  "name": "Elijah Garcia",
                  "price": -400
                },
                {
                  "name": "Jose Armando Resendiz",
                  "price": 280
                }
              ]
            }
          ]
        }
      ]
    }
  ]

export default async function handler(req: any, res: any) {
    try {
      // Replace 'API_URL' with the actual URL of the API endpoint you want to request
      const API_URL = `https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=us&markets=h2h&oddsFormat=american&apiKey=${process.env.ODDS_API_KEY}`;
      // Make a GET request to the API endpoint
      const response = await fetch(API_URL);
      // Check if the response status is OK (200)
      if (response.ok) {
        // Parse the JSON response
        const data = await response.json();
        // Return the data in the response
        res.status(200).json(data);
      } else {
        // Handle non-OK response (e.g., 404, 500, etc.)
        res.status(response.status).json({ error: 'API request failed' });
      }
    } catch (error) {
      console.error('Error making API request:', error);
      res.status(500).json({ error: 'An error occurred while making the API request' });
    }
  }
  