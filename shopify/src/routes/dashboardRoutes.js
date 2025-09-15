const express = require("express");
const router = express.Router();
const { Customer, Product, Order } = require("../models");

router.get("/dashboard/:tenantId", async (req, res) => {
  const { tenantId } = req.params;
  try {
    const customers = await Customer.findAll({ where: { tenantId } });
    const products = await Product.findAll({ where: { tenantId } });
    const orders = await Order.findAll({ where: { tenantId } });

    res.json({ customers, products, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

module.exports = router;
