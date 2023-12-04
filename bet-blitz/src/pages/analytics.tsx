import TotalWinningsCard from "~/components/analytics/TotalWinningsCard";
import BettingPercentageCard from "~/components/analytics/BettingPercentageCard";
import RecentBets from "~/components/analytics/BetsTable";
import BetsCard from "~/components/analytics/BetsCard";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { Bet, BetResult, Event, EventResult } from "@prisma/client";
import { getWinPercentage, getWinnings } from "~/utils/analytics";
// React component for displaying analytics related to user bets
export default function Analytics() {
  // State variable for storing user's bets along with associated event details
  const [bets, setBets] = useState<
    (Bet & {
      Event: Event;
    })[]
  >([]);
// Fetch user authentication information using a custom hook
  const { userId, getToken } = useAuth();
// Create a connection to Supabase using environment variables
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
// Fetch user's bets from the database when the userId changes
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        // Query bets and associated event details from Supabase
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
    // Update the state with fetched data
        setBets(
          data as (Bet & {
            Event: Event;
          })[],
        );
      }
    };
    fetchData();
  }, [userId]);
// Check if there are settled bets (bets with a result other than 'IN_PROGRESS')
  const hasSettledBets = () => {
    for (let bet of bets) {
      if (bet.betResult !== BetResult.IN_PROGRESS) return true;
    }
    return false;
  };
// Render the component
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      {/* Display the title */}
      <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
        Analytics
      </h1>
      {/* Check if there are bets to display */}
      {bets.length !== 0 && (
        <>
        {/* Check if there are settled bets */}
          {hasSettledBets() && (
            <div className="container flex justify-center">
              {/* Display TotalWinningsCard and BettingPercentageCard */}
              <div className="mx-4 grow">
                <TotalWinningsCard total={getWinnings(bets)} />
              </div>
              <div className="mx-4 grow">
                <BettingPercentageCard percentage={getWinPercentage(bets)} />
              </div>
            </div>
          )}
        {/* Display BetsCard */}
          <div className="container flex justify-center">
            <div className="mx-4 grow">
              <BetsCard bets={bets} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
