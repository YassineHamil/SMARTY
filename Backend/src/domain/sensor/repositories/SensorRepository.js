// Interface du repository Sensor
class SensorRepository {
  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findBySensorId(sensorId) {
    throw new Error('Method not implemented');
  }

  async findByMachineId(machineId) {
    throw new Error('Method not implemented');
  }

  async create(sensor) {
    throw new Error('Method not implemented');
  }

  async update(id, sensorData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findAll(filters = {}) {
    throw new Error('Method not implemented');
  }

  async findByCompanyId(companyId) {
    throw new Error('Method not implemented');
  }
}

module.exports = SensorRepository; 