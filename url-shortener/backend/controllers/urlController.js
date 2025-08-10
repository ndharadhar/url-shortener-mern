const Url = require('../models/Url'); // Import your model

exports.createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Missing originalUrl' });
  }

  // Generate a random short code
  const shortCode = Math.random().toString(36).substring(2, 8);

  // ✅ Log before saving
  console.log("Saving URL:", originalUrl, shortCode);


  try {
    // Save to MongoDB
    const newUrl = new Url({ 
        originalUrl: req.body.originalUrl, 
        shortCode: shortCode 
    });
    await newUrl.save();

    // ✅ Log after saving
    console.log("Saved to DB:", newUrl);
    
    const shortUrl = `http://localhost:5000/${shortCode}`;
    res.json({ shortUrl });
  } catch (err) {
    console.error('Error saving to DB:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
