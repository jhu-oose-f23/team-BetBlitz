import { PrismaClient, EventResult, Event, BetResult, Bet } from "@prisma/client";

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
    odds.forEach((curOdds: OddsData) => {
      if (curOdds.bookmakers.length > 0) {
        // check if FanDuel has the odds
        const bookmaker = curOdds.bookmakers[0];
        const market = bookmaker!.markets[0];
        const outcome1 = market.outcomes[0];
        const outcome2 = market.outcomes[1];

        const event = {
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

        events.push(event);
      }
    });
  }

  //TODO: add error handling for the fetch request if api call fails

  events.forEach(async (event: Event) => {
    await prisma.event.upsert({
      where: {
        id: event.id,
      },
      create: event,
      update: event,
    });
  });
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
        console.log(scoreData);
        console.log(scoreData.scores);
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
          } catch (e) {}
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

  events.forEach((event) => {
    event.bets.forEach(async (bet) => {
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
    });
  });
};

const updateParlays = async () => {
  const parlayBets = await prisma.bet.findMany({
    where: {
      //where parlay is not null
      parlayId: { not: null },
    },
  });

  //create a map of betId to event
  const betIdToBet = new Map<string, Bet>();
  parlayBets.forEach((bet) => {
    betIdToBet.set(bet.id, bet);
  });

  const parlays = await prisma.parlay.findMany({
    where: {
      NOT: { betResult: BetResult.IN_PROGRESS },
    },
    include: {
      bets: true,
    },
  });

  //go through each parlay and set it to a win if all bets are wins, loss if just one is a loss, and in progrress otherwise
  parlays.forEach(async (parlay) => {
    let parlayResult: BetResult = BetResult.IN_PROGRESS;
    parlay.bets.forEach((bet) => {
      if (bet.betResult === BetResult.LOSS) {
        parlayResult = BetResult.LOSS;
      } else if (bet.betResult === BetResult.IN_PROGRESS) {
        parlayResult = BetResult.IN_PROGRESS;
      }
    });

    if (parlayResult === BetResult.IN_PROGRESS) {
      let allBetsWon = true;
      parlay.bets.forEach((bet) => {
        if (bet.betResult !== BetResult.WIN) {
          allBetsWon = false;
        }
      });

      if (allBetsWon) {
        parlayResult = BetResult.WIN;
      }
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
        odds > 0 ? wagerAmount * (odds / 100) : wagerAmount * (100 / odds);

      const bettor = await prisma.bettor.findUnique({
        where: {
          id: bettorId,
        },
      });

      

    }
    
    if (parlayResult === BetResult.LOSS) {
      const bettorId = parlay.bettorId;
      const bettor = await prisma.bettor.findUnique({
        where: {
          id: bettorId,
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
          amount: (privateCurrency?.amount || 0) + parlay.amount,
        },
      });
    }





}

export default async function seedDatabase() {
  // const sportKeys = await getAllSports();
  const sportKeys = ["basketball_nba", "baseball_mlb", "americanfootball_nfl"]; // do this to reduce API calls, otherwise use getAllSports()

  updateOdds(sportKeys)
    .then(() => updateResults(sportKeys))
    .then(() => updateBets())
    .then(() => console.log("Success"))
    .catch((e) => console.error("Error:", e));
}

seedDatabase();
