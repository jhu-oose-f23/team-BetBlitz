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
import { useRouter } from "next/router";

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
  const [currencyId, setCurrencyId] = useState<string>();

  const [amount, setAmount] = useState<number>(0);

  const router = useRouter();
  const leagueId = router.query.leagueId;

  useEffect(() => {
    if (userId && leagueId) {
      const fetch = async () => {
        const token = await getToken({ template: "supabase" });
        const supabase = await supabaseClient(token);
        const { data: bettorInfo } = await supabase
          .from("LeagueBettorsCurrency")
          .select()
          .eq("bettorId", userId)
          .eq("leagueId", leagueId)
          .single();

        const currencyId = bettorInfo?.currencyId;

        const { data: currency } = await supabase
          .from("Currency")
          .select()
          .eq("id", currencyId)
          .single();

        setCurrency(currency.amount);
        setCurrencyId(currency.id);
      };

      fetch();
    }
  }, [userId, leagueId]);

  useEffect(() => {
    //if the betslep is empty don't calculate odds
    if (betslip.length === 0) {
      setCalculatedOdds(0);
      return;
    }
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
        leagueId
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

    for (let item of betslip) {
      if (new Date() > new Date(item.event.commenceTime!)) {
        toast({
          title: "Game in progress!",
          description: "A game already started 🤨",
        });
        return;
      }
    }

    const token = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(token);

    if (supabase) {
      let curAmount;

      const amountResponse = await supabase
        .from("Currency")
        .select("amount")
        .eq("id", currencyId);
      if (amountResponse.data && amountResponse.data.length > 0) {
        curAmount = amountResponse.data[0]?.amount;
      }

      if (currencyId && curAmount) {
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
            const { data: parlay } = await supabase
              .from("Parlay")
              .insert({
                bettorId: userId,
                amount: amount,
                odds: Math.floor(calculatedOdds),
                betResult: BetResult.IN_PROGRESS,
                leagueId
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
            .eq("id", currencyId);

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
            Calculated Odds: {calculatedOdds < 0? "" : "+"} {Math.abs(calculatedOdds) < 0.1 ? "0" : calculatedOdds.toFixed(0)}
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
