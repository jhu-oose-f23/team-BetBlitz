import React, { useState, useEffect } from "react";
import ChirpForm from "../components/chirp/ChirpForm";
import ChirpMessage from "../components/chirp/ChirpMessage";

import { useAtom } from "jotai";
import { responseAtom } from "~/utils/store";

export default function Chirp() {
  const [loading, setLoading] = useState(false);
  const [_response, setResponse] = useAtom(responseAtom);

  const fetchDataFromOpenAI = async (
    name1: string,
    name2: string,
    extraInfo: string,
  ): Promise<void> => {

    const generatePrompt = (from: string, to: string, extraInfo: string) => {
      const prompt = `Create a message I can send to my friend ${to} to let them know that they are bad at sports betting. Make sure to include: ${extraInfo}, keep the response under 250 words, make the tone casual, and sign the message from ${from}.`;
      return prompt;
    };

    const prompt = generatePrompt(name1, name2, extraInfo);

    const response = await fetch("api/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
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

    setLoading(false);

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
        <ChirpForm getMessage={fetchDataFromOpenAI} setLoading={setLoading} setResponse={setResponse}/>
        <ChirpMessage message={_response} loading={loading} />
      </div>
    </div>
  );
}
