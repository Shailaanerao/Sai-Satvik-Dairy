"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "sai_satvik_cart";
const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 40;
const AUTO_DISCOUNT_THRESHOLD = 1000;
const AUTO_DISCOUNT_AMOUNT = 100;

const couponRules = {
  SAI10: {
    type: "percentage",
    value: 10,
  },
  FRESH20: {
    type: "percentage",
    value: 20,
  },
  DAIRY100: {
    type: "fixed",
    value: 100,
  },
};

function getCouponDiscount(code, subtotal) {
  const rule = couponRules[code];

  if (!rule || subtotal <= 0) {
    return 0;
  }

  if (rule.type === "fixed") {
    return Math.min(rule.value, subtotal);
  }

  return Math.round((subtotal * rule.value) / 100);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems, hasHydrated]);

  const addToCart = (product, quantity = 1) => {
    if (!product?.id) {
      return;
    }

    const safeQuantity = Math.max(1, Number(quantity) || 1);

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        return currentItems.map((item) =>
          String(item.id) === String(product.id)
            ? {
                ...item,
                quantity: item.quantity + safeQuantity,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          categorySlug: product.categorySlug,
          price: Number(product.price) || 0,
          size: product.unit || product.size || "1 unit",
          image: product.image || product.images?.[0] || "/logo.jpeg",
          quantity: safeQuantity,
        },
      ];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        String(item.id) === String(id)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items
        .map((item) =>
          String(item.id) === String(id)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((items) =>
      items.filter((item) => String(item.id) !== String(id))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponCode(null);
  };

  const applyCoupon = (code) => {
    const normalizedCode = String(code || "").trim().toUpperCase();

    if (!couponRules[normalizedCode]) {
      return {
        success: false,
        message: "Invalid coupon code.",
      };
    }

    setCouponCode(normalizedCode);

    return {
      success: true,
      message: `Coupon ${normalizedCode} applied successfully!`,
    };
  };

  const removeCoupon = () => {
    setCouponCode(null);
  };

  const totals = useMemo(() => {
    const totalQuantity = cartItems.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0
    );

    const subtotal = cartItems.reduce(
      (total, item) =>
        total + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

    const deliveryFee =
      subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD
        ? 0
        : DELIVERY_FEE;

    const automaticDiscount =
      subtotal >= AUTO_DISCOUNT_THRESHOLD ? AUTO_DISCOUNT_AMOUNT : 0;

    const couponDiscount = getCouponDiscount(couponCode, subtotal);

    // Retains the existing automatic discount while preventing two discounts
    // from being stacked on the same static order.
    const discount = Math.max(automaticDiscount, couponDiscount);

    const totalAmount = Math.max(0, subtotal + deliveryFee - discount);

    return {
      totalQuantity,
      subtotal,
      deliveryFee,
      automaticDiscount,
      couponDiscount,
      discount,
      totalAmount,
    };
  }, [cartItems, couponCode]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        couponCode,
        hasHydrated,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon,
        ...totals,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
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