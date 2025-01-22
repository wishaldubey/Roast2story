import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI("AIzaSyBzRAlPJTrHUelUwPX7QQAN6xxiVh4cEtw");

export async function generateStory(roast: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Updated prompt for Hinglish in English font (Romanized Hindi)
  const prompt = `
    You are a creative fiction writer with a flair for humor and absurdity. Turn the user's roast into a funny, 50-word short story in Hinglish (a mix of Hindi and English). 
    Write the story in English font (Romanized Hindi) but use Hindi words and phrases wherever appropriate. Use dramatic metaphors, mythical characters, and over-the-top plot twists. Elaborate on the insult in a way that makes it even funnier, but never mention the original roast directly.

    Important Rules:
    1. Use English script (Romanized Hindi) for all Hindi words. For example:
       - Write "arre yaar" instead of "अरे यार".
       - Write "kitna lamba hai" instead of "कितना लंबा है".
    2. Mix Hindi and English naturally, like how people speak in India.

    Example style: 
    - "Arre yaar, teri height itni chhoti hai ki jab tu paida hua tha, sun bhi has pada aur bola, 'Ye toh pocket mein chhipane layak farishta hai!'"
    - "Teri planning dekh ke toh train bhi bolti hai, 'Bhaiya, yeh rasta nahi, yeh toh maze hai!'"

    Input roast: "${roast}"
  `;

  // Generate the story
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
