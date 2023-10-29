import PercentageCard from "~/components/analytics/TotalWinningsCard"
import LeagueForm from "~/components/league/LeagueForm"

export default function League() {
    return (
        <div className="flex items-center justify-center h-4/5">
            {/* <LeagueForm /> */}
            <PercentageCard></PercentageCard>
        </div>
    )
}