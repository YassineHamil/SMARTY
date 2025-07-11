// Entité Machine pour les machines industrielles
class Machine {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.companyId = data.company_id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  create(data) {
    return new Machine(data);
  }

  // Validation
  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim().length < 2) {
      errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    if (!this.companyId) {
      errors.push('ID de l\'entreprise requis');
    }
    
    return errors;
  }
}

module.exports = Machine; 