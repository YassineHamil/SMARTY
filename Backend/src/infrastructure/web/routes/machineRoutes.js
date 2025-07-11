// Routes pour les machines
const express = require('express');
const router = express.Router();

// CRUD Machines
router.get('/', (req, res) => {
  res.json({ machines: [] });
});

router.post('/', (req, res) => {
  res.json({ success: true });
});

router.get('/:id', (req, res) => {
  res.json({ machine: {} });
});

router.put('/:id', (req, res) => {
  res.json({ success: true });
});

router.delete('/:id', (req, res) => {
  res.json({ success: true });
});

module.exports = router; 