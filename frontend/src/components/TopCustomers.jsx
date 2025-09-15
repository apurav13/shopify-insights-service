import React from "react";
import { useNavigate } from "react-router-dom";

const TopCustomers = ({ customers }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Revenue by Top 5 Customers</h2>
      <ul className="space-y-2">
        {customers.map((c, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
          >
            <span>{c.name}</span>
            <span>${c.revenue}</span>
            <button
              onClick={() => navigate(`/customer/${c.id}`)}
              className="ml-4 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCustomers;
