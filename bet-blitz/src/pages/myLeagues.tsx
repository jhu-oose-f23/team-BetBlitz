import Head from "next/head";

import { useEffect, useState } from "react";
import { League, LeagueBettorsCurrency } from "@prisma/client";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export default function myLeagues() {
  const [userLeagues, setUserLeagues] = useState<LeagueBettorsCurrency[]>([]);

  const { userId, getToken } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      const token = await getToken({ template: "supabase" });
      // const supabase = await supabaseClient(token);
      let { data: LeagueBettorsCurrency, error } = await supabase
      .from('LeagueBettersCurrency')
      .select('leagueId').eq('bettorId', userId)

      setUserLeagues(LeagueBettorsCurrency as LeagueBettorsCurrency[]);
    };
    fetch();
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start bg-[#EEEEEE]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
            My Leagues
          </h1>
        </div>
      </main>
    </>
  );
}
