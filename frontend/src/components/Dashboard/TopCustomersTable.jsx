import React, { useMemo } from "react";

const TopCustomersTable = ({ customers, orders }) => {
  const topCustomers = useMemo(() => {
    const spendMap = orders.reduce((acc, order) => {
      acc[order.customerId] = (acc[order.customerId] || 0) + order.totalPrice;
      return acc;
    }, {});

    return customers
      .map((c) => ({
        ...c,
        totalSpend: spendMap[c.id] || 0,
        orderCount: orders.filter((o) => o.customerId === c.id).length,
      }))
      .sort((a, b) => b.totalSpend - a.totalSpend)
      .slice(0, 5);
  }, [customers, orders]);

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 p-6 rounded-xl shadow-lg col-span-1 lg:col-span-3">
      <h3 className="text-xl font-bold text-white mb-4">
        Top 5 Customers by Spend
      </h3>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700 text-sm text-gray-400">
            <th className="py-3 px-4">Customer</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4 text-right">Orders</th>
            <th className="py-3 px-4 text-right">Total Spend</th>
          </tr>
        </thead>
        <tbody>
          {topCustomers.map((c) => (
            <tr key={c.id} className="border-b border-gray-800 hover:bg-gray-800/70">
              <td className="py-3 px-4">{c.firstName} {c.lastName}</td>
              <td className="py-3 px-4 text-gray-300">{`${c.email}@gmail.com`}</td>
              <td className="py-3 px-4 text-right">{c.orderCount}</td>
              <td className="py-3 px-4 text-green-400 font-semibold text-right">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(c.totalSpend)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopCustomersTable;
