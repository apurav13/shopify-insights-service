import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  ShoppingCart,
  Users,
  LogOut,
  Loader,
  IndianRupee,
} from "lucide-react";
import { fetchDashboardData } from "../api/api";
import KpiCard from "./Dashboard/KpiCard";
import OrdersChart from "./Dashboard/OrdersChart";
import TopCustomersTable from "./Dashboard/TopCustomersTable";
import OrdersByProduct from "./OrdersByProduct";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";

export default function Dashboard({ onLogout }) {
  const [data, setData] = useState({ customers: [], orders: [], products: [] });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("30d"); // 7d, 30d, 90d, all

  const loadData = useCallback(async () => {
  setLoading(true);
  try {
    const result = await fetchDashboardData("tenant1");
    setData(result);
  } catch (err) {
    console.error("Failed to fetch dashboard data:", err);
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  loadData();
}, [loadData]);
  

  // Filtered orders based on selected date range
  const filteredOrders = useMemo(() => {
    if (filter === "all") return data.orders;
    const days = filter === "7d" ? 7 : filter === "30d" ? 30 : 90;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return data.orders.filter((o) => new Date(o.orderDate) >= cutoff);
  }, [data.orders, filter]);

  // KPIs
  const totalRevenue = useMemo(
    () => filteredOrders.reduce((sum, o) => sum + o.totalPrice, 0),
    [filteredOrders]
  );
  const totalOrders = filteredOrders.length;
  const totalCustomers = data.customers.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const returningCustomers = useMemo(() => {
    const orderCounts = filteredOrders.reduce((acc, order) => {
      acc[order.customerId] = (acc[order.customerId] || 0) + 1;
      return acc;
    }, {});
    return Object.values(orderCounts).filter((count) => count > 1).length;
  }, [filteredOrders]);

  const newCustomers = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return data.customers.filter((c) => {
      const firstOrder = data.orders.find((o) => o.customerId === c.id);
      return firstOrder && new Date(firstOrder.orderDate) >= thirtyDaysAgo;
    }).length;
  }, [data.customers, data.orders]);

  // Revenue by Top 5 Customers
  const revenueByCustomerData = useMemo(() => {
    if (data.customers.length === 0 || filteredOrders.length === 0) {
      return [
        { name: "Alice", value: 5000, orders: 5 },
        { name: "Bob", value: 4200, orders: 4 },
        { name: "Charlie", value: 3500, orders: 3 },
        { name: "David", value: 2800, orders: 2 },
        { name: "Eva", value: 2100, orders: 2 },
      ];
    }

    const spendMap = {};
    filteredOrders.forEach((o) => {
      spendMap[o.customerId] = (spendMap[o.customerId] || 0) + o.totalPrice;
    });
    return data.customers
      .map((c) => ({
        name: `${c.firstName} ${c.lastName}`,
        value: spendMap[c.id] || 0,
        orders: filteredOrders.filter((o) => o.customerId === c.id).length,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [filteredOrders, data.customers]);

  // Daily Active Customers
  const dailyActiveCustomersData = useMemo(() => {
    const dailyMap = {};
    filteredOrders.forEach((o) => {
      const day = format(new Date(o.orderDate), "MMM d");
      dailyMap[day] = dailyMap[day] || new Set();
      dailyMap[day].add(o.customerId);
    });
    return Object.keys(dailyMap)
      .map((date) => ({ date, customers: dailyMap[date].size }))
      .sort(
        (a, b) => new Date(a.date + " 2025") - new Date(b.date + " 2025")
      );
  }, [filteredOrders]);

  const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#3B82F6"];

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
        <Loader className="h-12 w-12 text-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Header */}
      <header className="bg-gray-800/50 border-b border-gray-700/50 p-4 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Xeno <span className="text-indigo-400">Insights</span>
          </h1>
          <p className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleDateString("en-IN")}
          </p>
        </div>
        <div className="flex justify-between items-center mb-4">
  
  {/* Right-side controls */}
  <div className="flex items-center gap-3">
    {/* Product Dropdown */}
    <select className="bg-gray-800 text-gray-200 px-3 py-2 rounded-lg border border-gray-700">
      <option>All Products</option>
      <option>Mens</option>
      <option>Womens</option>
      <option>Kids</option>
      <option>Electronics</option>
      <option>Mobiles</option>
      <option>Footwear</option>
      <option>Grocery</option>
    </select>

    {/* Refresh Button */}
    <button 
  onClick={loadData}
  disabled={loading}
  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow disabled:bg-indigo-400 disabled:cursor-not-allowed"
>
      Refresh
    </button>

    {/* Logout Button */}
    <button 
  onClick={onLogout} 
  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
>
      Logout
    </button>
  </div>
</div>

      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        {/* Filters */}
        <div className="flex space-x-2 mb-6">
          {["7d", "30d", "90d", "all"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded transition-all duration-300 ${
                filter === f
                  ? "bg-indigo-500 text-white scale-105"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <KpiCard
            title="Total Revenue"
            value={totalRevenue}
            icon={IndianRupee}
            format="currency"
          />
          <KpiCard title="Total Orders" value={totalOrders} icon={ShoppingCart} />
          <KpiCard title="Total Customers" value={totalCustomers} icon={Users} />
          <KpiCard
            title="Avg. Order Value"
            value={avgOrderValue}
            icon={IndianRupee}
            format="currency"
          />
          <KpiCard
            title="Returning Customers"
            value={returningCustomers}
            icon={Users}
          />
          <KpiCard
            title="New Customers (30d)"
            value={newCustomers}
            icon={Users}
          />
        </div>

        {/* Orders by Product */}
        <OrdersByProduct
          orders={filteredOrders}
          products={data.products}
          filter={filter}
        />

        {/* Revenue by Top 5 Customers */}
        <div className="bg-gray-800/50 border border-gray-700/50 p-6 rounded-xl shadow-lg hover:scale-[1.01] transition-transform mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Revenue by Top 5 Customers</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={revenueByCustomerData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, value }) =>
                  `${name}: ₹${value.toLocaleString("en-IN")}`
                }
              >
                {revenueByCustomerData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Item 2: The Table */}
<table className="w-full text-sm text-gray-300">
  <thead>
    <tr className="text-gray-400 border-b border-gray-700">
      <th className="text-left p-2">Customer</th>
      <th className="text-right p-2">Total Orders</th>
      <th className="text-right p-2">Total Revenue</th>
    </tr>
  </thead>
  <tbody>
    {revenueByCustomerData.map((c) => (
      <tr key={c.name} className="border-t border-gray-700/50">
        <td className="p-2">{c.name}</td>
        <td className="text-right p-2">{c.orders}</td>
        <td className="text-right p-2">₹{c.value.toLocaleString("en-IN")}</td>
      </tr>
    ))}
  </tbody>
</table>
        </div>

        {/* Daily Active Customers */}
        <div className="bg-gray-800/50 border border-gray-700/50 p-6 rounded-xl shadow-lg hover:scale-[1.01] transition-transform lg:col-span-2 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Daily Active Customers</h3>
          {dailyActiveCustomersData.length === 0 ? (
            <p className="text-gray-400 text-center">No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyActiveCustomersData}>
                <CartesianGrid stroke="#4B5563" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-800 border border-gray-700 p-2 rounded shadow text-gray-200 text-sm">
                          <p>{label}</p>
                          <p>Customers : {payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="#6366F1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Orders Chart + Top Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredOrders.length === 0 ? (
            <p className="text-gray-400 text-center lg:col-span-3">
              No data available for this range
            </p>
          ) : (
            <>
              <OrdersChart orders={filteredOrders} />
              <TopCustomersTable
                customers={data.customers}
                orders={filteredOrders}
              />
            </>
          )}
        </div>
      </main>

      <footer className="text-center p-4 text-gray-500 text-sm border-t border-gray-800 mt-8">
       
        Xeno Dashboard. Built with ❤️ by Apurav
      </footer>
    </div>
  );
}
