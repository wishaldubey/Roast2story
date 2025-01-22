import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI("AIzaSyBzRAlPJTrHUelUwPX7QQAN6xxiVh4cEtw");

export async function generateStory(roast: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Updated prompt for Hinglish in English script
  const prompt = `
    You are a creative fiction writer with a flair for humor and absurdity. Turn the user's roast into a funny, 50-word short story in Hinglish (a mix of Hindi and English). 
    Write the story in English script (Romanized Hindi) but use Hindi words and phrases wherever appropriate. Use dramatic metaphors, mythical characters, and over-the-top plot twists. Elaborate on the insult in a way that makes it even funnier, but never mention the original roast directly.

    Example style: 
    - "Mahoday, jab aap gaane ki koshish karte ho, toh aisa lagta hai jaise kauwe Indian Idol ka audition dene aaye hain."
    - "Aapki planning dekh ke toh train bhi bolti hai, 'Bhaiya, yeh rasta nahi, yeh toh maze hai!'"

    Input roast: "${roast}"
  `;

  // Generate the story
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
