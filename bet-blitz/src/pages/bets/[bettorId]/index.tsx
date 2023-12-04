import { Bet, Event, League } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FilterBetsByLeagues from "~/components/bets/FilterBets";
import BetCard from "~/components/bets/betCard";

const Bets = () => {
  const [bets, setBets] = useState<
    (Bet & {
      Event: Event;
      League: League;
    })[]
  >([]);
  const [bettorName, setBettorName] = useState("");
  const [leagues, setLeagues] = useState<League[]>([]);
  const [filter, setFilter] = useState<string[]>([]);

  const router = useRouter();
  const bettorId = router.query.bettorId;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const fetchData = async () => {
      if (bettorId) {
        const { data: bets, error } = await supabase
          .from("Bet")
          .select(
            `
            *,
            Event ( 
              teamOneName, teamTwoName, teamOneOdds, teamTwoOdds, commenceTime
            ),
            League (
              id, name
            ),
            Bettor (
              name
            )
            `,
          )
          .eq("bettorId", bettorId);

        setBets(
          bets as (Bet & {
            Event: Event;
            League: League;
          })[],
        );

        if (bets && bets.length > 0) {
          setBettorName(bets[0].Bettor.name);
        }

        const curLeagues: League[] = [];
        bets?.forEach((bet) => {
          const curLeague = bet.League as League;
          if (curLeague) {
            if (!curLeagues.find((league) => league.id === curLeague.id)) {
              curLeagues.push(curLeague);
            }
          } else {
            curLeagues.push(curLeague); // Private currency
          }
        });
        setLeagues(curLeagues);
      }
    };

    fetchData();
  }, [bettorId]);

  return (
    <main>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
          {bettorName}'s Bets
        </h1>
        {leagues && (
          <FilterBetsByLeagues
            leagues={leagues}
            filter={filter}
            setFilter={setFilter}
          />
        )}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {bets &&
            bets.map(
              (
                bet: Bet & {
                  Event: Event;
                },
                index: number,
              ) => {
                if (bet.leagueId) {
                  if (!filter.includes(bet.leagueId!)) {
                    return (
                      <BetCard
                        index={index}
                        bet={bet}
                        key={`betCard${index}`}
                      />
                    );
                  }
                } else {
                  if (!filter.includes("privateCurrency")) {
                    return (
                      <BetCard
                        index={index}
                        bet={bet}
                        key={`betCard${index}`}
                      />
                    );
                  }
                }
              },
            )}
        </div>
      </div>
    </main>
  );
};

export default Bets;
