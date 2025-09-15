// src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { Order } = require('../models');
const { v4: uuidv4 } = require('uuid');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new order
router.post('/', async (req, res) => {
  try {
    const { tenantId, customerId, shopifyOrderId, totalPrice, orderDate } = req.body;
    const order = await Order.create({
      id: uuidv4(),
      tenantId,
      customerId,
      shopifyOrderId,
      totalPrice,
      orderDate
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT order
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    const { totalPrice, orderDate } = req.body;
    order.totalPrice = totalPrice || order.totalPrice;
    order.orderDate = orderDate || order.orderDate;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE order
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    await order.destroy();
    res.json({ message: 'Order deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
