// Routes pour les entreprises
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ companies: [] });
});

router.post('/', (req, res) => {
  res.json({ success: true });
});

module.exports = router; 