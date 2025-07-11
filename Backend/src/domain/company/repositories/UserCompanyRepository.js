// Interface du repository UserCompany
class UserCompanyRepository {
  async findByUserId(userId) {
    throw new Error('Method not implemented');
  }

  async findByCompanyId(companyId) {
    throw new Error('Method not implemented');
  }

  async findByUserAndCompany(userId, companyId) {
    throw new Error('Method not implemented');
  }

  async create(userCompany) {
    throw new Error('Method not implemented');
  }

  async update(userId, companyId, updateData) {
    throw new Error('Method not implemented');
  }

  async delete(userId, companyId) {
    throw new Error('Method not implemented');
  }

  async findAdminsByCompany(companyId) {
    throw new Error('Method not implemented');
  }

  async isUserAdmin(userId, companyId) {
    throw new Error('Method not implemented');
  }

  async promoteToAdmin(userId, companyId) {
    throw new Error('Method not implemented');
  }

  async revokeAdmin(userId, companyId) {
    throw new Error('Method not implemented');
  }
}

module.exports = UserCompanyRepository; 