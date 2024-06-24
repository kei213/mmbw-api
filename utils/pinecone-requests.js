import initPinecone from '../utils/pinecone-client.js';

// Init Pinecone
const pinecone = initPinecone()

// Function to query Pinecone for similar vectors
export async function querySimilarVectors(index, embedding, topK = 5) {
  const result = await index.query({
    topK: topK,
    vector: embedding
  });
  return result.matches;
}

// Function to get the original data for matching vectors from Pinecone
export async function getOriginalData(index, vectorIds) {
  const result = await index.fetch(vectorIds);  
  return result.records;
}