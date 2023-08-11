import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'; /* delete this for production*/


import chatRoutes from './routes/chatRoutes.js'

// Load environment variables from .env file
dotenv.config();


// express app
const app = express()
const PORT = process.env.PORT || 3000 

// middleware
app.use(express.json())
app.use(cors()); /* remove cors for production */

/*app.use((req, res, next) => {
  // prints to the console the path and method of every request
    console.log(req.path, req.method)
    next()
})*/

// routes
app.use('/api/chat', chatRoutes)

// home route
app.get('/', (req, res) => {
    const currentDate = new Date();
  res.send(`netninja-merntut: ${currentDate}`);
})

app.listen(PORT, '0.0.0.0', () => {
        console.log(`app running on ${PORT} `)
})

