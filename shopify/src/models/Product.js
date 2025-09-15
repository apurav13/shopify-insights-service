// src/models/Product.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Product extends Model {}

Product.init(
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
    shopifyProductId: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2)
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'Products'
  }
);

module.exports = Product;

