"use client";

export default function ProfileSectionCard({
  title,
  subtitle,
  action,
  children,
  className = "",
}) {
  return (
    <section className={`profile-section-card ${className}`}>
      <div className="profile-card-header">
        <div>
          <h3>{title}</h3>

          {subtitle && <p>{subtitle}</p>}
        </div>

        {action && (
          <div className="profile-card-action">
            {action}
          </div>
        )}
      </div>

      <div className="profile-card-content">
        {children}
      </div>
    </section>
  );
}