import React from "react";

export default function NotificationEmptyState({
  title = "No notifications yet",
  subtitle = "Fresh delivery updates, milk subscriptions, and farm news will appear here.",
}) {
  return (
    <div className="notif-empty">
      <div className="notif-empty-icon" aria-hidden="true">
        🔕
      </div>
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>
  );
}