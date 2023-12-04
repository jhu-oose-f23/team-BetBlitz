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
// React functional component for displaying user leagues
export default function myLeagues() {
  // State to store user leagues data
  const [userLeagues, setUserLeagues] = useState<League[]>([]);
  // Destructuring values from the useAuth hook
  const { userId, getToken, isLoaded } = useAuth();
// useEffect hook to fetch user leagues data when userId changes
  useEffect(() => {
    // Async function to fetch data from Supabase
    const fetch = async () => {
      // Create Supabase client using environment variables
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      // Get authentication token using the getToken function
      const token = await getToken({ template: "supabase" });
      // const supabase = await supabaseClient(token);
      if (userId) {
        // Fetch data from the "LeagueBettorsCurrency" table for the specific user
        let { data, error } = await supabase
          .from("LeagueBettorsCurrency")
          .select("League (*)")
          .eq("bettorId", userId);
// Log the userId and set the user leagues in the state
        console.log(userId);
        setUserLeagues(data);
      }
    };
     // Call the fetchData function when userId changes
    fetch();
  }, [userId]);
// Render the main component with league information in a table
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start bg-[#EEEEEE]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
            My Leagues
          </h1>
           {/* Table for displaying user leagues */}
          <Table>
             {/* Table caption */}
            <TableCaption>Select a league to get started!</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">League Name</TableHead>
                <TableHead className="w-[250px]">Status</TableHead>
                <TableHead className="w-[250px]">Players</TableHead>
                <TableHead className="w-[250px]">Budget</TableHead>
              </TableRow>
            </TableHeader>
            {/* Table body with user leagues data */}
            <TableBody>
              {userLeagues &&
                userLeagues.map((userLeague: League) => {
                  return (
                    <TableRow key={userLeague.League.id}>
                      <TableCell>{userLeague.League.name}</TableCell>
                      <TableCell>
                        {userLeague.League.password ? "Private" : "Public"}
                      </TableCell>
                      <TableCell>{userLeague.League.maxMembers}</TableCell>
                      <TableCell>
                        {userLeague.League.startingCurrency}
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
