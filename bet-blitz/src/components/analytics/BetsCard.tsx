import AnalyticsCard from "./AnalyticsCard";
import BetsTable from "./BetsTable";

import { BetWithEvent } from "~/pages/analytics";

type PropType = {
  bets: BetWithEvent[];
};

//displays a users total successful betting percentage on all single bets
//currently filters parlay bets out
const BetsCard = (props: PropType) => {
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

export default BetsCard;
