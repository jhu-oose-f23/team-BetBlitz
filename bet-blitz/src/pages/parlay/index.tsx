import { Split } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import ParlayEvents from "~/components/parlay/ParlayEvents";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Bet, EventResult, Event, BetResult } from '@prisma/client';
import ParlayLeg from '~/components/parlay/ParlayLeg';
import { supabaseClient } from "~/utils/supabaseClient";
import { useAuth } from "@clerk/nextjs";
import { Button } from '~/components/ui/button';
import { toast } from '~/components/ui/use-toast';
import { ToastAction } from '~/components/ui/toast';
import Link from 'next/link';


export type ParlayLegType = {
  event: Event,
  odds: number,
  amount: number,
  chosenResult: EventResult,
}



const placeParlay = (parlayBets: ParlayLegType[]) => {
  console.log(parlayBets);
  //place each of the bets in the parlay
  for (let i = 0; i < parlayBets.length; i++) {
    const parlayLeg = parlayBets[i];
    //placeBet(parlayLeg.event.id, parlayLeg.chosenResult, parlayLeg.amount);
  }
}

export default function Parlay() {
  const [parlayBets, setParlayBets] = useState<ParlayLegType[]>([]);
  const [calculatedOdds, setCalculatedOdds] = useState<number>(0);
  const { userId, getToken } = useAuth();
  const [currency, setCurrency] = useState<number | undefined>();
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        const token = await getToken({ template: "supabase" });
        const supabase = await supabaseClient(token);
        const { data: bettor } = await supabase
          .from("Bettor")
          .select("privateCurrencyId")
          .eq("id", userId)
          .single();

        const privateCurrencyId = bettor?.privateCurrencyId;

        console.log(bettor, userId);

        const { data: privateCurrency } = await supabase
          .from("Currency")
          .select("amount")
          .eq("id", privateCurrencyId)
          .single();

        setCurrency(privateCurrency?.amount);
      };

      fetch();
    }
  }, [userId]);


  const handlePlaceBet = async (
    event: Event,
    odds: number,
    amount: number,
    chosenResult: EventResult,
    parlayId: number,
  ) => {
    const token = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(token);

    if (supabase) {
      const {data, error} = await supabase.from("Bet").insert({
        bettorId: userId,
        gameId: event.id,
        amount,
        odds,
        chosenResult,
        betResult: BetResult.IN_PROGRESS,
        parlayId: parlayId,
      });
      console.log(data);
      console.log(error);
    }
  };

  const calculateOdds = (parlayBets: ParlayLegType[]) => {
    // let odds = 0;
    // for (let i = 0; i < parlayBets.length; i++) {
    //   odds += parlayBets[i].odds;
    // }
    return 1;
  }

  const placeParlay = async (parlayBets: ParlayLegType[]) => {
    //create the Parlay first
    const token = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(token);


    if (supabase) {
      let privateCurrencyId, curAmount;

      const privateCurrencyIdResponse = await supabase
        .from("Bettor")
        .select("privateCurrencyId")
        .eq("id", userId);
      if (
        privateCurrencyIdResponse.data &&
        privateCurrencyIdResponse.data.length > 0
      ) {
        privateCurrencyId =
          privateCurrencyIdResponse.data[0]?.privateCurrencyId;
      }

      const amountResponse = await supabase
        .from("Currency")
        .select("amount")
        .eq("id", privateCurrencyId);
      if (amountResponse.data && amountResponse.data.length > 0) {
        curAmount = amountResponse.data[0]?.amount;
      }

      if (privateCurrencyId && curAmount) {
        if (curAmount - amount < 0) {
          toast({
            title: "You're broke",
            description: "Go make some money",
          });
        } else {
          const { data : parlay, error } = await supabase.from("Parlay").insert({
            bettorId: userId,
            amount: 0,
            odds: calculateOdds(parlayBets),
            betResult: BetResult.IN_PROGRESS,
          }).select();
      
          if (parlay) {
            const parlayId = parlay[0].id;
            let parlayLegs = [];
            //place each of the bets in the parlay
            for (let i = 0; i < parlayBets.length; i++) {
              const parlayLeg = parlayBets[i];
              const newBet = await handlePlaceBet(
                parlayLeg.event, 
                parlayLeg.odds, 
                parlayLeg.amount, 
                parlayLeg.chosenResult,
                parlayId);
              parlayLegs.push(newBet);
            }
          }
          
          console.log("new parlay")
          console.log(parlay);
          console.log(error);

          await supabase
            .from("Currency")
            .update({
              amount: curAmount - amount,
            })
            .eq("id", privateCurrencyId);

          setCurrency(curAmount - amount);

          toast({
            title: "Successfully created bet",
            description: `You have ${curAmount - amount} blitzbux left`,
            action: (
              <ToastAction altText={"View bets"}>
                {/* <Link href={"/bets"}>View bets</Link> */}
              </ToastAction>
            ),
          });
        }
      }
    } else {
      toast({
        title: "Error creating bet",
        description: "Please try again later",
      });
    }





    

    // console.log(parlayBets);
    // let parlayLegs = [];
    // //place each of the bets in the parlay
    // for (let i = 0; i < parlayBets.length; i++) {
    //   const parlayLeg = parlayBets[i];
    //   const newBet = await handlePlaceBet(parlayLeg.event, parlayLeg.odds, parlayLeg.amount, parlayLeg.chosenResult);
    //   parlayLegs.push(newBet);
    // }

    //create the parlay
    
  }

  return (
    <div className="flex flex-row h-screen">
      {/* Left Column (two-thirds width) */}
      <div className="w-2/3 overflow-y-auto">
        {/* Add your content for the left column here */}
        <ParlayEvents parlayBets={parlayBets} setParlayBets={setParlayBets} />
        {/* This column will take up two-thirds of the width and scroll independently */}
      </div>

      {/* Right Column (one-third width) */}
      <div className="w-1/3 overflow-y-auto outline-dashed ">
        {/* Add your content for the right column here */}
        {parlayBets.map((parlayLeg, index) => (
          <ParlayLeg key={index} parlayLeg={parlayLeg} index={index} setParlayBets={setParlayBets} />
        ))}
        {/* This column will take up one-third of the width and scroll independently */}
      </div>
      <Card className='fixed bottom-0 right-0 p-4 w-1/3 flex flex-row items-center'>
        <div className="flex flex-row items-center">
        <Input
              id="amount"
              value={amount}
              onChange={(e) => {
                if (!Number.isNaN(+e.currentTarget.value)) {
                  setAmount(+e.currentTarget.value);
                }
              }}
              className="w-24 mr-4"
            />
          <CardTitle className="text-md flex-grow">
            Calculated Odds: {calculatedOdds}
          </CardTitle>
          <Button 
            className="ml-4 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            onClick={() => placeParlay(parlayBets)}
          >
            Place Parlay
          </Button>


        </div>

      </Card>
    </div>
  );
};