// Routes pour les utilisateurs
const express = require('express');
const UserService = require('../../../domain/user/services/UserService');
const router = express.Router();

const userService = new UserService();

// Obtenir la liste des utilisateurs (avec pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';

    const filters = {
      limit,
      offset: (page - 1) * limit
    };

    // Ajouter la recherche par nom/email si fournie
    if (search) {
      filters.name = search;
      filters.email = search;
    }

    const result = await userService.getUsers(filters);

    res.json({
      success: true,
      data: result.users,
      pagination: {
        page: result.page,
        limit,
        total: result.total,
        totalPages: result.totalPages
      }
    });

  } catch (error) {
    console.error('Erreur getUsers:', error);
    
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des utilisateurs'
    });
  }
});

// Obtenir le profil de l'utilisateur connecté
router.get('/profile', async (req, res) => {
  try {
    // TODO: Récupérer l'ID utilisateur du JWT token
    const userId = req.user?.id || req.query.userId; // Temporaire pour test

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non authentifié'
      });
    }

    const user = await userService.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Erreur getProfile:', error);
    
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil'
    });
  }
});

// Obtenir un utilisateur par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Erreur getUserById:', error);
    
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'utilisateur'
    });
  }
});

// Mettre à jour le profil de l'utilisateur
router.put('/profile', async (req, res) => {
  try {
    // TODO: Récupérer l'ID utilisateur du JWT token
    const userId = req.user?.id || req.body.userId; // Temporaire pour test

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non authentifié'
      });
    }

    const { name, firstname, email } = req.body;

    // Validation des données
    if (!name || !firstname || !email) {
      return res.status(400).json({
        success: false,
        message: 'Nom, prénom et email sont requis'
      });
    }

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (email) {
      try {
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser && existingUser.id !== userId) {
          return res.status(409).json({
            success: false,
            message: 'Cet email est déjà utilisé par un autre utilisateur'
          });
        }
      } catch (emailError) {
        // Si l'email est invalide, retourner une erreur 400
        if (emailError.message === 'Email invalide') {
          return res.status(400).json({
            success: false,
            message: emailError.message
          });
        }
        throw emailError; // Relancer les autres erreurs
      }
    }

    const updatedUser = await userService.updateUser(userId, {
      name: name.trim(),
      firstname: firstname.trim(),
      email: email.toLowerCase().trim()
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    console.log(`✅ Profil mis à jour: ${updatedUser.email}`);

    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      user: updatedUser
    });

  } catch (error) {
    console.error('Erreur updateProfile:', error);
    
    res.status(400).json({
      success: false,
      message: error.message || 'Erreur lors de la mise à jour du profil'
    });
  }
});

// Mettre à jour un utilisateur (admin)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, firstname, email } = req.body;

    // TODO: Vérifier les permissions admin ici

    const updatedUser = await userService.updateUser(id, {
      name,
      firstname,
      email
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    console.log(`✅ Utilisateur mis à jour par admin: ${updatedUser.email}`);

    res.json({
      success: true,
      message: 'Utilisateur mis à jour avec succès',
      user: updatedUser
    });

  } catch (error) {
    console.error('Erreur updateUser:', error);
    
    res.status(400).json({
      success: false,
      message: error.message || 'Erreur lors de la mise à jour'
    });
  }
});

// Réinitialiser le mot de passe d'un utilisateur (admin)
router.post('/:id/reset-password', async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    // TODO: Vérifier les permissions admin ici

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Nouveau mot de passe requis'
      });
    }

    // Valider le nouveau mot de passe
    const passwordValidation = userService.validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe invalide',
        errors: passwordValidation.errors
      });
    }

    const user = await userService.resetUserPassword(id, newPassword);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    console.log(`🔐 Mot de passe réinitialisé par admin pour: ${user.email}`);

    res.json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès'
    });

  } catch (error) {
    console.error('Erreur resetPassword:', error);
    
    res.status(400).json({
      success: false,
      message: error.message || 'Erreur lors de la réinitialisation'
    });
  }
});

// Supprimer un utilisateur (admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Vérifier les permissions admin ici
    // TODO: Empêcher la suppression de son propre compte

    const deleted = await userService.deleteUser(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    console.log(`🗑️ Utilisateur supprimé: ${id}`);

    res.json({
      success: true,
      message: 'Utilisateur supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur deleteUser:', error);
    
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression'
    });
  }
});

// Vérifier si un email existe
router.get('/check-email/:email', async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email requis'
      });
    }

    const exists = await userService.emailExists(email);

    res.json({
      success: true,
      exists
    });

  } catch (error) {
    console.error('Erreur checkEmail:', error);
    
    // Si c'est une erreur de validation d'email, retourner 400
    if (error.message === 'Email invalide') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    // Pour les autres erreurs (DB, etc.), retourner 500
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification'
    });
  }
});

module.exports = router; 