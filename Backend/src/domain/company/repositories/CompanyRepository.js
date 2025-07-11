// Interface du repository Company
class CompanyRepository {
  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByName(name) {
    throw new Error('Method not implemented');
  }

  async create(company) {
    throw new Error('Method not implemented');
  }

  async update(id, companyData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findAll(filters = {}) {
    throw new Error('Method not implemented');
  }

  async findCompaniesByUser(userId) {
    throw new Error('Method not implemented');
  }

  async countUsers(companyId) {
    throw new Error('Method not implemented');
  }

  async countMachines(companyId) {
    throw new Error('Method not implemented');
  }
}

module.exports = CompanyRepository; 