import initPinecone from '../utils/pinecone-client.js';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '../config/pinecone.js';
import { getEmbeddings, getAnswerFromLLM } from '../utils/openai-requests.js';
import { querySimilarVectors, getOriginalData } from '../utils/pinecone-requests.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Init Pinecone
const pinecone = initPinecone()
// Connect to the existing Pinecone index
const index = pinecone.Index(PINECONE_INDEX_NAME);

export const contextInjection = async (req, res) => {

  const { question } = req.body;
  const history = req.body.messages
  console.log("chat-query - ")
  //only accept post requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }

  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

  try {

    const numberOfWords = sanitizedQuestion.trim().split(/\s+/).length;    

    const determineContext = async(numberOfWords) => {

        if ( numberOfWords > 2 ) {
          //  get embeddings from openai 
          const queryEmbeddings = await getEmbeddings(sanitizedQuestion);

          // find similar vectors in pinecone
          const similarVectors = await querySimilarVectors(index, queryEmbeddings); 

          // Retrieve the original data for the matching vectors
          const vectorIds = similarVectors.map(match => match.id); 
          const originalData = await getOriginalData(index, vectorIds);
          
          // Construct the context from the retrieved data
          const context = Object.values(originalData).map(vector => vector.metadata.text).join('\n');

          return context
        }

        const context = ""
        return context
    }

    const context = await determineContext(numberOfWords)

    // Get answer from OpenAI LLM
    const answer = await getAnswerFromLLM(sanitizedQuestion, context, history);
    console.log("answer - ", answer)
    const text = {
      "text": answer
    }    
    res.status(200).json(text);

  } catch (error) {
    console.log('error:', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }

}