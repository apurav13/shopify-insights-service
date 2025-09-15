const { Tenant, Customer, Order, Product } = require("./models");
const { v4: uuidv4 } = require("uuid");

// Large pool of Indian first & last names
const firstNames = [
  "Aarav", "Vivaan", "Aditya", "Ishaan", "Kabir", "Rohan", "Aryan", "Karan",
  "Rahul", "Siddharth", "Arjun", "Rudra", "Krishna", "Yash", "Ananya", "Diya",
  "Aditi", "Neha", "Sneha", "Priya", "Simran", "Kavya", "Meera", "Ira", "Nisha"
];
const lastNames = [
  "Sharma", "Patel", "Mehta", "Reddy", "Verma", "Gupta", "Nair", "Kulkarni",
  "Chopra", "Malhotra", "Iyer", "Bose", "Desai", "Kapoor", "Khanna", "Singh",
  "Mishra", "Rastogi", "Agarwal", "Menon"
];

// Sample product catalog (with realistic INR ranges)
const productCatalog = [
  { title: "T-Shirt", min: 399, max: 1299 },
  { title: "Jeans", min: 999, max: 2999 },
  { title: "Sneakers", min: 1999, max: 7999 },
  { title: "Kurta", min: 799, max: 1999 },
  { title: "Saree", min: 1999, max: 9999 },
  { title: "Smartwatch", min: 1999, max: 14999 },
  { title: "Backpack", min: 499, max: 3999 },
  { title: "Mobile Case", min: 199, max: 799 },
  { title: "Headphones", min: 999, max: 5999 },
  { title: "Jacket", min: 1499, max: 5999 },
  { title: "Formal Shirt", min: 699, max: 2499 },
  { title: "Laptop Bag", min: 999, max: 5999 },
  { title: "Sunglasses", min: 499, max: 2999 },
  { title: "Perfume", min: 699, max: 4999 },
  { title: "Sports Shoes", min: 1999, max: 8999 },
];

function randomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seed() {
  try {
    // Drop everything and start clean
    await Tenant.sync({ force: true });
    await Customer.sync({ force: true });
    await Product.sync({ force: true });
    await Order.sync({ force: true });

    // Create tenant
    const tenant = await Tenant.create({
      id: uuidv4(),
      name: "Tenant India",
    });

    // Create 100 products
    const products = [];
    for (let i = 0; i < 149; i++) {
      const p = randomElement(productCatalog);
      const product = await Product.create({
        id: uuidv4(),
        tenantId: tenant.id,
        shopifyProductId: `PROD${1000 + i}`,
        title: `${p.title} #${i + 1}`,
        price: randomPrice(p.min, p.max),
      });
      products.push(product);
    }

    // Create 500 customers
    const customers = [];
    for (let i = 0; i < 589; i++) {
      const firstName = randomElement(firstNames);
      const lastName = randomElement(lastNames);
      const customer = await Customer.create({
        id: uuidv4(),
        tenantId: tenant.id,
        shopifyCustomerId: `CUST${1000 + i}`,
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@`,
      });
      customers.push(customer);
    }

    // Create 2000 orders (spread over last 6 months)
    for (let i = 0; i < 2567; i++) {
      const customer = randomElement(customers);
      const product = randomElement(products);
      const daysAgo = Math.floor(Math.random() * 180); // last 6 months
      const orderDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

      await Order.create({
        id: uuidv4(),
        tenantId: tenant.id,
        customerId: customer.id,
        shopifyOrderId: `ORD${2000 + i}`,
        totalPrice: randomPrice(product.price * 0.8, product.price * 1.2),
        orderDate,
      });
    }

    console.log("✅ Seeded Indian dataset with 500 customers, 100 products, 2000 orders");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  }
}

module.exports = seed;
