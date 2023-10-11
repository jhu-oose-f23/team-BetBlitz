import { PrismaClient, Result, Event } from '@prisma/client';

// create prisma client
const prisma = new PrismaClient();

type SportData = {
  key: string,
  group: string,
  title: string,
  description: string,
  active: boolean,
  has_outrights: boolean
}

type ScoreData = {
  id: string,
  sport_key: string,
  sport_title: string,
  commence_time: string,
  completed: boolean,
  home_team: string,
  away_team: string,
  scores: {
    name: string,
    score: string
  }[] | null,
  last_update: string | null
}

type OddsData = {
  id: string,
  sport_key: string,
  sport_title: string,
  commence_time: string,
  home_team: string,
  away_team: string,
  bookmakers: {
    key: string,
    title: string,
    last_update: string,
    markets: any[]
  }[]
}

const updateOdds = async (sportKeys: string[]) => {
  let events: Event[] = [];

  sportKeys.forEach(async (sportKey: string) => {
    // get the data from the odds api
    const API_URL = `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?regions=us&markets=h2h&oddsFormat=american&apiKey=${process.env.ODDS_API_KEY}&bookmakers=fanduel`;
    const response = await fetch(API_URL);
    const odds: OddsData[] = await response.json();

    // Iterate over the data
    odds.forEach((curOdds: OddsData) => {
      if (curOdds.bookmakers.length > 0) { // check if FanDuel has the odds
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
          result: Result.IN_PROGESS
        } as Event;

        events.push(event);
      }
    });
  })

  //TODO: add error handling for the fetch request if api call fails

  events.forEach(async (event: Event) => {
    await prisma.event.upsert({
      where: {
        id: event.id
      },
      create: event,
      update: event
    })
  })
}

const getAllSports = async () => {
  const API_URL = `https://api.the-odds-api.com/v4/sports/?apiKey=${process.env.ODDS_API_KEY}`;
  const response = await fetch(API_URL);
  const sports = await response.json();

  let sportsKeys: string[] = []
  sports.forEach((sport: SportData) => {
    sportsKeys.push(sport.key);
  });
  return sportsKeys;
}

const updateResults = async () => {
  const sportKeys = await getAllSports();
  sportKeys.forEach(async (sportKey: string) => {
    const API_URL = `https://api.the-odds-api.com/v4/sports/${sportKey}/scores/?apiKey=${process.env.ODDS_API_KEY}`;
    const response = await fetch(API_URL);
    const scoresData: ScoreData[] = Array.from(await response.json());

    if (scoresData) {
      scoresData.forEach(async (scoreData: ScoreData) => {
        if (scoreData.completed === true && scoreData.scores) {
          const awayTeamScore: number = +scoreData.scores[0]!.score;
          const homeTeamScore: number = +scoreData.scores[1]!.score;

          let result: Result = Result.DRAW;
          if (awayTeamScore > homeTeamScore) {
            result = Result.AWAY_TEAM
          } else if (awayTeamScore < homeTeamScore) {
            result = Result.HOME_TEAM
          }

          prisma.event.update({
            where: {
              id: scoreData.id
            },
            data: {
              result
            }
          });
        }
      });
    }
  })
}

export default async function seedDatabase() {
  getAllSports()
    .then((sportKeys) => updateOdds(sportKeys))
    .then(() => updateResults())
    .then(() => console.log("Success"))
    .catch((e) => console.error("Error"));
}

seedDatabase();