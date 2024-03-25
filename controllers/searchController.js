import axios from 'axios'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config();

// get search results
export const search = async (req, res) => {

  const { search } = req.body
  console.log (search)

  if (!search) {
    res.status(400).json({ error: 'Search term must be provided' });
    return;
  }

  try {
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
      params: {
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.CUSTOM_SEARCH_ENGINE_ID,
        q: search
      }
    });

    res.status(200).json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing request' });
  }

}