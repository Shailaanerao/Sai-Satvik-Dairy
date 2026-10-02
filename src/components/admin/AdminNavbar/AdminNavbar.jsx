"use client";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import "./AdminNavbar.css";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.replace("/login");
  };

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-left">
        <span className="admin-navbar-title">
          Admin Dashboard
        </span>
      </div>

      <div className="admin-navbar-right">
        <button
          type="button"
          className="admin-navbar-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}