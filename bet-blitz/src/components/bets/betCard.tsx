import { Button } from "~/components/ui/button";
import { Bet, BetResult, Event, EventResult } from "@prisma/client";
import { XCircle, CheckCircle, Timer } from "lucide-react";
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
};

const BetCard = ({ index, bet }: PropType) => {
  const odds: number = (
    bet.chosenResult === EventResult.AWAY_TEAM
      ? bet.Event.teamOneOdds
      : bet.Event.teamTwoOdds
  )!;
  const oddsToString = odds > 0 ? `+${odds}` : odds?.toString();

const inProgress = (checkBet: Bet) => {
  if (checkBet.betResult == BetResult.IN_PROGRESS){
    return true;
  } else{
    return false;
  }
}

const winOrLoss = (bet: Bet) => {
  if (bet.betResult == BetResult.WIN) {
    return true;
  } else if (bet.betResult == BetResult.LOSS){
    return false;
  } 
}

  return (
    <Card className={twMerge("w-[350px] border-4", inProgress(bet) 
    ? "border-yellow-400" 
    : winOrLoss(bet) ? "border-green-500" : "border-red-600" )} key={`bet${index}`}>
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
      <div className="relative h-2">
        <div className="absolute top-0 right-0 h-14 w-14">
        {inProgress(bet)
          ? <Timer size={40} color="#f3cf00"/>
          : winOrLoss(bet) ? <CheckCircle size={40} color="#00cd00"/> : <XCircle size={40} color="#ff0000"/>
        }
        </div>
      </div>
      <CardContent>
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
