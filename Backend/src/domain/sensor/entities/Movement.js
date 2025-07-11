// Entité Movement pour les données de mouvement
class Movement {
  constructor(data) {
    this.id = data.id;
    this.sensorId = data.sensor_id;
    this.state = data.state; // 'start-moving' ou 'stop-moving'
    this.eventTime = data.event_time || new Date();
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Méthodes métier
  isStartMoving() {
    return this.state === 'start-moving';
  }

  isStopMoving() {
    return this.state === 'stop-moving';
  }

  getMovementDuration(previousMovement) {
    if (!previousMovement || !this.isStopMoving() || !previousMovement.isStartMoving()) {
      return null;
    }
    return this.eventTime - previousMovement.eventTime;
  }

  isRecentMovement(minutesThreshold = 5) {
    const threshold = new Date(Date.now() - minutesThreshold * 60 * 1000);
    return this.eventTime > threshold;
  }

  getMovementStatus() {
    return this.isStartMoving() ? 'En mouvement' : 'Arrêté';
  }

  // Validation
  validate() {
    const errors = [];
    
    if (!this.state) {
      errors.push('État du mouvement requis');
    }
    
    if (!['start-moving', 'stop-moving'].includes(this.state)) {
      errors.push('État du mouvement invalide (start-moving ou stop-moving)');
    }
    
    if (!this.sensorId) {
      errors.push('ID du capteur requis');
    }
    
    return errors;
  }
}

module.exports = Movement; 