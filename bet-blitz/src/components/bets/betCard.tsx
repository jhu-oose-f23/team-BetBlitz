import { Button } from "~/components/ui/button";
import { Bet, Event, EventResult } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { dateToTimeString } from "~/utils/helpers";

type PropType = {
  index: number;
  bet: Bet & {
    Event: Event;
  };
};

const BetCard = ({ index, bet }: PropType) => {
  const odds: number = (
    bet.chosenResult === EventResult.AWAY_TEAM
      ? bet.Event.teamOneOdds
      : bet.Event.teamTwoOdds
  )!;
  const oddsToString = odds > 0 ? `+${odds}` : odds?.toString();

  return (
    <Card className="flex h-[225px] w-[350px] flex-col" key={`bet${index}`}>
      <CardHeader>
        <CardTitle>
          {bet.chosenResult === EventResult.AWAY_TEAM
            ? bet.Event.teamOneName
            : bet.Event.teamTwoName}
        </CardTitle>
        <CardDescription>
          Odds: {oddsToString}
          <br />
          Placed at {dateToTimeString(bet.createdAt)}
        </CardDescription>
        <CardDescription>
          {bet.Event.teamOneName} vs {bet.Event.teamTwoName}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex grow items-end">
        <div className="font-semibold">
          Wager:<span className="font-black"> {bet.amount}₴</span>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-end text-sm text-s-500">
        Game on {dateToString(bet.Event.commenceTime!)}
      </CardFooter> */}
    </Card>
  );
};

export default BetCard;
