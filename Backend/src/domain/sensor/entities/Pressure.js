// Entité Pressure pour les données de pression
class Pressure {
  constructor(data) {
    this.id = data.id;
    this.pressure = data.pressure;
    this.sensorId = data.sensor_id;
    this.eventTime = data.event_time || new Date();
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Méthodes métier
  isNormalPressure(minThreshold = 0.8, maxThreshold = 1.2) {
    return this.pressure >= minThreshold && this.pressure <= maxThreshold;
  }

  isHighPressure(threshold = 1.5) {
    return this.pressure > threshold;
  }

  isLowPressure(threshold = 0.5) {
    return this.pressure < threshold;
  }

  getPressureInPSI() {
    // Conversion bar vers PSI (1 bar ≈ 14.5038 PSI)
    return this.pressure * 14.5038;
  }

  getPressureLevel() {
    if (this.pressure < 0.5) return 'Très basse';
    if (this.pressure < 0.8) return 'Basse';
    if (this.pressure < 1.2) return 'Normale';
    if (this.pressure < 1.5) return 'Élevée';
    return 'Très élevée';
  }

  isRecentMeasurement(minutesThreshold = 5) {
    const threshold = new Date(Date.now() - minutesThreshold * 60 * 1000);
    return this.eventTime > threshold;
  }

  // Validation
  validate() {
    const errors = [];
    
    if (this.pressure === null || this.pressure === undefined) {
      errors.push('Pression requise');
    }
    
    if (typeof this.pressure !== 'number') {
      errors.push('La pression doit être un nombre');
    }
    
    if (this.pressure < 0) {
      errors.push('La pression ne peut pas être négative');
    }
    
    if (!this.sensorId) {
      errors.push('ID du capteur requis');
    }
    
    return errors;
  }
}

module.exports = Pressure; 