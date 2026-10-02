"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import ProfileSectionCard from "@/components/ui/Profile/ProfileSectionCard";
import ProfileStatCard from "@/components/ui/Profile/ProfileStatCard";
import ProfileFormField from "@/components/ui/Profile/ProfileFormField";
import AddressCard from "@/components/ui/Profile/AddressCard";
import PaymentCard from "@/components/ui/Profile/PaymentCard";
import TransactionRow from "@/components/ui/Profile/TransactionRow";
import LoyaltyCard from "@/components/ui/Profile/LoyaltyCard";
import ReferralCard from "@/components/ui/Profile/ReferralCard";
import MembershipCard from "@/components/ui/Profile/MembershipCard";

import useAuth from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";

import {
  get,
  post,
  put,
  patch,
  remove,
} from "@/lib/api";

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
  const router = useRouter();

  const [activeSection, setActiveSection] =
    useState("profile");

  const {
    user,
    logout,
    isAuthenticated,
  } = useAuth();

  const {
    profile: apiProfile,
    loading,
    error,
    fetchProfile,
    updateProfile: saveProfile,
  } = useProfile();

  const [profileForm, setProfileForm] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });

  const [addresses, setAddresses] =
    useState([]);

  const [
    addressLoading,
    setAddressLoading,
  ] = useState(false);

  const [
    addressSaving,
    setAddressSaving,
  ] = useState(false);

  const [
    addressError,
    setAddressError,
  ] = useState("");

  const [
    showAddressForm,
    setShowAddressForm,
  ] = useState(false);

  const [
    editingAddressId,
    setEditingAddressId,
  ] = useState(null);

  const [
    addressForm,
    setAddressForm,
  ] = useState({
    type: "home",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  /*
   * =========================================
   * LOAD PROFILE
   * =========================================
   */

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [
    isAuthenticated,
    fetchProfile,
  ]);

  /*
   * =========================================
   * SET PROFILE DATA
   * =========================================
   */

  useEffect(() => {
    const currentProfile =
      apiProfile || user;

    if (!currentProfile) {
      return;
    }

    let firstName =
      currentProfile.firstName || "";

    let lastName =
      currentProfile.lastName || "";

    /*
     * If backend gives only:
     *
     * name: "Shruti Anerao"
     *
     * split it into first/last name.
     */

    if (
      !firstName &&
      currentProfile.name
    ) {
      const nameParts =
        currentProfile.name
          .trim()
          .split(/\s+/);

      firstName =
        nameParts[0] || "";

      lastName =
        nameParts
          .slice(1)
          .join(" ");
    }

    const nextProfileForm = {
      firstName,
      lastName,
      email:
        currentProfile.email || "",
      phone:
        currentProfile.phone ||
        currentProfile.mobile ||
        "",
    };

    const updateForm = () => {
      setProfileForm((previous) => {
        if (
          previous.firstName ===
            nextProfileForm.firstName &&
          previous.lastName ===
            nextProfileForm.lastName &&
          previous.email ===
            nextProfileForm.email &&
          previous.phone ===
            nextProfileForm.phone
        ) {
          return previous;
        }

        return nextProfileForm;
      });
    };

    const timeoutId =
      setTimeout(updateForm, 0);

    return () =>
      clearTimeout(timeoutId);
  }, [apiProfile, user]);

  /*
   * =========================================
   * LOAD ADDRESSES
   * =========================================
   */

  const loadAddresses =
    useCallback(async () => {
      try {
        setAddressLoading(true);
        setAddressError("");

        const response =
          await get("/addresses");

        setAddresses(
          Array.isArray(
            response?.addresses
          )
            ? response.addresses
            : []
        );
      } catch (requestError) {
        console.error(
          "Load addresses error:",
          requestError
        );

        setAddressError(
          requestError?.message ||
            "Failed to load addresses."
        );
      } finally {
        setAddressLoading(false);
      }
    }, []);

  /*
   * =========================================
   * LOAD ADDRESSES WHEN AUTHENTICATED
   * =========================================
   */

  useEffect(() => {
  if (!isAuthenticated) {
    return;
  }

  const timeoutId = setTimeout(() => {
    loadAddresses();
  }, 0);

  return () => {
    clearTimeout(timeoutId);
  };
}, [
  isAuthenticated,
  loadAddresses,
]);

  /*
   * =========================================
   * UPDATE PROFILE FORM
   * =========================================
   */

  const updateProfile = (
    field,
    value
  ) => {
    setProfileForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
   * =========================================
   * SAVE PROFILE
   * =========================================
   */

  const handleSaveProfile =
    async () => {
      try {
        await saveProfile(
          profileForm
        );

        alert(
          "Profile updated successfully!"
        );

        setActiveSection(
          "profile"
        );
      } catch (err) {
        alert(
          err?.message ||
            "Unable to update profile."
        );
      }
    };

  /*
   * =========================================
   * ADDRESS FORM
   * =========================================
   */

  const resetAddressForm =
    () => {
      setEditingAddressId(null);

      setAddressForm({
        type: "home",
        name: fullName || "",
        phone:
          profileForm.phone || "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        isDefault:
          addresses.length === 0,
      });

      setShowAddressForm(
        false
      );
    };

  const openAddressForm =
    () => {
      setEditingAddressId(null);

      setAddressForm({
        type: "home",
        name: fullName || "",
        phone:
          profileForm.phone || "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        isDefault:
          addresses.length === 0,
      });

      setAddressError("");
      setShowAddressForm(true);
    };

  const handleAddressChange =
    (
      field,
      value
    ) => {
      setAddressForm(
        (previous) => ({
          ...previous,
          [field]: value,
        })
      );
    };

  const handleEditAddress =
    (address) => {
      setEditingAddressId(
        address.id
      );

      setAddressForm({
        type:
          address.type ||
          "home",
        name:
          address.name || "",
        phone:
          address.phone || "",
        address:
          address.address || "",
        city:
          address.city || "",
        state:
          address.state || "",
        pincode:
          address.pincode || "",
        isDefault:
          Boolean(
            address.is_default
          ),
      });

      setAddressError("");
      setShowAddressForm(true);
    };

  const handleSaveAddress =
    async () => {
      try {
        setAddressSaving(true);
        setAddressError("");

        const payload = {
          type: addressForm.type,
          name:
            addressForm.name.trim(),
          phone:
            addressForm.phone.trim(),
          address:
            addressForm.address.trim(),
          city:
            addressForm.city.trim(),
          state:
            addressForm.state.trim(),
          pincode:
            addressForm.pincode.trim(),
          isDefault:
            addressForm.isDefault,
        };

        if (
          !payload.name ||
          !payload.phone ||
          !payload.address ||
          !payload.city ||
          !payload.state ||
          !payload.pincode
        ) {
          setAddressError(
            "Please fill in all address fields."
          );

          return;
        }

        if (editingAddressId) {
          await put(
            `/addresses/${editingAddressId}`,
            payload
          );
        } else {
          await post(
            "/addresses",
            payload
          );
        }

        await loadAddresses();

        setEditingAddressId(null);
        setShowAddressForm(false);

        setAddressForm({
          type: "home",
          name:
            fullName || "",
          phone:
            profileForm.phone || "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          isDefault: false,
        });
      } catch (requestError) {
        console.error(
          "Save address error:",
          requestError
        );

        setAddressError(
          requestError?.message ||
            "Failed to save address."
        );
      } finally {
        setAddressSaving(false);
      }
    };

  const handleDeleteAddress =
    async (addressId) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this address?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setAddressError("");

        await remove(
          `/addresses/${addressId}`
        );

        await loadAddresses();
      } catch (requestError) {
        console.error(
          "Delete address error:",
          requestError
        );

        setAddressError(
          requestError?.message ||
            "Failed to delete address."
        );
      }
    };

  const handleSetDefaultAddress =
    async (addressId) => {
      try {
        setAddressError("");

        await patch(
          `/addresses/${addressId}/default`
        );

        await loadAddresses();
      } catch (requestError) {
        console.error(
          "Set default address error:",
          requestError
        );

        setAddressError(
          requestError?.message ||
            "Failed to set default address."
        );
      }
    };

  /*
   * =========================================
   * COPY REFERRAL
   * =========================================
   */

  const handleCopyReferral =
    async () => {
      try {
        await navigator.clipboard.writeText(
          "SAI100"
        );

        alert(
          "Referral code copied!"
        );
      } catch {
        alert(
          "Unable to copy referral code."
        );
      }
    };

  /*
   * =========================================
   * LOGOUT
   * =========================================
   */

  const handleLogout =
    async () => {
      try {
        await logout();

        router.replace(
          "/home"
        );
      } catch (err) {
        alert(
          err?.message ||
            "Unable to logout."
        );
      }
    };

  /*
   * =========================================
   * FULL NAME
   * =========================================
   */

  const fullName =
    `${profileForm.firstName} ${profileForm.lastName}`.trim();

  /*
   * =========================================
   * INITIALS
   * =========================================
   */

  const initials =
    `${profileForm.firstName?.[0] || ""}${
      profileForm.lastName?.[0] || ""
    }`.toUpperCase() || "U";

  /*
   * =========================================
   * LOADING
   * =========================================
   */

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-main">
          <div className="profile-header">
            <span className="profile-eyebrow">
              MY ACCOUNT
            </span>

            <h1>
              Loading Profile...
            </h1>

            <p>
              Please wait while we load
              your account information.
            </p>
          </div>
        </div>
      </main>
    );
  }

  /*
   * =========================================
   * PROFILE SECTIONS
   * =========================================
   */

  const renderSection = () => {
    switch (activeSection) {
      /*
       * =====================================
       * MY PROFILE
       * =====================================
       */

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
                    setActiveSection(
                      "edit"
                    )
                  }
                >
                  Edit Profile
                </button>
              }
            >
              <div className="profile-information">
                <div className="information-item">
                  <span>
                    Full Name
                  </span>

                  <strong>
                    {fullName ||
                      "Not available"}
                  </strong>
                </div>

                <div className="information-item">
                  <span>
                    Email Address
                  </span>

                  <strong>
                    {profileForm.email ||
                      "Not available"}
                  </strong>
                </div>

                <div className="information-item">
                  <span>
                    Phone Number
                  </span>

                  <strong>
                    {profileForm.phone ||
                      "Not available"}
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
                    setActiveSection(
                      "addresses"
                    )
                  }
                >
                  <span>⌖</span>

                  <strong>
                    Saved Addresses
                  </strong>

                  <small>
                    Manage delivery
                    locations
                  </small>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveSection(
                      "payments"
                    )
                  }
                >
                  <span>▣</span>

                  <strong>
                    Saved Payments
                  </strong>

                  <small>
                    Manage payment
                    methods
                  </small>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveSection(
                      "wallet"
                    )
                  }
                >
                  <span>₹</span>

                  <strong>
                    Wallet
                  </strong>

                  <small>
                    View wallet
                    balance
                  </small>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveSection(
                      "membership"
                    )
                  }
                >
                  <span>♕</span>

                  <strong>
                    Membership
                  </strong>

                  <small>
                    View membership
                    benefits
                  </small>
                </button>
              </div>
            </ProfileSectionCard>
          </>
        );

      /*
       * =====================================
       * EDIT PROFILE
       * =====================================
       */

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
                  value={
                    profileForm.firstName
                  }
                  onChange={(event) =>
                    updateProfile(
                      "firstName",
                      event.target.value
                    )
                  }
                />

                <ProfileFormField
                  label="Last Name"
                  value={
                    profileForm.lastName
                  }
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
                  value={
                    profileForm.email
                  }
                  onChange={(event) =>
                    updateProfile(
                      "email",
                      event.target.value
                    )
                  }
                />

                <ProfileFormField
                  label="Phone Number"
                  value={
                    profileForm.phone
                  }
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
                  onClick={
                    handleSaveProfile
                  }
                >
                  Save Changes
                </button>
              </div>
            </ProfileSectionCard>
          </>
        );

      /*
       * =====================================
       * ADDRESSES
       * =====================================
       */

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
                  onClick={
                    openAddressForm
                  }
                >
                  + Add Address
                </button>
              }
            >
              {addressError && (
                <div
                  style={{
                    marginBottom:
                      "20px",
                    padding:
                      "12px 16px",
                    borderRadius:
                      "8px",
                    background:
                      "#fff4f4",
                    color: "#a33",
                    fontSize:
                      "14px",
                  }}
                >
                  {addressError}
                </div>
              )}

              {addressLoading ? (
                <div
                  style={{
                    padding:
                      "30px 10px",
                    textAlign:
                      "center",
                    color:
                      "#666",
                  }}
                >
                  Loading saved
                  addresses...
                </div>
              ) : addresses.length ===
                0 ? (
                <div
                  style={{
                    padding:
                      "30px 10px",
                    textAlign:
                      "center",
                    color:
                      "#666",
                  }}
                >
                  <p>
                    You have no
                    saved addresses
                    yet.
                  </p>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={
                      openAddressForm
                    }
                  >
                    Add Your First
                    Address
                  </button>
                </div>
              ) : (
                <div className="addresses-grid">
                  {addresses.map(
                    (address) => (
                      <div
                        key={
                          address.id
                        }
                        style={{
                          display:
                            "flex",
                          flexDirection:
                            "column",
                          gap:
                            "12px",
                        }}
                      >
                        <AddressCard
                          type={
                            address.type
                              ?.toUpperCase() ||
                            "HOME"
                          }
                          name={
                            address.name
                          }
                          address={`${address.address}, ${address.city}, ${address.state} - ${address.pincode}`}
                          phone={
                            address.phone
                          }
                          isDefault={
                            Boolean(
                              address.is_default
                            )
                          }
                          onEdit={() =>
                            handleEditAddress(
                              address
                            )
                          }
                          onDelete={() =>
                            handleDeleteAddress(
                              address.id
                            )
                          }
                        />

                        {!address.is_default && (
                          <button
                            type="button"
                            className="outline-button small"
                            onClick={() =>
                              handleSetDefaultAddress(
                                address.id
                              )
                            }
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}

              {showAddressForm && (
                <div
                  style={{
                    marginTop:
                      "30px",
                    padding:
                      "24px",
                    border:
                      "1px solid #e5e5e5",
                    borderRadius:
                      "10px",
                  }}
                >
                  <div
                    style={{
                      marginBottom:
                        "20px",
                    }}
                  >
                    <h3
                      style={{
                        margin:
                          "0 0 6px",
                      }}
                    >
                      {editingAddressId
                        ? "Edit Address"
                        : "Add Address"}
                    </h3>

                    <p
                      style={{
                        margin:
                          0,
                        color:
                          "#666",
                        fontSize:
                          "14px",
                      }}
                    >
                      Enter your
                      delivery
                      address
                      details.
                    </p>
                  </div>

                  <div
                    className="profile-form-grid"
                  >
                    <div>
                      <label
                        style={{
                          display:
                            "block",
                          marginBottom:
                            "8px",
                          fontSize:
                            "14px",
                          fontWeight:
                            "600",
                        }}
                      >
                        Address Type
                      </label>

                      <select
                        value={
                          addressForm.type
                        }
                        onChange={(
                          event
                        ) =>
                          handleAddressChange(
                            "type",
                            event
                              .target
                              .value
                          )
                        }
                        style={{
                          width:
                            "100%",
                          minHeight:
                            "44px",
                          padding:
                            "0 12px",
                          border:
                            "1px solid #d9d9d9",
                          borderRadius:
                            "8px",
                          background:
                            "#fff",
                          fontSize:
                            "14px",
                        }}
                      >
                        <option value="home">
                          Home
                        </option>

                        <option value="work">
                          Work
                        </option>

                        <option value="other">
                          Other
                        </option>
                      </select>
                    </div>

                    <ProfileFormField
                      label="Full Name"
                      value={
                        addressForm.name
                      }
                      onChange={(
                        event
                      ) =>
                        handleAddressChange(
                          "name",
                          event
                            .target
                            .value
                        )
                      }
                    />

                    <ProfileFormField
                      label="Phone Number"
                      value={
                        addressForm.phone
                      }
                      onChange={(
                        event
                      ) =>
                        handleAddressChange(
                          "phone",
                          event
                            .target
                            .value
                        )
                      }
                    />

                    <ProfileFormField
                      label="Address"
                      value={
                        addressForm.address
                      }
                      onChange={(
                        event
                      ) =>
                        handleAddressChange(
                          "address",
                          event
                            .target
                            .value
                        )
                      }
                    />

                    <ProfileFormField
                      label="City"
                      value={
                        addressForm.city
                      }
                      onChange={(
                        event
                      ) =>
                        handleAddressChange(
                          "city",
                          event
                            .target
                            .value
                        )
                      }
                    />

                    <ProfileFormField
                      label="State"
                      value={
                        addressForm.state
                      }
                      onChange={(
                        event
                      ) =>
                        handleAddressChange(
                          "state",
                          event
                            .target
                            .value
                        )
                      }
                    />

                    <ProfileFormField
                      label="Pincode"
                      value={
                        addressForm.pincode
                      }
                      onChange={(
                        event
                      ) =>
                        handleAddressChange(
                          "pincode",
                          event
                            .target
                            .value
                        )
                      }
                    />
                  </div>

                  <label
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap:
                        "8px",
                      marginTop:
                        "20px",
                      cursor:
                        "pointer",
                      fontSize:
                        "14px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        addressForm.isDefault
                      }
                      onChange={(
                        event
                      ) =>
                        handleAddressChange(
                          "isDefault",
                          event
                            .target
                            .checked
                        )
                      }
                    />

                    <span>
                      Set as default
                      address
                    </span>
                  </label>

                  <div
                    className="form-actions"
                    style={{
                      marginTop:
                        "20px",
                    }}
                  >
                    <button
                      type="button"
                      className="primary-button"
                      onClick={
                        handleSaveAddress
                      }
                      disabled={
                        addressSaving
                      }
                    >
                      {addressSaving
                        ? "Saving..."
                        : editingAddressId
                        ? "Update Address"
                        : "Save Address"}
                    </button>

                    <button
                      type="button"
                      className="outline-button"
                      onClick={
                        resetAddressForm
                      }
                      disabled={
                        addressSaving
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </ProfileSectionCard>
          </>
        );

      /*
       * =====================================
       * PAYMENTS
       * =====================================
       */

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
                  number="@upi"
                  isDefault
                  onRemove={() =>
                    alert(
                      "Remove payment method"
                    )
                  }
                />

                <PaymentCard
                  type="Visa Card"
                  number="•••• •••• •••• 4521"
                  expiry="08/29"
                  onRemove={() =>
                    alert(
                      "Remove payment method"
                    )
                  }
                />
              </div>
            </ProfileSectionCard>
          </>
        );

      /*
       * =====================================
       * WALLET
       * =====================================
       */

      case "wallet":
        return (
          <>
            <ProfilePageHeader
              title="Wallet"
              subtitle="Manage your Sai Satvik wallet balance."
            />

            <div className="wallet-main-card">
              <div>
                <span>
                  Available Balance
                </span>

                <h2>
                  ₹1,250
                </h2>

                <p>
                  Use your wallet balance
                  while placing an order.
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

      /*
       * =====================================
       * WALLET HISTORY
       * =====================================
       */

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

      /*
       * =====================================
       * LOYALTY
       * =====================================
       */

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

      /*
       * =====================================
       * REFERRAL
       * =====================================
       */

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
              onCopy={
                handleCopyReferral
              }
            />
          </>
        );

      /*
       * =====================================
       * MEMBERSHIP
       * =====================================
       */

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
                  alert(
                    "Silver selected"
                  )
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
                  alert(
                    "Platinum selected"
                  )
                }
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  /*
   * =========================================
   * MAIN PAGE
   * =========================================
   */

  return (
    <div className="profile-page">
      <aside className="profile-sidebar">
        <div className="profile-user-mini">
          <div className="profile-avatar">
            {initials}
          </div>

          <div>
            <strong>
              {fullName ||
                "My Account"}
            </strong>

            <span>
              {profileForm.email ||
                "My Account"}
            </span>
          </div>
        </div>

        <nav className="profile-navigation">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`profile-menu-item ${
                activeSection ===
                item.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveSection(
                  item.id
                )
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
          onClick={
            handleLogout
          }
        >
          <span>↪</span>
          Logout
        </button>
      </aside>

      <main className="profile-main">
        {error && (
          <div
            style={{
              marginBottom:
                "20px",
              padding:
                "12px 16px",
              borderRadius:
                "8px",
              background:
                "#fff4f4",
              color: "#a33",
              fontSize:
                "14px",
            }}
          >
            Unable to load the latest
            profile data. Your available
            account information is being
            shown.
          </div>
        )}

        {renderSection()}
      </main>
    </div>
  );
}

/*
 * =========================================
 * PROFILE PAGE HEADER
 * =========================================
 */

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