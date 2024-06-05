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
`###You are a helpful AI assistant who speacialises in Mobile money services in Botswana. The mobile money services are Smega, Orange Money and MyZaka. ###
###If you receive a question and you are not sure which mobile money service it relates to, ask the user for clarification.###
###If you don't know the answer, just say you don't know. DO NOT try to make up an answer.###
###Keep your answers to 6 sentences max.### 
###If you feel it is appropriate, return answers in the form of a list.###
###Please return all answers in markdown format.###
###If you do not understand the question, just reply saying you do not understand the question, do not answer the last question asked again.###
###If the provided context does not include information related to the question then use your own knowledge to answer the question.###

Use the following pieces of context to answer the question at the end. 

{context}

Question: {question}
Helpful answer in markdown:`;

export const makeChain = (vectorstore) => {
  const model = new OpenAI({
    temperature: 0.3, // increase temepreature to get more creative answers
    modelName: 'gpt-4o', //change this to gpt-4 if you have access
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


