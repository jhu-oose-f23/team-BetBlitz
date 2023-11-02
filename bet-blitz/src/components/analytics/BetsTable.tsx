import { Bet } from "@prisma/client";

import { columns } from "./betsTable/columns";
import { DataTable } from "./betsTable/data-table";

const RecentBetsCard = ({ bets }: { bets: Bet[] }) => {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={bets} />
    </div>
  );
};

export default RecentBetsCard;
