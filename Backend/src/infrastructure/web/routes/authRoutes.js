// Routes d'authentification
const express = require('express');
const UserService = require('../../../domain/user/services/UserService');
const router = express.Router();

const userService = new UserService();

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation des données d'entrée
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis'
      });
    }

    // Authentification
    const user = await userService.authenticateUser(email, password);
    
    // TODO: Générer un JWT token ici
    const token = 'jwt_token_placeholder'; 

    console.log(`✅ Connexion réussie: ${user.email}`);

    res.json({
      success: true,
      message: 'Connexion réussie',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        firstname: user.firstname
      },
      token
    });

  } catch (error) {
    console.error('Erreur login:', error);
    
    res.status(401).json({
      success: false,
      message: 'Email ou mot de passe incorrect'
    });
  }
});

// Route d'inscription
router.post('/register', async (req, res) => {
  try {
    const { name, firstname, email, password, confirmPassword } = req.body;

    // Validation des données d'entrée
    if (!name || !firstname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis'
      });
    }

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Les mots de passe ne correspondent pas'
      });
    }

    // Valider la force du mot de passe
    const passwordValidation = userService.validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe invalide',
        errors: passwordValidation.errors,
        passwordStrength: passwordValidation.strength
      });
    }

    // Vérifier si l'email existe déjà
    const emailExists = await userService.emailExists(email);
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: 'Un compte avec cet email existe déjà'
      });
    }

    // Créer l'utilisateur
    const newUser = await userService.createUser({
      name,
      firstname,
      email,
      password
    });

    console.log(`✅ Nouvel utilisateur créé: ${newUser.email}`);

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        firstname: newUser.firstname
      }
    });

  } catch (error) {
    console.error('Erreur register:', error);
    
    res.status(400).json({
      success: false,
      message: error.message || 'Erreur lors de la création du compte'
    });
  }
});

// Route de déconnexion
router.post('/logout', (req, res) => {
  try {
    // TODO: Invalider le JWT token ici (blacklist)
    
    console.log('🔓 Utilisateur déconnecté');
    
    res.json({
      success: true,
      message: 'Déconnexion réussie'
    });
  } catch (error) {
    console.error('Erreur logout:', error);
    
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la déconnexion'
    });
  }
});

// Route de validation de mot de passe
router.post('/validate-password', (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe requis'
      });
    }

    const validation = userService.validatePasswordStrength(password);

    res.json({
      success: true,
      isValid: validation.isValid,
      errors: validation.errors,
      strength: validation.strength
    });

  } catch (error) {
    console.error('Erreur validate-password:', error);
    
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la validation'
    });
  }
});

// Route de changement de mot de passe
router.post('/change-password', async (req, res) => {
  try {
    const { userId, currentPassword, newPassword, confirmNewPassword } = req.body;

    // Validation des données
    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis'
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: 'Les nouveaux mots de passe ne correspondent pas'
      });
    }

    // Valider le nouveau mot de passe
    const passwordValidation = userService.validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Nouveau mot de passe invalide',
        errors: passwordValidation.errors
      });
    }

    // Changer le mot de passe
    await userService.changeUserPassword(userId, currentPassword, newPassword);

    console.log(`🔐 Mot de passe changé pour l'utilisateur: ${userId}`);

    res.json({
      success: true,
      message: 'Mot de passe changé avec succès'
    });

  } catch (error) {
    console.error('Erreur change-password:', error);
    
    const statusCode = error.message.includes('incorrect') ? 401 : 400;
    
    res.status(statusCode).json({
      success: false,
      message: error.message || 'Erreur lors du changement de mot de passe'
    });
  }
});

module.exports = router; 