import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, parseISO, isWithinInterval } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

const OrdersChart = ({ orders }) => {
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderDate = parseISO(order.orderDate);
      return isWithinInterval(orderDate, {
        start: dateRange.from,
        end: dateRange.to,
      });
    });
  }, [orders, dateRange]);

  const chartData = useMemo(() => {
    const grouped = filteredOrders.reduce((acc, order) => {
      const date = format(parseISO(order.orderDate), "MMM d");
      if (!acc[date]) acc[date] = { date, orders: 0, revenue: 0 };
      acc[date].orders += 1;
      acc[date].revenue += order.totalPrice;
      return acc;
    }, {});
    return Object.values(grouped);
  }, [filteredOrders]);

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 p-6 rounded-xl shadow-lg col-span-1 lg:col-span-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Orders & Revenue</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <CalendarIcon className="h-4 w-4" />
          <input
            type="date"
            value={format(dateRange.from, "yyyy-MM-dd")}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, from: parseISO(e.target.value) }))
            }
            className="bg-gray-700/50 border-gray-600 rounded-md p-1"
          />
          <span>-</span>
          <input
            type="date"
            value={format(dateRange.to, "yyyy-MM-dd")}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, to: parseISO(e.target.value) }))
            }
            className="bg-gray-700/50 border-gray-600 rounded-md p-1"
          />
        </div>
      </div>
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="date" stroke="#A0AEC0" />
            <YAxis yAxisId="left" stroke="#A0AEC0" />
            <YAxis yAxisId="right" orientation="right" stroke="#A0AEC0" />
            <Tooltip contentStyle={{ backgroundColor: "#1A202C" }} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="orders"
              stroke="#818CF8"
              name="Orders"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#34D399"
              name="Revenue (₹)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersChart;
