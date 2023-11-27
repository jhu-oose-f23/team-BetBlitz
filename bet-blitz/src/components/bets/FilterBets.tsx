import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import LeagueBadge from "./LeagueBadge";
import { Dispatch, SetStateAction, useEffect } from "react";
import { League } from "@prisma/client";

type PropType = {
  leagues: League[];
  filter: string[];
  setFilter: Dispatch<SetStateAction<string[]>>;
};

const FilterBetsByLeagues = (props: PropType) => {
  const { leagues, filter, setFilter } = props;

  const handleSetFilter = (leagueId: string) => {
    const updatedFilter = filter;

    if (filter.find((id) => id === leagueId)) {
      const filteredLeagues = updatedFilter.filter((id) => id !== leagueId);
      setFilter([...filteredLeagues]);
    } else {
      updatedFilter.push(leagueId);
      setFilter([...updatedFilter]);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex space-x-5">
            {leagues.map((league: League, index: number) => {
              return league && (
                <LeagueBadge
                  name={league.name}
                  checked={!filter.find((id) => id === league.id)}
                  setCheck={() => handleSetFilter(league.id)}
                  key={`leagueBadge${index + 1}`}
                />
              );
            })}
            <LeagueBadge
              name={"Private currency"}
              checked={!filter.find((name) => name === "privateCurrency")}
              setCheck={() => handleSetFilter("privateCurrency")}
              key={`leagueBadge0`}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to filter results</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FilterBetsByLeagues;
