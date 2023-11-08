import TeamBadge from "~/components/odds/TeamBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface MyComponentProps {
  checkNFL: boolean;
  setCheckNFL: (checkNFL: boolean) => void;
  checkNBA: boolean;
  setCheckNBA: (checkNBA: boolean) => void;
  checkMLB: boolean;
  setCheckMLB: (checkMLB: boolean) => void;
}

const FilterTeams: React.FC<MyComponentProps> = ({
  checkNFL,
  setCheckNFL,
  checkNBA,
  setCheckMLB,
  checkMLB,
  setCheckNBA,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex space-x-5">
            <TeamBadge name={"NFL"} checked={checkNFL} setCheck={setCheckNFL} />
            <TeamBadge name={"NBA"} checked={checkNBA} setCheck={setCheckNBA} />
            <TeamBadge name={"MLB"} checked={checkMLB} setCheck={setCheckMLB} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to filter results</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FilterTeams;
