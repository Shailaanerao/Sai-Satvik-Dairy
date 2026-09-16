import "./AuthInput.css";

export default function AuthInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="auth-input-group">
      <label htmlFor={name}>
        {label}

        {required && (
          <span className="required-star">*</span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}