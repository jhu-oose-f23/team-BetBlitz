import Head from "next/head";

import { useEffect, useState } from "react";
import { Event } from "@prisma/client";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog"

import {supabaseClient} from "~/utils/supabaseClient";
import {useAuth} from "@clerk/nextjs"
import { createClient } from "@supabase/supabase-js";

const dateToString = (date: Date) => {
  date = new Date(date);
  let str = "";

  if (date.getHours() !== 0) {
    str += date.getHours() <= 12 ? date.getHours() : date.getHours() - 12;
  } else {
    str += "12";
  }

  str += ":";

  if (date.getMinutes() < 10) str += "0";
  str += date.getMinutes();
  str += date.getHours() >= 12 ? " PM" : " AM";

  return str;
};

export default function allOdds() {
  const [events, setEvents] = useState<Event[]>([]);

  const { userId, getToken } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const token = await getToken({template: "supabase"});
      // const supabase = await supabaseClient(token);
      const { data, error } = await supabase.from("Event").select();
      console.log(data)
      setEvents(data as Event[]);
    }
    fetch();
  }, []);

  return (
    <>
      <Head>
        <title>Bet Blitz</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="flex min-h-screen flex-col items-center justify-start bg-[#EEEEEE]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-black tracking-tight text-[#222831] sm:text-[5rem] uppercase">
            Bet Blitz
          </h1>
          <div className="flex flex-wrap justify-center">
            {events && events.map((event: Event, index: number) => {
              return (
                <Card key={`event${index}`} className="bg-white w-80 m-8 shadow-xl relative">
                  <Badge className="absolute left-0 top-0 -translate-y-4 translate-x-4 p-2 shadow-md">
                    {dateToString(event.commenceTime ? event.commenceTime : new Date())}
                  </Badge>
                  <CardHeader>
                    <div className="flex flex-row items-center">
                      <CardTitle className="text-md flex-grow">{event.teamOneName}</CardTitle>
                      {
                        event.teamOneOdds &&
                        <Dialog>
                          <DialogTrigger>
                            <Button className="ml-4">
                              {event.teamOneOdds > 0 ? "+" : ""}
                              {event.teamOneOdds}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Bet on {event.teamOneName}</DialogTitle>
                              <DialogDescription>How many BlitzBux would you like to bet?</DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">Bet Amount</Label>
                              <Input
                              id="betAmount"
                              defaultValue="100"
                              className="col-span-3"
                              />
                            </div>
                            <DialogFooter>
                              <DialogClose>
                                <Button type="submit">Place bet</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button className="ml-4">
                          {event.teamOneOdds > 0 ? "+" : ""}
                          {event.teamOneOdds}
                        </Button>
                      }
                    </div>

                    <div className="flex items-center">
                      <div className="w-4 border-t border-gray-400"></div>
                      <span className="flex-shrink mx-4 text-gray-400 font-black">@</span>
                      <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    <div className="flex flex-row items-center">
                      <CardTitle className="text-md flex-grow">{event.teamTwoName}</CardTitle>
                      {
                        event.teamTwoOdds &&
                        <Dialog>
                          <DialogTrigger>
                            <Button className="ml-4">
                              {event.teamTwoOdds > 0 ? "+" : ""}
                              {event.teamTwoOdds}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Bet on {event.teamTwoName}</DialogTitle>
                              <DialogDescription>How many BlitzBux would you like to bet?</DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Bet Amount</Label>
                            <Input
                              id="betAmount"
                              defaultValue="100"
                              className="col-span-3"
                            />
                            </div>
                            <DialogFooter>
                              <DialogClose>
                              <Button type="submit">Place bet</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      }
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </>
  );
}