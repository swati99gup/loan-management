"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  // ✅ access localStorage safely
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <div className="w-60 bg-gray-800 text-white p-4 h-screen">
      <h2 className="text-xl mb-4">Menu</h2>

      <button onClick={() => router.push("/dashboard")}>
        Dashboard
      </button>

      <br /><br />

      <button onClick={() => router.push("/apply")}>
        Apply Loan
      </button>

      <br /><br />

      {/* ✅ show only for admin */}
      {role === "SANCTION" && (
        <button onClick={() => router.push("/admin")}>
          Admin Panel
        </button>
      )}
    </div>
  );
}