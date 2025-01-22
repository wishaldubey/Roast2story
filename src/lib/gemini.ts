import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI("AIzaSyBzRAlPJTrHUelUwPX7QQAN6xxiVh4cEtw");

export async function generateStory(roast: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Updated prompt with explicit Hinglish instruction
  const prompt = `
    You are a creative fiction writer with a flair for humor and absurdity. Turn the user's roast into a funny, 50-word short story in Hinglish (a mix of Hindi and English). 
    Use dramatic metaphors, mythical characters, and over-the-top plot twists. Elaborate on the insult in a way that makes it even funnier, but never mention the original roast directly.
    Write the story in a conversational, Indian style, using Hindi words and phrases wherever appropriate.

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
