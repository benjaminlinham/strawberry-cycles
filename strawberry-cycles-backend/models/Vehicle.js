// models/Vehicle.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    model: { type: DataTypes.STRING, allowNull: false },
    type: DataTypes.STRING,
    status: { type: DataTypes.STRING, defaultValue: 'Available' },
    mileage: { type: DataTypes.INTEGER, defaultValue: 0 },
    lastMaintenanceDate: { type: DataTypes.DATE, allowNull: true },
  });
  return Vehicle;
};
