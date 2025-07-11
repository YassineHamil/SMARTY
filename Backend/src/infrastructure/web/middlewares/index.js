// Configuration des middlewares
const rateLimit = require('express-rate-limit');


// Middleware de limitation de taux
const createRateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message: 'Trop de requêtes, veuillez réessayer plus tard.'
    },
    standardHeaders: true,
    legacyHeaders: false
  });
};

// Middleware de logging des requêtes
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

// Middleware d'authentification JWT
const authenticateToken = (req, res, next) => {
  // Implémentation de la vérification JWT
  next();
};

// Middleware de validation des permissions
const checkPermissions = (requiredRole) => {
  return (req, res, next) => {
    // Implémentation de la vérification des permissions
    next();
  };
};

// Configuration des middlewares pour l'app
function setupMiddlewares(app) {
  // Rate limiting global
  app.use(createRateLimit());
  
  // Logging des requêtes
  app.use(requestLogger);
  
  // Middleware de gestion d'erreurs async
  app.use((err, req, res, next) => {
    console.error('Erreur middleware:', err);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  });
}

module.exports = {
  setupMiddlewares,
  authenticateToken,
  checkPermissions,
  requestLogger,
  createRateLimit
}; 