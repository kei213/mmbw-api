import express from 'express'
import { simpleChat } from '../controllers/simpleChatController.js'
import { contextInjection } from '../controllers/contextInjectionController.js'

const router = express.Router()

// route for simple chat response
router.post('/simple-chat', simpleChat)

// route for context injection response
router.post('/context-injection', contextInjection)

export default router
