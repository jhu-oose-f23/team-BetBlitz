import { League } from "@prisma/client";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DialogHeader } from "~/components/ui/dialog";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

type PropType = {
  leagues: League[];
  displayJoinLeague: boolean;
  handleJoinLeague?: (league: League, password: string) => void;
};

const LeagueTable = (props: PropType) => {
  const { leagues, displayJoinLeague, handleJoinLeague } = props;

  const [password, setPassword] = useState("");
  const router = useRouter();

  const getDate = (league: League) => {
    const date = new Date(league.startDate);

    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");
    const fullyear = date.getFullYear();

    return `${month}-${day}-${fullyear}`;
  };

  return (
    <Table className="max-w-4xl rounded-xl bg-white shadow-xl">
      {/* Print the column names at the top of the table */}
      <TableHeader> 
        <TableRow>
          <TableHead className="w-[250px]">League Name</TableHead>
          <TableHead className="w-[250px]">Status</TableHead>
          <TableHead className="w-[250px]">Players</TableHead>
          <TableHead className="w-[250px]">Budget</TableHead>
          <TableHead className="w-[200px]">Start Date</TableHead>
          {displayJoinLeague && <TableHead className="w-[200px]"></TableHead>}
        </TableRow>
      </TableHeader>
      {/*Go through all leagues in the database and print out various info about them for users to see*/}
      <TableBody>
        {leagues.map((league: League) => {
          return (
            <TableRow
              key={league.id}
              className={twMerge(
                "whitespace-nowrap font-bold transition duration-300 ease-in-out",
                displayJoinLeague
                  ? ""
                  : "hover:cursor-pointer hover:bg-black hover:text-white",
              )}
              onClick={() => {
                if (!displayJoinLeague) {
                  router.push(`/league/${league.id}`);
                }
              }}
            >
              <TableCell>{league.name}</TableCell>
              <TableCell>{league.password ? "Private" : "Public"}</TableCell>
              <TableCell>
                {league.numMembers}/{league.maxMembers}
              </TableCell>
              <TableCell>{league.startingCurrency}</TableCell>
              <TableCell>{getDate(league)}</TableCell>
              {displayJoinLeague && (
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <div className="flex h-10 items-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-center text-primary-foreground hover:bg-primary/90">
                        Join League
                      </div>
                    </DialogTrigger>
                    <DialogContent className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-white p-4">
                      <DialogHeader>
                        <div className="flex">
                          <DialogTitle>Join League</DialogTitle>
                        </div>
                      </DialogHeader>
                      <div className="grid grid-cols-4 items-center gap-4 py-6">
                        <Label htmlFor="name" className="text-right">
                          Enter Password
                        </Label>
                        <Input
                          id="LeaguePass"
                          value={password}
                          onChange={(e) => setPassword(e.currentTarget.value)}
                          placeholder="If public enter nothing"
                          className="col-span-3"
                        />
                      </div>

                      <DialogClose className="flex justify-end">
                        <div
                          className="ml-4 h-10 w-18 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                          onClick={() => {
                            if (handleJoinLeague)
                              handleJoinLeague(league, password);
                          }}
                        >
                          Join
                        </div>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default LeagueTable;
