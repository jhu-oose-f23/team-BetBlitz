import { Badge } from "~/components/ui/badge";

interface MyComponentProps {
  name: string;
  checked: boolean;
  setCheck: (check: boolean) => void;
}

const TeamBadge: React.FC<MyComponentProps> = ({ name, checked, setCheck }) => {
  return (
    <div className="flex items-center justify-center">
      {checked ? (
        <Badge
          onClick={() => {
            setCheck(!checked);
          }}
        >
          {name}
        </Badge>
      ) : (
        <Badge
          className="border-black bg-transparent text-black hover:bg-slate-400"
          onClick={() => {
            setCheck(!checked);
          }}
        >
          {name}
        </Badge>
      )}
    </div>
  );
};

export default TeamBadge;
