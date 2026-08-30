"use client";

export default function DeliverySlot({
  slots,
  selectedSlot,
  onSelect,
}) {
  return (
    <div className="delivery-slot-box">
      <h2>Choose Delivery Slot</h2>

      <p className="slot-description">
        Select a convenient time for your delivery.
      </p>

      <div className="slot-grid">
        {slots.map((slot) => (
          <button
            key={slot.id}
            className={
              selectedSlot === slot.id
                ? "delivery-slot selected"
                : "delivery-slot"
            }
            onClick={() => onSelect(slot.id)}
          >
            <strong>{slot.date}</strong>
            <span>{slot.time}</span>
          </button>
        ))}
      </div>
    </div>
  );
}