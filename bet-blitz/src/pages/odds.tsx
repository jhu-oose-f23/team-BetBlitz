import Head from "next/head";

import { useEffect, useState } from "react";
import { BetResult, Event, EventResult } from "@prisma/client";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { supabaseClient } from "~/utils/supabaseClient";

import { useAuth } from "@clerk/nextjs";
//import { SupabaseClient, createClient } from "@supabase/supabase-js";
import BetDialog from "~/components/betDialog";
import { toast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { dateToTimeString } from "~/utils/helpers";
import Link from "next/link";
import FilterTeams from "~/components/odds/FilterTeams";

// React component for displaying and handling betting on sports events
export default function allOdds() {
  // State variables for events, user currency, and search query
  const [events, setEvents] = useState<Event[]>([]);
  const [currency, setCurrency] = useState<number | undefined>();
  const [query, setQuery] = useState("");
  // Authentication-related variables using the useAuth hook
  const { userId, getToken } = useAuth();
// State variables for filtering sports events by league (NFL, NBA, MLB)
  const [checkNFL, setCheckNFL] = useState(true);
  const [checkNBA, setCheckNBA] = useState(true);
  const [checkMLB, setCheckMLB] = useState(true);
// Fetch all events when the component mounts
  useEffect(() => {
    const fetch = async () => {
      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);
      const { data: events } = await supabase.from("Event").select();
      setEvents(events as Event[]);
    };
    fetch();
  }, []);
// Fetch user's private currency amount when userId changes
  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        const token = await getToken({ template: "supabase" });
        const supabase = await supabaseClient(token);
        const { data: bettor } = await supabase
          .from("Bettor")
          .select("privateCurrencyId")
          .eq("id", userId)
          .single();

        const privateCurrencyId = bettor?.privateCurrencyId;

        console.log(bettor, userId);
// Fetch private currency amount using privateCurrencyId
        const { data: privateCurrency } = await supabase
          .from("Currency")
          .select("amount")
          .eq("id", privateCurrencyId)
          .single();

        setCurrency(privateCurrency?.amount);
      };

      fetch();
    }
  }, [userId]);
// Handle placing a bet on a sports event
  const handlePlaceBet = async (
    event: Event,
    odds: number,
    amount: number,
    chosenResult: EventResult,
  ) => {
    const token = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(token);

    if (supabase) {
      let privateCurrencyId, curAmount;
     // Fetch privateCurrencyId using userId  
      const privateCurrencyIdResponse = await supabase
        .from("Bettor")
        .select("privateCurrencyId")
        .eq("id", userId);
      if (
        privateCurrencyIdResponse.data &&
        privateCurrencyIdResponse.data.length > 0
      ) {
        privateCurrencyId =
          privateCurrencyIdResponse.data[0]?.privateCurrencyId;
      }
    // Fetch current private currency amount using privateCurrencyId
      const amountResponse = await supabase
        .from("Currency")
        .select("amount")
        .eq("id", privateCurrencyId);
      if (amountResponse.data && amountResponse.data.length > 0) {
        curAmount = amountResponse.data[0]?.amount;
      }
    // Check if the user has sufficient funds to place the bet
      if (privateCurrencyId && curAmount) {
        if (curAmount - amount < 0) {
          toast({
            title: "You're broke",
            description: "Go make some money",
          });
        } else {
          // Insert a new bet record and update the user's currency amount
          await supabase.from("Bet").insert({
            bettorId: userId,
            gameId: event.id,
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
            .eq("id", privateCurrencyId);

          setCurrency(curAmount - amount);
        // Display a success toast message with a link to view bets
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
      // Display an error toast message if there's an issue with Supabase
      toast({
        title: "Error creating bet",
        description: "Please try again later",
      });
    }
  };
// Render the main component
  return (
    <>
    {/* Head component with title and meta tags */}
      <Head>
        <title>Bet Blitz</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Main content area */}
      <main className="flex min-h-screen flex-col items-center justify-start bg-[#EEEEEE]">
        {/* Display user's currency if available */}
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
        {/* Main content container */}
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
            Bet Blitz
          </h1>
          {/* FilterTeams component for filtering sports events by league */}
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
          {/* Display filtered sports events */}
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
                  return false;
                })
                .filter((event: Event) => {
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
                      {/* Badge with the commence time of the event */}
                      <Badge className="absolute left-0 top-0 -translate-y-4 translate-x-4 p-2 shadow-md">
                        {dateToTimeString(
                          event.commenceTime ? event.commenceTime : new Date(),
                        )}
                      </Badge>
                      {/* Card header with team names and odds */}
                      <CardHeader>
                        {/* Team One section */}
                        <div className="flex flex-row items-center">
                          <CardTitle className="text-md flex-grow">
                            {event.teamOneName}
                          </CardTitle>
                          {/* BetDialog component for placing a bet on Team One */}
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
                        {/* Separator line */}
                        <div className="flex items-center">
                          <div className="w-4 border-t border-gray-400"></div>
                          <span className="mx-4 flex-shrink font-black text-gray-400">
                            @
                          </span>
                          <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                        {/* Team Two section */}
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
