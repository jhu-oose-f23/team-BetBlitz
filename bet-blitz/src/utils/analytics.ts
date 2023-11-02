import { Bet, BetResult } from "@prisma/client";

export const calculateWinAmount = (odds: number, wagerAmount: number) => {
  return (
    wagerAmount +
    (odds > 0
      ? wagerAmount * (odds / 100)
      : wagerAmount * (100 / Math.abs(odds)))
  );
};

export const getWinnings = (bets: Bet[]) => {
  let total = 0;
  bets.forEach((bet: Bet) => {
    if (bet.betResult !== BetResult.IN_PROGRESS) {
      total -= bet.amount;
      if (bet.betResult === BetResult.WIN) {
        total += calculateWinAmount(bet.odds, bet.amount);
      } else if (bet.betResult === BetResult.PUSH) {
        total += bet.amount;
      }
    }
  });
  return total;
};

export const getWinPercentage = (bets: Bet[]) => {
  let numWins: number = 0;
  let numLosses: number = 0;

  bets.forEach((bet: Bet) => {
    if (bet.betResult === BetResult.WIN) {
      numWins += 1;
    } else if (bet.betResult === BetResult.LOSS) {
      numLosses += 1;
    }
  });

  return (numWins / (numWins + numLosses)) * 100;
};
