import { Button } from "~/components/ui/button";
import { Bet, Event, EventResult, Parlay } from "@prisma/client";
import BetCard from "../bets/betCard";

type PropType = {
  index: number;
  parlay: (Parlay & {
    Bet: (Bet & {
      Event: Event
    })[];
  })
};

const ParlayCard = ({ index, parlay }: PropType) => {
  return (
    <section className="flex flex-col items-center justify-center relative">
      <div className="font-semibold bg-black rounded-xl px-4 py-2 shadow-xl translate-y-1/2 text-white">
        Wager:<span className="font-black"> {parlay.amount}₴</span>
      </div>
      <div className="flex flex-row justify-center scale-75 overflow-x-scroll" key={`parlayCard${index}`}>
        <div className="w-4/5 absolute h-1 bg-black top-1/2 translate-y-1/2 z-0" />
        {
          parlay.Bet.map((bet, index) => {
            return <BetCard index={index} bet={bet} key={`parlayBetCard${index}`} forParlay />
          })
        }
      </div>
    </section>
  );
};

export default ParlayCard;
