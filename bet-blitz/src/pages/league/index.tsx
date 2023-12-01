import Head from "next/head";

import { useEffect, useState } from "react";
import { League, LeagueBettorsCurrency } from "@prisma/client";
import { Button } from "~/components/ui/button";

import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import LeagueTable from "~/components/league/LeagueTable";
import Link from "next/link";

export default function myLeagues() {
  const [userLeagues, setUserLeagues] = useState<League[]>([]);

  const { userId, getToken, isLoaded } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      const token = await getToken({ template: "supabase" });
      if (userId) {
        let { data, error } = await supabase
          .from("LeagueBettorsCurrency")
          .select("League (*)")
          .eq("bettorId", userId);

        const leagues: League[] = [];
        data?.forEach((league) => {
          leagues.push(league.League as unknown as League);
        });
        setUserLeagues(leagues);
      }
    };
    fetch();
  }, [userId]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start bg-[#EEEEEE]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
            My Leagues
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 whitespace-nowrap md:flex-row">
            <Link href={"/league/create"}>
              <Button className="h-10 rounded-md bg-primary px-4 py-2 text-center text-primary-foreground hover:bg-primary/90">
                Join a League or Create Your Own League
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <LeagueTable leagues={userLeagues} displayJoinLeague={false} />
          </div>
        </div>
      </main>
    </>
  );
}
