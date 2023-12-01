import {
  PrismaClient,
  EventResult,
  Event,
  BetResult,
} from "@prisma/client";

// create prisma client
const prisma = new PrismaClient();

type ScoreData = {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  completed: boolean;
  home_team: string;
  away_team: string;
  scores:
  | {
    name: string;
    score: string;
  }[]
  | null;
  last_update: string | null;
};

type OddsData = {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: {
    key: string;
    title: string;
    last_update: string;
    markets: any[];
  }[];
};

const updateOdds = async (sportKeys: string[]) => {
  let events: Event[] = [];

  for (let sportKey of sportKeys) {
    // get the data from the odds api
    const API_URL = `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?regions=us&markets=h2h&oddsFormat=american&apiKey=${process.env.ODDS_API_KEY}&bookmakers=fanduel`;
    const response = await fetch(API_URL);
    const odds: OddsData[] = Array.from(await response.json());

    // Iterate over the data
    for (let curOdds of odds) {
      if (curOdds.bookmakers.length > 0) {
        // check if FanDuel has the odds
        const bookmaker = curOdds.bookmakers[0];
        const market = bookmaker!.markets[0];
        const outcome1 = market.outcomes[0];
        const outcome2 = market.outcomes[1];

        let event: Event;

        if (outcome1.name === curOdds.away_team) {
          event = {
            id: curOdds.id,
            sportKey: curOdds.sport_key,
            commenceTime: new Date(curOdds.commence_time),
            homeTeam: curOdds.home_team,
            awayTeam: curOdds.away_team,
            teamOneName: outcome1.name,
            teamTwoName: outcome2.name,
            teamOneOdds: outcome1.price,
            teamTwoOdds: outcome2.price,
            result: EventResult.IN_PROGESS,
          } as Event;
        } else {
          event = {
            id: curOdds.id,
            sportKey: curOdds.sport_key,
            commenceTime: new Date(curOdds.commence_time),
            homeTeam: curOdds.home_team,
            awayTeam: curOdds.away_team,
            teamOneName: outcome2.name,
            teamTwoName: outcome1.name,
            teamOneOdds: outcome2.price,
            teamTwoOdds: outcome1.price,
            result: EventResult.IN_PROGESS,
          } as Event;
        }

        events.push(event);
      }
    };
  }

  for (let event of events) {
    await prisma.event.upsert({
      where: {
        id: event.id,
      },
      create: event,
      update: event,
    });
  };
};

const getAllSports = async () => {
  const API_URL = `https://api.the-odds-api.com/v4/sports/?apiKey=${process.env.ODDS_API_KEY}`;
  const response = await fetch(API_URL);
  const sports = await response.json();

  let sportsKeys: string[] = [];
  for (const sport of sports) {
    sportsKeys.push(sport.key);
  }
  return sportsKeys;
};

const updateResults = async (sportKeys: string[]) => {
  for (const sportKey of sportKeys) {
    const API_URL = `https://api.the-odds-api.com/v4/sports/${sportKey}/scores/?apiKey=${process.env.ODDS_API_KEY}&daysFrom=1`;
    const response = await fetch(API_URL);
    const scoresData: ScoreData[] = Array.from(await response.json());

    if (scoresData) {
      for (const scoreData of scoresData) {
        if (scoreData.completed === true && scoreData.scores) {
          let homeTeamScore: number = 0;
          let awayTeamScore: number = 0;

          if (scoreData.home_team === scoreData.scores[0]!.name) {
            homeTeamScore = +scoreData.scores[0]!.score;
            awayTeamScore = +scoreData.scores[1]!.score;
          } else {
            awayTeamScore = +scoreData.scores[0]!.score;
            homeTeamScore = +scoreData.scores[1]!.score;
          }

          let result: EventResult = EventResult.DRAW;
          if (awayTeamScore > homeTeamScore) {
            result = EventResult.AWAY_TEAM;
          } else if (awayTeamScore < homeTeamScore) {
            result = EventResult.HOME_TEAM;
          }

          try {
            await prisma.event.update({
              where: {
                id: scoreData.id,
              },
              data: {
                result,
              },
            });
          } catch (e) { }
        }
      }
    }
  }
};

const updateBets = async () => {
  const events = await prisma.event.findMany({
    where: {
      NOT: { result: EventResult.IN_PROGESS },
    },
    include: {
      bets: true,
    },
  });

  for (let event of events) {
    for (let bet of event.bets) {
      if (bet.betResult === BetResult.IN_PROGRESS) {
        if (bet.chosenResult === event.result) {
          const wagerAmount = bet.amount;
          const bettorId = bet.bettorId;

          const odds = bet.odds;
          const winAmount =
            odds > 0
              ? wagerAmount * (odds / 100)
              : wagerAmount * (100 / Math.abs(odds));

          const bettor = await prisma.bettor.findUnique({
            where: {
              id: bettorId,
            },
          });

          if (bet.parlayId == null) {
            if (bet.leagueId) {
              // BET WAS MADE IN A LEAGUE
              const leagueId = bet.leagueId;

              const leagueBettorsCurrency =
                await prisma.leagueBettorsCurrency.findFirst({
                  where: {
                    leagueId,
                    bettorId,
                  },
                });

              const currencyId = leagueBettorsCurrency?.currencyId;
              const currency = await prisma.currency.findUnique({
                where: {
                  id: currencyId,
                },
              });

              await prisma.currency.update({
                where: {
                  id: currencyId,
                },
                data: {
                  amount: (currency?.amount || 0) + wagerAmount + winAmount,
                },
              });
            } else {
              // BET WAS MADE USING PRIVATE CURRENCY (NON-LEAGUE CURRENCY)
              const privateCurrency = await prisma.currency.findUnique({
                where: {
                  id: bettor?.privateCurrencyId,
                },
              });

              await prisma.currency.update({
                where: {
                  id: bettor?.privateCurrencyId,
                },
                data: {
                  amount:
                    (privateCurrency?.amount || 0) + wagerAmount + winAmount,
                },
              });
            }
          }

          await prisma.bet.update({
            where: {
              id: bet.id,
            },
            data: {
              betResult: BetResult.WIN,
            },
          });
        } else {
          await prisma.bet.update({
            where: {
              id: bet.id,
            },
            data: {
              betResult: BetResult.LOSS,
            },
          });
        }
      }
    };
  };
};

const updateParlays = async () => {
  const parlays = await prisma.parlay.findMany({
    include: {
      bets: true,
    },
  });

  //go through each parlay and set it to a win if all bets are wins, loss if just one is a loss, and in progress otherwise
  for (let parlay of parlays) {
    let parlayResult: BetResult = parlay.betResult;
    if (parlayResult === BetResult.IN_PROGRESS) {
      let allBetsWon = true;
      let atLeastOneLoss = false;
      for (let bet of parlay.bets) {
        // at least one bet is a loss
        if (bet.betResult !== BetResult.WIN) {
          allBetsWon = false;
        }

        if (bet.betResult === BetResult.LOSS) {
          atLeastOneLoss = true;
        }
      };

      if (allBetsWon) {
        parlayResult = BetResult.WIN;
      } else if (atLeastOneLoss) {
        parlayResult = BetResult.LOSS;
      } else {
        parlayResult = BetResult.IN_PROGRESS;
      }

      await prisma.parlay.update({
        where: {
          id: parlay.id,
        },
        data: {
          betResult: parlayResult,
        },
      });

      if (parlayResult === BetResult.WIN) {
        const wagerAmount = parlay.amount;
        const bettorId = parlay.bettorId;

        const odds = parlay.odds;
        const winAmount =
          odds > 0
            ? wagerAmount * (odds / 100)
            : wagerAmount * (100 / Math.abs(odds));

        if (parlay.leagueId) {
          const leagueId = parlay.leagueId;

          const leagueBettorsCurrency =
            await prisma.leagueBettorsCurrency.findFirst({
              where: {
                leagueId,
                bettorId,
              },
            });

          const currencyId = leagueBettorsCurrency?.currencyId;
          const currency = await prisma.currency.findUnique({
            where: {
              id: currencyId,
            },
          });

          await prisma.currency.update({
            where: {
              id: currencyId,
            },
            data: {
              amount: (currency?.amount || 0) + wagerAmount + winAmount,
            },
          });
        } else {
          const bettor = await prisma.bettor.findUnique({
            where: {
              id: bettorId,
            },
            include: {
              privateCurrency: true,
            },
          });

          const privateCurrency = await prisma.currency.findUnique({
            where: {
              id: bettor?.privateCurrencyId,
            },
          });

          await prisma.currency.update({
            where: {
              id: bettor?.privateCurrencyId,
            },
            data: {
              amount:
                (bettor?.privateCurrency?.amount || 0) + wagerAmount + winAmount,
            },
          });
        }
      }
    }
  };
};

export default async function handler(req: any, res: any) {
  if (req.query.key !== "sharedKey") {
    res.status(404).end();
    return;
  }

  const sportKeys = ["basketball_nba", "baseball_mlb", "americanfootball_nfl"];

  try {
    await updateOdds(sportKeys)
      .then(() => updateResults(sportKeys))
      .then(() => updateBets())
      .then(() => updateParlays())
      .then(() => console.log("Success"))
      .catch((e) => console.error("Error:", e));
  } catch (e) {
    res.status(400).end();
    return;
  }

  res.status(200).end();
}
