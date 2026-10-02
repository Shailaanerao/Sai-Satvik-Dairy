"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthLogo from "./AuthLogo";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import AuthButton from "./AuthButton";

import useAuth from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

import "./AuthForms.css";
import "./LoginForm.css";

export default function LoginForm() {
  const router = useRouter();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      await login(
        formData.email.trim(),
        formData.password
      );

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          "Unable to verify your account."
        );
      }

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error(
          "Profile role lookup failed:",
          profileError
        );

        throw new Error(
          "Unable to determine account type."
        );
      }

      if (profile?.role === "admin") {
        router.replace("/admin");
        return;
      }

      router.replace("/home");
    } catch (error) {
      console.error("Login failed:", error);

      setError(
        error?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <div className="login-logo">
        <AuthLogo />
      </div>

      <div className="login-heading">
        <span className="login-eyebrow">
          CUSTOMER ACCOUNT
        </span>

        <h1>Welcome Back</h1>

        <p>
          Login to continue shopping
          fresh dairy products.
        </p>
      </div>

      {error && (
        <div className="auth-error" role="alert">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="login-form-fields"
      >
        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="login-forgot">
          <button
            type="button"
            onClick={() =>
              router.push("/forgot-password")
            }
          >
            Forgot Password?
          </button>
        </div>

        <AuthButton
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </AuthButton>
      </form>

      <div className="login-divider">
        <span>NEW TO SAI SATVIK?</span>
      </div>

      <button
        type="button"
        className="login-register-button"
        onClick={() =>
          router.push("/register")
        }
      >
        Create New Account
      </button>

      <p className="login-footer-text">
        By continuing, you agree to our
        <span> Terms & Conditions</span>
        {" "}and{" "}
        <span>Privacy Policy</span>.
      </p>
    </div>
  );
}