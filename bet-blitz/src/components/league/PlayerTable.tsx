import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

type PropType = {
  bettorInfos: any[];
  winner: any;
};

//displays the table of players in the league
const PlayerTable = (props: PropType) => {
  const { bettorInfos, winner } = props;

  const router = useRouter();

  return (
    <Table className="max-w-4xl rounded-xl bg-white shadow-xl">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Player Name</TableHead>
          <TableHead className="w-[250px]">Blitz Bucks</TableHead>
          <TableHead className="w-[250px]">View Bets</TableHead>
          <TableHead className="w-[150px]">Place</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bettorInfos &&
          bettorInfos.map((info, index) => (
            <TableRow 
            className={twMerge(
              "font-bold bg-red-50",
              winner && (winner.Bettor.id == info.bettorId) ? "bg-green-600" : "bg-white",
            )}
            key={`info${index}`}>
              <TableCell>{info.Bettor.name}</TableCell>
              <TableCell>${info.Currency.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    console.log(info);
                    router.push(
                      `/bets/${info.bettorId}/league/${info.leagueId}`,
                    );
                  }}
                >
                  View Bets
                </Button>
              </TableCell>
              <TableCell>{index + 1}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default PlayerTable;
