const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});


async function generateContent(base64Image) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64Image,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: contents,
        config: {
            systemInstruction: 'You are the best AI to give one line caption to a image , you give humurous and crisp captions'
        }
    });
    console.log(response.text);
    return response.text
}


module.exports = { generateContent }