// Interface du repository Machine
class MachineRepository {
  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByCompanyId(companyId) {
    throw new Error('Method not implemented');
  }

  async create(machine) {
    throw new Error('Method not implemented');
  }

  async update(id, machineData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findAll(filters = {}) {
    throw new Error('Method not implemented');
  }

  async findByName(name, companyId) {
    throw new Error('Method not implemented');
  }

  async countByCompanyId(companyId) {
    throw new Error('Method not implemented');
  }
}

module.exports = MachineRepository; 