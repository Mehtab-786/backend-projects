import { config } from 'dotenv';
config();
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY
});

const promptTemplate = PromptTemplate.fromTemplate(`
    explain {topic} in simple ELI5,
    make sure excluding uncessary jargons and keep it brief
    `);

const chain = promptTemplate.pipe(model);

chain.invoke({topic:"cat"})
.then(data => console.log(data.content))