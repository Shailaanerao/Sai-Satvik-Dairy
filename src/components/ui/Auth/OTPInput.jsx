"use client";

import { useRef } from "react";

import "./OTPInput.css";

export default function OTPInput({
  value,
  onChange,
}) {
  const inputRefs = useRef([]);

  const handleChange = (
    event,
    index
  ) => {
    const digit = event.target.value
      .replace(/\D/g, "")
      .slice(-1);

    const otpArray = value
      .split("");

    otpArray[index] = digit;

    const newOTP = otpArray
      .join("")
      .slice(0, 6);

    onChange(newOTP);

    if (
      digit &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handleKeyDown = (
    event,
    index
  ) => {
    if (
      event.key === "Backspace" &&
      !value[index] &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }
  };

  return (
    <div className="otp-input-container">

      {[0, 1, 2, 3, 4, 5].map(
        (index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] =
                element;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={
              value[index] || ""
            }
            onChange={(event) =>
              handleChange(
                event,
                index
              )
            }
            onKeyDown={(event) =>
              handleKeyDown(
                event,
                index
              )
            }
            aria-label={`OTP digit ${
              index + 1
            }`}
          />
        )
      )}

    </div>
  );
}