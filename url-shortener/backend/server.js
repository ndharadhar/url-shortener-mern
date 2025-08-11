// server.js

console.log("🚀 Starting server...");

require('dotenv').config();

const Url = require('./models/Url'); // Adjust path if needed


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ CORS Setup
app.use(cors({
  origin: 'http://localhost:3000', // or your frontend domain
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Route Imports
const urlRoutes = require('./routes/urlRoutes');

app.use('/api', urlRoutes);
// Handles /api/shorten

app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const entry = await Url.findOne({ shortCode });

    if (!entry) {
      return res.status(404).send('Short URL not found');
    }

    return res.redirect(entry.originalUrl);
  } catch (err) {
    console.error('Redirect error:', err.message);
    return res.status(500).send('Server error');
  }
});




// ✅ Basic Health Check
app.get('/', (req, res) => {
  res.send('🌐 URL Shortener backend is running');
});

// ✅ MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
