// Entité User du domaine
const bcrypt = require('bcryptjs');

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.firstname = data.firstname;
    this.email = data.email;
    this.password = data.password; // Mot de passe haché
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Méthodes métier
  getFullName() {
    return `${this.firstname} ${this.name}`;
  }

  isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  // Méthode statique pour valider un email
  static isValidEmail(email) {
    if (!email || typeof email !== 'string') {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  // Vérification du mot de passe contre le hash stocké
  async checkPassword(plainPassword) {
    try {
      return await bcrypt.compare(plainPassword, this.password);
    } catch (error) {
      console.error('Erreur lors de la vérification du mot de passe:', error);
      return false;
    }
  }

  // Validation des critères de mot de passe
  static validatePassword(password) {
    const errors = [];
    
    if (!password) {
      errors.push('Le mot de passe est requis');
      return errors;
    }

    if (password.length < 8) {
      errors.push('Le mot de passe doit contenir au moins 8 caractères');
    }

    if (password.length > 128) {
      errors.push('Le mot de passe ne peut pas dépasser 128 caractères');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une lettre minuscule');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une lettre majuscule');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un chiffre');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un caractère spécial');
    }

    // Vérifier les patterns communs faibles
    const weakPatterns = [
      'password', 'motdepasse', '123456', 'azerty', 'qwerty',
      'admin', 'root', 'user', 'test'
    ];
    
    if (weakPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
      errors.push('Le mot de passe ne doit pas contenir de mots courants');
    }

    return errors;
  }

  // Hachage sécurisé du mot de passe
  static async hashPassword(plainPassword) {
    try {
      const saltRounds = 12;
      return await bcrypt.hash(plainPassword, saltRounds);
    } catch (error) {
      console.error('Erreur lors du hachage du mot de passe:', error);
      throw new Error('Erreur lors du traitement du mot de passe');
    }
  }

  // Méthode pour changer le mot de passe
  async changePassword(newPassword) {
    const validationErrors = User.validatePassword(newPassword);
    if (validationErrors.length > 0) {
      throw new Error(`Mot de passe invalide: ${validationErrors.join(', ')}`);
    }

    this.password = await User.hashPassword(newPassword);
    this.updatedAt = new Date();
  }

  // Validation des données utilisateur
  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim().length < 2) {
      errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    if (!this.firstname || this.firstname.trim().length < 2) {
      errors.push('Le prénom doit contenir au moins 2 caractères');
    }
    
    if (!this.isValidEmail()) {
      errors.push('Email invalide');
    }
    
    if (!this.password) {
      errors.push('Le mot de passe est requis');
    }
    
    return errors;
  }

  // Vérifier la force du mot de passe (score 0-4)
  static getPasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
    
    return {
      score,
      level: score <= 1 ? 'Très faible' : 
             score === 2 ? 'Faible' :
             score === 3 ? 'Moyen' :
             score === 4 ? 'Fort' : 'Très fort'
    };
  }

  // Convertir en objet sérialisable (sans le mot de passe)
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User; 