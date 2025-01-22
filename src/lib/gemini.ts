import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyBzRAlPJTrHUelUwPX7QQAN6xxiVh4cEtw");

export async function generateStory(roast: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `You are a creative fiction writer. Turn the user's roast into a funny, 50-word short story. 
    Use absurd metaphors, mythical characters, and dramatic plot twists. Never mention the original roast directly.
    
    Input roast: "${roast}"`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}