const generatePrompt2 = (from: string, to: string, extraInfo: string) => {
  const prompt = `Hey ${to},\n\nI hope you're doing great! Look, I wanted to talk to you about something that's been on my mind lately. I know it's not easy to hear criticism, but as your friend, I feel it's important to be honest with you. \n\nI've noticed that when it comes to sports betting, things haven't been going in your favor lately. I just wanted to gently point it out because I genuinely care about you and don't want to see you lose more than you can afford. Sports betting can be tricky, and it's completely normal to have ups and downs, but it seems like luck hasn't been on your side lately. \n\nMaybe it's worth considering taking a break or reassessing your strategy. It could be beneficial to analyze your past bets, learn from them, and even seek advice from more experienced bettors. Remember, there's no shame in admitting that something isn't your strong suit, and it's okay to seek improvement.\n\nUltimately, it's your decision on how you want to approach sports betting, but know that I'm here to support you no matter what. And please remember that there are plenty of other amazing things you excel at apart from sports betting.\n\nTake care, and let's catch up soon!\n\n${from}`;
  return prompt;
};

export default async (req: any, res: any) => {
  try {
    const body = req.body;
    
    setTimeout(() => {
      res.status(200).json({
        message: generatePrompt2(body.name1, body.name2, body.extraInfo),
      });
    }, 1000);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).end(); // Return a 500 Internal Server Error in case of an error
  }
};
