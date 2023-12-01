import React from "react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { ScrollArea } from "~/components/ui/scroll-area";

const loaderSkeleton = (
  <div className="flex h-fit animate-pulse flex-col rounded shadow-md sm:w-80">
    <div className="flex-1 space-y-4 bg-gray-400 px-4 py-8 sm:p-8">
      <div className="h-6 w-full rounded bg-gray-300"></div>
      <div className="h-6 w-full rounded bg-gray-300"></div>
      <div className="h-6 w-full rounded bg-gray-300"></div>
      <div className="flex h-12 w-full items-center justify-center rounded bg-gray-300 text-center font-extralight text-gray-500">
        Generating your message, please do not refresh.
      </div>
      <div className="flex h-12 w-full items-center justify-center rounded bg-gray-300 text-center font-extralight text-gray-500">
        This may take awhile
      </div>
      <div className="h-6 w-full rounded bg-gray-300"></div>
      <div className="h-6 w-full rounded bg-gray-300"></div>
      <div className="h-6 w-3/4 rounded bg-gray-300"></div>
    </div>
  </div>
);

interface MyComponentProps {
  message: string;
  loading: boolean;
}

const ChirpMessage: React.FC<MyComponentProps> = ({ message, loading }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    toast({
      title: "Sucessfully copied to clipboard!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Now you can send to your friend!</code>
        </pre>
      ),
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        {loaderSkeleton}
      </div>
    );
  }

  if (message === "") {
    return (
      <div className="flex h-full items-center justify-center text-3xl font-extrabold">
        <div className="w-2/3 text-center">
          Fill out the form on the left and click submit to generate a message
          that lets your friend know they are bad at sports betting.
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center">
      {loading ? (
        loaderSkeleton
      ) : (
        <Card className="w-2/3 bg-gray-300 p-4">
          <div className="flex flex-row-reverse">
            <Button onClick={handleCopy}>Copy</Button>
          </div>

          <Card className="mt-2 bg-black p-4 font-light text-white">
            <ScrollArea className="h-[300px] w-[400px] rounded-md">
              {message}
            </ScrollArea>
          </Card>
        </Card>
      )}
    </div>
  );
};

export default ChirpMessage;
