// Point d'entrée principal de l'application
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

// Importation des modules
const { connectDatabase, disconnectDatabase } = require('./infrastructure/database/mongodb');
const { initializeRoutes } = require('./infrastructure/web/routes');
const { setupMiddlewares } = require('./infrastructure/web/middlewares');

const app = express();
const PORT = process.env.PORT || 3000;

async function startApplication() {
  try {
    // Configuration des middlewares globaux
    app.use(helmet());
    app.use(compression());
    app.use(cors());
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));

    // Configuration des middlewares personnalisés
    setupMiddlewares(app);

    // Connexion aux bases de données
    await connectDatabase();

    // Configuration des routes
    initializeRoutes(app);

    // Démarrage du serveur
    const server = app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });



   // Gestion de l'arrêt gracieux
    process.on('SIGTERM', async () => {
      console.log('🛑 Signal SIGTERM reçu, arrêt gracieux...');
      
      // Arrêter d'accepter de nouvelles connexions
      server.close(async () => {
        console.log('✅ Serveur HTTP fermé');       
        
        // Fermer la base de données
        await disconnectDatabase();
        
        console.log('✅ Arrêt gracieux terminé');
        process.exit(0);
      });
      
      // Timeout de sécurité (force l'arrêt après 30s)
      setTimeout(() => {
        console.error('⚠️ Timeout atteint, arrêt forcé');
        process.exit(1);
      }, 30000);
    });

  } catch (error) {
    console.error('❌ Erreur lors du démarrage:', error);
    process.exit(1);
  }
}

startApplication(); 