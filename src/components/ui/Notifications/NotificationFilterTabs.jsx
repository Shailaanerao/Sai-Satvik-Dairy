import React from "react";

export default function NotificationFilterTabs({ activeFilter, onSelectFilter, unreadCount }) {
  return (
    <div className="notif-tabs" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={activeFilter === "all"}
        className={`notif-tab-btn ${activeFilter === "all" ? "active" : ""}`}
        onClick={() => onSelectFilter("all")}
      >
        All
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeFilter === "unread"}
        className={`notif-tab-btn ${activeFilter === "unread" ? "active" : ""}`}
        onClick={() => onSelectFilter("unread")}
      >
        Unread ({unreadCount})
      </button>
    </div>
  );
}