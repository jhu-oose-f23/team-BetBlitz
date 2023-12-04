import { Parlay } from "@prisma/client";

export const dateToTimeString = (date: Date) => {
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

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateToString = (date: Date) => {
  date = new Date(date);
  return `${months[date.getMonth()]} ${date.getUTCDay()}`;
};

export const calculateOdds = (parlayBets: Parlay[]) => {
  let probability = 1;
  for (let i = 0; i < parlayBets.length; i++) {
    let legProbability = 1;
    const legOdds = parlayBets[i]!.odds;
    if (legOdds > 0) {
      legProbability = 100 / (legOdds + 100);
    } else {
      legProbability = -legOdds / (-legOdds + 100);
    }
    probability *= legProbability;
  }

  return 100 / probability - 100;
};
