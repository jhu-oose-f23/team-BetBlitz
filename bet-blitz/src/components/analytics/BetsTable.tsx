import { Bet, Event } from "@prisma/client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { BetWithEvent } from "~/pages/analytics";

type PropType = {
  bets: BetWithEvent[];
};

const RecentBetsCard = (props: PropType) => {
  const { bets } = props;
  const { userId, getToken } = useAuth();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const [bets, setBets] = useState<BetWithEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const { data } = await supabase
          .from("Bet")
          .select(
            `
              *,
              Event ( 
                homeTeam, awayTeam
              )
            `,
          )
          .eq("bettorId", userId);

        setBets(
          data as (Bet & {
            Event: Event;
          })[],
        );
      }
    };
    fetchData();
  }, [userId]);

  const formatAmount = (amount: number) => {
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);

    return formattedAmount;
  };

  const mapChosenResultToTeam = (bet: BetWithEvent) => {
    if (bet.chosenResult === "HOME_TEAM") {
      return bet.Event.homeTeam; // Replace with the actual home team name property
    } else if (bet.chosenResult === "AWAY_TEAM") {
      return bet.Event.awayTeam; // Replace with the actual away team name property
    } else {
      return "Unknown Team"; // Handle other cases if necessary
    }
  };

  const formatBetResult = (bet: BetWithEvent) => {
    if (bet.betResult === "IN_PROGRESS") {
      return "Game in Progress";
    } else if (bet.betResult === "WIN") {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <AiOutlineCheckCircle className="mr-1 text-green-500" />
          Win
        </div>
      );
    } else if (bet.betResult === "LOSS") {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <RxCross1 className="mr-1 text-red-500" />
          Loss
        </div>
      );
    } else {
      return bet.betResult; // Or handle other cases if necessary
    }
  };

  const formatDate = (bet: BetWithEvent) => {
    const date = new Date(bet.createdAt);

    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");
    const fullyear = date.getFullYear();

    return `${month}-${day}-${fullyear}`;
  };

  // Sort bets in reverse chronological order
  const sortedBets = bets.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <Table className="w-full rounded-xl bg-white shadow-xl">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Game</TableHead>
          <TableHead className="w-[250px]">Bet Pick</TableHead>
          <TableHead className="w-[250px]">Amount</TableHead>
          <TableHead className="w-[250px]">Odds</TableHead>
          <TableHead className="w-[250px]">Result</TableHead>
          <TableHead className="w-[250px]">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedBets.map((bet: BetWithEvent) => (
          <TableRow
            key={bet.id}
            className="whitespace-nowrap font-bold transition duration-300 ease-in-out"
          >
            <TableCell>{`${bet.Event.homeTeam} vs ${bet.Event.awayTeam}`}</TableCell>
            <TableCell>{mapChosenResultToTeam(bet)}</TableCell>
            <TableCell>{formatAmount(bet.amount)}</TableCell>
            <TableCell>{bet.odds}</TableCell>
            <TableCell>{formatBetResult(bet)}</TableCell>
            <TableCell>{formatDate(bet)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentBetsCard;
