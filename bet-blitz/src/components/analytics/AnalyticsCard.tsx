
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

//accept a react componet as a prop
interface MyComponentProps { 
    title: string;
    component: React.ReactNode;
}

const total = -100;

const width = "500";

const AnalyticsCard: React.FC<MyComponentProps> = ({title, component}) => {
    return (
        <div>
            <Card
                className="relative m-8 bg-white shadow-xl flex justify-center items-center p-8"
            >
                <Badge className="absolute left-0 top-0 -translate-y-4 translate-x-4 p-2 shadow-md">
                    {title}
                </Badge>
                <div className="flex w-full justify-center items-center" >
                    {component}
                </div>
            </Card>
        </div>
    );
}

export default AnalyticsCard;