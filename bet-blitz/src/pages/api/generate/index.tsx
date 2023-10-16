import OpenAI from 'openai';
import { set } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


const generatePrompt = (from: string, to: string, extraInfo: string) => {
  const prompt = `Generate a message I can send to my friend ${to} to let them know that they are bad at sports betting. Make sure to include: ${extraInfo} and sign the message from ${from}.`;
  return prompt;
}

const sampleResponse = "Hey [Friend's Name],\n\nI hope you're doing great! Look, I wanted to talk to you about something that's been on my mind lately. I know it's not easy to hear criticism, but as your friend, I feel it's important to be honest with you. \n\nI've noticed that when it comes to sports betting, things haven't been going in your favor lately. I just wanted to gently point it out because I genuinely care about you and don't want to see you lose more than you can afford. Sports betting can be tricky, and it's completely normal to have ups and downs, but it seems like luck hasn't been on your side lately. \n\nMaybe it's worth considering taking a break or reassessing your strategy. It could be beneficial to analyze your past bets, learn from them, and even seek advice from more experienced bettors. Remember, there's no shame in admitting that something isn't your strong suit, and it's okay to seek improvement.\n\nUltimately, it's your decision on how you want to approach sports betting, but know that I'm here to support you no matter what. And please remember that there are plenty of other amazing things you excel at apart from sports betting.\n\nTake care, and let's catch up soon!\n\n[Your Name]";

export default async (req: any, res: any) => {
    try {
      const body = req.body;
      const prompt = generatePrompt(body.name1, body.name2, body.extraInfo)
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": prompt}],
      });
      const response = chatCompletion.choices[0]?.message ? chatCompletion.choices[0].message.content : "An error occurred generating the response"
      res.status(200).json({message:response});
      //setTimeout(() => {res.status(200).json({message:generatePrompt(body.name1, body.name2, body.extraInfo)});}, 1000);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).end(); // Return a 500 Internal Server Error in case of an error
    }
  };
  

