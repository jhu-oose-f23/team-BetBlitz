import AnalyticsCard from "./AnalyticsCard";

const BettingPercentageCard = ({ percentage }: { percentage: number }) => {
	const component = <p className="text-6xl">{percentage.toFixed(0)}%</p>;

	return (
		<div>
			<AnalyticsCard
				title={"Betting Percentage"}
				component={component}
			></AnalyticsCard>
		</div>
	);
};

export default BettingPercentageCard;
