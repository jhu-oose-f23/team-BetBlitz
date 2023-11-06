import Head from "next/head";

import LeagueForm from "~/components/league/LeagueForm";
import { useEffect, useState } from "react";
import { League } from "@prisma/client";
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
import moment from "moment";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DialogFooter, DialogHeader } from "~/components/ui/dialog";
import { Currency, X } from "lucide-react";
import { ScrollArea } from "~/components/ui/scroll-area";

const getDate = (date: Date) => {
  date = new Date(date);
  let dateStr = "";

  dateStr += date.getDate();
  dateStr += "-";
  dateStr += date.getMonth();
  dateStr += "-";
  dateStr += date.getFullYear();

  return dateStr;
};

export default function leagueLanding() {
  const [leagues, setLeagues] = useState<League[]>([]);

  const { userId, getToken } = useAuth();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const fetch = async () => {
      const token = await getToken({ template: "supabase" });
      // const supabase = await supabaseClient(token);
      let currDate = moment().toISOString(new Date());
      let { data: League, error } = await supabase
        .from("League")
        .select("*")
        .gt("startDate", currDate);

      setLeagues(League as League[]);
    };
    fetch();
  }, []);

  const handleJoinLeague = async (league: League) => {
    const { data: currencyData, error: currencyError } = await supabase
      .from("Currency")
      .insert([{ amount: league.startingCurrency }])
      .select();

    console.log(currencyData[0].id);
    const { data: data, error: error } = await supabase
      .from("LeagueBettorsCurrency")
      .insert([
        {
          bettorId: userId,
          leagueId: league.id,
          currencyId: currencyData[0].id,
        },
      ])
      .select();
    console.log(data);
    console.log(error);
  };

  const handleCreateLeague = async () => {};

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start bg-[#EEEEEE]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
            League Play
          </h1>
          <div>
            <Dialog>
              <DialogTrigger>
                <div className="ml-4 h-10 rounded-md bg-primary px-4 py-2 text-center text-primary-foreground hover:bg-primary/90">
                  Create your own league
                </div>
              </DialogTrigger>
              <span className="ml-4">or select one from below to join!</span>
              <DialogContent>
                <ScrollArea className="h-[400px]">
                  <LeagueForm></LeagueForm>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            {/* <Button>Create your own league</Button>
            <span className="ml-4">or select one from below to join!</span> */}
          </div>
          <div>
            <a href="myLeagues">
              <Button variant="link">View my joined leagues</Button>
            </a>
          </div>
          <Table>
            <TableCaption>Select a league to get started!</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">League Name</TableHead>
                <TableHead className="w-[250px]">Status</TableHead>
                <TableHead className="w-[250px]">Players</TableHead>
                <TableHead className="w-[250px]">Budget</TableHead>
                <TableHead className="w-[200px]">Start Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leagues &&
                leagues.map((league: League) => {
                  return (
                    <TableRow key={league.id}>
                      <TableCell>{league.name}</TableCell>
                      <TableCell>
                        {league.password ? "Private" : "Public"}
                      </TableCell>
                      <TableCell>{league.maxMembers}</TableCell>
                      <TableCell>{league.startingCurrency}</TableCell>
                      <TableCell>{getDate(league.startDate)}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger>
                            <div className="ml-4 h-10 rounded-md bg-primary px-4 py-2 text-center text-primary-foreground hover:bg-primary/90">
                              Join League
                            </div>
                          </DialogTrigger>
                          <DialogContent className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-white p-4">
                            <DialogHeader>
                              <div className="flex">
                                <DialogTitle>Join League</DialogTitle>
                              </div>
                            </DialogHeader>
                            <div className="grid grid-cols-4 items-center gap-4 py-6">
                              <Label htmlFor="name" className="text-right">
                                Enter Password
                              </Label>
                              <Input
                                id="LeaguePass"
                                defaultValue="If public enter nothing"
                                className="col-span-3"
                              />
                            </div>
                            <DialogFooter>
                              <Button onClick={() => handleJoinLeague(league)}>
                                Join
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
