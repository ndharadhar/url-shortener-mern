const express = require('express');
const router = express.Router();
const { createShortUrl } = require('../controllers/urlController');
const Url = require('../models/Url'); // Add this line

// POST /api/shorten
router.post('/shorten', createShortUrl);

// GET /:shortcode — Redirect to original URL
router.get('/:shortcode', async (req, res) => {
  const { shortcode } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortCode: shortcode });

    if (urlEntry) {
      urlEntry.visits += 1; // Optional: track visits
      await urlEntry.save();
      res.redirect(urlEntry.originalUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (err) {
    console.error('Redirect error:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
//

