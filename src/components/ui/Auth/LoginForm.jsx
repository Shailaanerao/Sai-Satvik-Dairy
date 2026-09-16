"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthLogo from "./AuthLogo";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import AuthButton from "./AuthButton";

import "./AuthForms.css";
import "./LoginForm.css";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.mobile.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    if (!formData.password.trim()) {
      alert("Please enter your password.");
      return;
    }

    setLoading(true);

    /*
      Frontend-only login for now.

      Later this will be replaced
      by your actual authentication API.
    */

    setTimeout(() => {
      router.replace("/home");
    }, 700);
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

      <form
        onSubmit={handleSubmit}
        className="login-form-fields"
      >

        <AuthInput
          label="Mobile Number"
          name="mobile"
          type="tel"
          placeholder="Enter your mobile number"
          value={formData.mobile}
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