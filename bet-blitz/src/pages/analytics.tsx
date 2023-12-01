import TotalWinningsCard from "~/components/analytics/TotalWinningsCard";
import BettingPercentageCard from "~/components/analytics/BettingPercentageCard";
import BetsCard from "~/components/analytics/BetsCard";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { Bet, BetResult, Event } from "@prisma/client";
import { getWinPercentage, getWinnings } from "~/utils/analytics";
import { supabase } from "~/utils/supabaseClient";

export default function Analytics() {
  const [bets, setBets] = useState<
    (Bet & {
      Event: Event;
    })[]
  >([]);

  const { userId, getToken } = useAuth();

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

        setBets(
          data as (Bet & {
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
              <BetsCard />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
