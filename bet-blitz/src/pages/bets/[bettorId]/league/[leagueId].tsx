import { Bet, Bettor, Event, League, Parlay } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FilterBetsByLeagues from "~/components/bets/FilterBets";
import BetCard from "~/components/bets/betCard";
import ParlayCard from "~/components/parlay/ParlayCard";

const Bets = () => {
  const [bets, setBets] = useState<
    (Bet & {
      Event: Event;
      League: League;
    })[]
  >([]);
  const [parlayBets, setParlayBets] = useState<
    (Parlay & {
      Bet: (Bet & {
        Event: Event;
      })[];
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
          .eq("leagueId", leagueId)
          .is("parlayId", null);

        const { data: parlays } = await supabase
          .from("Parlay")
          .select(
            `
              *,
              Bet (
                *,
                Event (
                  *
                ),
                Bettor (
                  id, name
                )
              ),
              League (
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

        setParlayBets(
          parlays as (Parlay & {
            League: League;
            Bet: (Bet & {
              Event: Event;
            })[];
          })[],
        );

        if (bets && bets.length > 0) {
          setBettorName(bets[0].Bettor.name);
          setLeagueName(bets[0].League.name);
        }
        if (parlays && parlays.length > 0) {
          setBettorName(parlays[0].Bet[0].Bettor.name);
          setLeagueName(parlays[0].League.name);
        }
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
        {parlayBets.length !== 0 && (
          <div className="w-full">
            <div className="relative flex items-center py-5">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="tracking-none mx-4 flex-shrink text-xl font-black uppercase">
                Parlays
              </span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8">
              {parlayBets &&
                parlayBets.map(
                  (
                    parlay: Parlay & {
                      Bet: (Bet & {
                        Event: Event;
                      })[];
                    },
                    index: number,
                  ) => (
                    <div key={`parlayCard${index}`}>
                      <ParlayCard index={index} parlay={parlay} key={`parlayCard${index}`} />
                    </div>

                  ),
                )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Bets;
