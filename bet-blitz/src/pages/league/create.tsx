import { useEffect, useState } from "react";
import { League } from "@prisma/client";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import LeagueForm from "~/components/league/LeagueForm";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import LeagueTable from "~/components/league/LeagueTable";
import { toast } from "~/components/ui/use-toast";

export default function leagueLanding() {
  const [leagues, setLeagues] = useState<League[]>([]);

  const { userId, getToken } = useAuth();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const fetch = async () => {
      let currDate = new Date();
      let { data: league, error } = await supabase
        .from("League")
        .select("*")
        .gt("startDate", currDate.toISOString());

      setLeagues(league as League[]);
    };
    fetch();
  }, []);

  const handleJoinLeague = async (league: League, password: String) => {
    let { data: pword, error: err1 } = await supabase
      .from("League")
      .select("password")
      .eq("id", league.id);

    let { data: members, error: err2 } = await supabase
      .from("League")
      .select("numMembers, maxMembers")
      .eq("id", league.id);

    if (members![0]!.numMembers >= members![0]!.maxMembers) {
      toast({
        title: "League full",
      });
    }
    if (pword![0]!.password && pword![0]!.password != password) {
      toast({
        title: "Invalid Password",
      });
    }

    if (
      (pword![0]!.password == password || !pword![0]!.password) &&
      members![0]!.numMembers < members![0]!.maxMembers
    ) {
      const { data: currencyData, error: currencyError } = await supabase
        .from("Currency")
        .insert([{ amount: league.startingCurrency }])
        .select();

      if (currencyData) {
        const { data: data, error: err3 } = await supabase
          .from("LeagueBettorsCurrency")
          .insert([
            {
              bettorId: userId,
              leagueId: league.id,
              currencyId: currencyData[0].id,
            },
          ])
          .select();
        const { error: err4 } = await supabase
          .from("League")
          .update({ numMembers: members![0]!.numMembers + 1 })
          .eq("id", league.id);
        toast({
          title: "League Joined!",
        });
      }
    }
  };
  
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start overflow-x-scroll bg-[#EEEEEE]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-center text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
            League Play
          </h1>
          <div>
            <Sheet>
              <div className="flex flex-col items-center justify-center gap-4 whitespace-nowrap md:flex-row">
                <SheetTrigger>
                  <div className="h-10 rounded-md bg-primary px-4 py-2 text-center text-primary-foreground hover:bg-primary/90">
                    Create Your Own League
                  </div>
                </SheetTrigger>
                <Link href={"/league"}>
                  <Button>View Your Leagues</Button>
                </Link>
              </div>

              <SheetContent side="left" className="overflow-y-scroll">
                <SheetHeader>
                  <SheetTitle>Create League</SheetTitle>
                </SheetHeader>

                <section className="my-8">
                  <LeagueForm />
                </section>
              </SheetContent>
            </Sheet>
          </div>
          {leagues && leagues.length > 0 && (
            <section className="flex flex-col items-center justify-center gap-y-2">
              <LeagueTable
                leagues={leagues}
                displayJoinLeague={true}
                handleJoinLeague={handleJoinLeague}
              />
              <span className="tracking-none my-2 font-black uppercase">
                Select a league to get started!
              </span>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
