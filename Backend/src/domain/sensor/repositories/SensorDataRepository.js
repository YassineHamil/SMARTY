// Interface du repository SensorData
class SensorDataRepository {
  async create(sensorData) {
    throw new Error('Method not implemented');
  }

  async findBySensorId(sensorId, limit = 100) {
    throw new Error('Method not implemented');
  }

  async findBySensorIdAndDateRange(sensorId, startDate, endDate) {
    throw new Error('Method not implemented');
  }

  async findBySensorIdAndType(sensorId, type, limit = 100) {
    throw new Error('Method not implemented');
  }

  async getLatestBySensorId(sensorId) {
    throw new Error('Method not implemented');
  }

  async deleteOlderThan(date) {
    throw new Error('Method not implemented');
  }

  async getAggregatedData(sensorId, groupBy = 'hour') {
    throw new Error('Method not implemented');
  }
}

module.exports = SensorDataRepository; 