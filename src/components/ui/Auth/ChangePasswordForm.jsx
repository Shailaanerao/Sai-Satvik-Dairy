"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthLogo from "./AuthLogo";
import PasswordInput from "./PasswordInput";
import AuthButton from "./AuthButton";

import "./AuthForms.css";

export default function ChangePasswordForm() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      newPassword: "",
      confirmPassword: "",
    });

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      alert(
        "Passwords do not match."
      );
      return;
    }

    /*
      Change password API
      will be connected here later.
    */

    alert(
      "Password updated successfully."
    );

    router.push("/login");
  };

  return (
    <div className="auth-form">

      <AuthLogo />

      <div className="auth-heading">
        <h2>
          Change Password
        </h2>

        <p>
          Create a new password
          for your account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
      >

        <PasswordInput
          label="New Password"
          name="newPassword"
          placeholder="Enter new password"
          value={
            formData.newPassword
          }
          onChange={handleChange}
        />

        <PasswordInput
          label="Confirm New Password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={
            formData.confirmPassword
          }
          onChange={handleChange}
        />

        <AuthButton type="submit">
          Update Password
        </AuthButton>

      </form>

      <div className="auth-bottom-text">

        <button
          type="button"
          onClick={() =>
            router.push("/login")
          }
        >
          Back to Login
        </button>

      </div>

    </div>
  );
}