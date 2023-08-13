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
  `You are a helpful AI assistant about mobile money services in Botswana. Use the following pieces of context to answer the question at the end. Use five sentences max and keep your answer as concise as possible, please return your answers in markdown format. If you do use more than 3 sentences divide the answer into two paragraphs to improve readability. If you feel it is necessary you can return some answers in the form of a list
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
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


