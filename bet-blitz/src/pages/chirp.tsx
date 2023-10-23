import React, { useState, useEffect } from "react";
import ChirpForm from "../components/chirp/ChirpForm";
import ChirpMessage from "../components/chirp/ChirpMessage";

// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-JWFdAWgKGUkAnKNGZubG57jz",
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

import { useAtom } from "jotai";
import { responseAtom } from "~/utils/store";

export default function Chirp() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [_response, setResponse] = useAtom(responseAtom);

  // Create a function to fetch data from the OpenAI endpoint
  const fetchDataFromOpenAI = async (
    name1: string,
    name2: string,
    extraInfo: string,
  ) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name1: `${name1}`,
          name2: `${name2}`,
          extraInfo: `${extraInfo}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); // Set the data as the state
        setLoading(false);
      } else {
        console.error("Failed to fetch data from OpenAI");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreateLesson = async (): Promise<void> => {
    // const validateMsg = form.validate();
    // if (validateMsg.hasErrors) {
    //   console.log(form.values);
    //   console.log(validateMsg);
    //   return;
    // }
    // toggle();
    const response = await fetch("api/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: message,
      }),
    });
    if (!response) {
      return;
    }
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data: ReadableStream<BufferSource> | null = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let total = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (!value) continue;
      const chunkValue = decoder.decode(value);
      setResponse((prev) => prev + chunkValue);
      total += chunkValue;
    }
  };

  return (
    <div className="bg-green-400 flex justify-center items-center flex-grow border-solid">
      <div className="grid grid-cols-2 absolute top-1/2 -translate-y-1/2 w-full">
        <ChirpForm getMessage={handleCreateLesson} setLoading={setLoading} />
        <ChirpMessage message={_response} loading={isLoading} />
      </div>
    </div>
  );
}
