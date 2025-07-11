// Entité Humidity pour les données d'humidité
class Humidity {
  constructor(data) {
    this.id = data.id;
    this.humidity = data.humidity;
    this.sensorId = data.sensor_id;
    this.eventTime = data.event_time || new Date();
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Méthodes métier
  isNormalHumidity(minThreshold = 30, maxThreshold = 70) {
    return this.humidity >= minThreshold && this.humidity <= maxThreshold;
  }

  isTooHumid(threshold = 80) {
    return this.humidity > threshold;
  }

  isTooDry(threshold = 20) {
    return this.humidity < threshold;
  }

  getHumidityLevel() {
    if (this.humidity < 30) return 'Sec';
    if (this.humidity < 50) return 'Normal';
    if (this.humidity < 70) return 'Modéré';
    if (this.humidity < 85) return 'Humide';
    return 'Très humide';
  }

  isRecentMeasurement(minutesThreshold = 5) {
    const threshold = new Date(Date.now() - minutesThreshold * 60 * 1000);
    return this.eventTime > threshold;
  }

  // Validation
  validate() {
    const errors = [];
    
    if (this.humidity === null || this.humidity === undefined) {
      errors.push('Humidité requise');
    }
    
    if (typeof this.humidity !== 'number') {
      errors.push('L\'humidité doit être un nombre');
    }
    
    if (this.humidity < 0 || this.humidity > 100) {
      errors.push('L\'humidité doit être entre 0 et 100%');
    }
    
    if (!this.sensorId) {
      errors.push('ID du capteur requis');
    }
    
    return errors;
  }
}

module.exports = Humidity; 