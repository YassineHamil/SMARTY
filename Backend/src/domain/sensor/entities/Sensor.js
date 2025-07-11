// Entité Sensor - Cœur du domaine métier
class Sensor {
  constructor(data) {
    this.id = data.id;
    this.sensorId = data.sensor_id; // ID physique du capteur
    this.name = data.name;
    this.machineId = data.machine_id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  validate() {
    const errors = [];
    
    if (!this.sensorId || this.sensorId.trim().length === 0) {
      errors.push('ID du capteur requis');
    }
    
    if (!this.name || this.name.trim().length < 2) {
      errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    if (!this.machineId) {
      errors.push('ID de la machine requis');
    }
    
    return errors;
  }
}

module.exports = Sensor; 