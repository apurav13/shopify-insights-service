import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CustomerDetails from "./components/CustomerDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customer/:id" element={<CustomerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
