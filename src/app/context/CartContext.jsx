"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sai_satvik_cart");
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "sai_satvik_cart",
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems]);

  // ADD TO CART
  const addToCart = (product) => {
    if (!product || !product.id) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Convert price to number safely
      const numericPrice =
        typeof product.price === "number"
          ? product.price
          : Number(
              String(product.price)
                .replace(/₹/g, "")
                .replace(/,/g, "")
                .replace(/\/.*$/, "")
                .trim()
            ) || 0;

      // Extract size/unit if provided or from string price (e.g. ₹65 / L)
      const parsedSize =
        product.size ||
        (typeof product.price === "string" && product.price.includes("/")
          ? product.price.split("/")[1].trim()
          : "1 unit");

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: numericPrice,
          size: parsedSize,
          image: product.image || "/logo.jpeg",
          quantity: 1,
        },
      ];
    });
  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE ITEM
  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // CLEAR ENTIRE CART
  const clearCart = () => {
    setCartItems([]);
  };

  // TOTAL QUANTITY
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // SUBTOTAL
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * item.quantity,
    0
  );

  // DELIVERY & DISCOUNT RULES
  const deliveryFee = subtotal === 0 || subtotal >= 500 ? 0 : 40;
  const discount = subtotal >= 1000 ? 100 : 0;
  const totalAmount = subtotal + deliveryFee - discount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
        totalQuantity,
        subtotal,
        deliveryFee,
        discount,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}