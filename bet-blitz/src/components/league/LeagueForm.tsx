"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import { Input } from "~/components/ui/input";

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Calendar } from "~/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"

interface MyComponentProps { }

const FormSchema = z.object({
    leagueName: z.string().min(1, {
        message: "League name must be at least 1 character long",
    }),
    seasonLength: z
        .coerce
        .number({
            invalid_type_error: "Season length must be a number",
        })
        .int()
        .min(1, {
            message: "Season must be at least 1 week long",
        })
        .max(100, {
            message: "Season must be less than 100 weeks long",
        }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
    passwordConfirm: z.string(),
    startingMoney: z.
        coerce
        .number({
            invalid_type_error: "Starting money must be a number",
        })
        .min(1, {
            message: "Starting money must be at least 1",
        })
        .max(1000000, {
            message: "Starting money must be less than 1,000,000",
        }),
    maxPlayers: z
        .coerce
        .number({
            invalid_type_error: "Max players must be a number",
        })
        .int()
        .min(1, {
            message: "Max players must be at least 1",
        })
        .max(100, {
            message: "Max players must be less than 100",
        }),
    startingDate: z.date(),
}).refine(data => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ['passwordConfirm'],
});

const LeagueForm: React.FC<MyComponentProps> = () => {
    const [date, setDate] = React.useState<Date>();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("form submitted");
        //TODO: send data to backend
    }

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="leagueName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>League Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Patty's Pub Fantasy League"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="seasonLength"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Season Length (Weeks)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="10"
                                        className="resize-none"
                                        defaultValue={10}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Password will be used to join the league
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startingMoney"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Starting Money</FormLabel>
                                <FormControl>
                                    <div>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-gray-500 sm:text-sm">$</span>
                                            </div>
                                            <Input
                                                type="text"
                                                id="price"
                                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900   ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                placeholder="0.00"
                                                aria-describedby="price-currency"
                                                {...field}
                                            />

                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span className="text-gray-500 sm:text-sm" id="price-currency">USD</span>
                                            </div>
                                        </div>
                                    </div>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="maxPlayers"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Maximum Number of Players</FormLabel>
                                <FormControl>
                                    <Input
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startingDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Starting Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    The league will start on the selected date.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default LeagueForm;


