const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const connectToDatabase = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDatabase();

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World! This is the deployment index.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});