// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const { v4: uuidv4 } = require('uuid');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new product
router.post('/', async (req, res) => {
  try {
    const { tenantId, shopifyProductId, title, price } = req.body;
    const product = await Product.create({
      id: uuidv4(),
      tenantId,
      shopifyProductId,
      title,
      price
    });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const { title, price } = req.body;
    product.title = title || product.title;
    product.price = price || product.price;
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
