import express from 'express'
import { contactUs } from '../controllers/contactUsController.js'
import { search } from '../controllers/searchController.js'

const router = express.Router()

// route for receiving contact us form
router.post('/contact-us', contactUs)

// route for performing google searches
router.post('/search', search)

export default router