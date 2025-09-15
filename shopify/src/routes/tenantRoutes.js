// src/routes/tenantRoutes.js
const express = require('express');
const router = express.Router();
const { Tenant } = require('../models');
const { v4: uuidv4 } = require('uuid');

// GET all tenants
router.get('/', async (req, res) => {
  try {
    const tenants = await Tenant.findAll();
    res.json(tenants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new tenant
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const tenant = await Tenant.create({ id: uuidv4(), name });
    res.status(201).json(tenant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT tenant (update name)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const tenant = await Tenant.findByPk(id);
    if (!tenant) return res.status(404).json({ error: 'Tenant not found' });
    tenant.name = name;
    await tenant.save();
    res.json(tenant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE tenant
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tenant = await Tenant.findByPk(id);
    if (!tenant) return res.status(404).json({ error: 'Tenant not found' });
    await tenant.destroy();
    res.json({ message: 'Tenant deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
