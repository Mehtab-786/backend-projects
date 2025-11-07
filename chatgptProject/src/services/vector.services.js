import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const chatgptPractice = pc.index('practicc-chatgpt');

async function createMemory({ vectors, metadata, messageId }) {
    await chatgptPractice.upsert([{
        id: messageId,
        values: vectors,
        metadata
    }])
};

async function queryMemory({ queryVector, limit = 5, metadata }) {
    const data = await chatgptPractice.query({
        vector: queryVector,
        includeMetadata: true,
        topK: limit,
        filter: metadata ? metadata  : undefined
    })

    return data.matches;
};


export { createMemory, queryMemory };