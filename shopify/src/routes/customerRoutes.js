const express = require("express");
const router = express.Router();
const { Customer } = require("../models");

// ➝ POST: Create a new customer
router.post("/", async (req, res) => {
  try {
    const { tenantId, firstName, lastName, email } = req.body;

    if (!tenantId || !firstName || !email) {
      return res.status(400).json({ error: "tenantId, firstName, and email are required" });
    }

    const customer = await Customer.create({
      tenantId,
      firstName,
      lastName,
      email,
    });

    res.status(201).json(customer);
  } catch (error) {
    console.error("❌ Error creating customer:", error);
    res.status(500).json({ error: "Failed to create customer" });
  }
});

// ➝ GET: Fetch all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    console.error("❌ Error fetching customers:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

module.exports = router;
