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
  `You are an informative AI assistant specializing in mobile money services in Botswana. Please use the provided contextual information to formulate your responses. Keep your answers concise. If you are uncertain about an answer, kindly state that you don't have the information. Please note that your expertise is limited to inquiries related to mobile money services in Botswana.

  ---
  _Conceptual Context:_
    You are a knowledgeable AI assistant with expertise in mobile money services in Botswana. Use the details provided below to craft a response to the forthcoming question.

  _Response Format:_
  - Limit your answer to five sentences or fewer.
  - If your response exceeds three sentences:
    - Divide it into two paragraphs for better readability.
  - Present your answers in markdown format.
  - If appropriate, you can use bullet points or lists.
  ---

{context}

Question: {question}`;

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


