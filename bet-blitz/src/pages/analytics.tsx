import TotalWinningsCard from "~/components/analytics/TotalWinningsCard";
import BettingPercentageCard from "~/components/analytics/BettingPercentageCard";
import BetsCard from "~/components/analytics/BetsCard";
import CurrencyGraph from "~/components/analytics/AnalyticsGraph";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { Bet, BetResult, Event } from "@prisma/client";
import { getWinPercentage, getWinnings } from "~/utils/analytics";

export type BetWithEvent = Bet & {
  Event: Event;
};

export default function Analytics() {
  const [bets, setBets] = useState<
    (Bet & {
      Event: Event;
    })[]
  >([]);

  const { userId } = useAuth();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const { data, error } = await supabase
          .from("Bet")
          .select(
            `
              *,
              Event ( 
                homeTeam, awayTeam, teamOneOdds, teamTwoOdds, result
              )
            `,
          )
          .eq("bettorId", userId);

        //only get bets with postive bet ammount since bets with 0 value are part of a parlay
        const filterData = data?.filter((bet) => bet.amount > 1);

        setBets(
          filterData as (Bet & {
            Event: Event;
          })[],
        );
      }
    };
    fetchData();
  }, [userId]);

  const hasSettledBets = () => {
    for (let bet of bets) {
      if (bet.betResult !== BetResult.IN_PROGRESS) return true;
    }
    return false;
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
        Analytics
      </h1>
      {bets.length !== 0 && (
        <>
          {hasSettledBets() && (
            <div className="container flex justify-center">
              <div className="mx-4 grow">
                <TotalWinningsCard total={getWinnings(bets)} />
              </div>
              <div className="mx-4 grow">
                <BettingPercentageCard percentage={getWinPercentage(bets)} />
              </div>
            </div>
          )}

          <div className="container flex justify-center">
            <div className="mx-4 grow">
              <BetsCard bets={bets}/>
            </div>
          </div>
          <div>
            <CurrencyGraph/>
          </div>
        </>
      )}
    </div>
  );
}
