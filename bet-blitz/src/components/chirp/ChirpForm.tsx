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

interface MyComponentProps {
  getMessage: (
    name1: string,
    name2: string,
    extraInfo: string,
  ) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setResponse: (response: string) => void;
}

//form for users to enter their name, their friends name, and any extra info
const FormSchema = z.object({
  name1: z.string().min(1, {
    message: "Your name is surely 1 character long, right?",
  }),
  name2: z.string().min(1, {
    message: "Don't be rude, your friend has a name",
  }),
  extraInfo: z.string().optional(),
});

const ChirpForm: React.FC<MyComponentProps> = ({
  getMessage,
  setLoading,
  setResponse,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  //when the form is submitted, send the data to the getMessage function which hits the OpenAI API
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setResponse("");
    getMessage(data.name1, data.name2, data.extraInfo ? data.extraInfo : "");
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
            name="name1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="resize-none"
                    {...field}
                    value={field.value ?? ""} //fixes warning about uncontrolled input
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Friends Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jane Smith"
                    className="resize-none"
                    {...field}
                    value={field.value ?? ""} //fixes warning about uncontrolled input
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="extraInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extra Info (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="It was ridiculous to think that the Broncos were going to beat the Chiefs."
                    className="resize-none"
                    {...field}
                    value={field.value ?? ""} //fixes warning about uncontrolled input
                  />
                </FormControl>
                <FormDescription>
                  Anything else you would like to be included in the message?
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

export default ChirpForm;
