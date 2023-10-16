import React, { useState, useEffect } from "react";
import ChirpForm from "~/components/chirp/ChirpForm";
import ChirpMessage from "~/components/chirp/ChirpMessage";

// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-JWFdAWgKGUkAnKNGZubG57jz",
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

export default function Chirp() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Call the fetchDataFromOpenAI function when the component mounts

  return (
    <div className="grid grid-cols-2 absolute top-1/2 -translate-y-1/2">
      <ChirpForm getMessage={fetchDataFromOpenAI} setLoading={setLoading} />
      <ChirpMessage message={message} loading={loading} />
    </div>
  );
}
