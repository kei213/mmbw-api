import mongoose from 'mongoose';
import ContactMessage from '../models/contactMessageModel.js';
import dotenv from 'dotenv'; 
// Load environment variables from .env file
dotenv.config();

async function deletePostsByName() {
  try {
    // Connect to your MongoDB database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Delete all posts with the name "testing"
    const result = await ContactMessage.deleteMany({ name: 'testing' });

    console.log(`Deleted ${result.deletedCount} documents.`);
  } catch (error) {
    console.error('Error deleting posts:', error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

deletePostsByName();
