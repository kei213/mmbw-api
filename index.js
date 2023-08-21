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
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/*app.use((req, res, next) => {
  // prints to the console the path and method of every request
    console.log(req.path, req.method)
    next()
})*/

// routes
app.use('/api', chatRoutes)

// home route
app.get('/', (req, res) => {
    const currentDate = new Date();
  res.send(`mmbw-backend: ${currentDate}`);
})

app.listen(PORT, '0.0.0.0', () => {
        console.log(`app running on ${PORT} `)
})

