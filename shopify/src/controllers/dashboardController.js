// /src/controllers/dashboardController.js
const { Order, Customer, sequelize } = require('../models');
const { Op } = require('sequelize');

const TENANT_ID = process.env.TENANT_ID; // We'll still use the hardcoded one for now

// For: "Total customers, orders, and revenue" [cite: 24]
exports.getStats = async (req, res) => {
  try {
    const totalCustomers = await Customer.count({ where: { tenantId: TENANT_ID } });
    const totalOrders = await Order.count({ where: { tenantId: TENANT_ID } });
    const totalRevenue = await Order.sum('totalPrice', { where: { tenantId: TENANT_ID } });

    res.json({
      totalCustomers,
      totalOrders,
      totalRevenue: totalRevenue || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// For: "Orders by date (with date range filtering)" [cite: 25]
exports.getOrdersByDate = async (req, res) => {
    const { startDate, endDate } = req.query; // e.g., '2025-08-01'
    try {
        const orders = await Order.findAll({
            where: {
                tenantId: TENANT_ID,
                orderDate: {
                    [Op.between]: [new Date(startDate), new Date(endDate)],
                },
            },
            order: [['orderDate', 'ASC']],
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// For: "Top 5 customers by spend" [cite: 26]
exports.getTopCustomers = async (req, res) => {
  try {
    const topCustomers = await Order.findAll({
      where: { tenantId: TENANT_ID },
      attributes: [
        'customerId',
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'totalSpend'],
      ],
      include: [{
        model: Customer,
        attributes: ['firstName', 'lastName', 'email'],
      }],
      group: ['customerId', 'Customer.id'],
      order: [[sequelize.literal('"totalSpend"'), 'DESC']],
      limit: 5,
    });
    res.json(topCustomers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};