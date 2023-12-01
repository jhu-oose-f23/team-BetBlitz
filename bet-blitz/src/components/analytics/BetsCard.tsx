import { Bet } from "@prisma/client";
import AnalyticsCard from "./AnalyticsCard";
import BetsTable from "./BetsTable";

import { BetWithEvent } from "~/pages/analytics";

type PropType = {
  bets: BetWithEvent[];
};

//take bets in as a prop


const BettingPercentageCard = (props: PropType) => {
  const { bets } = props;

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
