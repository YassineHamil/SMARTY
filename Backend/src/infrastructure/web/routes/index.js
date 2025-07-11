// Configuration principale des routes
const express = require('express');

// Import des routes modulaires
const authRoutes = require('./authRoutes');
const sensorRoutes = require('./sensorRoutes');
const machineRoutes = require('./machineRoutes');
const alertRoutes = require('./alertRoutes');
const companyRoutes = require('./companyRoutes');
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const { authenticateToken } = require('../middlewares');

function initializeRoutes(app) {
  // Route de santé
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'Sensor Monitoring API'
    });
  });

  // Routes API avec préfixe /api/v1
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/sensors', sensorRoutes);
  app.use('/api/v1/machines', machineRoutes);
  app.use('/api/v1/alerts', alertRoutes);
  app.use('/api/v1/companies', companyRoutes);
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/dashboard', dashboardRoutes);

  // Route pour les capteurs (webhook pour réception de données)

  // Gestion des erreurs 404
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route non trouvée'
    });
  });

  // Gestionnaire d'erreurs global
  app.use((error, req, res, next) => {
    console.error('Erreur globale:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  });
}

module.exports = { initializeRoutes }; 