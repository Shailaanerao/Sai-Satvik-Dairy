"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthLogo from "./AuthLogo";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import AuthButton from "./AuthButton";

import useAuth from "@/hooks/useAuth";

import "./AuthForms.css";

export default function RegisterForm() {
  const router = useRouter();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }

    if (!formData.lastName.trim()) {
      setError("Please enter your last name.");
      return;
    }

    if (!formData.mobile.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please create a password.");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const data = await register({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      /*
       * If Supabase requires email confirmation,
       * there will be no active session yet.
       */
      if (!data.session) {
        router.push(
          `/login?registered=true`
        );

        return;
      }

      router.replace("/home");
    } catch (error) {
  console.error("Registration failed:", {
    message: error?.message,
    code: error?.code,
    status: error?.status,
    name: error?.name,
  });

  setError(
    error?.message ||
      "Registration failed. Please try again."
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <AuthLogo />

      <div className="auth-heading">
        <h2>Create Account</h2>

        <p>
          Create your Sai Satvik
          Dairy account
        </p>
      </div>

      {error && (
        <div className="auth-error" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <AuthInput
          label="First Name"
          name="firstName"
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <AuthInput
          label="Last Name"
          name="lastName"
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <AuthInput
          label="Mobile Number"
          name="mobile"
          type="tel"
          placeholder="Enter your mobile number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <AuthButton
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </AuthButton>
      </form>

      <div className="auth-bottom-text">
        Already have an account?

        <button
          type="button"
          onClick={() =>
            router.push("/login")
          }
        >
          Login
        </button>
      </div>
    </div>
  );
}