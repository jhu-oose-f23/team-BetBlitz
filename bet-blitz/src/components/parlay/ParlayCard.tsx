import { Bet, Event, Parlay } from "@prisma/client";
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
    <section className="relative flex flex-col items-center rounded-xl border border-4 border-black border-dashed p-4">
      <div className="rounded-xl bg-black px-4 py-2 font-semibold text-white shadow-xl">
        Wager:<span className="font-black"> {parlay.amount}₴</span>
      </div>
      <div
        className="flex flex-wrap justify-center"
        key={`parlayCard${index}`}
      >
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
