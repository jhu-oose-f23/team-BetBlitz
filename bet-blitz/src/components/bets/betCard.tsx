import { Bet, BetResult, Event, EventResult } from "@prisma/client";
import { XCircle, CheckCircle, Timer } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
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

  //Determine whether a bet event is in progress or has ended
  const inProgress = (checkBet: Bet) => {
    if (checkBet.betResult == BetResult.IN_PROGRESS) {
      return true;
    } else {
      return false;
    }
  };

  //Determine whether a bet resulted in a win or loss
  const winOrLoss = (bet: Bet) => {
    if (bet.betResult == BetResult.WIN) {
      return true;
    } else if (bet.betResult == BetResult.LOSS) {
      return false;
    }
  };

  {/*The card will have a either yellow, red, or green border depending on the progress status, or win/loss status*/}
  return (
    <Card 
      className={twMerge(
        "w-[350px] border-4 z-40",
        inProgress(bet)
          ? "border-yellow-400"
          : winOrLoss(bet)
          ? "border-green-500"
          : "border-red-600",
        forParlay && "h-[200px] m-4",
      )}
      key={`bet${index}`}
    >
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
        {/*If the bet is in progress will include a yellow timer, if won a green check, and if lost a red X*/}
        <div className="absolute right-0 top-0 h-14 w-14">
          {inProgress(bet) ? (
            <Timer size={40} color="#f3cf00" />
          ) : winOrLoss(bet) ? (
            <CheckCircle size={40} color="#00cd00" /> 
          ) : (
            <XCircle size={40} color="#ff0000" />
          )}
        </div>
      </div>
      {!forParlay && (
        <CardContent>
          <div className="font-semibold">
            Wager:<span className="font-black"> {bet.amount}₴</span>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default BetCard;
