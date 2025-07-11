const Notification = require('../entities/Notification');
// Interface du repository Notification
class NotificationRepository {
  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByUserId(userId) {
    throw new Error('Method not implemented');
  }

  async findByUserIdAndType(userId, type) {
    throw new Error('Method not implemented');
  }

  async create(notification) {
    throw new Error('Method not implemented');
  }

  async update(id, notificationData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findUnviewedByUserId(userId) {
    throw new Error('Method not implemented');
  }

  async markAsViewed(id) {
    throw new Error('Method not implemented');
  }

  async markAllAsViewedByUserId(userId) {
    throw new Error('Method not implemented');
  }

  async countUnviewedByUserId(userId) {
    throw new Error('Method not implemented');
  }

  async deleteOlderThan(date) {
    throw new Error('Method not implemented');
  }
}

module.exports = NotificationRepository; 