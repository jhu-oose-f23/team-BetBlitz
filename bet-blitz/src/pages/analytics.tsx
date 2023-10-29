import TotalWinningsCard from "~/components/analytics/TotalWinningsCard";
import BettingPercentageCard from "~/components/analytics/BettingPercentageCard";

export default function Analytics() {
    return (
        <div>
            <TotalWinningsCard></TotalWinningsCard>
            <BettingPercentageCard></BettingPercentageCard>
        </div>
    )
}