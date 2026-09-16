import Image from "next/image";

import "./AuthLogo.css";

export default function AuthLogo() {
  return (
    <div className="auth-logo">

      <div className="auth-logo-image">
        <Image
          src="/logo.jpeg"
          alt="Sai Satvik Dairy"
          width={82}
          height={82}
          priority
        />
      </div>

      <div className="auth-brand-name">
        Sai Satvik
      </div>

      <div className="auth-brand-subtitle">
        DAIRY PRODUCTS
      </div>

      <div className="auth-brand-tagline">
        PURE FOR SURE
      </div>

    </div>
  );
}