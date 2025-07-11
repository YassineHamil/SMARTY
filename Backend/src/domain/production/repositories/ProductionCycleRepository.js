// Interface du repository ProductionCycle
class ProductionCycleRepository {
  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByMachineId(machineId) {
    throw new Error('Method not implemented');
  }

  async create(productionCycle) {
    throw new Error('Method not implemented');
  }

  async update(id, cycleData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async getActiveByMachine(machineId) {
    throw new Error('Method not implemented');
  }
}

module.exports = ProductionCycleRepository; 