import { Chart } from "react-google-charts";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { supabaseClient } from "~/utils/supabaseClient";
import { Bet, EventResult, Event, BetResult, Parlay, Currency } from "@prisma/client";
import { utcToEstTimeStringWithDate } from "~/utils/helpers";


//Take current currency and use most recent bets to work backwards and obtain previous currency values
//Then once you have currency data for 10 data points, plot data



const CurrencyGraph = () => {
    const { userId, getToken } = useAuth();
    const [bets, setBets] = useState<Bet[]>([]);
    const [currency, setCurrency] = useState<number>(0);

    useEffect(()=> {
            if(userId) {
                const fetch = async () => {
                    const token = await getToken({ template: "supabase" });
                    const supabase = await supabaseClient(token);
                    const { data, error } = await supabase 
                        .from('Bettor')
                        .select(
                            `*, Currency(*)`
                        )
                        .eq("id", userId);
                        
                    if(data!=null) {
                        setCurrency(data[0].Currency.amount);
                    }


                    const { data: bets } = await supabase
                        .from("Bettor")
                        .select(
                            `*, Bet(
                                *,
                                Event ( 
                                    *
                                  )
                            )`
                        )
                        .eq("id", userId);

                                          
                    if(bets!=null) {
                        setBets(bets[0].Bet);
                    }
                };
                fetch();
            }
        }, [userId]);

    const getLastCurrencies = (startAmount: number, bets: Bet[] ) => {
        let dataPoints = [];
        dataPoints.unshift(["Now", startAmount]);

        let betNumber = 4;
        let currAmount = startAmount;
        for (let i = 1; i < 6; i++) {
            let currentBet = bets[bets.length - i];
            if(currentBet == null || currentBet == undefined) {
                break;
            } else if (currentBet.betResult == "LOSS") {
                currAmount+=currentBet.amount;
            } else if (currentBet.betResult == "WIN") {
                if(currentBet.odds > 0) {
                    currAmount-=(currentBet.amount * (Math.abs(currentBet.odds)/100))
                } else {
                    currAmount-=(currentBet.amount * (100/Math.abs(currentBet.odds)))
                }
            } else continue;
            const d = utcToEstTimeStringWithDate(currentBet.Event.commenceTime);
            dataPoints.unshift([  d, currAmount]);
            betNumber--;
        }
        dataPoints.unshift(["betNum", "Currency"]);
        return dataPoints;
    }

    const currencyData = getLastCurrencies((currency as number), (bets as Bet[]))

    const chartOptions = {
        title: "Currency Over Recent Bets",
        curveType: "function",
        vAxis: {
            title: "BlitzBux"
        },
        hAxis: {
            title: "Time"
        },
        height: 600,
        width: 800
    }

    return (
        <div>
            <Chart
                chartType="LineChart"
                data={currencyData}
                options={chartOptions}
            />
        </div>
    );
}

export default CurrencyGraph;

