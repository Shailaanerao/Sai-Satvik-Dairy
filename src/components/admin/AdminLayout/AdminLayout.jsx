"use client";

import AdminNavbar from "@/components/admin/AdminNavbar/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";

import "./AdminLayout.css";

export default function AdminLayout({
  children,
}) {
  return (
    <div className="admin-layout">
      <AdminNavbar />

      <div className="admin-layout-body">
        <AdminSidebar />

        <main className="admin-layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}