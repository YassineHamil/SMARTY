// Interface du repository Alert
class AlertRepository {
  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findBySensorId(sensorId) {
    throw new Error('Method not implemented');
  }

  async findByCompanyId(companyId) {
    throw new Error('Method not implemented');
  }

  async create(alert) {
    throw new Error('Method not implemented');
  }

  async update(id, alertData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findActiveAlerts(companyId) {
    throw new Error('Method not implemented');
  }

  async findUnviewedAlerts(companyId) {
    throw new Error('Method not implemented');
  }

  async findByType(type, companyId) {
    throw new Error('Method not implemented');
  }

  async markAsViewed(id) {
    throw new Error('Method not implemented');
  }

  async resolveAlert(id, userId) {
    throw new Error('Method not implemented');
  }

  async countActiveAlerts(companyId) {
    throw new Error('Method not implemented');
  }
}

module.exports = AlertRepository; 