// models/Employee.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Employee = sequelize.define('Employee', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    name: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: 'staff' },
    accessibilitySettings: {
      type: DataTypes.JSON,
      defaultValue: { contrast: false, fontSize: 'medium', colorScheme: 'light' },
    },
  }, {
    hooks: {
      beforeCreate: async (employee) => {
        if (employee.password) {
          const salt = await bcrypt.genSalt(10);
          employee.password = await bcrypt.hash(employee.password, salt);
        }
      },
      beforeUpdate: async (employee) => {
        if (employee.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          employee.password = await bcrypt.hash(employee.password, salt);
        }
      },
    },
  });

  Employee.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return Employee;
};
