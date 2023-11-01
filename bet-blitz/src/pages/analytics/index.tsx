"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { Bet, Event } from "@prisma/client";
import Head from "next/head";

const Analytics = () => {
    const [bets, setBets] = useState<(Bet & {
        Event: Event
    })[]>([]);
    
    const { userId, getToken } = useAuth();

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  
    useEffect(() => {
        const fetchData = async () => {
          if (userId) {
            const { data, error } = await supabase
              .from("Bet")
              .select(`
                *,
                Event ( 
                  homeTeam, awayTeam, teamOneOdds, teamTwoOdds, result
                )
                `)
              .eq('bettorId', 'cdaf0a62-820e-4b79-95f0-42fef0dc48fc');
    
            setBets(data as (Bet & {
              Event: Event
            })[]);
            console.log(bets);
          }
        }
    
        fetchData();
      }, [userId]);

      return (
        <>
          <p>Bets</p>
          <ul>
            {bets.map(bet => (
              <li key={bet.id}>
                <p>Bet ID: {bet.id}</p>
                <p>Bet Amount: {bet.amount}</p>
                <p>Home Team: {bet.Event.homeTeam}</p>
                <p>Away Team: {bet.Event.awayTeam}</p>
                <p>Home Team: {bet.Event.homeTeam}</p>
                <p>Home Team Odds: {bet.Event.teamOneOdds}</p>
                <p>Away Team Odds: {bet.Event.teamTwoOdds}</p>
                <p>Result: {bet.Event.result}</p>
              </li>
            ))}
          </ul>
        </>
      );
      
}

export default Analytics;