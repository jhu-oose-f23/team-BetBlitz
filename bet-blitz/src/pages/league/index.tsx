import Head from "next/head";

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
  } from "~/components/ui/table"
  

import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export default function leagueLanding() {
    const [leagues, setLeagues] = useState<League[]>([]);
    const [query, setQuery] = useState("");
  
    const { userId, getToken } = useAuth();

    useEffect(() => {
        const fetch = async () => {
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          );
          const token = await getToken({ template: "supabase" });
          // const supabase = await supabaseClient(token);
          const { data, error } = await supabase.from("League").select();
    
          setLeagues(data as League[]);
        };
        fetch();
    }, []);

    return(
        <>
        <main className="flex min-h-screen flex-col items-center justify-start bg-[#EEEEEE]">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
                    League Play
                </h1>
                <div>
                    <Button>Create your own league</Button>
                    <span className="ml-4">or select one from below to join!</span>
                </div>
                <Table>
                    <TableCaption>Select a league to get started!</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">League Name</TableHead>
                            <TableHead className="w-[300px]">Status</TableHead>
                            <TableHead className="w-[300px]">Players</TableHead>
                            {/*<TableHead className="w-[300px]">Budget</TableHead>*/}
                            <TableHead className="w-[200px]">Start Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* <TableBody>
                        <TableRow>
                            <TableCell>My League</TableCell>
                            <TableCell>Public</TableCell>
                            <TableCell>24</TableCell>
                            <TableCell>11/4/2023</TableCell>
                            <TableCell>
                                <div className="ml-4 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 text-center">
                                    Join League
                                </div> 
                            </TableCell>
                        </TableRow>
                    </TableBody> */}
                    {leagues &&
                        leagues.map((league: League) => {
                            return(
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{league.name}</TableCell>
                                        <TableCell>Public</TableCell>
                                        <TableCell>{league.maxMembers}</TableCell>
                                        <TableCell>{league.startDate}</TableCell>
                                        <TableCell>
                                            <div className="ml-4 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
                                                Join League
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )
                        }
                    )}
                </Table>
            </div>
        </main>
        </>
    );
}