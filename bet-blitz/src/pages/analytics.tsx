import TotalWinningsCard from "~/components/analytics/TotalWinningsCard";
import BettingPercentageCard from "~/components/analytics/BettingPercentageCard";
import RecentBets from "~/components/analytics/BetsTable";
import BetsCard from "~/components/analytics/BetsCard";

export default function Analytics() {
    return (
        <div>
            {/* <TotalWinningsCard></TotalWinningsCard>
            <BettingPercentageCard></BettingPercentageCard> */}
            {/* <RecentBets></RecentBets> */}
            <BetsCard></BetsCard>
        </div>
    )
}