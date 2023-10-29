import { Bet } from "@prisma/client";
import AnalyticsCard from "./AnalyticsCard";

import { columns } from "./betsTable/columns"
import { DataTable } from "./betsTable/data-table"
import {useState, useEffect} from "react"



interface MyComponentProps { }

async function getData(): Promise<Bet[]> {
    // TODO fetch reach data
    const date1 = new Date("2023-10-28T09:30:00Z");
    return (
        [
            {
              "id": "1",
              "bettorId": "user123",
              "gameId": "game456",
              "amount": 50,
              "leagueId": "league789",
              "createdAt": date1
            },
            {
              "id": "2",
              "bettorId": "user456",
              "gameId": "game789",
              "amount": 75,
              "leagueId": null,
              "createdAt": date1
            },
            {
              "id": "3",
              "bettorId": "user789",
              "gameId": "game123",
              "amount": 25,
              "leagueId": "league123",
              "createdAt": date1
            }
        ]  
    );        
        // ...
}

const RecentBetsCard: React.FC<MyComponentProps> = () => {
    const [data, setData] = useState<Bet[]>([])

    useEffect(() => {
        getData().then((data) => setData(data))
    }, [])

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default RecentBetsCard;

