// Routes pour le dashboard
const express = require('express');
const router = express.Router();

router.get('/overview', (req, res) => {
  res.json({ 
    totalMachines: 0,
    onlineMachines: 0,
    totalSensors: 0,
    activeAlerts: 0
  });
});

router.get('/metrics', (req, res) => {
  res.json({ metrics: [] });
});

module.exports = router; 