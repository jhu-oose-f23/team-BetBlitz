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
import { twMerge } from "tailwind-merge";

type PropType = {
  index: number;
  bet: Bet & {
    Event: Event;
  };
  forParlay?: boolean;
};

const BetCard = ({ index, bet, forParlay }: PropType) => {
  const odds: number = (
    bet.chosenResult === EventResult.AWAY_TEAM
      ? bet.Event.teamOneOdds
      : bet.Event.teamTwoOdds
  )!;
  const oddsToString = odds > 0 ? `+${odds}` : odds?.toString();

  return (
    <Card className={twMerge("flex h-[225px] w-[350px] flex-col z-20 m-4", forParlay && "h-[175px]")} key={`bet${index}`}>
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
      {
        !forParlay &&
        <CardContent className="flex grow items-end">
          <div className="font-semibold">
            Wager:<span className="font-black"> {bet.amount}₴</span>
          </div>
        </CardContent>
      }

      {/* <CardFooter className="flex justify-end text-sm text-s-500">
        Game on {dateToString(bet.Event.commenceTime!)}
      </CardFooter> */}
    </Card>
  );
};

export default BetCard;
