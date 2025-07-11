// Entité ProductionCycle du domaine
class ProductionCycle {
  constructor(data) {
    this.id = data.id;
    this.machineId = data.machine_id;
    this.expectedEndDate = data.expected_end_date;
    this.currentTime = data.current_time;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Méthodes métier
  isOverdue() {
    if (!this.expectedEndDate) return false;
    return new Date() > this.expectedEndDate;
  }

  getProgress() {
    if (!this.expectedEndDate || !this.currentTime) return 0;
    const total = this.expectedEndDate - this.createdAt;
    const elapsed = this.currentTime - this.createdAt;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  getRemainingTime() {
    if (!this.expectedEndDate) return null;
    return Math.max(0, this.expectedEndDate - new Date());
  }

  // Validation
  validate() {
    const errors = [];
    
    if (!this.machineId) {
      errors.push('ID de la machine requis');
    }
    
    if (!this.expectedEndDate) {
      errors.push('Date de fin prévue requise');
    }
    
    return errors;
  }
}

module.exports = ProductionCycle; 