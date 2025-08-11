const Url = require('../models/Url'); // Import your model

exports.createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;

  let sanitizedUrl = originalUrl;
  if (!/^https?:\/\//i.test(sanitizedUrl)) {
    sanitizedUrl = 'https://' + sanitizedUrl;
  }

  
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
        originalUrl: sanitizedUrl, 
        shortCode: shortCode 
    });
    await newUrl.save();

    // ✅ Log after saving
    console.log("Saved to DB:", newUrl);

    
    //const shortUrl = `http://localhost:5000/${shortCode}`;
    //const shortUrl = `${process.env.BASE_URL}/${urlCode}`;
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;


    res.json({ shortUrl });
  } catch (err) {
    console.error('Error saving to DB:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.redirectToOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortCode });

    if (urlEntry) {
      return res.redirect(urlEntry.originalUrl);
    } else {
      return res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (err) {
    console.error('Error during redirect:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

