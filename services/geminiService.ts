
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateSummary(transcript: string, customPrompt: string): Promise<string> {
  const model = 'gemini-2.5-flash';
  
  const fullPrompt = `
    INSTRUCTIONS:
    Based on the provided meeting transcript, please follow this primary instruction: "${customPrompt}".
    Generate a clear, concise, and structured summary.
    Ensure the output is well-formatted and easy to read.

    MEETING TRANSCRIPT:
    ---
    ${transcript}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: fullPrompt,
        config: {
            temperature: 0.5,
            topP: 0.95,
            topK: 64,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini API:", error);
    throw new Error("Failed to generate summary. Please check your API key and network connection.");
  }
}
