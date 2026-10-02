"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import "./profile.css";

const initialProfileForm = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
};

export default function AdminProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [profileForm, setProfileForm] = useState(
    initialProfileForm
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const [editMode, setEditMode] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  /*
   * =========================================
   * LOAD ADMIN PROFILE
   * =========================================
   */

  useEffect(() => {
    let mounted = true;

    const loadAdminProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          router.replace(
            `/login?redirect=${encodeURIComponent(
              "/admin/profile"
            )}`
          );
          return;
        }

        const {
          data: profileData,
          error: profileError,
        } = await supabase
          .from("profiles")
          .select(
            `
              id,
              first_name,
              last_name,
              mobile,
              role,
              created_at,
              updated_at
            `
          )
          .eq("id", user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        if (!mounted) {
          return;
        }

        if (profileData?.role !== "admin") {
          router.replace("/home");
          return;
        }

        const nextProfile = {
          id: profileData.id,
          firstName:
            profileData.first_name || "",
          lastName:
            profileData.last_name || "",
          mobile:
            profileData.mobile || "",
          email:
            user.email || "",
          role:
            profileData.role || "admin",
          createdAt:
            profileData.created_at ||
            user.created_at ||
            null,
          updatedAt:
            profileData.updated_at || null,
          lastSignIn:
            user.last_sign_in_at || null,
        };

        setProfile(nextProfile);

        setProfileForm({
          firstName:
            nextProfile.firstName,
          lastName:
            nextProfile.lastName,
          mobile:
            nextProfile.mobile,
          email:
            nextProfile.email,
        });
      } catch (profileError) {
        console.error(
          "Admin profile error:",
          profileError
        );

        if (mounted) {
          setError(
            profileError?.message ||
              "Unable to load admin profile."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadAdminProfile();

    return () => {
      mounted = false;
    };
  }, [router]);

  /*
   * =========================================
   * DISPLAY VALUES
   * =========================================
   */

  const displayName =
    `${profile?.firstName || ""} ${
      profile?.lastName || ""
    }`.trim() || "Administrator";

  const initials = useMemo(() => {
    const parts = displayName
      .split(/\s+/)
      .filter(Boolean);

    if (parts.length === 1) {
      return parts[0][0]
        ?.toUpperCase() || "A";
    }

    return `${parts[0]?.[0] || ""}${
      parts[1]?.[0] || ""
    }`
      .toUpperCase()
      .slice(0, 2);
  }, [displayName]);

  /*
   * =========================================
   * DATE FORMATTER
   * =========================================
   */

  const formatDate = (value) => {
    if (!value) {
      return "Not available";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /*
   * =========================================
   * PROFILE FORM CHANGE
   * =========================================
   */

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfileForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * =========================================
   * PASSWORD FORM CHANGE
   * =========================================
   */

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * =========================================
   * ENABLE EDIT MODE
   * =========================================
   */

  const handleStartEditing = () => {
    setError("");
    setSuccessMessage("");

    setProfileForm({
      firstName:
        profile?.firstName || "",
      lastName:
        profile?.lastName || "",
      mobile:
        profile?.mobile || "",
      email:
        profile?.email || "",
    });

    setEditMode(true);
  };

  /*
   * =========================================
   * CANCEL EDITING
   * =========================================
   */

  const handleCancelEditing = () => {
    setProfileForm({
      firstName:
        profile?.firstName || "",
      lastName:
        profile?.lastName || "",
      mobile:
        profile?.mobile || "",
      email:
        profile?.email || "",
    });

    setEditMode(false);
    setError("");
  };

  /*
   * =========================================
   * SAVE PROFILE
   * =========================================
   */

  const handleSaveProfile = async () => {
    setError("");
    setSuccessMessage("");

    const firstName =
      profileForm.firstName.trim();

    const lastName =
      profileForm.lastName.trim();

    const mobile =
      profileForm.mobile.trim();

    const email =
      profileForm.email.trim();

    if (!firstName) {
      setError("First name is required.");
      return;
    }

    if (!lastName) {
      setError("Last name is required.");
      return;
    }

    if (!email) {
      setError("Email address is required.");
      return;
    }

    if (
      mobile &&
      !/^[0-9+\-\s()]{7,20}$/.test(mobile)
    ) {
      setError(
        "Please enter a valid mobile number."
      );
      return;
    }

    try {
      setSaving(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        router.replace(
          `/login?redirect=${encodeURIComponent(
            "/admin/profile"
          )}`
        );
        return;
      }

      /*
       * Save profile-table information.
       */

      const {
        data: updatedProfile,
        error: profileUpdateError,
      } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          mobile: mobile || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select(
          `
            id,
            first_name,
            last_name,
            mobile,
            role,
            created_at,
            updated_at
          `
        )
        .single();

      if (profileUpdateError) {
        throw profileUpdateError;
      }

      /*
       * Email belongs to Supabase Auth.
       *
       * When the email changes, Supabase may require
       * email confirmation depending on your project
       * authentication settings.
       */

      if (
        email.toLowerCase() !==
        (user.email || "").toLowerCase()
      ) {
        const {
          error: emailUpdateError,
        } = await supabase.auth.updateUser({
          email,
        });

        if (emailUpdateError) {
          throw emailUpdateError;
        }

        setSuccessMessage(
          "Profile saved. Check the new email inbox for confirmation."
        );
      } else {
        setSuccessMessage(
          "Profile updated successfully."
        );
      }

      setProfile({
        id: updatedProfile.id,
        firstName:
          updatedProfile.first_name || "",
        lastName:
          updatedProfile.last_name || "",
        mobile:
          updatedProfile.mobile || "",
        email,
        role:
          updatedProfile.role || "admin",
        createdAt:
          updatedProfile.created_at ||
          profile?.createdAt ||
          user.created_at ||
          null,
        updatedAt:
          updatedProfile.updated_at || null,
        lastSignIn:
          user.last_sign_in_at ||
          profile?.lastSignIn ||
          null,
      });

      setProfileForm({
        firstName:
          updatedProfile.first_name || "",
        lastName:
          updatedProfile.last_name || "",
        mobile:
          updatedProfile.mobile || "",
        email,
      });

      setEditMode(false);
    } catch (saveError) {
      console.error(
        "Admin save profile error:",
        saveError
      );

      setError(
        saveError?.message ||
          "Unable to save profile changes."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * =========================================
   * PASSWORD STRENGTH
   * =========================================
   */

  const passwordStrength = useMemo(() => {
    const password =
      passwordForm.newPassword;

    if (!password) {
      return {
        label: "Enter a new password",
        score: 0,
      };
    }

    let score = 0;

    if (password.length >= 8) {
      score += 1;
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    }

    let label = "Weak";

    if (score >= 5) {
      label = "Very strong";
    } else if (score >= 4) {
      label = "Strong";
    } else if (score >= 3) {
      label = "Medium";
    }

    return {
      label,
      score,
    };
  }, [passwordForm.newPassword]);

  /*
   * =========================================
   * CHANGE PASSWORD
   * =========================================
   */

  const handleChangePassword = async () => {
    setError("");
    setSuccessMessage("");

    const newPassword =
      passwordForm.newPassword;

    const confirmPassword =
      passwordForm.confirmPassword;

    if (!newPassword) {
      setError(
        "Please enter a new password."
      );
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        "New password and confirmation do not match."
      );
      return;
    }

    if (passwordStrength.score < 3) {
      setError(
        "Please choose a stronger password."
      );
      return;
    }

    try {
      setChangingPassword(true);

      const {
        error: passwordError,
      } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (passwordError) {
        throw passwordError;
      }

      setPasswordForm({
        newPassword: "",
        confirmPassword: "",
      });

      setShowNewPassword(false);
      setShowConfirmPassword(false);

      setSuccessMessage(
        "Password changed successfully."
      );
    } catch (passwordError) {
      console.error(
        "Admin password update error:",
        passwordError
      );

      setError(
        passwordError?.message ||
          "Unable to change password."
      );
    } finally {
      setChangingPassword(false);
    }
  };

  /*
   * =========================================
   * LOGOUT
   * =========================================
   */

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();

      router.replace("/login");
    } catch (logoutError) {
      setError(
        logoutError?.message ||
          "Unable to logout."
      );
    }
  };

  /*
   * =========================================
   * LOADING STATE
   * =========================================
   */

  if (loading) {
    return (
      <section className="admin-profile-page">
        <div className="admin-profile-loading">
          <div className="admin-profile-spinner" />

          <p>
            Loading admin profile...
          </p>
        </div>
      </section>
    );
  }

  /*
   * =========================================
   * ERROR STATE
   * =========================================
   */

  if (error && !profile) {
    return (
      <section className="admin-profile-page">
        <div className="admin-profile-error">
          <div className="admin-profile-error-icon">
            !
          </div>

          <h1>
            Unable to load profile
          </h1>

          <p>{error}</p>

          <button
            type="button"
            onClick={() =>
              router.push("/admin")
            }
          >
            Back to Dashboard
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-profile-page">
      <div className="admin-profile-header">
        <div>
          <span className="admin-profile-eyebrow">
            ADMINISTRATION
          </span>

          <h1>My Profile</h1>

          <p>
            Manage your administrator account,
            personal information and security.
          </p>
        </div>

        <button
          type="button"
          className="admin-profile-back-button"
          onClick={() =>
            router.push("/admin")
          }
        >
          ← Dashboard
        </button>
      </div>

      {error && (
        <div className="admin-profile-alert admin-profile-alert-error">
          <strong>Something went wrong</strong>
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="admin-profile-alert admin-profile-alert-success">
          <strong>Success</strong>
          <span>{successMessage}</span>
        </div>
      )}

      <div className="admin-profile-overview-card">
        <div className="admin-profile-overview-left">
          <div className="admin-profile-avatar-large">
            {initials}
          </div>

          <div className="admin-profile-overview-content">
            <span className="admin-profile-card-label">
              ADMIN PROFILE
            </span>

            <h2>{displayName}</h2>

            <p>
              {profile?.email ||
                "Email not available"}
            </p>

            <div className="admin-profile-badges">
              <span className="admin-profile-role-badge">
                Administrator
              </span>

              <span className="admin-profile-status-badge">
                <span className="admin-profile-status-dot" />
                Active account
              </span>
            </div>
          </div>
        </div>

        <div className="admin-profile-overview-actions">
          {!editMode ? (
            <button
              type="button"
              className="admin-profile-primary-button"
              onClick={handleStartEditing}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                className="admin-profile-secondary-button"
                onClick={handleCancelEditing}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-profile-primary-button"
                onClick={handleSaveProfile}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="admin-profile-main-grid">
        <div className="admin-profile-main-column">
          <section className="admin-profile-section-card">
            <div className="admin-profile-section-heading">
              <div>
                <span className="admin-profile-section-kicker">
                  PROFILE
                </span>

                <h3>
                  Personal Information
                </h3>

                <p>
                  Keep your administrator
                  account information up to date.
                </p>
              </div>
            </div>

            {editMode ? (
              <div className="admin-profile-form-grid">
                <ProfileInput
                  label="First Name"
                  name="firstName"
                  value={
                    profileForm.firstName
                  }
                  onChange={
                    handleProfileChange
                  }
                  placeholder="Enter first name"
                />

                <ProfileInput
                  label="Last Name"
                  name="lastName"
                  value={
                    profileForm.lastName
                  }
                  onChange={
                    handleProfileChange
                  }
                  placeholder="Enter last name"
                />

                <ProfileInput
                  label="Mobile Number"
                  name="mobile"
                  value={
                    profileForm.mobile
                  }
                  onChange={
                    handleProfileChange
                  }
                  placeholder="Enter mobile number"
                />

                <ProfileInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={
                    profileForm.email
                  }
                  onChange={
                    handleProfileChange
                  }
                  placeholder="Enter email address"
                />
              </div>
            ) : (
              <div className="admin-profile-information-grid">
                <InformationItem
                  label="First Name"
                  value={
                    profile?.firstName ||
                    "Not available"
                  }
                />

                <InformationItem
                  label="Last Name"
                  value={
                    profile?.lastName ||
                    "Not available"
                  }
                />

                <InformationItem
                  label="Mobile Number"
                  value={
                    profile?.mobile ||
                    "Not available"
                  }
                />

                <InformationItem
                  label="Email Address"
                  value={
                    profile?.email ||
                    "Not available"
                  }
                />
              </div>
            )}
          </section>

          <section className="admin-profile-section-card">
            <div className="admin-profile-section-heading">
              <div>
                <span className="admin-profile-section-kicker">
                  SECURITY
                </span>

                <h3>Change Password</h3>

                <p>
                  Use a strong password to protect
                  your administrator account.
                </p>
              </div>
            </div>

            <div className="admin-profile-password-form">
              <PasswordInput
                label="New Password"
                name="newPassword"
                value={
                  passwordForm.newPassword
                }
                onChange={
                  handlePasswordChange
                }
                show={showNewPassword}
                onToggle={() =>
                  setShowNewPassword(
                    (current) => !current
                  )
                }
                placeholder="Enter new password"
              />

              <PasswordInput
                label="Confirm New Password"
                name="confirmPassword"
                value={
                  passwordForm.confirmPassword
                }
                onChange={
                  handlePasswordChange
                }
                show={
                  showConfirmPassword
                }
                onToggle={() =>
                  setShowConfirmPassword(
                    (current) => !current
                  )
                }
                placeholder="Confirm new password"
              />

              <div className="admin-profile-password-strength">
                <div className="admin-profile-strength-header">
                  <span>Password strength</span>

                  <strong>
                    {passwordStrength.label}
                  </strong>
                </div>

                <div className="admin-profile-strength-bars">
                  {[1, 2, 3, 4, 5].map(
                    (bar) => (
                      <span
                        key={bar}
                        className={
                          bar <=
                          passwordStrength.score
                            ? "filled"
                            : ""
                        }
                      />
                    )
                  )}
                </div>

                <p>
                  Use at least 8 characters with
                  uppercase, lowercase, numbers
                  and symbols.
                </p>
              </div>

              <div className="admin-profile-password-actions">
                <button
                  type="button"
                  className="admin-profile-primary-button"
                  onClick={
                    handleChangePassword
                  }
                  disabled={
                    changingPassword ||
                    !passwordForm.newPassword ||
                    !passwordForm.confirmPassword
                  }
                >
                  {changingPassword
                    ? "Updating..."
                    : "Change Password"}
                </button>
              </div>
            </div>
          </section>
        </div>

        <aside className="admin-profile-side-column">
          <section className="admin-profile-section-card">
            <div className="admin-profile-section-heading">
              <div>
                <span className="admin-profile-section-kicker">
                  ACCOUNT
                </span>

                <h3>Account Details</h3>

                <p>
                  Information about this admin
                  account.
                </p>
              </div>
            </div>

            <div className="admin-profile-account-list">
              <InformationItem
                label="Account Role"
                value="Administrator"
              />

              <InformationItem
                label="Account Status"
                value="Active"
              />

              <InformationItem
                label="Account Created"
                value={formatDate(
                  profile?.createdAt
                )}
              />

              <InformationItem
                label="Last Sign In"
                value={formatDate(
                  profile?.lastSignIn
                )}
              />
            </div>
          </section>

          <section className="admin-profile-section-card">
            <div className="admin-profile-section-heading">
              <div>
                <span className="admin-profile-section-kicker">
                  IDENTIFICATION
                </span>

                <h3>Account ID</h3>

                <p>
                  Your unique Supabase user
                  identifier.
                </p>
              </div>
            </div>

            <div className="admin-profile-id-box">
              <span>
                {profile?.id ||
                  "Not available"}
              </span>
            </div>
          </section>

          <section className="admin-profile-security-note">
            <div className="admin-profile-security-icon">
              🔐
            </div>

            <div>
              <strong>
                Administrator access
              </strong>

              <p>
                Your role is controlled by the
                account system and cannot be
                changed from this page.
              </p>
            </div>
          </section>

          <button
            type="button"
            className="admin-profile-logout-button"
            onClick={handleLogout}
          >
            <span>↪</span>
            Sign out of administrator account
          </button>
        </aside>
      </div>
    </section>
  );
}

/*
 * =========================================
 * INPUT COMPONENT
 * =========================================
 */

function ProfileInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <label className="admin-profile-input-group">
      <span>{label}</span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={
          type === "email"
            ? "email"
            : "off"
        }
      />
    </label>
  );
}

/*
 * =========================================
 * PASSWORD INPUT COMPONENT
 * =========================================
 */

function PasswordInput({
  label,
  name,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
}) {
  return (
    <label className="admin-profile-input-group">
      <span>{label}</span>

      <div className="admin-profile-password-input-wrap">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="new-password"
        />

        <button
          type="button"
          className="admin-profile-password-toggle"
          onClick={onToggle}
          aria-label={
            show
              ? "Hide password"
              : "Show password"
          }
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </label>
  );
}

/*
 * =========================================
 * INFORMATION ITEM
 * =========================================
 */

function InformationItem({
  label,
  value,
}) {
  return (
    <div className="admin-profile-information-item">
      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
}