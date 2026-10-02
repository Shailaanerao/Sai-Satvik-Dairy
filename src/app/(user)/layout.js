"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import Navbar from "@/components/ui/Navbar/Navbar";
import Footer from "@/components/ui/Footer/Footer";

import { supabase } from "@/lib/supabase";

export default function UserLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    const checkCustomerAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) {
        return;
      }

      if (!user) {
        router.replace(
          `/login?redirect=${encodeURIComponent(
            pathname || "/home"
          )}`
        );

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
       * Admin users are allowed to open their
       * profile page, but other customer pages
       * redirect them to the admin dashboard.
       */
      if (profile?.role === "admin") {
    router.replace("/admin");
    return;
}
    };

    checkCustomerAccess();

    return () => {
      mounted = false;
    };
  }, [pathname, router]);

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