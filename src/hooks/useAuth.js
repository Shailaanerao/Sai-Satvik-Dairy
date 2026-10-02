"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const {
        data: { user: currentUser },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        setUser(null);
        return null;
      }

      setUser(currentUser || null);

      return currentUser || null;
    } catch (error) {
      console.error(
        "Failed to get Supabase user:",
        error
      );

      setUser(null);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!mounted) {
          return;
        }

        if (error) {
          console.error(
            "Failed to restore Supabase session:",
            error
          );

          setUser(null);
          setLoading(false);
          return;
        }

        setUser(session?.user || null);
        setLoading(false);
      } catch (error) {
        console.error(
          "Failed to initialize authentication:",
          error
        );

        if (!mounted) {
          return;
        }

        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) {
          return;
        }

        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(
    async (email, password) => {
      const cleanEmail =
        email?.trim().toLowerCase();

      if (!cleanEmail || !password) {
        throw new Error(
          "Email and password are required."
        );
      }

      /*
       * Make sure any previous local browser
       * session is removed before logging in.
       *
       * This allows switching cleanly from
       * one account to another.
       */
      const {
        error: signOutError,
      } = await supabase.auth.signOut({
        scope: "local",
      });

      if (signOutError) {
        console.warn(
          "Previous local session could not be cleared:",
          signOutError
        );
      }

      const {
        data,
        error,
      } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setUser(null);
        throw error;
      }

      const loggedInUser =
        data?.user || null;

      setUser(loggedInUser);

      return data;
    },
    []
  );

  const register = useCallback(
    async (formData) => {
      const {
        email,
        password,
        first_name,
        last_name,
        mobile,
      } = formData;

      const cleanEmail =
        email?.trim().toLowerCase();

      if (!cleanEmail || !password) {
        throw new Error(
          "Email and password are required."
        );
      }

      const {
        data,
        error,
      } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            first_name:
              first_name?.trim() || "",

            last_name:
              last_name?.trim() || "",

            mobile:
              mobile?.trim() || "",
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data?.session) {
        setUser(data.user || null);
      }

      return data;
    },
    []
  );

  const logout = useCallback(async () => {
    const { error } =
      await supabase.auth.signOut({
        scope: "local",
      });

    if (error) {
      throw error;
    }

    setUser(null);

    return {
      success: true,
    };
  }, []);

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    refreshUser,
  };
}