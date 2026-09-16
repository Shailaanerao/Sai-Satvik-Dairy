"use client";

export default function ProfileFormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  disabled = false,
}) {
  return (
    <div className="profile-form-field">
      <label htmlFor={label}>
        {label}
      </label>

      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}