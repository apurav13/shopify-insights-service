import React from "react";

export default function KpiCard({ title, value, icon: Icon, format = "number" }) {
  const formattedValue =
    format === "currency"
      ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value)
      : new Intl.NumberFormat("en-IN").format(value);

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 p-6 rounded-xl shadow-lg flex items-center space-x-4 transition-transform duration-300 hover:scale-105 hover:bg-gray-800">
      <div className="bg-gray-700 p-3 rounded-lg">
        <Icon className="text-indigo-400 h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{formattedValue}</p>
      </div>
    </div>
  );
}
