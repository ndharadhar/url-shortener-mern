// server.js

console.log("Starting server...");

require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const urlRoutes = require('./routes/urlRoutes');
app.use('/api', urlRoutes);
//app.use('/', require('./routes/urlRoutes'));

// MongoDB Connection
//const mongoURI = 'mongodb://localhost:27017/urlshortener';
const mongoURI = process.env.MONGO_URI;


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Import Routes
//const urlRoutes = require('./routes/urlRoutes');
//app.use('/api', urlRoutes);

// Basic Route (optional)
app.get('/', (req, res) => {
  res.send('URL Shortener backend is running');
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
