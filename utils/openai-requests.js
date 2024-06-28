import OpenAI from "openai";
import axios from 'axios';
import { systemMessage } from './prompts.js'

// Init openai
const openai = new OpenAI();

// Function to get answer from OpenAI LLM
export async function getAnswerFromLLM(input, context, history) {  
  const prompt = `Context: ${context}\n\nInput: ${input}\n\nAnalyze the input from me and decide whether it is a question or a statement. If it is a statement that is a greeting (hello, hey, hi e.t.c) or a farewell (good bye, bye e.t.c) or a gratitude (thank you, thanx e.t.c) then respond politely.\n
   If the input is a statement that is not a greeting, farewell or gratitude then analyse the chat history to understand the meaning of the input and answer appropriately. If the input is a question then use the chat history and the context provided to formalize an appropriate answer to the following\n\nQuestion: ${input}\nAnswer:`;
  // console.log(prompt)
  const messages = [
        {role: "system", content : systemMessage},
        ...history,        
        { role: "user", content: prompt}
    ]
  
  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-4-turbo",
  }); 

  return completion.choices[0].message.content
  
}

  // Function to get embeddings from OpenAI
export async function getEmbeddings(sanitizedQuestion) {
  const response = await axios.post(
    'https://api.openai.com/v1/embeddings',
    {
      model: 'text-embedding-ada-002',
      input: sanitizedQuestion,
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data.data[0].embedding;
}