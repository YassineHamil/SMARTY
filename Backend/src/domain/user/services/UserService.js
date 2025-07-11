// Service du domaine User avec authentification
const User = require('../entities/User');
const UserRepository = require('../repositories/UserRepository');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // Créer un utilisateur avec validation complète
  async createUser(userData) {
    try {
      return await this.userRepository.create(userData);
    } catch (error) {
      console.error('Erreur UserService.createUser:', error);
      throw error;
    }
  }

  // Authentifier un utilisateur
  async authenticateUser(email, password) {
    try {
      if (!email || !password) {
        throw new Error('Email et mot de passe requis');
      }

      // Vérifier si l'email est valide avant de faire la requête
      if (!User.isValidEmail(email)) {
        throw new Error('Email invalide');
      }

      const user = await this.userRepository.authenticate(email, password);
      if (!user) {
        throw new Error('Email ou mot de passe incorrect');
      }

      // Retourner l'utilisateur sans le mot de passe
      return user.toJSON();
    } catch (error) {
      console.error('Erreur UserService.authenticateUser:', error);
      throw error;
    }
  }

  // Changer le mot de passe
  async changeUserPassword(userId, currentPassword, newPassword) {
    try {
      if (!userId || !currentPassword || !newPassword) {
        throw new Error('Tous les champs sont requis');
      }

      if (currentPassword === newPassword) {
        throw new Error('Le nouveau mot de passe doit être différent de l\'ancien');
      }

      return await this.userRepository.changePassword(userId, currentPassword, newPassword);
    } catch (error) {
      console.error('Erreur UserService.changeUserPassword:', error);
      throw error;
    }
  }

  // Réinitialiser le mot de passe (admin)
  async resetUserPassword(userId, newPassword) {
    try {
      if (!userId || !newPassword) {
        throw new Error('ID utilisateur et nouveau mot de passe requis');
      }

      return await this.userRepository.resetPassword(userId, newPassword);
    } catch (error) {
      console.error('Erreur UserService.resetUserPassword:', error);
      throw error;
    }
  }

  // Valider la force d'un mot de passe
  validatePasswordStrength(password) {
    try {
      const errors = User.validatePassword(password);
      const strength = User.getPasswordStrength(password);

      return {
        isValid: errors.length === 0,
        errors,
        strength
      };
    } catch (error) {
      console.error('Erreur UserService.validatePasswordStrength:', error);
      return {
        isValid: false,
        errors: ['Erreur lors de la validation'],
        strength: { score: 0, level: 'Invalide' }
      };
    }
  }

  // Obtenir un utilisateur par ID
  async getUserById(id) {
    try {
      const user = await this.userRepository.findById(id);
      return user ? user.toJSON() : null;
    } catch (error) {
      console.error('Erreur UserService.getUserById:', error);
      throw error;
    }
  }

  // Obtenir un utilisateur par email
  async getUserByEmail(email) {
    try {
      // Vérifier si l'email est valide avant de faire la requête
      if (!User.isValidEmail(email)) {
        throw new Error('Email invalide');
      }
      
      const user = await this.userRepository.findByEmail(email);
      return user ? user.toJSON() : null;
    } catch (error) {
      console.error('Erreur UserService.getUserByEmail:', error);
      throw error;
    }
  }

  // Mettre à jour un utilisateur
  async updateUser(id, userData) {
    try {
      const user = await this.userRepository.update(id, userData);
      return user ? user.toJSON() : null;
    } catch (error) {
      console.error('Erreur UserService.updateUser:', error);
      throw error;
    }
  }

  // Supprimer un utilisateur
  async deleteUser(id) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      console.error('Erreur UserService.deleteUser:', error);
      throw error;
    }
  }

  // Lister les utilisateurs avec pagination
  async getUsers(filters = {}) {
    try {
      const users = await this.userRepository.findAll(filters);
      const count = await this.userRepository.count(filters);

      return {
        users: users.map(user => user.toJSON()),
        total: count,
        page: Math.floor((filters.offset || 0) / (filters.limit || 100)) + 1,
        totalPages: Math.ceil(count / (filters.limit || 100))
      };
    } catch (error) {
      console.error('Erreur UserService.getUsers:', error);
      throw error;
    }
  }

  async emailExists(email) {
    try {
      // Vérifier si l'email est valide avant de faire la requête
      if (!User.isValidEmail(email)) {
        throw new Error('Email invalide');
      }
      
      const user = await this.userRepository.findByEmail(email);
      return user !== null;
    } catch (error) {
      console.error('Erreur UserService.emailExists:', error);
      // Si c'est une erreur de validation, on la relance
      if (error.message === 'Email invalide') {
        throw error;
      }
      // Pour les autres erreurs (DB, etc.), on retourne false
      return false;
    }
  }
}

module.exports = UserService; 