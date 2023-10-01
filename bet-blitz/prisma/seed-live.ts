import { PrismaClient } from '@prisma/client';

//create prisma client
const prisma = new PrismaClient();


export default async function handler(req: any, res: any) {

  let allOddData: { sportKey: any; commenceTime: any; homeTeam: any; awayTeam: any; teamOneName: any; teamTwoName: any; teamOneOdd: any; teamTwoOdd: any; }[] = [];

  //get the data from the odds api
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

  //iterate over the data
  // Iterate over the data
  events.forEach((event: any) => {
    const bookmaker = event.bookmakers[0];
    const market = bookmaker.markets[0];
    const outcome1 = market.outcomes[0];
    const outcome2 = market.outcomes[1];
    const oddData = {
      sportKey: event.sport_key,
      commenceTime: event.commence_time,
      homeTeam: event.home_team,
      awayTeam: event.away_team,
      teamOneName: outcome1.name,
      teamTwoName: outcome2.name,
      teamOneOdd: outcome1.price,
      teamTwoOdd: outcome2.price
    }
    allOddData.push(oddData);
  });

  //try and clear the events table
  try {
    const deleteEvents = await prisma.event.deleteMany({})
  } catch (error) {
    res.status(400).json({ message: 'error' })
  }

  //try and post all the data to the database
  try {

    const newOdds = await prisma.event.createMany({
      data: allOddData
    })

    res.status(200).json({ message: 'success' })
  } catch (error) {
    res.status(400).json({ message: 'error' })
  }


}

