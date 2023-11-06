//write an API endpoint that hits https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=us&markets=h2h&oddsFormat=american&apiKey=aa362b26e5e964f7edad135db76031aa
// and then stores the data in a database using prisma

import { Event, PrismaClient, EventResult } from "@prisma/client";
import fs from "fs/promises";

//create prisma client
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

const updateOdds = async () => {
  //read data from sample_data.json
  const jsonData = await fs.readFile("./prisma/sample/odds.json", "utf8");
  const odds: OddsData[] = JSON.parse(jsonData);

  let events: Event[] = [];

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

const updateResults = async () => {
  const jsonData = await fs.readFile("./prisma/sample/scores.json", "utf8");
  const scoresData: ScoreData[] = JSON.parse(jsonData);

  if (scoresData) {
    scoresData.forEach(async (scoreData: ScoreData) => {
      if (scoreData.completed === true && scoreData.scores) {
        let homeTeamScore: number = 0; // +scoreData.scores[0]!.score;
        let awayTeamScore: number = 0; // +scoreData.scores[1]!.score;

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
          console.log(scoreData.id);
        } catch (e) {
          console.log(scoreData.id, "not found!"); // Shouldn't reach here in actual CRON job because every score
        } // received should be associated with a game already stored
      }
    });
  }
};

export default async function seedDatabase() {
  updateOdds().then(() => updateResults());
}

seedDatabase();
