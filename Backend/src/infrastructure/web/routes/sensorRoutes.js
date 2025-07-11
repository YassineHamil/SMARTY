// Routes pour les capteurs
const express = require('express');
const router = express.Router();

// Import des contrôleurs (à implémenter)
// const SensorController = require('../../../interfaces/web/controllers/SensorController');

// Middlewares
const { authenticateToken, createRateLimit } = require('../middlewares');

// Rate limiting spécifique pour les données de capteurs
const sensorDataRateLimit = createRateLimit(1 * 60 * 1000, 1000); // 1000 req/min

// Routes publiques (webhook pour capteurs)
router.post('/data', sensorDataRateLimit, (req, res) => {
  // Réception des données de capteurs
  res.json({ success: true, message: 'Données reçues' });
});

// Routes protégées
router.use(authenticateToken);

// CRUD Capteurs
router.get('/', (req, res) => {
  // Liste des capteurs
  res.json({ sensors: [] });
});

router.post('/', (req, res) => {
  // Créer un capteur
  res.json({ success: true });
});

router.get('/:id', (req, res) => {
  // Détails d'un capteur
  res.json({ sensor: {} });
});

router.put('/:id', (req, res) => {
  // Mettre à jour un capteur
  res.json({ success: true });
});

router.delete('/:id', (req, res) => {
  // Supprimer un capteur
  res.json({ success: true });
});

// Historique des données
router.get('/:id/history', (req, res) => {
  // Historique des données d'un capteur
  res.json({ data: [] });
});

router.get('/:id/status', (req, res) => {
  // Statut en temps réel d'un capteur
  res.json({ 
    status: 'online',
    lastSignal: new Date(),
    isActive: true 
  });
});

// Configuration d'un capteur
router.put('/:id/config', (req, res) => {
  // Configuration des seuils, alertes, etc.
  res.json({ success: true });
});

module.exports = router; 