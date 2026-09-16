"use client";

import { useState } from "react";
import "./PasswordInput.css";

export default function PasswordInput({
  label,
  name,
  placeholder,
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="password-input-group">
      <label htmlFor={name}>
        {label}
      </label>

      <div className="password-input-wrapper">
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />

        <button
          type="button"
          className="password-show-button"
          onClick={() =>
            setShowPassword(!showPassword)
          }
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}