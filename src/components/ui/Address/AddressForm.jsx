"use client";

import { useState } from "react";

export default function AddressForm({
  initialData = {},
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    phone: initialData.phone || "",
    address: initialData.address || "",
    city: initialData.city || "",
    state: initialData.state || "",
    pincode: initialData.pincode || "",
    type: initialData.type || "Home",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <h2>
        {initialData.id ? "Edit Address" : "Add New Address"}
      </h2>

      <div className="form-row">
        <div className="form-group">
          <label>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter mobile number"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Complete Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="House no., street, area"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            required
          />
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Address Type</label>

        <div className="address-types">
          {["Home", "Work", "Other"].map((type) => (
            <button
              type="button"
              key={type}
              className={
                form.type === type ? "active" : ""
              }
              onClick={() =>
                setForm({ ...form, type })
              }
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <button className="save-address-btn" type="submit">
        Save Address
      </button>
    </form>
  );
}