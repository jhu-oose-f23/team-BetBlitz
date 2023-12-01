import React, { useEffect, useState } from "react";
import ParlayEvents from "~/components/parlay/ParlayEvents";
import { Card, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Bet, EventResult, Event, BetResult, Parlay } from "@prisma/client";
import ParlayLeg from "~/components/parlay/ParlayLeg";
import { supabaseClient } from "~/utils/supabaseClient";
import { useAuth } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import Link from "next/link";
import { calculateOdds } from "~/utils/helpers";

export type BetslipType = {
  event: Event;
  odds: number;
  amount: number;
  chosenResult: EventResult;
};

export default function Bet() {
  const [betslip, setBetslip] = useState<BetslipType[]>([]);
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

  useEffect(() => {
    const newOdds = calculateOdds(betslip as unknown as Parlay[]);
    setCalculatedOdds(newOdds);
  }, [betslip]);

  const handlePlaceBet = async (
    event: Event,
    odds: number,
    amount: number,
    chosenResult: EventResult,
    betslipId?: number,
  ) => {
    const token = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(token);

    if (supabase) {
      await supabase.from("Bet").insert({
        bettorId: userId,
        gameId: event.id,
        amount,
        odds,
        chosenResult,
        betResult: BetResult.IN_PROGRESS,
        parlayId: betslipId,
      });
    }
  };

  const placeBet = async (betslip: BetslipType[]) => {
    if (amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
      });
      return;
    }

    if (betslip.length <= 0) {
      toast({
        title: "Invalid betslip",
        description: "Please add at least one bet to your betslip",
      });
      return;
    }

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
          if (betslip.length === 1) {
            await handlePlaceBet(
              betslip[0]!.event,
              betslip[0]!.odds,
              amount,
              betslip[0]!.chosenResult
            );

          } else {
            const { data: parlay, error } = await supabase
              .from("Parlay")
              .insert({
                bettorId: userId,
                amount: amount,
                odds: Math.floor(calculatedOdds),
                betResult: BetResult.IN_PROGRESS,
              })
              .select();

            if (parlay) {
              const parlayId = parlay[0].id;
              let parlayLegs = [];
              //place each of the bets in the parlay
              for (let i = 0; i < betslip.length; i++) {
                const parlayLeg = betslip[i];
                const newBet = await handlePlaceBet(
                  parlayLeg!.event,
                  parlayLeg!.odds,
                  parlayLeg!.amount,
                  parlayLeg!.chosenResult,
                  parlayId,
                );
                parlayLegs.push(newBet);
              }
            }
          }

          await supabase
            .from("Currency")
            .update({
              amount: curAmount - amount,
            })
            .eq("id", privateCurrencyId);

          setCurrency(curAmount - amount);
          setBetslip([]);

          toast({
            title: "Successfully created bet",
            description: `You have ${curAmount - amount} Blitzbux left`,
            action: (
              <ToastAction altText={"View bets"}>
                <Link href={"/bets"}>View bets</Link>
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
  };

  return (
    <div className="flex h-screen flex-row">
      {/* Left Column (two-thirds width) */}
      <div className="w-2/3 overflow-y-auto">
        {/* Add your content for the left column here */}
        <ParlayEvents
          parlayBets={betslip}
          setParlayBets={setBetslip}
          setCalculatedOdds={setCalculatedOdds}
          currency={currency}
        />
        {/* This column will take up two-thirds of the width and scroll independently */}
      </div>

      {/* Right Column (one-third width) */}
      <div className="w-1/3 overflow-y-auto border-4 border-dashed border-black">
        {/* Add your content for the right column here */}
        {betslip.length > 0 ? (
          betslip.map((parlayLeg, index) => (
            <ParlayLeg
              key={index}
              parlayLeg={parlayLeg}
              index={index}
              setParlayBets={setBetslip}
            />
          ))
        ) : (
          <div className="flex h-full items-center justify-center p-20 text-center text-3xl font-extrabold">
            Add Bets to Your Betslip!
          </div>
        )}

        {/* This column will take up one-third of the width and scroll independently */}
      </div>
      <Card className="fixed bottom-0 right-0 flex w-1/3 flex-row items-center p-4 rounded-none">
        <div className="flex flex-row items-center w-full">
          <Input
            id="amount"
            value={amount}
            onChange={(e) => {
              if (!Number.isNaN(+e.currentTarget.value)) {
                setAmount(+e.currentTarget.value);
              }
            }}
            className="mr-4 w-24"
          />
          <CardTitle className="text-md flex-grow">
            Calculated Odds: + {calculatedOdds.toFixed(0)}
          </CardTitle>
          <div className="flex grow justify-end">
            <Button
              className="ml-4 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              onClick={() => placeBet(betslip)}
            >
              Place Bet
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
