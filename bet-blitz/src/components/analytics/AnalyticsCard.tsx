import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

interface MyComponentProps {
  title: string;
  component: React.ReactNode;
}

const total = -100;

const width = "500";

const AnalyticsCard: React.FC<MyComponentProps> = ({ title, component }) => {
  return (
    <div>
      <Card className="relative m-8 flex items-center justify-center bg-white p-8 shadow-xl">
        <Badge className="absolute left-0 top-0 -translate-y-4 translate-x-4 p-2 shadow-md">
          {title}
        </Badge>
        <div className="flex w-full items-center justify-center">
          {component}
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsCard;
