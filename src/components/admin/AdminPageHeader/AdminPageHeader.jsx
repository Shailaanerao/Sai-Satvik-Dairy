export default function AdminPageHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="admin-page-header">
      <div>
        <h1>{title}</h1>

        {description && (
          <p>{description}</p>
        )}
      </div>

      {action && (
        <div className="admin-page-header-action">
          {action}
        </div>
      )}
    </div>
  );
}