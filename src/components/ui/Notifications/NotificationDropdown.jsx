"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import NotificationBadge from "./NotificationBadge";
import NotificationCard from "./NotificationCard";
import NotificationFilterTabs from "./NotificationFilterTabs";
import NotificationEmptyState from "./NotificationEmptyState";
import "./NotificationDropdown.css";

const initialNotifications = [
  {
    id: 1,
    type: "delivery",
    title: "Morning Milk Dispatched 🚚",
    message: "Your daily 1L A2 Gir Cow Milk has been bottled and dispatched for 6:30 AM delivery.",
    time: "15m ago",
    unread: true,
  },
  {
    id: 2,
    type: "subscription",
    title: "Subscription Renewed 🥛",
    message: "Your monthly 500g Vedic Bilona Ghee + 1L A2 Milk plan was renewed.",
    time: "2h ago",
    unread: true,
  },
  {
    id: 3,
    type: "offer",
    title: "Weekend Organic Paneer Deal 🎉",
    message: "Get flat ₹100 off when ordering 1kg Fresh Malai Paneer today.",
    time: "1d ago",
    unread: false,
  },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const displayedNotifications =
    filter === "unread"
      ? notifications.filter((item) => item.unread)
      : notifications;

  return (
    <div className="notif-dropdown-wrapper" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        className={`notif-trigger-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle notifications menu"
        aria-expanded={isOpen}
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        <NotificationBadge count={unreadCount} />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="notif-popover">
          {/* Header */}
          <div className="notif-popover-header">
            <div className="notif-header-title-box">
              <h3>Notifications</h3>
              {unreadCount > 0 && <span className="notif-badge-pill">{unreadCount} New</span>}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                className="notif-mark-all-btn"
                onClick={handleMarkAllRead}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Reusable Tab Filters */}
          <NotificationFilterTabs
            activeFilter={filter}
            onSelectFilter={setFilter}
            unreadCount={unreadCount}
          />

          {/* Scrollable Notifications List */}
          <div className="notif-scroll-area">
            {displayedNotifications.length === 0 ? (
              <NotificationEmptyState
                title={filter === "unread" ? "No unread alerts" : "No notifications"}
                subtitle={
                  filter === "unread"
                    ? "You are completely caught up with your deliveries."
                    : "No notifications recorded in your account yet."
                }
              />
            ) : (
              displayedNotifications.map((notif) => (
                <NotificationCard
                  key={notif.id}
                  notification={notif}
                  onMarkRead={handleMarkRead}
                />
              ))
            )}
          </div>

          {/* Popover Bottom Footer */}
          {notifications.length > 0 && (
            <div className="notif-popover-footer">
              <button
                type="button"
                className="notif-clear-btn"
                onClick={handleClearAll}
              >
                Clear all
              </button>

              <Link
                href="/subscription"
                className="notif-manage-link"
                onClick={() => setIsOpen(false)}
              >
                Delivery schedule →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}