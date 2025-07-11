const User = require('../entities/User');
const UserModel = require('../../../infrastructure/database/models/UserModel');

// Implémentation concrète du repository User avec MongoDB
class UserRepository {
  
  // Trouver un utilisateur par ID
  async findById(id) {
    try {
      const userData = await UserModel.findById(id);
      return userData ? new User(userData) : null;
    } catch (error) {
      console.error('Erreur findById:', error);
      throw new Error('Erreur lors de la recherche de l\'utilisateur');
    }
  }

  // Trouver un utilisateur par email
  async findByEmail(email) {
    try {
      const userData = await UserModel.findOne({ email: email.toLowerCase() });
      return userData ? new User(userData) : null;
    } catch (error) {
      console.error('Erreur findByEmail:', error);
      throw new Error('Erreur lors de la recherche par email');
    }
  }
    
  // Vérifier le mot de passe d'un utilisateur
  async checkPassword(email, plainPassword) {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        return false;
      }
      
      return await user.checkPassword(plainPassword);
    } catch (error) {
      console.error('Erreur checkPassword:', error);
      return false;
    }
  }

  async authenticate(email, plainPassword) {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        return null;
      }
      
      const isValidPassword = await user.checkPassword(plainPassword);
      if (!isValidPassword) {
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('Erreur authenticate:', error);
      return null;
    }
  }

  // Créer un nouvel utilisateur avec mot de passe haché
  async create(userData) {
    try {
      // Valider le mot de passe avant création
      if (userData.password) {
        const passwordErrors = User.validatePassword(userData.password);
        if (passwordErrors.length > 0) {
          throw new Error(`Mot de passe invalide: ${passwordErrors.join(', ')}`);
        }
        
        // Hacher le mot de passe
        userData.password = await User.hashPassword(userData.password);
      }
      
      // Normaliser l'email
      userData.email = userData.email.toLowerCase();
      
      // Vérifier si l'email existe déjà
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('Un utilisateur avec cet email existe déjà');
      }
      
      const user = new User(userData);
      const validationErrors = user.validate();
      
      if (validationErrors.length > 0) {
        throw new Error(`Données invalides: ${validationErrors.join(', ')}`);
      }
      
      const savedUser = await UserModel.create(userData);
      return new User(savedUser);
    } catch (error) {
      console.error('Erreur create:', error);
      throw error;
    }
  }

  // Mettre à jour un utilisateur
  async update(id, userData) {
    try {
      // Si un nouveau mot de passe est fourni, le valider et le hacher
      if (userData.password) {
        const passwordErrors = User.validatePassword(userData.password);
        if (passwordErrors.length > 0) {
          throw new Error(`Mot de passe invalide: ${passwordErrors.join(', ')}`);
        }
        
        userData.password = await User.hashPassword(userData.password);
      }
      
      // Normaliser l'email si fourni
      if (userData.email) {
        userData.email = userData.email.toLowerCase();
        
        // Vérifier si l'email existe déjà pour un autre utilisateur
        const existingUser = await UserModel.findOne({ 
          email: userData.email, 
          _id: { $ne: id } 
        });
        
        if (existingUser) {
          throw new Error('Un utilisateur avec cet email existe déjà');
        }
      }
      
      userData.updatedAt = new Date();
      
      const updatedUser = await UserModel.findByIdAndUpdate(
        id, 
        userData, 
        { new: true, runValidators: true }
      );
      
      return updatedUser ? new User(updatedUser) : null;
    } catch (error) {
      console.error('Erreur update:', error);
      throw error;
    }
  }

  // Changer le mot de passe d'un utilisateur
  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await this.findById(userId);
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }
      
      // Vérifier le mot de passe actuel
      const isCurrentPasswordValid = await user.checkPassword(currentPassword);
      if (!isCurrentPasswordValid) {
        throw new Error('Mot de passe actuel incorrect');
      }
      
      // Valider le nouveau mot de passe
      const passwordErrors = User.validatePassword(newPassword);
      if (passwordErrors.length > 0) {
        throw new Error(`Nouveau mot de passe invalide: ${passwordErrors.join(', ')}`);
      }
      
      // Hacher et sauvegarder le nouveau mot de passe
      const hashedPassword = await User.hashPassword(newPassword);
      await UserModel.findByIdAndUpdate(userId, {
        password: hashedPassword,
        updatedAt: new Date()
      });
      
      return true;
    } catch (error) {
      console.error('Erreur changePassword:', error);
      throw error;
    }
  }

  // Réinitialiser le mot de passe (pour admin ou reset)
  async resetPassword(userId, newPassword) {
    try {
      const passwordErrors = User.validatePassword(newPassword);
      if (passwordErrors.length > 0) {
        throw new Error(`Mot de passe invalide: ${passwordErrors.join(', ')}`);
      }
      
      const hashedPassword = await User.hashPassword(newPassword);
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { 
          password: hashedPassword,
          updatedAt: new Date()
        },
        { new: true }
      );
      
      return updatedUser ? new User(updatedUser) : null;
    } catch (error) {
      console.error('Erreur resetPassword:', error);
      throw error;
    }
  }

  // Supprimer un utilisateur
  async delete(id) {
    try {
      const result = await UserModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      console.error('Erreur delete:', error);
      throw new Error('Erreur lors de la suppression de l\'utilisateur');
    }
  }

  // Trouver tous les utilisateurs avec filtres
  async findAll(filters = {}) {
    try {
      const query = {};
      
      if (filters.email) {
        query.email = { $regex: filters.email, $options: 'i' };
      }
      
      if (filters.name) {
        query.$or = [
          { name: { $regex: filters.name, $options: 'i' } },
          { firstname: { $regex: filters.name, $options: 'i' } }
        ];
      }
      
      const users = await UserModel.find(query)
        .limit(filters.limit || 100)
        .skip(filters.offset || 0)
        .sort(filters.sort || { createdAt: -1 });
      
      return users.map(userData => new User(userData));
    } catch (error) {
      console.error('Erreur findAll:', error);
      throw new Error('Erreur lors de la recherche des utilisateurs');
    }
  }

  // Compter les utilisateurs
  async count(filters = {}) {
    try {
      const query = {};
      
      if (filters.email) {
        query.email = { $regex: filters.email, $options: 'i' };
      }
      
      return await UserModel.countDocuments(query);
    } catch (error) {
      console.error('Erreur count:', error);
      throw new Error('Erreur lors du comptage des utilisateurs');
    }
  }
}

module.exports = UserRepository; 