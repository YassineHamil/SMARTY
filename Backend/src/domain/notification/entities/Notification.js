// Entité Notification du domaine
class Notification {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id;
    this.type = data.type; // invite, expulsion
    this.description = data.description;
    this.companyId = data.company_id;
    this.isViewed = data.is_view || false;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Méthodes métier
  markAsViewed() {
    this.isViewed = true;
    this.updatedAt = new Date();
  }

  isInvitation() {
    return this.type === 'invite';
  }

  isExpulsion() {
    return this.type === 'expulsion';
  }

  // Factory methods
  static createInvitation(userId, companyId, description) {
    return new Notification({
      user_id: userId,
      company_id: companyId,
      type: 'invite',
      description,
      is_view: false
    });
  }

  static createExpulsion(userId, companyId, description) {
    return new Notification({
      user_id: userId,
      company_id: companyId,
      type: 'expulsion',
      description,
      is_view: false
    });
  }

  // Validation
  validate() {
    const errors = [];
    
    if (!this.userId) {
      errors.push('ID utilisateur requis');
    }
    
    if (!this.type || !['invite', 'expulsion'].includes(this.type)) {
      errors.push('Type de notification invalide');
    }
    
    if (!this.description || this.description.trim().length === 0) {
      errors.push('Description requise');
    }
    
    if (!this.companyId) {
      errors.push('ID entreprise requis');
    }
    
    return errors;
  }
}

module.exports = Notification; 