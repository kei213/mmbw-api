import OpenAI from "openai";
import axios from 'axios';
import { systemMessage } from './prompts.js'

// Init openai
const openai = new OpenAI();

// Function to get answer from OpenAI LLM
export async function getAnswerFromLLM(question, context, history) {

  // Chat history is prepared to be passed to the llm
  const formattedHistory = history.map(turn => `${turn.role}: ${turn.content}`); 
  const historyStrings = formattedHistory.join('\n');
 
  const prompt = `Chat History: ${historyStrings}\nContext: ${context}\n\nGiven the chat history and the context answer the following question\n\nQuestion: ${question}\nAnswer:`;
  console.log(prompt)

   const completion = await openai.chat.completions.create({
    messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt}
    ],
    model: "gpt-4o",
  });
  console.log("completion - ", completion.choices[0].message)

  return completion.choices[0].message

  // const stream = await openai.chat.completions.create({
  //       model: "gpt-4o",
  //       messages: [
  //          { role: "system", content: systemMessage },
  //          { role: "user", content: prompt}
  //       ],
  //       stream: true,
  //   });
  //   for await (const chunk of stream) {
  //       process.stdout.write(chunk.choices[0]?.delta?.content || "");
  //   }
  
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