import Head from "next/head";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Bet, BetResult, Event, EventResult, Parlay } from "@prisma/client";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { supabaseClient } from "~/utils/supabaseClient";



export default function viewParlays() {
    const { userId, getToken } = useAuth();
    const [parlays, setParlays] = useState<Parlay[]>([]);
    useEffect(() => {
        if (userId) {
            const fetch = async () => {
                const token = await getToken({ template: "supabase" });
                const supabase = await supabaseClient(token);
                //get all the parlays for this user
                console.log(userId);
                const { data, error } = await supabase
                    .from("Parlay")
                    .select(`
                    *
                    Bet (
                        *
                    )
                    `)
                    .eq("bettorId", userId);
                    
                console.log(data);
                console.log(error)
                setParlays(data as Parlay[]);
            };
            fetch();
        }
    }, [userId]);

    console.log(parlays);
    return (
        <>
            {parlays.map((parlay: Parlay) => {
                return (
                    <div key={parlay.id}>
                        {parlay.id}
                    </div>
                );
            })}

        </>
    );
}