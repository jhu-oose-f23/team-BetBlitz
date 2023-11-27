import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { BetslipType } from "~/pages/bet";
import { dateToTimeString } from "~/utils/helpers";
import { EventResult } from "@prisma/client";

interface ParlayLegProps {
  parlayLeg: BetslipType;
  index: number;
  setParlayBets?: React.Dispatch<React.SetStateAction<BetslipType[]>>;
  setCalculatedOdds?: React.Dispatch<React.SetStateAction<number>>;
}

const handleRemoveLeg = (
  parlayLeg: BetslipType,
  setParlayBets: React.Dispatch<React.SetStateAction<BetslipType[]>>,
) => {
  setParlayBets((prev) => {
    return prev.filter((leg) => leg.event.id !== parlayLeg.event.id);
  });
};

const ParlayLeg: React.FC<ParlayLegProps> = ({
  parlayLeg,
  index,
  setParlayBets,
  setCalculatedOdds,
}) => {
  const event = parlayLeg.event;

  return (
    <Card
      key={`event${index}`}
      className="relative m-8 grow bg-white shadow-xl"
    >
      <Badge className="absolute left-0 top-0 -translate-y-4 translate-x-4 p-2 shadow-md">
        {dateToTimeString(event.commenceTime ? event.commenceTime : new Date())}
      </Badge>
      <Badge className="absolute right-0 top-0 -translate-y-4 translate-x-4 p-2 shadow-md">
        <div onClick={() => handleRemoveLeg(parlayLeg, setParlayBets!)}>
          Remove
        </div>
      </Badge>
      <CardHeader>
        <div className="flex flex-row items-center">
          <CardTitle className="text-md flex-grow">
            {event.teamOneName}
          </CardTitle>
          {parlayLeg.chosenResult === EventResult.AWAY_TEAM ? (
            <div className="ml-4 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground ">
              {event.teamOneOdds! > 0 ? "+" : ""}
              {event.teamOneOdds}
            </div>
          ) : (
            <div className="ml-4 h-10 rounded-md bg-slate-300 px-4 py-2 text-primary-foreground ">
              {event.teamOneOdds! > 0 ? "+" : ""}
              {event.teamOneOdds}
            </div>
          )}
        </div>

        <div className="flex items-center">
          <div className="w-4 border-t border-gray-400"></div>
          <span className="mx-4 flex-shrink font-black text-gray-400">@</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <div className="flex flex-row items-center">
          <CardTitle className="text-md flex-grow">
            {event.teamTwoName}
          </CardTitle>
          {parlayLeg.chosenResult === EventResult.HOME_TEAM ? (
            <div className="ml-4 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground ">
              {event.teamTwoOdds! > 0 ? "+" : ""}
              {event.teamTwoOdds}
            </div>
          ) : (
            <div className="ml-4 h-10 rounded-md bg-slate-300 px-4 py-2 text-primary-foreground   ">
              {event.teamTwoOdds! > 0 ? "+" : ""}
              {event.teamTwoOdds}
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default ParlayLeg;
