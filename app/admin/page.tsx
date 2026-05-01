"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
export default function Admin() {
  const [loading,setLoading]=useState(false);
  const [loans, setLoans] = useState<any[]>([]);

  const fetchLoans = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/loan/loans", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setLoans(Array.isArray(data) ? data : []);
    setLoading(false);
  };

 useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/auth/login";
  }
  else{
    fetchLoans();
  }
}, []);

  const rejectLoan = async (id: string) => {
  try {
    setLoading(true);
    await axios.post(`/api/loans/reject/${id}`);
    window.location.reload();
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  const approveLoan = async (id: string) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/loan/approve/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchLoans();
    setLoading(false);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        {loading && <p>Loading...</p>}
{loans.map((loan) => (
  <div key={loan._id} className="bg-white p-4 mb-4 rounded-xl shadow md">
    <p>Amount: ₹{loan.amount}</p>
    <p
  className={`font-bold ${
    loan.status === "SANCTIONED"
      ? "text-green-600"
      : loan.status === "REJECTED"
      ? "text-red-600"
      : "text-yellow-500"
  }`}
>
  Status: {loan.status}
</p>

    {loan.status !== "SANCTIONED" && (
  <div className="mt-2">
    <button
      onClick={() => approveLoan(loan._id)}
      className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
    >
      Approve
    </button>

    <button
      onClick={() => rejectLoan(loan._id)}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      Reject
    </button>
  </div>
)}
  </div>
))}
      </div>
    </div>
  );
}