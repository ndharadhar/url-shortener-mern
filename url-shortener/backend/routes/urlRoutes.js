const express = require('express');
const router = express.Router();
const { createShortUrl, redirectToOriginalUrl } = require('../controllers/urlController');

// POST /shorten — Create a short URL
router.post('/shorten', createShortUrl);

// GET /:shortCode — Redirect to original URL
router.get('/:shortCode', redirectToOriginalUrl);

module.exports = router;

