import "./AuthLayout.css";

export default function AuthLayout({
  children,
}) {
  return (
    <main className="auth-page">
      <div className="auth-page-container">
        {children}
      </div>
    </main>
  );
}