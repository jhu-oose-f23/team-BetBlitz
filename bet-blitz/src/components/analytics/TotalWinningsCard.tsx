import AnalyticsCard from "./AnalyticsCard";


interface MyComponentProps { }

const total = -100;

const TotalWinningsCard: React.FC<MyComponentProps> = () => {
    const component = 
    <div>
    {total > 0 ?
        <>
        {total > 10000 ?
            <div className=" text-4xl text-green-600">
                $ {total}
            </div>
            :
            <div className="text-6xl text-green-600">
                $ {total}
            </div>
        }
        </>
    :
        <>
         {total > 10000 ?
            <div className="text-4xl text-red-600">
                $ {total}
            </div>
            :
            <div className="text-6xl text-red-600">
                $ {total}
            </div>
        }
        </>
    }
    </div>

    return (
        <div>
            <AnalyticsCard title={"Total Winnings"} component={component}></AnalyticsCard>
        </div>
    )
}

export default TotalWinningsCard;