import { GoogleGenAI } from "@google/genai";

// Lazily initialize to avoid crashing the app on load if API_KEY is missing.
let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
      // This error will be caught by the calling function and displayed in the UI.
      throw new Error("The API_KEY environment variable is not set. Please configure it in your deployment environment settings.");
    }
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
  return ai;
}

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
    const aiClient = getAiClient();
    const response = await aiClient.models.generateContent({
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
    // Propagate the specific API key error from getAiClient
    if (error instanceof Error && error.message.includes("API_KEY")) {
        throw error;
    }
    // Provide a more generic error for other API/network issues.
    throw new Error("Failed to generate summary. The API call failed. Please check your network connection or the service status.");
  }
}