"use client";

import Link from "next/link";

import useAuth from "@/hooks/useAuth";

export default function NavbarProfile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Link
        href="/login"
        className="user-profile"
        aria-label="Login or create an account"
      >
        <div className="profile-avatar">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="8"
              r="4"
            />

            <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
          </svg>
        </div>

        <div className="profile-info">
          <span className="user-greeting">
            ...
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={user ? "/profile" : "/login"}
      className="user-profile"
      aria-label={
        user
          ? "Open My Account"
          : "Login or create an account"
      }
    >
      <div className="profile-avatar">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="8"
            r="4"
          />

          <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
        </svg>
      </div>

      <div className="profile-info">
        {user ? (
          <>
            <span className="user-greeting">
              Hello, {user.firstName}
            </span>

            <div className="user-account">
              <span>My Account</span>

              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </>
        ) : (
          <span className="user-greeting">
            Login or Register
          </span>
        )}
      </div>
    </Link>
  );
}