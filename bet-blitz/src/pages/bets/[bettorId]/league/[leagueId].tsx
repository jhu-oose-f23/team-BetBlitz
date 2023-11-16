import { Bet, Bettor, Event, League } from "@prisma/client";
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
  const [leagueName, setLeagueName] = useState("");
  const router = useRouter();
  const bettorId = router.query.bettorId;
  const leagueId = router.query.leagueId;

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
              id, name
            )
            `,
          )
          .eq("bettorId", bettorId)
          .eq("leagueId", leagueId);

        setBets(
          bets as (Bet & {
            Event: Event;
            League: League;
          })[],
        );

        if (bets && bets.length > 0) {
          setBettorName(bets[0].Bettor.name);
          setLeagueName(bets[0].League.name);
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
      }
    };

    fetchData();
  }, [bettorId]);

  return (
    <main>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {bettorName !== "" ? (
          <div className="flex flex-col items-center justify-center gap-y-4">
            <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
              {bettorName}'s Bets
            </h1>
            <h4 className="text-3xl font-bold uppercase tracking-tight text-[#222831] sm:text-[3rem]">
              {leagueName}
            </h4>
          </div>
        ) : (
          <h1 className="text-center text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
            They haven't placed any bets!
          </h1>
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
                  if (bet.leagueId === leagueId) {
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
