"use client";

import { useState } from "react";

import Navbar from "@/components/ui/Navbar/Navbar";

import ProfileSectionCard from "@/components/ui/Profile/ProfileSectionCard";
import ProfileStatCard from "@/components/ui/Profile/ProfileStatCard";
import ProfileFormField from "@/components/ui/Profile/ProfileFormField";
import AddressCard from "@/components/ui/Profile/AddressCard";
import PaymentCard from "@/components/ui/Profile/PaymentCard";
import TransactionRow from "@/components/ui/Profile/TransactionRow";
import LoyaltyCard from "@/components/ui/Profile/LoyaltyCard";
import ReferralCard from "@/components/ui/Profile/ReferralCard";
import MembershipCard from "@/components/ui/Profile/MembershipCard";

import "./profile.css";

const menuItems = [
  {
    id: "profile",
    title: "My Profile",
    subtitle: "Personal information",
    icon: "👤",
  },
  {
    id: "edit",
    title: "Edit Profile",
    subtitle: "Update information",
    icon: "✎",
  },
  {
    id: "addresses",
    title: "Saved Addresses",
    subtitle: "Delivery addresses",
    icon: "⌖",
  },
  {
    id: "payments",
    title: "Saved Payments",
    subtitle: "Payment methods",
    icon: "▣",
  },
  {
    id: "wallet",
    title: "Wallet",
    subtitle: "Wallet balance",
    icon: "₹",
  },
  {
    id: "history",
    title: "Wallet History",
    subtitle: "Transactions",
    icon: "↻",
  },
  {
    id: "loyalty",
    title: "Loyalty Points",
    subtitle: "Reward points",
    icon: "★",
  },
  {
    id: "referral",
    title: "Refer & Earn",
    subtitle: "Referral rewards",
    icon: "↗",
  },
  {
    id: "membership",
    title: "Membership",
    subtitle: "Premium plans",
    icon: "♕",
  },
];

export default function ProfilePage() {
  const [activeSection, setActiveSection] =
    useState("profile");

  const [profile, setProfile] = useState({
    firstName: "Shaila",
    lastName: "Anerao",
    email: "shaila@example.com",
    phone: "+91 98765 43210",
  });

  const updateProfile = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    alert("Profile updated successfully!");
  };

  const handleCopyReferral = async () => {
    try {
      await navigator.clipboard.writeText(
        "SAI100"
      );

      alert("Referral code copied!");
    } catch {
      alert("Unable to copy referral code.");
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      /* =========================================
         MY PROFILE
      ========================================= */

      case "profile":
        return (
          <>
            <ProfilePageHeader
              title="My Profile"
              subtitle="Manage your personal information and account details."
            />

            <div className="profile-stats-grid">
              <ProfileStatCard
                icon="📦"
                label="Total Orders"
                value="24"
                description="Orders placed"
              />

              <ProfileStatCard
                icon="₹"
                label="Wallet Balance"
                value="₹1,250"
                description="Available balance"
              />

              <ProfileStatCard
                icon="★"
                label="Reward Points"
                value="2,480"
                description="Available points"
              />

              <ProfileStatCard
                icon="♕"
                label="Membership"
                value="Gold"
                description="Active member"
              />
            </div>

            <ProfileSectionCard
              title="Personal Information"
              subtitle="Your basic account details"
              action={
                <button
                  type="button"
                  className="outline-button"
                  onClick={() =>
                    setActiveSection("edit")
                  }
                >
                  Edit Profile
                </button>
              }
            >
              <div className="profile-information">
                <div className="information-item">
                  <span>Full Name</span>

                  <strong>
                    {profile.firstName}{" "}
                    {profile.lastName}
                  </strong>
                </div>

                <div className="information-item">
                  <span>Email Address</span>

                  <strong>
                    {profile.email}
                  </strong>
                </div>

                <div className="information-item">
                  <span>Phone Number</span>

                  <strong>
                    {profile.phone}
                  </strong>
                </div>
              </div>
            </ProfileSectionCard>

            <ProfileSectionCard
              title="Account Overview"
              subtitle="Quick access to your Sai Satvik account"
            >
              <div className="quick-links">
                <button
                  type="button"
                  onClick={() =>
                    setActiveSection("addresses")
                  }
                >
                  <span>⌖</span>
                  <strong>Saved Addresses</strong>
                  <small>
                    Manage delivery locations
                  </small>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveSection("payments")
                  }
                >
                  <span>▣</span>
                  <strong>Saved Payments</strong>
                  <small>
                    Manage payment methods
                  </small>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveSection("wallet")
                  }
                >
                  <span>₹</span>
                  <strong>Wallet</strong>
                  <small>
                    View wallet balance
                  </small>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveSection("membership")
                  }
                >
                  <span>♕</span>
                  <strong>Membership</strong>
                  <small>
                    View membership benefits
                  </small>
                </button>
              </div>
            </ProfileSectionCard>
          </>
        );

      /* =========================================
         EDIT PROFILE
      ========================================= */

      case "edit":
        return (
          <>
            <ProfilePageHeader
              title="Edit Profile"
              subtitle="Update your personal information."
            />

            <ProfileSectionCard
              title="Personal Details"
              subtitle="Keep your account information up to date."
            >
              <div className="profile-form-grid">
                <ProfileFormField
                  label="First Name"
                  value={profile.firstName}
                  onChange={(event) =>
                    updateProfile(
                      "firstName",
                      event.target.value
                    )
                  }
                />

                <ProfileFormField
                  label="Last Name"
                  value={profile.lastName}
                  onChange={(event) =>
                    updateProfile(
                      "lastName",
                      event.target.value
                    )
                  }
                />

                <ProfileFormField
                  label="Email Address"
                  type="email"
                  value={profile.email}
                  onChange={(event) =>
                    updateProfile(
                      "email",
                      event.target.value
                    )
                  }
                />

                <ProfileFormField
                  label="Phone Number"
                  value={profile.phone}
                  onChange={(event) =>
                    updateProfile(
                      "phone",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="primary-button"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </button>
              </div>
            </ProfileSectionCard>
          </>
        );

      /* =========================================
         ADDRESSES
      ========================================= */

      case "addresses":
        return (
          <>
            <ProfilePageHeader
              title="Saved Addresses"
              subtitle="Manage your delivery addresses."
            />

            <ProfileSectionCard
              title="Address Book"
              subtitle="Your saved delivery locations."
              action={
                <button
                  type="button"
                  className="primary-button small"
                  onClick={() =>
                    alert("Add Address feature coming soon.")
                  }
                >
                  + Add Address
                </button>
              }
            >
              <div className="addresses-grid">
                <AddressCard
                  type="HOME"
                  name="Shaila Anerao"
                  address="Pimpri, Pune, Maharashtra"
                  phone="+91 98765 43210"
                  isDefault
                  onEdit={() =>
                    alert("Edit address")
                  }
                  onDelete={() =>
                    alert("Delete address")
                  }
                />

                <AddressCard
                  type="WORK"
                  name="Shaila Anerao"
                  address="Pune, Maharashtra"
                  phone="+91 98765 43210"
                  onEdit={() =>
                    alert("Edit address")
                  }
                  onDelete={() =>
                    alert("Delete address")
                  }
                />
              </div>
            </ProfileSectionCard>
          </>
        );

      /* =========================================
         PAYMENTS
      ========================================= */

      case "payments":
        return (
          <>
            <ProfilePageHeader
              title="Saved Payments"
              subtitle="Manage your saved payment methods."
            />

            <ProfileSectionCard
              title="Payment Methods"
              subtitle="Your saved payment options."
              action={
                <button
                  type="button"
                  className="primary-button small"
                  onClick={() =>
                    alert(
                      "Add Payment feature coming soon."
                    )
                  }
                >
                  + Add Payment
                </button>
              }
            >
              <div className="payments-list">
                <PaymentCard
                  type="UPI"
                  number="shaila@upi"
                  isDefault
                  onRemove={() =>
                    alert("Remove payment method")
                  }
                />

                <PaymentCard
                  type="Visa Card"
                  number="•••• •••• •••• 4521"
                  expiry="08/29"
                  onRemove={() =>
                    alert("Remove payment method")
                  }
                />
              </div>
            </ProfileSectionCard>
          </>
        );

      /* =========================================
         WALLET
      ========================================= */

      case "wallet":
        return (
          <>
            <ProfilePageHeader
              title="Wallet"
              subtitle="Manage your Sai Satvik wallet balance."
            />

            <div className="wallet-main-card">
              <div>
                <span>Available Balance</span>

                <h2>₹1,250</h2>

                <p>
                  Use your wallet balance while
                  placing an order.
                </p>
              </div>

              <div className="wallet-icon">
                ₹
              </div>
            </div>

            <div className="profile-stats-grid">
              <ProfileStatCard
                icon="+"
                label="Money Added"
                value="₹5,000"
                description="Total added"
              />

              <ProfileStatCard
                icon="−"
                label="Money Used"
                value="₹3,750"
                description="Total spent"
              />
            </div>
          </>
        );

      /* =========================================
         WALLET HISTORY
      ========================================= */

      case "history":
        return (
          <>
            <ProfilePageHeader
              title="Wallet History"
              subtitle="View your wallet transactions."
            />

            <ProfileSectionCard
              title="Recent Transactions"
              subtitle="Your wallet activity"
            >
              <div className="transactions-list">
                <TransactionRow
                  title="Wallet Added"
                  date="02 Sep 2026"
                  amount="500"
                  type="credit"
                />

                <TransactionRow
                  title="Order Payment"
                  date="29 Aug 2026"
                  amount="350"
                  type="debit"
                />

                <TransactionRow
                  title="Wallet Added"
                  date="20 Aug 2026"
                  amount="1,000"
                  type="credit"
                />

                <TransactionRow
                  title="Order Payment"
                  date="15 Aug 2026"
                  amount="650"
                  type="debit"
                />
              </div>
            </ProfileSectionCard>
          </>
        );

      /* =========================================
         LOYALTY
      ========================================= */

      case "loyalty":
        return (
          <>
            <ProfilePageHeader
              title="Loyalty Points"
              subtitle="Earn points and enjoy exclusive rewards."
            />

            <LoyaltyCard
              points="2,480"
              nextLevel="520"
              progress={83}
            />

            <ProfileSectionCard
              title="How to Earn Points"
              subtitle="Simple ways to earn more rewards."
            >
              <div className="earn-points-grid">
                <ProfileStatCard
                  icon="🛒"
                  label="Place an Order"
                  value="+10"
                  description="points per ₹100"
                />

                <ProfileStatCard
                  icon="★"
                  label="Write a Review"
                  value="+50"
                  description="points per review"
                />

                <ProfileStatCard
                  icon="↗"
                  label="Refer a Friend"
                  value="+100"
                  description="bonus points"
                />
              </div>
            </ProfileSectionCard>
          </>
        );

      /* =========================================
         REFERRAL
      ========================================= */

      case "referral":
        return (
          <>
            <ProfilePageHeader
              title="Refer & Earn"
              subtitle="Share Sai Satvik with your friends and earn rewards."
            />

            <ReferralCard
              referralCode="SAI100"
              referrals="8"
              reward="800"
              onCopy={handleCopyReferral}
            />
          </>
        );

      /* =========================================
         MEMBERSHIP
      ========================================= */

      case "membership":
        return (
          <>
            <ProfilePageHeader
              title="Membership"
              subtitle="Choose the membership plan that suits you."
            />

            <div className="membership-grid">
              <MembershipCard
                name="Silver"
                price="499"
                features={[
                  "5% cashback",
                  "Birthday reward",
                  "Member-only offers",
                  "Priority support",
                ]}
                current={false}
                onSelect={() =>
                  alert("Silver selected")
                }
              />

              <MembershipCard
                name="Gold"
                price="999"
                features={[
                  "10% cashback",
                  "Free delivery",
                  "Birthday reward",
                  "Exclusive offers",
                  "Priority support",
                ]}
                current
                onSelect={() => {}}
              />

              <MembershipCard
                name="Platinum"
                price="1,999"
                features={[
                  "15% cashback",
                  "Free delivery",
                  "Premium rewards",
                  "Exclusive offers",
                  "Early access",
                  "Priority support",
                ]}
                current={false}
                onSelect={() =>
                  alert("Platinum selected")
                }
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">

        {/* =====================================
            PROFILE SIDEBAR
        ===================================== */}

        <aside className="profile-sidebar">

          <div className="profile-user-mini">
            <div className="profile-avatar">
              SA
            </div>

            <div>
              <strong>
                {profile.firstName}{" "}
                {profile.lastName}
              </strong>

              <span>My Account</span>
            </div>
          </div>

          <nav className="profile-navigation">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`profile-menu-item ${
                  activeSection === item.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveSection(item.id)
                }
              >
                <span className="menu-icon">
                  {item.icon}
                </span>

                <span className="menu-text">
                  <strong>
                    {item.title}
                  </strong>

                  <small>
                    {item.subtitle}
                  </small>
                </span>

                <span className="menu-arrow">
                  →
                </span>
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="logout-button"
            onClick={() =>
              alert("Logout functionality coming soon.")
            }
          >
            <span>↪</span>
            Logout
          </button>
        </aside>

        {/* =====================================
            PROFILE CONTENT
        ===================================== */}

        <main className="profile-main">
          {renderSection()}
        </main>
      </div>
    </>
  );
}


/* =========================================
   PROFILE PAGE HEADER
   Kept inside page.js so we don't need
   another ProfileHeader.jsx file.
========================================= */

function ProfilePageHeader({
  title,
  subtitle,
}) {
  return (
    <div className="profile-header">
      <span className="profile-eyebrow">
        MY ACCOUNT
      </span>

      <h1>{title}</h1>

      <p>{subtitle}</p>
    </div>
  );
}