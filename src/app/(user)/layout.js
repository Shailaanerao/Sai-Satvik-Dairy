"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/ui/Navbar/Navbar";
import Footer from "@/components/ui/Footer/Footer";

import { supabase } from "@/lib/supabase";

export default function UserLayout({
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

      /*
       * Guests are allowed to browse the customer
       * area without logging in.
       */
      if (!user) {
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
          "Failed to check user role:",
          error
        );

        return;
      }

      /*
       * Admin users are redirected to the admin
       * dashboard instead of staying in the
       * customer area.
       */
      if (profile?.role === "admin") {
        router.replace("/admin");
      }
    };

    checkAdminAccess();

    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <>
      <Navbar />

      <main className="user-page-content">
        {children}
      </main>

      <Footer />
    </>
  );
}