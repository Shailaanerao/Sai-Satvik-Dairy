import React from "react";

export default function NotificationBadge({ count = 0 }) {
  if (!count || count <= 0) return null;

  return (
    <span className="notification-badge-pulse" aria-label={`${count} unread notifications`}>
      {count > 99 ? "99+" : count}
    </span>
  );
}