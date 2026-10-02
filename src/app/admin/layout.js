"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./admin.css";

import AdminLayout from "@/components/admin/AdminLayout/AdminLayout";

import { supabase } from "@/lib/supabase";

export default function AdminRootLayout({
  children,
}) {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const checkAdminAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) {
        return;
      }

      if (!user) {
        router.replace("/login?redirect=/admin");
        return;
      }

      const {
        data: profile,
        error,
      } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!mounted) {
        return;
      }

      if (error) {
        console.error(
          "Failed to check admin role:",
          error
        );

        router.replace("/home");
        return;
      }

      if (profile?.role !== "admin") {
        router.replace("/home");
      }
    };

    checkAdminAccess();

    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}