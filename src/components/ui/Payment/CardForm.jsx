"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CardForm() {
  const router = useRouter();

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push("/payment/success");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Card Payment</h2>

      <p>Enter your card details to continue.</p>

      <input
        type="text"
        name="number"
        placeholder="Card Number"
        value={card.number}
        onChange={handleChange}
        maxLength={16}
        required
      />

      <input
        type="text"
        name="name"
        placeholder="Name on Card"
        value={card.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="expiry"
        placeholder="MM/YY"
        value={card.expiry}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="cvv"
        placeholder="CVV"
        value={card.cvv}
        onChange={handleChange}
        maxLength={3}
        required
      />

      <button type="submit">
        Pay Now
      </button>
    </form>
  );
}