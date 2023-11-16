import { Button } from "~/components/ui/button";
import { Bet, Event, EventResult, Parlay } from "@prisma/client";
import BetCard from "../bets/betCard";

type PropType = {
  index: number;
  parlay: Parlay & {
    Bet: (Bet & {
      Event: Event;
    })[];
  };
};

const ParlayCard = ({ index, parlay }: PropType) => {
  return (
    <section className="relative flex flex-col items-center justify-center">
      <div className="translate-y-1/2 rounded-xl bg-black px-4 py-2 font-semibold text-white shadow-xl">
        Wager:<span className="font-black"> {parlay.amount}₴</span>
      </div>
      <div
        className="flex scale-75 flex-row justify-center overflow-x-scroll"
        key={`parlayCard${index}`}
      >
        <div className="absolute top-1/2 z-0 h-1 w-4/5 translate-y-1/2 bg-black" />
        {parlay.Bet.map((bet, index) => {
          return (
            <BetCard
              index={index}
              bet={bet}
              key={`parlayBetCard${index}`}
              forParlay
            />
          );
        })}
      </div>
    </section>
  );
};

export default ParlayCard;
