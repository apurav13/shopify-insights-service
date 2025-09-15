const { Customer } = require('../models');
const { fetchCustomers } = require('../services/shopifyService');

exports.ingestCustomers = async (req, res) => {
  try {
    const { tenantId, shopifyDomain, accessToken } = req.body;
    const customers = await fetchCustomers(shopifyDomain, accessToken);

    const saved = await Promise.all(customers.map(c =>
      Customer.create({
        tenantId,
        shopifyCustomerId: c.id,
        firstName: c.first_name,
        lastName: c.last_name,
        email: c.email
      })
    ));

    res.json({ message: 'Customers ingested', count: saved.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ingestion failed' });
  }
};
