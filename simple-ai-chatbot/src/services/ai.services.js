const {GoogleGenAI} = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateContent(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config:{
      systemInstruction:"Answer briefly (<20 words), to the point, no extra details."
    }
  });
  return response.text;
}
 
module.exports = generateContent