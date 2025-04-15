// models/index.js
require('dotenv').config();  // Load environment variables
const { Sequelize } = require('sequelize');

// Read database credentials from .env
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,  // Disable logging for cleaner output; change if needed
  }
);

// Import models
const Employee = require('./Employee')(sequelize);
const Vehicle = require('./Vehicle')(sequelize);
const Booking = require('./Booking')(sequelize);

// Define associations (example: a booking references a vehicle)
// More associations will be required as build progresses.
Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

// Export the sequelize instance and all models.
module.exports = {
  sequelize,
  Employee,
  // add other models here as they are completed
};
