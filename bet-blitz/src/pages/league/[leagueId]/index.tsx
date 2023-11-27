import { League } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PlayerTable from "~/components/league/PlayerTable";
import { Button } from "~/components/ui/button";

const LeagueHomePage = () => {
  const [league, setLeague] = useState<League>();
  const [bettorInfos, setBettorInfos] = useState<any[]>([]);

  const router = useRouter();
  const leagueId = router.query.leagueId;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    if (leagueId) {
      const fetch = async () => {
        const { data: league } = await supabase
          .from("League")
          .select()
          .eq("id", leagueId)
          .single();

        const { data: leagueBettorsCurrency } = await supabase
          .from("LeagueBettorsCurrency")
          .select(
            `
            *, 
            Bettor (
              id, name, Bet (
                *
              )
            ), 
            Currency (
              amount
            )`,
          )
          .eq("leagueId", leagueId);

        setLeague(league);
        leagueBettorsCurrency?.sort(
          (a, b) => b.Currency.amount - a.Currency.amount,
        );
        setBettorInfos(leagueBettorsCurrency || []);
      };
      fetch();
    }
  }, [leagueId]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start overflow-x-scroll bg-[#EEEEEE]">
        {league && leagueId && (
          <div className=" flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-center text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
              {league.name}
            </h1>
            <Link href={`/league/${leagueId}/bet`}>
              <Button>Place a bet!</Button>
            </Link>

            <div>
              <div className="tracking-none mb-8 text-center text-xl font-black uppercase">
                Standings
              </div>
              <PlayerTable bettorInfos={bettorInfos} />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default LeagueHomePage;
