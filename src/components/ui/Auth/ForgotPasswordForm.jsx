"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthLogo from "./AuthLogo";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

import "./AuthForms.css";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [mobile, setMobile] =
    useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
      Forgot password API
      will be connected here.

      After sending OTP,
      user verifies OTP and
      changes password.
    */

    router.push(
      "/otp-verification"
    );
  };

  return (
    <div className="auth-form">

      <AuthLogo />

      <div className="auth-heading">
        <h2>
          Forgot Password?
        </h2>

        <p>
          Enter your registered
          mobile number to reset
          your password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
      >

        <AuthInput
          label="Mobile Number"
          name="mobile"
          type="tel"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(event) =>
            setMobile(
              event.target.value
            )
          }
          required
        />

        <AuthButton type="submit">
          Send OTP
        </AuthButton>

      </form>

      <div className="auth-bottom-text">

        Remember your password?

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