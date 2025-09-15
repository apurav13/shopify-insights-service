// src/components/OrdersByProduct.jsx
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6"];
const RADIAN = Math.PI / 180;

// Centered percentage label
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent === 0) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function OrdersByProduct() {
  // 🔹 Realistic dummy product sales data
  const chartData = useMemo(
    () => [
      { name: "Phone Covers", value: 7890 },
      { name: "Jeans", value: 6783 },
      { name: "Tops", value: 25790 },
      { name: "Sneakers", value: 9120 },
      { name: "Watches", value: 4890 },
      { name: "Backpacks", value: 3250 },
    ],
    []
  );

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 p-6 rounded-xl shadow-lg hover:scale-[1.01] transition-transform mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Orders by Product</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} orders`, name]}
              itemStyle={{ color: "#fff" }}
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #4B5563",
                borderRadius: "0.5rem",
              }}
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            />
            
          </PieChart>
        </ResponsiveContainer>

        {/* Product Breakdown Table */}
        <div className="bg-gray-900 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3 text-white">Product Breakdown</h3>
          <ul className="space-y-3">
            {chartData.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b border-gray-700 pb-2"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  ></span>
                  {item.name}
                </span>
                <span className="font-semibold text-gray-200">{item.value.toLocaleString()} orders</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
