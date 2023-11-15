import { useAuth } from "@clerk/nextjs";
import {
  Bet,
  BetResult,
  Event,
  EventResult,
  League,
  Parlay,
} from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { SetStateAction, useEffect, useState } from "react";
import FilterBetsByLeagues from "~/components/bets/FilterBets";
import BetCard from "~/components/bets/betCard";
import { calculateOdds } from "~/utils/helpers";
import { ParlayLegType } from "./parlay";
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
        Event: Event
      })[];
    })[]
  >([]);

  const [leagues, setLeagues] = useState<League[]>([]);
  const [filter, setFilter] = useState<string[]>([]);

  const { userId } = useAuth();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const { data: bets } = await supabase
          .from("Bet")
          .select(
            `
            *,
            Event ( 
              teamOneName, teamTwoName, teamOneOdds, teamTwoOdds, commenceTime
            ),
            League (
              id, name
            )
            `,
          )
          .eq("bettorId", userId)
          .is("parlayId", null);

        const { data: parlay } = await supabase
          .from("Parlay")
          .select(
            `
              *,
              Bet (
                *,
                Event (
                  *
                )
              )
            `,
          )
          .eq("bettorId", userId);

        setBets(
          bets as (Bet & {
            Event: Event;
            League: League;
          })[],
        );

        setParlayBets(
          parlay as (Parlay & {
            Bet: (Bet & {
              Event: Event
            })[];
          })[],
        );

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
  }, [userId]);

  return (
    <main>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
          Your Bets
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
        {
          parlayBets.length !== 0 &&
          <div className="w-full">
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 uppercase font-black tracking-none text-xl">Parlays</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8">
              {
                parlayBets.map(
                  (
                    parlay: (Parlay & {
                      Bet: (Bet & {
                        Event: Event
                      })[];
                    }),
                    index: number,
                  ) => <ParlayCard index={index} parlay={parlay} />,
                )}
            </div>
          </div>



        }
      </div>
    </main>
  );
};

export default Bets;
