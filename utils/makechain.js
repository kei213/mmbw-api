import { OpenAI } from 'langchain/llms/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

const CONDENSE_PROMPT =
  `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT =
  `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
  If you don't know the answer, just say you don't know. DO NOT try to make up an answer. Keep your answers to 5 sentences max. If you feel it is appropriate you can return some answers in the form of a list. Please return all answers in markdown format. If the user says thank you, goodbye or something similar reply saying something like glad i was able to help you out, have a nice day.
  If the question is not related to the context, politely respond that you are trained to only answer questions that are related to mobile money services in Botswana.

{context}

Question: {question}
Helpful answer in markdown:`;

export const makeChain = (vectorstore) => {
  const model = new OpenAI({
    temperature: 1, // increase temepreature to get more creative answers
    modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: false, //The number of source documents returned is 4 by default
    },
  );
  return chain;
};


