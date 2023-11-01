import AnalyticsCard from "./AnalyticsCard";


interface MyComponentProps { }

const percentage = 44.56;

const BettingPercentageCard: React.FC<MyComponentProps> = () => {
    const component = 
    <p className="text-6xl">
        {percentage} %
    </p>

    return (
        <div>
            <AnalyticsCard title={"Betting Percentage"} component={component}></AnalyticsCard>
        </div>
    )
}

export default BettingPercentageCard;