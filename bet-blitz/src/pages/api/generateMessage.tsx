import type { NextRequest } from 'next/server';
 
export const config = {
  runtime: 'edge',
};

import OpenAI from "openai";
import { set } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

const generatePrompt = (from: string, to: string, extraInfo: string) => {
  const prompt = `Generate a message I can send to my friend ${to} to let them know that they are bad at sports betting. Make sure to include: ${extraInfo} and sign the message from ${from}.`;
  return prompt;
};
 
export default async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  console.log(request);
  const body = request.body;
  console.log(request.body);
  
  // const prompt = generatePrompt(body.name1, body.name2, body.extraInfo);
  // // const prompt = generatePrompt("Logan", "Jake", "");
  // const chatCompletion = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages: [{ role: "user", content: prompt }],
  // });
  // const response = chatCompletion.choices[0]?.message
  //   ? chatCompletion.choices[0].message.content
  //   : "An error occurred generating the response";
 
  return new Response(
    JSON.stringify({
      body: request.body,
      query: searchParams.get('query'),
      cookies: request.cookies,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );
}