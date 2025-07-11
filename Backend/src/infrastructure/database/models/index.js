// Export de tous les modèles MongoDB
const User = require('./UserModel');
const Company = require('./CompanyModel');
const UserCompany = require('./UserCompanyModel');
const Machine = require('./MachineModel');
const Sensor = require('./SensorModel');
const Temperature = require('./TemperatureModel');
const Humidity = require('./HumidityModel');
const Pressure = require('./PressureModel');
const Movement = require('./MovementModel');
const Alert = require('./AlertModel');
const Notification = require('./NotificationModel');
const ProductionCycle = require('./ProductionCycleModel');

module.exports = {
  User,
  Company,
  UserCompany,
  Machine,
  Sensor,
  Temperature,
  Humidity,
  Pressure,
  Movement,
  Alert,
  Notification,
  ProductionCycle
}; 