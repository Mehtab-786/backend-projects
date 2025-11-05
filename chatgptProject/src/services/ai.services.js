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
};

async function generateVectors(prompt) {

    const ai = new GoogleGenAI({});
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: prompt,
        config:{
            outputDimensionality:768
        }
    });

    return response.embeddings[0].values;
}

export { generateContent, generateVectors }