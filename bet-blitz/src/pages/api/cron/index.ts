import { Event, PrismaClient, Result } from '@prisma/client';

//create prisma client
const prisma = new PrismaClient();

const updateOdds = async (res: any) => {
  let allOddsData: Event[] = [];

  // get the data from the odds api
  const API_URL = `https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=us&markets=h2h&oddsFormat=american&apiKey=${process.env.ODDS_API_KEY}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  const events = data;

  //TODO: add error handling for the fetch request if api call fails

  // if (response.ok) {
  //   // Parse the JSON response
  //   events = await response.json();
  //   // Return the data in the response

  // } else {
  //   // Handle non-OK response (e.g., 404, 500, etc.)
  //   res.status(response.status).json({ error: 'API request failed' });
  // }

  // Iterate over the data
  events.forEach((event: any) => {
    //if length of bookmakers is 0, then skip this event
    if (event.bookmakers.length === 0) {
      return;
    }
    const bookmaker = event.bookmakers[0];
    const market = bookmaker.markets[0];
    const outcome1 = market.outcomes[0];
    const outcome2 = market.outcomes[1];

    const oddsData: Event = {
      sportKey: event.sport_key,
      commenceTime: event.commence_time,
      homeTeam: event.home_team,
      awayTeam: event.away_team,
      teamOneName: outcome1.name,
      teamTwoName: outcome2.name,
      teamOneOdds: outcome1.price,
      teamTwoOdds: outcome2.price,
      result: Result.IN_PROGESS
    } as Event;

    allOddsData.push(oddsData);
  });

  //try and clear the events table
  try {
    await prisma.event.deleteMany({});
  } catch (error) {
    res.status(400).json({ message: 'error' })
  }

  //try and post all the data to the database
  try {
    await prisma.event.createMany({
      data: allOddsData
    });
    res.status(200).json(allOddsData);
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
}

const updateResults = () => {

}

export default async function handler(req: any, res: any) {
  if (req.query.key !== 'sharedKey') {
    res.status(404).end();
    return;
  }

  updateOdds(res);
}

