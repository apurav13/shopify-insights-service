// src/models/Customer.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Customer extends Model {}

Customer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    tenantId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    shopifyCustomerId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'Customer',
    tableName: 'Customers'
  }
);

module.exports = Customer;

