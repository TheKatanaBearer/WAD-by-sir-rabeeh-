const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');


// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve public folder

// MongoDB connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // no extra options
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectToDatabase();

// Define a Mongoose schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
});

const User = mongoose.model('User', userSchema ) || mongoose.model('User'); 

// Routes

app.get('/api/users', async (req,res)=>{
try {
  const user_list = await User.find({}).select("+name +email -__v").lean();
  res.json(user_list);


  
} catch (error) {
  res.json({ error : "failed to get user list"});
}
});


// POST: save new user to MongoDB
app.post('/api/users/add', async (req, res) => {
  try {

    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.json({ message: 'User saved successfully ....'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

// Serve HTML form at root
app.get('/', (req, res) => {
  
  res.send(`server is working.......`);
});

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
