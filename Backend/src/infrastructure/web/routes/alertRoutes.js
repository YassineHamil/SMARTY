// Routes pour les alertes
const express = require('express');
const router = express.Router();

// Gestion des alertes
router.get('/', (req, res) => {
  res.json({ alerts: [] });
});

router.put('/:id/resolve', (req, res) => {
  res.json({ success: true });
});

router.put('/:id/view', (req, res) => {
  res.json({ success: true });
});

module.exports = router; 