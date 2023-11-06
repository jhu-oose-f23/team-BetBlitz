import { check } from "prettier";
import { Badge } from "~/components/ui/badge"

//import props
interface MyComponentProps {
    name: string
    checked: boolean;
    setCheck: (check: boolean) => void;
}

const TeamBadge : React.FC<MyComponentProps> = ({ name, checked, setCheck }) => {
    return (
        <div className="flex items-center justify-center">
            {checked ?
                <Badge onClick={() => {setCheck(!checked)}}>{name}</Badge>  
            :
                <Badge className="bg-transparent border-black text-black hover:bg-slate-400" onClick={() => {setCheck(!checked)}}>{name}</Badge>
            }
        </div>
    );
}

export default TeamBadge;