const axios = require('axios');

async function fetchCustomers(shopifyDomain, accessToken) {
  const url = `https://${shopifyDomain}/admin/api/2023-07/customers.json`;
  const res = await axios.get(url, {
    headers: { 'X-Shopify-Access-Token': accessToken }
  });
  return res.data.customers;
}

async function fetchOrders(shopifyDomain, accessToken) {
  const url = `https://${shopifyDomain}/admin/api/2023-07/orders.json`;
  const res = await axios.get(url, {
    headers: { 'X-Shopify-Access-Token': accessToken }
  });
  return res.data.orders;
}

async function fetchProducts(shopifyDomain, accessToken) {
  const url = `https://${shopifyDomain}/admin/api/2023-07/products.json`;
  const res = await axios.get(url, {
    headers: { 'X-Shopify-Access-Token': accessToken }
  });
  return res.data.products;
}

module.exports = { fetchCustomers, fetchOrders, fetchProducts };
