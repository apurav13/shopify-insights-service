// src/models/Tenant.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Tenant extends Model {}

Tenant.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Tenant',
    tableName: 'Tenants'
  }
);

module.exports = Tenant;
