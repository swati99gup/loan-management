"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    router.push("/auth/login");
  };

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h2 className="font-bold">Loan Management System</h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}