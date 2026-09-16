"use client";

export default function AddressCard({
  type,
  name,
  address,
  phone,
  isDefault = false,
  onEdit,
  onDelete,
}) {
  return (
    <div className="address-card">
      <div className="address-top">
        <div className="address-labels">
          <span className="address-type">
            {type}
          </span>

          {isDefault && (
            <span className="default-badge">
              Default
            </span>
          )}
        </div>

        <div className="address-actions">
          <button
            type="button"
            onClick={onEdit}
          >
            Edit
          </button>

          <button
            type="button"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <h4>{name}</h4>

      <p>{address}</p>

      <span className="address-phone">
        {phone}
      </span>
    </div>
  );
}