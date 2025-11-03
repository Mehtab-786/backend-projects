import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function generateContent(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: "Provide short and brief answer ."
        }
    });
    return response.text;
}

export { generateContent }