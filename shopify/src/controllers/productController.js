const { Product } = require('../models');
const { fetchProducts } = require('../services/shopifyService');

exports.ingestProducts = async (req, res) => {
  try {
    const { tenantId, shopifyDomain, accessToken } = req.body;

    const products = await fetchProducts(shopifyDomain, accessToken);

    const saved = await Promise.all(
      products.map(p =>
        Product.create({
          tenantId,
          shopifyProductId: p.id,
          title: p.title,
          price: p.variants[0]?.price || 0, // get first variant price
        })
      )
    );

    res.json({ message: 'Products ingested', count: saved.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Product ingestion failed' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { tenantId } = req.query;
    const products = await Product.findAll({ where: { tenantId } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch products' });
  }
};
