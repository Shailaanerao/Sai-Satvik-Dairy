import React from "react";

export default function NotificationCard({ notification, onMarkRead }) {
  const getIcon = (type) => {
    switch (type) {
      case "delivery":
        return "🚚";
      case "subscription":
        return "🥛";
      case "offer":
        return "🏷️";
      default:
        return "🔔";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onMarkRead(notification.id);
    }
  };

  return (
    <div
      className={`notif-card ${notification.unread ? "unread" : ""}`}
      onClick={() => onMarkRead(notification.id)}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${notification.title} - ${notification.time}`}
    >
      <div className="notif-icon-circle">{getIcon(notification.type)}</div>

      <div className="notif-info">
        <div className="notif-header-line">
          <h5 className="notif-title">{notification.title}</h5>
          <span className="notif-time">{notification.time}</span>
        </div>
        <p className="notif-message">{notification.message}</p>
      </div>

      {notification.unread && <span className="notif-unread-dot" aria-hidden="true" />}
    </div>
  );
}