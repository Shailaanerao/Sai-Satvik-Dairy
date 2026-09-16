"use client";

import { useState } from "react";
import Image from "next/image";
import QuantityControl from "./QuantityControl";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const [imageSrc, setImageSrc] = useState(item.image || "/logo.jpeg");

  return (
    <div className="cart-item">
      <div className="cart-product-image">
        <Image
          src={imageSrc}
          alt={item.name || "Product"}
          fill
          sizes="110px"
          onError={() => setImageSrc("/logo.jpeg")}
        />
      </div>

      <div className="cart-product-details">
        {item.category && (
          <span className="cart-product-category">
            {item.category}
          </span>
        )}

        <h3>{item.name}</h3>

        <p>Pack Size: {item.size || "1 unit"}</p>

        <strong>₹{item.price}</strong>
      </div>

      <QuantityControl
        quantity={item.quantity}
        onIncrease={() => onIncrease(item.id)}
        onDecrease={() => onDecrease(item.id)}
      />

      <div className="item-total">
        <strong>₹{item.price * item.quantity}</strong>

        <button
          type="button"
          className="remove-item"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}