"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

const CartContext = createContext(null);

const CART_STORAGE_PREFIX =
  "sai_satvik_cart_";

const couponRules = {
  SAI10: {
    type: "percentage",
    value: 10,
  },
  SAI20: {
    type: "percentage",
    value: 20,
  },
  FLAT100: {
    type: "fixed",
    value: 100,
  },
};

function getCartStorageKey(userId) {
  if (!userId) {
    return null;
  }

  return `${CART_STORAGE_PREFIX}${userId}`;
}

function loadCartForUser(userId) {
  const storageKey =
    getCartStorageKey(userId);

  if (
    typeof window === "undefined" ||
    !storageKey
  ) {
    return [];
  }

  try {
    const storedCart =
      window.localStorage.getItem(
        storageKey
      );

    if (!storedCart) {
      return [];
    }

    const parsedCart =
      JSON.parse(storedCart);

    return Array.isArray(parsedCart)
      ? parsedCart
      : [];
  } catch (error) {
    console.error(
      "Failed to load cart from localStorage:",
      error
    );

    return [];
  }
}

function saveCartForUser(
  userId,
  cartItems
) {
  const storageKey =
    getCartStorageKey(userId);

  if (
    typeof window === "undefined" ||
    !storageKey
  ) {
    return;
  }

  try {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify(cartItems)
    );
  } catch (error) {
    console.error(
      "Failed to save cart to localStorage:",
      error
    );
  }
}

export function CartProvider({
  children,
}) {
  const [userId, setUserId] =
    useState(null);

  const [cartItems, setCartItems] =
    useState([]);

  const [cartReady, setCartReady] =
    useState(false);

  const [appliedCoupon, setAppliedCoupon] =
    useState(null);

  useEffect(() => {
    let mounted = true;

    const handleAuthChange = (
      session
    ) => {
      if (!mounted) {
        return;
      }

      const nextUserId =
        session?.user?.id || null;

      setUserId(nextUserId);

      setCartItems(
        nextUserId
          ? loadCartForUser(nextUserId)
          : []
      );

      setAppliedCoupon(null);

      setCartReady(true);
    };

    const initializeAuth = async () => {
      try {
        const {
          data,
          error,
        } = await supabase.auth.getSession();

        if (!mounted) {
          return;
        }

        if (error) {
          console.error(
            "Failed to restore cart user session:",
            error
          );

          handleAuthChange(null);
          return;
        }

        handleAuthChange(
          data?.session || null
        );
      } catch (error) {
        console.error(
          "Failed to initialize cart user:",
          error
        );

        if (mounted) {
          handleAuthChange(null);
        }
      }
    };

    initializeAuth();

    const {
      data: {
        subscription,
      },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        handleAuthChange(session);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (
      !cartReady ||
      !userId
    ) {
      return;
    }

    saveCartForUser(
      userId,
      cartItems
    );
  }, [
    userId,
    cartItems,
    cartReady,
  ]);

  const addToCart = useCallback(
    (product, quantity = 1) => {
      if (!userId) {
        console.warn(
          "Cannot add to cart without an authenticated user."
        );

        return;
      }

      if (!product?.id) {
        console.error(
          "Cannot add product without an id."
        );

        return;
      }

      const safeQuantity =
        Math.max(
          1,
          Number(quantity) || 1
        );

      setCartItems(
        (currentItems) => {
          const existingItem =
            currentItems.find(
              (item) =>
                item.id ===
                product.id
            );

          if (existingItem) {
            return currentItems.map(
              (item) =>
                item.id ===
                product.id
                  ? {
                      ...item,
                      quantity:
                        Number(
                          item.quantity
                        ) +
                        safeQuantity,
                    }
                  : item
            );
          }

          return [
            ...currentItems,
            {
              ...product,
              quantity:
                safeQuantity,
            },
          ];
        }
      );
    },
    [userId]
  );

  const increaseQuantity =
    useCallback(
      (productId) => {
        if (!userId) {
          return;
        }

        setCartItems(
          (currentItems) =>
            currentItems.map(
              (item) =>
                item.id ===
                productId
                  ? {
                      ...item,
                      quantity:
                        Number(
                          item.quantity
                        ) + 1,
                    }
                  : item
            )
        );
      },
      [userId]
    );

  const decreaseQuantity =
    useCallback(
      (productId) => {
        if (!userId) {
          return;
        }

        setCartItems(
          (currentItems) =>
            currentItems
              .map((item) =>
                item.id ===
                productId
                  ? {
                      ...item,
                      quantity:
                        Math.max(
                          0,
                          Number(
                            item.quantity
                          ) - 1
                        ),
                    }
                  : item
              )
              .filter(
                (item) =>
                  Number(
                    item.quantity
                  ) > 0
              )
        );
      },
      [userId]
    );

  const removeItem = useCallback(
    (productId) => {
      if (!userId) {
        return;
      }

      setCartItems(
        (currentItems) =>
          currentItems.filter(
            (item) =>
              item.id !== productId
          )
      );
    },
    [userId]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedCoupon(null);

    if (userId) {
      saveCartForUser(
        userId,
        []
      );
    }
  }, [userId]);

  const applyCoupon =
    useCallback(
      (couponCode) => {
        const normalizedCode =
          String(
            couponCode || ""
          )
            .trim()
            .toUpperCase();

        if (!normalizedCode) {
          return {
            success: false,
            message:
              "Please enter a coupon code.",
          };
        }

        const coupon =
          couponRules[
            normalizedCode
          ];

        if (!coupon) {
          return {
            success: false,
            message:
              "Invalid coupon code.",
          };
        }

        setAppliedCoupon({
          code: normalizedCode,
          ...coupon,
        });

        return {
          success: true,
          message:
            "Coupon applied successfully.",
        };
      },
      []
    );

  const removeCoupon =
    useCallback(() => {
      setAppliedCoupon(null);
    }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => {
        const price =
          Number(item.price) || 0;

        const quantity =
          Number(item.quantity) || 0;

        return (
          total +
          price * quantity
        );
      },
      0
    );
  }, [cartItems]);

  const discount = useMemo(() => {
    if (!appliedCoupon) {
      return 0;
    }

    if (
      appliedCoupon.type ===
      "percentage"
    ) {
      return Math.min(
        subtotal,
        (subtotal *
          appliedCoupon.value) /
          100
      );
    }

    if (
      appliedCoupon.type ===
      "fixed"
    ) {
      return Math.min(
        subtotal,
        appliedCoupon.value
      );
    }

    return 0;
  }, [
    subtotal,
    appliedCoupon,
  ]);

  const deliveryCharge =
    useMemo(() => {
      if (subtotal === 0) {
        return 0;
      }

      return subtotal >= 500
        ? 0
        : 40;
    }, [subtotal]);

  const totalAmount = useMemo(() => {
    return Math.max(
      0,
      subtotal -
        discount +
        deliveryCharge
    );
  }, [
    subtotal,
    discount,
    deliveryCharge,
  ]);

  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        (Number(
          item.quantity
        ) || 0),
      0
    );
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,

      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      clearCart,

      appliedCoupon,
      applyCoupon,
      removeCoupon,

      subtotal,
      discount,
      deliveryCharge,
      totalAmount,
      totalItems,

      isEmpty:
        cartItems.length === 0,

      userId,
      cartReady,
    }),
    [
      cartItems,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      clearCart,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      subtotal,
      discount,
      deliveryCharge,
      totalAmount,
      totalItems,
      userId,
      cartReady,
    ]
  );

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCartContext must be used inside CartProvider."
    );
  }

  return context;
}

export function useCart() {
  return useCartContext();
}

export default CartContext;