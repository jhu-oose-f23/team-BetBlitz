import TotalWinningsCard from "~/components/analytics/TotalWinningsCard";
import BettingPercentageCard from "~/components/analytics/BettingPercentageCard";
import RecentBets from "~/components/analytics/BetsTable";
import BetsCard from "~/components/analytics/BetsCard";

export default function Analytics() {
    return (
        <div className="container flex flex-col items-center justify-center px-4 py-4">
            <h1 className="text-5xl font-black uppercase tracking-tight text-[#222831] sm:text-[5rem]">
                Analytics
            </h1>
            <div className="container flex justify-center">
                <div className="mx-4 grow">
                    <TotalWinningsCard></TotalWinningsCard>
                </div>
                <div className="mx-4 grow">
                    <BettingPercentageCard></BettingPercentageCard>
                </div>


            </div>
            <div className="container flex justify-center">
                <div className="mx-4 grow">
                    <BetsCard></BetsCard>
                </div>

            </div>

        </div>
    )
}