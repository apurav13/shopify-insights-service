const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Login API
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

// Dashboard Data Fetch
export async function fetchDashboardData(tenantId) {
  const token = localStorage.getItem("token");

  // Call all 3 endpoints in parallel
  const [customersRes, ordersRes, productsRes] = await Promise.all([
    fetch(`${API_BASE}/api/customers${tenantId ? `?tenantId=${tenantId}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch(`${API_BASE}/api/orders${tenantId ? `?tenantId=${tenantId}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch(`${API_BASE}/api/products${tenantId ? `?tenantId=${tenantId}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  if (!customersRes.ok || !ordersRes.ok || !productsRes.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  const [customers, orders, products] = await Promise.all([
    customersRes.json(),
    ordersRes.json(),
    productsRes.json(),
  ]);

  return { customers, orders, products };
}
