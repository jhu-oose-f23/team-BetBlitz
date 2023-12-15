import Head from "next/head";

import { useEffect, useState } from "react";
import { BetResult, Event, EventResult } from "@prisma/client";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { supabaseClient } from "~/utils/supabaseClient";

import { useAuth } from "@clerk/nextjs";
import BetDialog from "~/components/betDialog";
import { toast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { dateToTimeString } from "~/utils/helpers";
import Link from "next/link";
import FilterTeams from "~/components/odds/FilterTeams";
import { useRouter } from "next/router";

export default function allOdds() {
  const [events, setEvents] = useState<Event[]>([]);
  const [query, setQuery] = useState("");

  const [currency, setCurrency] = useState<number | undefined>();
  const [currencyId, setCurrencyId] = useState<string>();

  const router = useRouter();

  const { userId, getToken } = useAuth();
  const leagueId = router.query.leagueId;

  const [checkNFL, setCheckNFL] = useState(true);
  const [checkNBA, setCheckNBA] = useState(true);
  const [checkMLB, setCheckMLB] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);
      const { data: events } = await supabase.from("Event").select();
      setEvents(events as Event[]);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (userId && leagueId) {
      const fetch = async () => {
        const token = await getToken({ template: "supabase" });
        const supabase = await supabaseClient(token);
        const { data: bettorInfo } = await supabase
          .from("LeagueBettorsCurrency")
          .select()
          .eq("bettorId", userId)
          .eq("leagueId", leagueId)
          .single();

        const currnecyId = bettorInfo?.currencyId;

        const { data: currency } = await supabase
          .from("Currency")
          .select()
          .eq("id", currnecyId)
          .single();

        setCurrency(currency.amount);
        setCurrencyId(currency.id);
      };

      fetch();
    }
  }, [userId, leagueId]);

  const handlePlaceBet = async (
    event: Event,
    odds: number,
    amount: number,
    chosenResult: EventResult,
  ) => {
    const token = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(token);

    if (supabase) {
      let curAmount;

      const amountResponse = await supabase
        .from("Currency")
        .select("amount")
        .eq("id", currencyId);
      if (amountResponse.data && amountResponse.data.length > 0) {
        curAmount = amountResponse.data[0]?.amount;
      }

      if (currencyId && curAmount) {
        if (curAmount - amount < 0) {
          toast({
            title: "You're broke",
            description: "Go make some money",
          });
        } else {
          await supabase.from("Bet").insert({
            bettorId: userId,
            gameId: event.id,
            leagueId,
            amount,
            odds,
            chosenResult,
            betResult: BetResult.IN_PROGRESS,
          });

          await supabase
            .from("Currency")
            .update({
              amount: curAmount - amount,
            })
            .eq("id", currencyId);

          setCurrency(curAmount - amount);

          toast({
            title: "Successfully created bet",
            description: `Game at ${dateToTimeString(event.commenceTime!)}`,
            action: (
              <ToastAction altText={"View bets"}>
                <Link href={"/bets"}>View bets</Link>
              </ToastAction>
            ),
          });
        }
      }
    } else {
      toast({
        title: "Error creating bet",
        description: "Please try again later",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Bet Blitz</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start bg-[#EEEEEE]">
        {currency ? (
          currency !== 0 ? (
            <div className="fixed right-0 z-50 translate-y-10 text-black">
              <span className="m-4 rounded-xl bg-black p-8 font-black text-white underline shadow-xl">
                {currency.toFixed(2)} ₴
              </span>
            </div>
          ) : (
            <div className="fixed right-0 z-50 translate-y-10 text-black">
              <span className="m-4 rounded-xl bg-black p-8 font-black text-white underline shadow-xl">
                You have no Blitz Bucks!
              </span>
            </div>
          )
        ) : (
          <></>
        )}
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
            Bet Blitz
          </h1>
          <FilterTeams
            checkNFL={checkNFL}
            setCheckNFL={setCheckNFL}
            checkMLB={checkMLB}
            setCheckMLB={setCheckMLB}
            checkNBA={checkNBA}
            setCheckNBA={setCheckNBA}
          />
          {events && (
            <div className="w-full max-w-xl">
              <Input
                placeholder="Search up a team"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
            </div>
          )}
          <div className="flex w-full flex-wrap justify-center">
            {events &&
              events
                .filter((event: Event) => {
                  if (checkNFL && event.sportKey === "americanfootball_nfl") {
                    return true;
                  }
                  if (checkNBA && event.sportKey === "basketball_nba") {
                    return true;
                  }
                  if (checkMLB && event.sportKey === "baseball_mlb") {
                    return true;
                  }
                  if (new Date() < event.commenceTime!) {
                    return true;
                  }
                  return false;
                })
                .filter((event: Event) => {
                  if (new Date() > new Date(event.commenceTime!)) {
                    return false;
                  }
                  if (
                    event.awayTeam
                      ?.toLowerCase()
                      .includes(query.toLowerCase()) ||
                    event.homeTeam?.toLowerCase().includes(query.toLowerCase())
                  ) {
                    return true;
                  }
                  return false;
                })
                .map((event: Event, index: number) => {
                  return (
                    <Card
                      key={`event${index}`}
                      className="relative m-8 w-80 bg-white shadow-xl"
                    >
                      <Badge className="absolute left-0 top-0 -translate-y-4 translate-x-4 p-2 shadow-md">
                        {dateToTimeString(
                          event.commenceTime ? event.commenceTime : new Date(),
                        )}
                      </Badge>
                      <CardHeader>
                        <div className="flex flex-row items-center">
                          <CardTitle className="text-md flex-grow">
                            {event.teamOneName}
                          </CardTitle>
                          {event.teamOneOdds && event.teamOneName && (
                            <BetDialog
                              odds={event.teamOneOdds}
                              name={event.teamOneName}
                              handlePlaceBet={async (amount: number) => {
                                handlePlaceBet(
                                  event,
                                  event.teamOneOdds!,
                                  amount,
                                  EventResult.AWAY_TEAM,
                                );
                              }}
                            />
                          )}
                        </div>

                        <div className="flex items-center">
                          <div className="w-4 border-t border-gray-400"></div>
                          <span className="mx-4 flex-shrink font-black text-gray-400">
                            @
                          </span>
                          <div className="flex-grow border-t border-gray-400"></div>
                        </div>

                        <div className="flex flex-row items-center">
                          <CardTitle className="text-md flex-grow">
                            {event.teamTwoName}
                          </CardTitle>
                          {event.teamTwoOdds && event.teamTwoName && (
                            <BetDialog
                              odds={event.teamTwoOdds}
                              name={event.teamTwoName}
                              handlePlaceBet={async (amount: number) => {
                                handlePlaceBet(
                                  event,
                                  event.teamTwoOdds!,
                                  amount,
                                  EventResult.HOME_TEAM,
                                );
                              }}
                            />
                          )}
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
          </div>
        </div>
      </main>
    </>
  );
}
