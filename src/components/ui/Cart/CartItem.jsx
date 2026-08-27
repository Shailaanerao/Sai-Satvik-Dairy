import Image from "next/image";
import QuantityControl from "./QuantityControl";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="cart-item">

      {/* Product Image */}

      <div className="cart-product-image">

        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="110px"
        />

      </div>


      {/* Product Information */}

      <div className="cart-product-details">

        <span className="cart-product-category">
          {item.category}
        </span>

        <h3>
          {item.name}
        </h3>

        <p>
          Pack Size: {item.size}
        </p>

        <strong>
          ₹{item.price}
        </strong>

      </div>


      {/* Quantity */}

      <QuantityControl
        quantity={item.quantity}
        onIncrease={() =>
          onIncrease(item.id)
        }
        onDecrease={() =>
          onDecrease(item.id)
        }
      />


      {/* Total */}

      <div className="item-total">

        <strong>
          ₹{item.price * item.quantity}
        </strong>

        <button
          className="remove-item"
          onClick={() =>
            onRemove(item.id)
          }
        >
          Remove
        </button>

      </div>

    </div>
  );
}