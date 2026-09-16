"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthLogo from "./AuthLogo";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import AuthButton from "./AuthButton";

import "./AuthForms.css";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    /*
      Registration API will be connected here later.

      After successful registration,
      mobile number verification starts.
    */

    router.push("/otp-verification");
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
          placeholder="Enter mobile number"
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

        <AuthButton type="submit">
          Create Account
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