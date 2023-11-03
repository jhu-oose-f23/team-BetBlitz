import { Bet } from "@prisma/client";
import AnalyticsCard from "./AnalyticsCard";
import BetsTable from "./BetsTable";

const BettingPercentageCard = ({ bets }: { bets: Bet[] }) => {
  return (
    <div>
      <AnalyticsCard
        title={"Recent Bets"}
        component={<BetsTable bets={bets} />}
      ></AnalyticsCard>
    </div>
  );
};

export default BettingPercentageCard;
