import { useAuth } from "@clerk/nextjs";
import { Bet, Event, EventResult } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import BetCard from "~/components/bets/betCard";
// Bets component responsible for displaying user's bets
const Bets = () => {
  // State variable for storing user's bets along with associated event details
  const [bets, setBets] = useState<
    (Bet & {
      Event: Event;
    })[]
  >([]);
  // Fetch user authentication information using a custom hook
  const { userId } = useAuth();
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
              teamOneName, teamTwoName, teamOneOdds, teamTwoOdds, commenceTime
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
        // Log the fetched data for debugging purposes
        console.log(data);
      }
    };
// Invoke the fetchData function when the component mounts or when userId changes
    fetchData();
  }, [userId]);
// Render the component
  return (
    <main>
      {/* Main container for displaying user's bets */}
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {/* Title for the Bets section */}
        <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
          Your Bets
        </h1>
        {/* Display user's bets using BetCard components */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {bets &&
            bets.map(
              (
                bet: Bet & {
                  Event: Event;
                },
                index: number,
              ) => {
                return <BetCard index={index} bet={bet} />;
              },
            )}
        </div>
      </div>
    </main>
  );
};

export default Bets;
