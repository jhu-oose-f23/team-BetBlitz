import { useAuth } from "@clerk/nextjs";
import { Bet, Event, EventResult } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { dateToString, dateToTimeString } from "~/utils/helpers";

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
              homeTeam, awayTeam, commenceTime
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

  return (
    <main>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
          Your Bets
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {bets.map(
            (
              bet: Bet & {
                Event: Event;
              },
              index: number,
            ) => {
              return (
                <Card className="w-[350px]" key={`bet${index}`}>
                  <CardHeader>
                    <CardTitle>
                      {bet.chosenResult === EventResult.AWAY_TEAM
                        ? bet.Event.awayTeam
                        : bet.Event.homeTeam}
                    </CardTitle>
                    <CardDescription>
                      Placed at {dateToTimeString(bet.createdAt)}
                    </CardDescription>
                    <CardDescription>
                      {bet.Event.awayTeam} vs {bet.Event.homeTeam}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold">
                      Wager:<span className="font-black"> {bet.amount}₴</span>
                    </div>
                  </CardContent>
                  {/* <CardFooter className="flex justify-end text-sm text-s-500">
                Game on {dateToString(bet.Event.commenceTime!)}
              </CardFooter> */}
                </Card>
              );
            },
          )}
        </div>
      </div>
    </main>
  );
};

export default Bets;
