export default function AddressCard({
  address,
  selected,
  onSelect,
  onEdit,
}) {
  return (
    <div
      className={`address-card ${selected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <div className="address-card-top">
        <label>
          <input
            type="radio"
            checked={selected}
            onChange={onSelect}
          />

          <strong>{address.type}</strong>
        </label>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Edit
        </button>
      </div>

      <h3>{address.name}</h3>

      <p>{address.phone}</p>

      <p className="address-text">
        {address.address}, {address.city}, {address.state} -{" "}
        {address.pincode}
      </p>
    </div>
  );
}