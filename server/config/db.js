// Add this at the TOP of config/db.js
require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Debug: Check if MONGO_URI is available
    console.log('MONGO_URI in db.js:', process.env.MONGO_URI);
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
