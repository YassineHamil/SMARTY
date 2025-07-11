// Interface du repository Movement
class MovementRepository {
  async create(movementData) {
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

  async findByState(sensorId, state) {
    throw new Error('Method not implemented');
  }

  async deleteOlderThan(date) {
    throw new Error('Method not implemented');
  }

  async getMovementSequence(sensorId, startDate, endDate) {
    throw new Error('Method not implemented');
  }

  async getLastMovementState(sensorId) {
    throw new Error('Method not implemented');
  }
}

module.exports = MovementRepository; 