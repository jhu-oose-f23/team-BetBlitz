import { PrismaClient, Result, Event } from '@prisma/client';

// create prisma client
const prisma = new PrismaClient();

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

  for (let sportKey of sportKeys) {
    // get the data from the odds api
    const API_URL = `https://api.the-odds-api.com/v4/sports/${sportKey}/odd/?regions=us&markets=h2h&oddsFormat=american&apiKey=${process.env.ODDS_API_KEY}&bookmakers=fanduel`;
    const response = await fetch(API_URL);
    const odds: OddsData[] = Array.from(await response.json());

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
  };

  //TODO: add error handling for the fetch request if api call fails

  events.forEach(async (event: Event) => {
    await prisma.event.upsert({
      where: {
        id: event.id
      },
      create: event,
      update: event
    })
  });
}
const updateResults = async (sportKeys: string[]) => {
  for (const sportKey of sportKeys) {
    const API_URL = `https://api.the-odds-api.com/v4/sports/${sportKey}/scores/?apiKey=${process.env.ODDS_API_KEY}&daysFrom=1`;
    const response = await fetch(API_URL);
    const scoresData: ScoreData[] = Array.from(await response.json());

    if (scoresData) {
      for (const scoreData of scoresData) {
        if (scoreData.completed === true && scoreData.scores) {
          const homeTeamScore: number = +scoreData.scores[0]!.score;
          const awayTeamScore: number = +scoreData.scores[1]!.score;

          let result: Result = Result.DRAW;
          if (awayTeamScore > homeTeamScore) {
            result = Result.AWAY_TEAM
          } else if (awayTeamScore < homeTeamScore) {
            result = Result.HOME_TEAM
          }

          try {
            await prisma.event.update({
              where: {
                id: scoreData.id
              },
              data: {
                result
              }
            });
          } catch (e) {}
        }
      };
    }
  }
}


export default async function handler(req: any, res: any) {
  if (req.query.key !== 'sharedKey') {
    res.status(404).end();
    return;
  }

  const sportKeys = [
    "basketball_nba",
    "baseball_mlb",
    "americanfootball_nfl"
  ];

  try {
    await updateOdds(sportKeys)
      .then(() => updateResults(sportKeys))
      .then(res.status(200).end())
  } catch (e) {
    res.status(400).end();
    return;
  }
}
