import express from 'express'
import { contactUs } from '../controllers/contactUsController.js'
// import { subscribe } from '../controllers/subscribeController.js'

const router = express.Router()

// route for simple chat response
router.post('/contact-us', contactUs)

// route for context injection response
// router.post('/subscribe', subscribe)

export default router