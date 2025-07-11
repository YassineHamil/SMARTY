// Entité générique pour les données de capteurs
class SensorData {
  constructor(data) {
    this.id = data.id;
    this.sensorId = data.sensor_id;
    this.value = data.value;
    this.unit = data.unit;
    this.eventTime = data.event_time || new Date();
    this.type = data.type;
  }

  // Méthodes métier
  isRecentData(minutesThreshold = 5) {
    const threshold = new Date(Date.now() - minutesThreshold * 60 * 1000);
    return this.eventTime > threshold;
  }

  isAbnormalValue(minThreshold, maxThreshold) {
    return this.value < minThreshold || this.value > maxThreshold;
  }

  // Factory methods pour différents types de données
  static createTemperature(sensorId, temperature, eventTime) {
    return new SensorData({
      sensor_id: sensorId,
      value: temperature,
      unit: '°C',
      type: 'temperature',
      event_time: eventTime
    });
  }

  static createHumidity(sensorId, humidity, eventTime) {
    return new SensorData({
      sensor_id: sensorId,
      value: humidity,
      unit: '%',
      type: 'humidity',
      event_time: eventTime
    });
  }

  static createPressure(sensorId, pressure, eventTime) {
    return new SensorData({
      sensor_id: sensorId,
      value: pressure,
      unit: 'bar',
      type: 'pressure',
      event_time: eventTime
    });
  }

  // Validation
  validate() {
    const errors = [];
    
    if (!this.sensorId) {
      errors.push('ID du capteur requis');
    }
    
    if (this.value === null || this.value === undefined) {
      errors.push('Valeur requise');
    }
    
    if (!this.type) {
      errors.push('Type de donnée requis');
    }
    
    return errors;
  }
}

module.exports = SensorData; 