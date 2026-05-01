"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplyLoan() {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      if (!amount || !tenure) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      const res = await fetch("http://localhost:5000/api/loan/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          tenure: Number(tenure),
        }),
      });

      const data = await res.json();
      console.log("Apply Loan:", data);

      alert("Loan Applied Successfully ✅");

      // redirect to dashboard
      router.push("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Error applying loan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Apply Loan
        </h2>

        {/* Amount */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tenure */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Tenure (months)
          </label>
          <input
            type="number"
            placeholder="Enter tenure"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleApply}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Applying..." : "Apply Loan"}
        </button>
      </div>
    </div>
  );
}