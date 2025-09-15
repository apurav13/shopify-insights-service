// src/server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Tenant, Customer, Order, Product } = require('./models');
const tenantRoutes = require('./routes/tenantRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const seedTenants = require('./seed'); // auto-seeding



const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tenants', tenantRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

// Root endpoint
app.get('/', (req, res) => res.send('Shopify Multi-Tenant Service is running'));

// Sync DB and seed tenants
sequelize.sync({ force: true }).then(async () => {
  console.log('✅ DB synced');

  // Auto-seed tenants
  await seedTenants();

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => console.error('DB sync failed:', err));
