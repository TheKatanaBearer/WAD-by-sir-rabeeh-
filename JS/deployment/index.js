const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World! This is the deployment index.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});