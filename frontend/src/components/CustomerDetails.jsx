import React from "react";
import { useParams } from "react-router-dom";

const CustomerDetails = () => {
  const { id } = useParams();

  // Later fetch details from API
  const fakeCustomer = {
    id,
    name: "John Doe",
    email: "john@example.com",
    orders: 12,
    revenue: 5600,
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Customer Details</h2>
      <p><strong>Name:</strong> {fakeCustomer.name}</p>
      <p><strong>Email:</strong> {fakeCustomer.email}</p>
      <p><strong>Orders:</strong> {fakeCustomer.orders}</p>
      <p><strong>Revenue:</strong> ${fakeCustomer.revenue}</p>
    </div>
  );
};

export default CustomerDetails;
