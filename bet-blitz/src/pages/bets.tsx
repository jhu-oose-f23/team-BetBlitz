import { useAuth } from "@clerk/nextjs";
import { Bet, BetResult, Event, EventResult } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import BetCard from "~/components/bets/betCard";

const Bets = () => {
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
              teamOneName, teamTwoName, teamOneOdds, teamTwoOdds, commenceTime
            )
            `,
          )
          .eq("bettorId", userId);

        setBets(
          data as (Bet & {
            Event: Event;
          })[],
        );
        console.log(data);
      }
    };

    fetchData();
  }, [userId]);

  // const getBorder = (betCard: Bet, index: number) => {
  //   if (betCard.betResult == BetResult.IN_PROGRESS){
  //     return <BetCard index={index} bet={betCard} />;
  //   } else if (betCard.betResult == BetResult.WIN){
  //     return <BetCard index={index} bet={betCard} className="border-green-500"/>;
  //   } else if (betCard.betResult == BetResult.LOSS){
  //     return <BetCard index={index} bet={betCard} className="border-red-600"/>;
  //   }
  // }

  return (
    <main>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
          Your Bets
        </h1>
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
