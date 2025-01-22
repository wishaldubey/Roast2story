import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI("AIzaSyBzRAlPJTrHUelUwPX7QQAN6xxiVh4cEtw");

export async function generateStory(roast: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Updated prompt for English roasts
  const prompt = `
    You are a master of brutal, savage, and sarcastic roasts. Your job is to take the user's input and turn it into a brutally funny, cutting, and over-the-top roast. Use sharp wit, absurd metaphors, and dramatic exaggeration to make the roast as savage as possible. Never hold back—this is a no-mercy zone.

    Rules:
    1. Be as brutal and savage as possible.
    2. Avoid childish or generic insults—focus on creative, cutting humor.
    3. Never mention the original input directly—turn it into a roast.

    Examples:
    1. Input: "You’re always late."
       Output: "You’re so late that even time zones get confused. Sundials look at you and say, 'Bro, can you hurry up?'"

    2. Input: "You’re so lazy."
       Output: "Your laziness is so legendary that even couch potatoes tell you to get up. For you, going to the gym means picking up the remote, and a marathon is binge-watching Netflix."

    3. Input: "You’re terrible at cooking."
       Output: "Your cooking is so bad that even hunger strikes avoid you. Your biryani makes rice cry, and your omelet makes eggs beg to be scrambled instead."

    4. Input: "You’re always on your phone."
       Output: "Your phone addiction is so bad that even Wi-Fi tells you to take a break. Your screen time is so high that sunlight asks, 'Hey, can I see your face for a second?'"

    5. Input: "You’re so clumsy."
       Output: "Your clumsiness is so famous that even gravity gives up on you. When you walk, people move out of the way, and when you fall, the floor says, 'Dude, watch your step!'"

    6. Input: "You’re terrible at singing."
       Output: "Your singing is so bad that even autotune says, 'I can’t fix this.' When you tried 'Sa Re Ga Ma,' the notes ran away, and the scales gave up. Legend has it, no one dares to sing after you."

    7. Input: "You’re always broke."
       Output: "You’re so broke that even piggy banks feel sorry for you. Your bank balance makes ATMs say, 'Bro, recharge me first.' And your wallet? Even money says, 'I’m outta here!'"

    8. Input: "You’re terrible at dancing."
       Output: "Your dancing is so bad that even robots say, 'Nope, not happening.' Your moves are so awkward that even disco balls tell you to take a break."

    9. Input: "You’re always overthinking."
       Output: "You overthink so much that even Google tells you to relax. Your brain has so many questions that even Wikipedia says, 'I need a break.'"

    10. Input: "You’re terrible at driving."
        Output: "Your driving is so bad that even traffic signals say, 'Dude, pay attention.' Your skills make GPS say, 'This isn’t a road; it’s a new planet!'"

    Input roast: "${roast}"
  `;

  // Generate the story
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
