import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'; /* delete this for production*/
import mongoose from 'mongoose'

import chatRoutes from './routes/chatRoutes.js'
import siteRoutes from './routes/siteRoutes.js'

// Load environment variables from .env file
dotenv.config();

// express app
const app = express()
const PORT = process.env.PORT || 3000

// cors setup
const developmentOrigins = ["http://localhost:3000"];
const productionOrigins = ["https://www.mobilemoneybw.co.bw"];

const allowlist = process.env.NODE_ENV === "production" ? productionOrigins : developmentOrigins;

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowlist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'));
      }
    },
    credentials: true,  
  })
);

// middleware
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    // prints to the console the path and method of every request
    console.log(req.path, req.method);
    next();
  });
}


// routes
app.use('/api', chatRoutes)
app.use('/api', siteRoutes)

// home route
app.get('/', (req, res) => {
    const currentDate = new Date();
  res.send(`mmbw-backend: ${currentDate}`);
})

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

