"use client";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [loans, setLoans] = useState<any[]>([]);

  // 🔁 fetch loans
  const fetchLoans = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/loan/my-loans", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("Loans:", data);

    setLoans(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // ✅ approve function
  const approveLoan = async (id: string) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/loan/approve/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Loan Approved ✅");

    // 🔁 refresh data
    fetchLoans();
  };
return (
  <div className="flex">

    {/* 🔹 LEFT SIDE → SIDEBAR */}
    <Sidebar />

    {/* 🔹 RIGHT SIDE → YOUR EXISTING CODE */}
    <div className="flex-1 min-h-screen bg-gray-100 p-6">
      
      <h2 className="text-3xl font-bold mb-6 text-center">
        All Loans (Admin)
      </h2>

      {loans.length === 0 ? (
        <p className="text-center text-gray-500">No loans found</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <p className="mb-1">
                <b>Amount:</b> ₹{loan.amount}
              </p>

              <p className="mb-1">
                <b>Tenure:</b> {loan.tenure} months
              </p>

              <p
                className={`font-bold mt-2 ${
                  loan.status === "APPROVED"
                    ? "text-green-600"
                    : loan.status === "REJECTED"
                    ? "text-red-600"
                    : "text-yellow-500"
                }`}
              >
                {loan.status}
              </p>

              {loan.status !== "APPROVED" && (
                <button
                  onClick={() => approveLoan(loan._id)}
                  className="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  </div>
);
}