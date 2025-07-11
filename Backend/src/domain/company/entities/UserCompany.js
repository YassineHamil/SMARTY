// Entité UserCompany pour les relations utilisateur-entreprise
class UserCompany {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id;
    this.companyId = data.company_id;
    this.isAdmin = data.is_admin || false;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Méthodes métier
  promoteToAdmin() {
    this.isAdmin = true;
    this.updatedAt = new Date();
  }

  revokeAdmin() {
    this.isAdmin = false;
    this.updatedAt = new Date();
  }

  hasAdminRights() {
    return this.isAdmin;
  }

  // Validation
  validate() {
    const errors = [];
    
    if (!this.userId) {
      errors.push('ID utilisateur requis');
    }
    
    if (!this.companyId) {
      errors.push('ID entreprise requis');
    }
    
    return errors;
  }
}

module.exports = UserCompany; 