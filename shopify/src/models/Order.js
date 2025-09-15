// src/models/Order.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Order extends Model {}

Order.init(
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
    shopifyOrderId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders'
  }
);

module.exports = Order;
