import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI("AIzaSyBzRAlPJTrHUelUwPX7QQAN6xxiVh4cEtw");

export async function generateStory(roast: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Updated Hinglish prompt
  const prompt = `
    You are a creative fiction writer with a flair for humor and absurdity. Turn the user's roast into a funny, 50-word short story in Hinglish. 
    Use dramatic metaphors, mythical characters, and over-the-top plot twists. Elaborate on the insult in a way that makes it even funnier, but never mention the original roast directly.

    Example input: "Tu jab gana gata hai toh kauwe jaisi awaaz aati hai."
    Example output: "Mahoday, jab aap gaane ki koshish karte ho, toh aisa lagta hai jaise kauwe Indian Idol ka audition dene aaye hain. Unke saath Annu Malik bhi aapke gaane mein apni awaaz de raha hai, aur judges ke kaan se khoon beh raha hai. Aapka gaana sunkar, peepal ke ped bhi apni pattiyan gira rahe hain, aur neighborhood ke kutton ne apni bhaunkna band kar di hai. Kya karein, talent toh talent hota hai!"

    Input roast: "${roast}"
  `;

  // Generate the story
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
