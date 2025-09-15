const sequelize = require('../config/db');
const Tenant = require('./Tenant');
const Customer = require('./Customer');
const Order = require('./Order');
const Product = require('./Product');

// Associations
Tenant.hasMany(Customer, { foreignKey: 'tenantId' });
Customer.belongsTo(Tenant);

Tenant.hasMany(Order, { foreignKey: 'tenantId' });
Order.belongsTo(Tenant);

Tenant.hasMany(Product, { foreignKey: 'tenantId' });
Product.belongsTo(Tenant);

module.exports = { sequelize, Tenant, Customer, Order, Product };