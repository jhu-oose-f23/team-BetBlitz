import { useEffect, useState } from "react";
import { Event } from "@prisma/client";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "~/components/ui/dialog";


interface MyComponentProps { }

const total = -100;

const TotalWinningsCard: React.FC<MyComponentProps> = () => {
    return (
        <div>
            <Card
                className="relative m-8 w-80 bg-white shadow-xl"
            >
                <Badge className="absolute left-0 top-0 -translate-y-4 translate-x-4 p-2 shadow-md">
                    Net Winnings
                </Badge>

                {/* <CardHeader>
                    <div className="flex flex-row items-center">
                        <CardTitle className="text-md flex-grow">
                            Net Winnings
                        </CardTitle>
                    </div>
                </CardHeader> */}
                {total > 0 ?
                    <div className="flex justify-center items-center text-3xl text-green-600 p-8 aspect-square">
                        $ {total}
                    </div>
                :
                    <div className="flex justify-center items-center text-3xl text-red-600 p-8 aspect-square">
                        $ {total}
                    </div>
                }

            </Card>
        </div>
    )
}

export default TotalWinningsCard;