import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'; /* delete this for production*/
import mongoose from 'mongoose';
import { corsConfig } from './config/cors-config.js';

import chatRoutes from './routes/chatRoutes.js';
import siteRoutes from './routes/siteRoutes.js';

// Load environment variables from .env file
dotenv.config();

// express app
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors(corsConfig));

// middleware
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    // prints to the console the path and method of every request
    console.log(req.path, req.method);
    next();
  });
}

// home route
app.get('/', (req, res) => {
    const currentDate = new Date();
  res.send(`mmbw-backend: ${currentDate}`);
})

// routes
app.use('/api', chatRoutes)
app.use('/api', siteRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      // listen for requests
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`connected to MongoDb & listening 0n ${PORT} `)
    })
    })
    .catch((error) => {
      console.log(error)
    })

