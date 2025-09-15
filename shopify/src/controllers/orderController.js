const { Order } = require('../models');
const { fetchOrders } = require('../services/shopifyService');

exports.ingestOrders = async (req, res) => {
  try {
    const { tenantId, shopifyDomain, accessToken } = req.body;

    const orders = await fetchOrders(shopifyDomain, accessToken);

    const saved = await Promise.all(
      orders.map(o =>
        Order.create({
          tenantId,
          shopifyOrderId: o.id,
          totalPrice: o.total_price,
          orderDate: o.created_at,
        })
      )
    );

    res.json({ message: 'Orders ingested', count: saved.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Order ingestion failed' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { tenantId } = req.query;
    const orders = await Order.findAll({ where: { tenantId } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch orders' });
  }
};
