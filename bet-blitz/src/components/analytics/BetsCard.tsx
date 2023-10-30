import AnalyticsCard from "./AnalyticsCard";
import BetsTable from "./BetsTable";


interface MyComponentProps { }

const percentage = 44.56;

const BettingPercentageCard: React.FC<MyComponentProps> = () => {

    return (
        <div>
            <AnalyticsCard title={"Recent Bets"} component={<BetsTable></BetsTable>}></AnalyticsCard>
        </div>
    )
}

export default BettingPercentageCard;