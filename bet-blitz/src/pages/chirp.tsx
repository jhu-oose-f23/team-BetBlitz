import React, { useState, useEffect } from "react";
import ChirpForm from "../components/chirp/ChirpForm";
import ChirpMessage from "../components/chirp/ChirpMessage";

import { useAtom } from "jotai";
import { responseAtom } from "~/utils/store";
// Chirp component responsible for rendering the ChirpForm and ChirpMessage components
export default function Chirp() {
  // State variable to manage loading state
  const [loading, setLoading] = useState(false);
  // UseAtom hook to manage and share response state across components
  const [_response, setResponse] = useAtom(responseAtom);
// Function to fetch data from OpenAI API based on provided names and extra information
  const fetchDataFromOpenAI = async (
    name1: string,
    name2: string,
    extraInfo: string,
  ): Promise<void> => {
    // Function to generate a prompt for OpenAI API based on input parameters
    const generatePrompt = (from: string, to: string, extraInfo: string) => {
      const prompt = `Create a message I can send to my friend ${to} to let them know that they are bad at sports betting. Make sure to include: ${extraInfo}, keep the response under 250 words, make the tone casual, and sign the message from ${from}.`;
      return prompt;
    };
// Generate the prompt using input parameters
    const prompt = generatePrompt(name1, name2, extraInfo);
// Fetch data from the "api/response" endpoint using a POST request
    const response = await fetch("api/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    // Check if the response is not available or not OK
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
// Reset loading state
    setLoading(false);
// Read the data stream, decode it, and update the response state
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
// Render the Chirp component
  return (
    <div className="flex flex-grow items-center justify-center border-solid bg-green-400">
      <div className="absolute top-1/2 grid w-full -translate-y-1/2 grid-cols-2">
         {/* Render ChirpForm component with necessary props */}
        <ChirpForm
          getMessage={fetchDataFromOpenAI}
          setLoading={setLoading}
          setResponse={setResponse}
        />
        {/* Render ChirpMessage component with response data and loading state */}
        <ChirpMessage message={_response} loading={loading} />
      </div>
    </div>
  );
}
