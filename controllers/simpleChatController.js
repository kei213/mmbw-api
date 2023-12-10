import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

// get a single workout
export const simpleChat = async (req, res) => {

  const { question } = req.body;
  console.log('simpleChat: ', question)
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
    const response = await openai.chat.completions.create({
	    messages: [{ role: 'user', content: question }],
	    model: 'gpt-3.5-turbo',
	});

    const text = {
    	"text": response.choices[0].message.content
    } 
    console.log('response: ', text);
    res.status(200).json(text);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }

}