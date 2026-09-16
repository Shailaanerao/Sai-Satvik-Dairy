"use client";

export default function ProfileStatCard({
  icon,
  label,
  value,
  description,
}) {
  return (
    <div className="profile-stat-card">
      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-content">
        <span>{label}</span>

        <strong>{value}</strong>

        {description && (
          <small>{description}</small>
        )}
      </div>
    </div>
  );
}