import { Pinecone } from '@pinecone-database/pinecone';

import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
  throw new Error('Pinecone environment or api key vars missing');
}

export default function initPinecone() {
  try {
    // Initialize Pinecone client
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,  
    });

    return pinecone;

  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
}

