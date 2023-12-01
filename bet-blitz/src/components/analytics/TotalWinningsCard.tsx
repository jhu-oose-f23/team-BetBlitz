import { twMerge } from "tailwind-merge";
import AnalyticsCard from "./AnalyticsCard";

//displays a users total winnings
const TotalWinningsCard = ({ total }: { total: number }) => {
  const component = (
    <div>
      {total > 0 ? (
        <>
          <div
            className={twMerge(
              "text-green-600",
              total > 10000 ? "text-4xl" : "text-6xl",
            )}
          >
            $ {total.toFixed(2)}
          </div>
        </>
      ) : (
        <>
          <div
            className={twMerge(
              "text-red-600",
              total > 10000 ? "text-4xl" : "text-6xl",
            )}
          >
            $ {total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div>
      <AnalyticsCard
        title={"Total Winnings"}
        component={component}
      ></AnalyticsCard>
    </div>
  );
};

export default TotalWinningsCard;
