import React, { useState } from "react";
import { Loader, ArrowRight } from "lucide-react";
import { login } from "../api/api";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
    if (email === "demo@xeno.com" && password === "password") {
      localStorage.setItem("token", "fake-token");
      onLogin();
    } else {
      setError("Invalid credentials. Use demo@xeno.com / password");
    }
    setLoading(false);
  }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Xeno <span className="text-indigo-400">Insights</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Log in to your Shopify Data Dashboard
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., demo@xeno.com"
                className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="e.g., password"
                className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {error && <p className="text-red-400 text-xs text-center mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:bg-indigo-400"
            >
              {loading ? <Loader className="animate-spin h-5 w-5" /> : "Log In"}
              {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
            </button>
          </form>
        </div>
        <p className="text-center text-gray-500 text-xs mt-6">
          &copy;2025 Xeno. All rights reserved.
        </p>
      </div>
    </div>
  );
}
