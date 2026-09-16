"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthLogo from "./AuthLogo";
import OTPInput from "./OTPInput";
import AuthButton from "./AuthButton";

import "./AuthForms.css";

export default function OTPVerification() {
  const router = useRouter();

  const [otp, setOtp] =
    useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (otp.length !== 6) {
      alert(
        "Please enter the complete 6-digit OTP."
      );
      return;
    }

    /*
      OTP verification API
      will be connected here.

      For now, registration
      returns to Login.
    */

    router.push("/login");
  };

  const handleResend = () => {
    /*
      Resend OTP API will
      be connected here later.
    */

    alert("OTP resent successfully.");
  };

  return (
    <div className="auth-form">

      <AuthLogo />

      <div className="auth-heading">
        <h2>
          Verify Mobile Number
        </h2>

        <p>
          Enter the 6-digit OTP
          sent to your mobile number.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
      >

        <OTPInput
          value={otp}
          onChange={setOtp}
        />

        <AuthButton type="submit">
          Verify OTP
        </AuthButton>

      </form>

      <div className="auth-bottom-text">

        Didn't receive the OTP?

        <button
          type="button"
          onClick={handleResend}
        >
          Resend OTP
        </button>

      </div>

    </div>
  );
}