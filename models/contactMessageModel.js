import mongoose from 'mongoose'

const Schema = mongoose.Schema

const contactMessageSchema = new Schema({
    name:{
    	type: String,
    	required: true
    },
    email:{
    	type: String,
    	required: true
    },
    message:{
    	type: String,
    	required: true
    },
}, { timestamps: true })

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
