import OpenAI from "openai";
import axios from 'axios';
import { systemMessage } from './prompts.js'

// Init openai
const openai = new OpenAI();

// Function to get answer from OpenAI LLM
export async function getAnswerFromLLM(input, context, history) {

  // Chat history is prepared to be passed to the llm
  const formattedHistory = history.map(turn => `${turn.role}: ${turn.content}`); 
  const historyStrings = formattedHistory.join('\n');
 
  const prompt = `Chat History: ${historyStrings}\nContext: ${context}\n\nInput: ${input}\n\nAnalyze the input from me and decide whether it is a question or a statement. If it is a statement that is a greeting (hello, hey, hi e.t.c) or a farewell (good bye, bye e.t.c) or a gratitude (thank you, thanx e.t.c) then respond politely, if it is a question then use the chat history and the context provided to answer the following\n\nQuestion: ${input}\nAnswer:`;
  console.log(prompt)

  const completion = await openai.chat.completions.create({
    messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt}
    ],
    model: "gpt-4o",
  });
  console.log("completion - ", completion.choices[0].message.content)

  return completion.choices[0].message.content

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