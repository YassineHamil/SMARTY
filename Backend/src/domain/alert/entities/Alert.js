// Entité Alert pour les alertes système
class Alert {
  constructor(data) {
    this.id = data.id;
    this.sensorId = data.sensor_id;
    this.alertTime = data.alert_time || new Date();
    this.cycleId = data.cycle_id;
    this.isViewed = data.is_view || false;
    this.type = data.type; 
    this.description = data.description;
    this.resolvedAt = data.resolvedAt;
    this.resolvedBy = data.resolvedBy;
  }

  // Méthodes métier
  markAsViewed() {
    this.isViewed = true;
  }

  resolve(userId) {
    this.resolvedAt = new Date();
    this.resolvedBy = userId;
  }

  isResolved() {
    return !!this.resolvedAt;
  }

  getAgeInMinutes() {
    return Math.floor((new Date() - this.alertTime) / (1000 * 60));
  }



  // Factory methods pour différents types d'alertes
  static createMachineErrorAlert(sensorId, description) {
    return new Alert({
      sensor_id: sensorId,
      type: 'machine_error',
      description,
      alert_time: new Date()
    });
  }

  static createProductionEndAlert(sensorId, cycleId, description) {
    return new Alert({
      sensor_id: sensorId,
      cycle_id: cycleId,
      type: 'prod_end',
      description,
      alert_time: new Date()
    });
  }

  // Validation
  validate() {
    const errors = [];
    
    if (!this.sensorId) {
      errors.push('ID du capteur requis');
    }
    
    if (!this.type || !['machine_error', 'prod_end'].includes(this.type)) {
      errors.push('Type d\'alerte invalide');
    }
    
    if (!this.description || this.description.trim().length === 0) {
      errors.push('Description requise');
    }
    
    return errors;
  }
}

module.exports = Alert; 