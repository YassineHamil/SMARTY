// Interface du repository Pressure
class PressureRepository {
  async create(pressureData) {
    throw new Error('Method not implemented');
  }

  async findBySensorId(sensorId, limit = 100) {
    throw new Error('Method not implemented');
  }

  async findBySensorIdAndDateRange(sensorId, startDate, endDate) {
    throw new Error('Method not implemented');
  }

  async getLatestBySensorId(sensorId) {
    throw new Error('Method not implemented');
  }

  async getAverageBySensorId(sensorId, period = '1h') {
    throw new Error('Method not implemented');
  }

  async deleteOlderThan(date) {
    throw new Error('Method not implemented');
  }

  async getMinMaxBySensorId(sensorId, period = '24h') {
    throw new Error('Method not implemented');
  }
}

module.exports = PressureRepository; 