// Entité Company du domaine
class Company {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Validation des données
  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim().length < 2) {
      errors.push('Le nom de l\'entreprise doit contenir au moins 2 caractères');
    }
    
    return errors;
  }
}

module.exports = Company; 