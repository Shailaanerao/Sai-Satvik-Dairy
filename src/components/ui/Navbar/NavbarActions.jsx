"use client";

import NotificationDropdown from "../Notifications/NotificationDropdown";

import NavbarCart from "./NavbarCart";
import NavbarProfile from "./NavbarProfile";

export default function NavbarActions() {
  return (
    <div className="navbar-actions">

      {/* NOTIFICATION */}

      <div className="notification-wrapper">
        <NotificationDropdown />
      </div>

      {/* CART */}

      <NavbarCart />

      {/* PROFILE */}

      <NavbarProfile />

    </div>
  );
}