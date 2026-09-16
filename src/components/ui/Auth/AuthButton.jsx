import "./AuthButton.css";

export default function AuthButton({
  children,
  type = "button",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      className="auth-button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}