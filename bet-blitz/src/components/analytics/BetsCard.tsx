import { Bet } from "@prisma/client";
import AnalyticsCard from "./AnalyticsCard";
import BetsTable from "./BetsTable";

const BettingPercentageCard = () => {
  return (
    <div>
      <AnalyticsCard
        title={"Recent Bets"}
        component={<BetsTable />}
      ></AnalyticsCard>
    </div>
  );
};

export default BettingPercentageCard;
