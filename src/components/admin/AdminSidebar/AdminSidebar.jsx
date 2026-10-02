"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavigation } from "@/config/adminRoutes";

import "./AdminSidebar.css";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navigation = Array.isArray(adminNavigation)
    ? adminNavigation
    : [];

  const hasProfileRoute = navigation.some(
    (route) => route.href === "/admin/profile"
  );

  const finalNavigation = hasProfileRoute
    ? navigation
    : [
        ...navigation,
        {
          label: "My Profile",
          href: "/admin/profile",
        },
      ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <h2>Sai Satvik</h2>
        <span>ADMIN PANEL</span>
      </div>

      <nav className="admin-sidebar-nav">
        {finalNavigation.map((route) => {
          const isActive =
            route.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(route.href);

          return (
            <Link
              key={route.href}
              href={route.href}
              className={
                isActive
                  ? "admin-nav-link active"
                  : "admin-nav-link"
              }
            >
              {route.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}