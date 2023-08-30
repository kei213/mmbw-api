import ContactMessage from '../models/ContactMessageModel.js'
import mongoose from 'mongoose'

export const contactUs= async (req, res) => {

    const {name, email, message} = req.body
    console.log(name, email, message)
    //only accept post requests
	if (req.method !== 'POST') {
	    res.status(405).json({ error: 'Method not allowed' });
	    return;
	}
    
    // add doc to db
    try {
	    const response = await ContactMessage.create({name, email, message})
	    res.status(200).json(response)
	} catch (error) {
	    res.status(400).json({error: error.message})
    }
}