// Entité Temperature pour les données de température
class Temperature {
  constructor(data) {
    this.id = data.id;
    this.temperature = data.temperature;
    this.sensorId = data.sensor_id;
    this.eventTime = data.event_time || new Date();
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Méthodes métier
  isNormalTemperature(minThreshold = -10, maxThreshold = 60) {
    return this.temperature >= minThreshold && this.temperature <= maxThreshold;
  }

  isCriticalHot(threshold = 50) {
    return this.temperature > threshold;
  }

  isCriticalCold(threshold = 0) {
    return this.temperature < threshold;
  }

  getTemperatureInFahrenheit() {
    return (this.temperature * 9/5) + 32;
  }

  isRecentMeasurement(minutesThreshold = 5) {
    const threshold = new Date(Date.now() - minutesThreshold * 60 * 1000);
    return this.eventTime > threshold;
  }

  // Validation
  validate() {
    const errors = [];
    
    if (this.temperature === null || this.temperature === undefined) {
      errors.push('Température requise');
    }
    
    if (typeof this.temperature !== 'number') {
      errors.push('La température doit être un nombre');
    }
    
    if (!this.sensorId) {
      errors.push('ID du capteur requis');
    }
    
    return errors;
  }
}

module.exports = Temperature; 