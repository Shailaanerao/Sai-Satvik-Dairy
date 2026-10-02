import supabase from "../config/supabase.js";

/*
 * =========================================
 * GET ALL CUSTOMER ORDERS
 * =========================================
 *
 * Get all orders belonging to the
 * logged-in customer.
 */

async function getOrders(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const {
      data: orders,
      error,
    } = await supabase
      .from("orders")
      .select(`
        id,
        user_id,
        status,
        payment_status,
        payment_method,
        subtotal,
        discount,
        delivery_charge,
        total_amount,
        coupon_code,
        shipping_address,
        created_at,
        updated_at,
        order_items (
          id,
          product_id,
          product_name,
          quantity,
          unit_price,
          total_price
        )
      `)
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Get orders database error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
      });
    }

    return res.json({
      success: true,
      orders: orders || [],
    });
  } catch (error) {
    console.error(
      "Get orders error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
}


/*
 * =========================================
 * GET ONE CUSTOMER ORDER
 * =========================================
 *
 * Get one order belonging to the
 * logged-in customer.
 */

async function getOrderById(req, res) {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const {
      data: order,
      error,
    } = await supabase
      .from("orders")
      .select(`
        id,
        user_id,
        status,
        payment_status,
        payment_method,
        subtotal,
        discount,
        delivery_charge,
        total_amount,
        coupon_code,
        shipping_address,
        created_at,
        updated_at,
        order_items (
          id,
          product_id,
          product_name,
          quantity,
          unit_price,
          total_price
        )
      `)
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error || !order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      "Get order by ID error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
}


/*
 * =========================================
 * CREATE ORDER
 * =========================================
 *
 * The frontend sends:
 *
 * - product IDs
 * - quantities
 * - address ID
 * - delivery date
 * - delivery time
 * - payment method
 * - optional coupon code
 *
 * The database function performs the
 * complete secure order transaction.
 */

async function createOrder(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const {
      items,
      addressId,
      deliveryDate,
      deliveryTime,
      paymentMethod,
      couponCode,
    } = req.body;

    /*
     * =========================================
     * VALIDATE ITEMS
     * =========================================
     */

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "At least one product is required.",
      });
    }

    /*
     * =========================================
     * VALIDATE ADDRESS
     * =========================================
     */

    const numericAddressId =
      Number(addressId);

    if (
      !Number.isInteger(
        numericAddressId
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Valid delivery address is required.",
      });
    }

    /*
     * =========================================
     * VALIDATE DELIVERY SLOT
     * =========================================
     */

    if (
      !deliveryDate ||
      !deliveryTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Delivery date and time are required.",
      });
    }

    /*
     * =========================================
     * NORMALIZE PAYMENT METHOD
     * =========================================
     */

    const safePaymentMethod =
      paymentMethod
        ?.trim()
        .toLowerCase() || "cod";

    const allowedPaymentMethods = [
      "cod",
      "upi",
      "card",
      "netbanking",
    ];

    if (
      !allowedPaymentMethods.includes(
        safePaymentMethod
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid payment method.",
      });
    }

    /*
     * =========================================
     * NORMALIZE COUPON CODE
     * =========================================
     */

    const safeCouponCode =
      couponCode
        ?.trim()
        .toUpperCase() || null;

    /*
     * =========================================
     * NORMALIZE ITEMS
     * =========================================
     */

    const normalizedItems =
      items.map((item) => ({
        productId: Number(
          item?.productId
        ),

        quantity: Number(
          item?.quantity
        ),
      }));

    /*
     * =========================================
     * VALIDATE NORMALIZED ITEMS
     * =========================================
     */

    const hasInvalidItem =
      normalizedItems.some(
        (item) =>
          !Number.isInteger(
            item.productId
          ) ||
          item.productId < 1 ||
          !Number.isInteger(
            item.quantity
          ) ||
          item.quantity < 1
      );

    if (hasInvalidItem) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid product information.",
      });
    }

    /*
     * =========================================
     * CREATE SECURE ORDER
     * =========================================
     *
     * The Supabase function is responsible
     * for:
     *
     * - verifying address ownership
     * - checking products
     * - checking active status
     * - checking stock
     * - calculating prices
     * - calculating discount
     * - calculating delivery charge
     * - creating the order
     * - creating order items
     * - decreasing stock
     *
     * These operations happen together.
     */

    const {
      data: orderIdData,
      error: rpcError,
    } = await supabase.rpc(
      "create_order_secure",
      {
        p_user_id: userId,

        p_address_id:
          numericAddressId,

        p_items:
          normalizedItems,

        p_delivery_date:
          String(
            deliveryDate
          ).trim(),

        p_delivery_time:
          String(
            deliveryTime
          ).trim(),

        p_payment_method:
          safePaymentMethod,

        p_coupon_code:
          safeCouponCode,
      }
    );

    /*
     * =========================================
     * HANDLE RPC ERROR
     * =========================================
     */

    if (rpcError) {
      console.error(
        "Secure order creation error:",
        rpcError
      );

      const rpcMessage =
        rpcError?.message ||
        "Failed to create order.";

      /*
       * Custom validation errors from
       * create_order_secure begin with:
       *
       * ORDER_VALIDATION:
       */

      if (
        rpcMessage.startsWith(
          "ORDER_VALIDATION:"
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            rpcMessage
              .replace(
                "ORDER_VALIDATION:",
                ""
              )
              .trim(),
        });
      }

      return res.status(500).json({
        success: false,
        message:
          "Failed to create order.",
      });
    }

    /*
     * =========================================
     * VALIDATE RETURNED ORDER ID
     * =========================================
     */

    const orderId =
      Number(orderIdData);

    if (
      !Number.isInteger(orderId)
    ) {
      console.error(
        "Invalid order ID returned from database:",
        orderIdData
      );

      return res.status(500).json({
        success: false,
        message:
          "Order was created but could not be retrieved.",
      });
    }

    /*
     * =========================================
     * FETCH CREATED ORDER
     * =========================================
     */

    const {
      data: order,
      error: orderError,
    } = await supabase
      .from("orders")
      .select(`
        id,
        user_id,
        status,
        payment_status,
        payment_method,
        subtotal,
        discount,
        delivery_charge,
        total_amount,
        coupon_code,
        shipping_address,
        created_at,
        updated_at,
        order_items (
          id,
          order_id,
          product_id,
          product_name,
          quantity,
          unit_price,
          total_price,
          created_at
        )
      `)
      .eq("id", orderId)
      .eq("user_id", userId)
      .single();

    /*
     * =========================================
     * HANDLE FETCH ERROR
     * =========================================
     */

    if (
      orderError ||
      !order
    ) {
      console.error(
        "Fetch newly created order error:",
        orderError
      );

      return res.status(500).json({
        success: false,
        message:
          "Order was created but could not be retrieved.",
      });
    }

    /*
     * =========================================
     * RETURN ORDER
     * =========================================
     */

    return res.status(201).json({
      success: true,
      message:
        "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(
      "Create order error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create order",
    });
  }
}


/*
 * =========================================
 * CANCEL ORDER
 * =========================================
 *
 * Customers can cancel only their own
 * orders and only while the order is
 * still pending.
 */

async function cancelOrder(req, res) {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const {
      data: order,
      error: findError,
    } = await supabase
      .from("orders")
      .select(`
        id,
        status,
        payment_status
      `)
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (
      findError ||
      !order
    ) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      order.status !== "pending"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This order can no longer be cancelled",
      });
    }

    const {
      data: updatedOrder,
      error: updateError,
    } = await supabase
      .from("orders")
      .update({
        status: "cancelled",
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select(`
        id,
        status,
        payment_status,
        payment_method,
        subtotal,
        discount,
        delivery_charge,
        total_amount,
        shipping_address,
        created_at,
        updated_at
      `)
      .single();

    if (updateError) {
      console.error(
        "Cancel order database error:",
        updateError
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to cancel order",
      });
    }

    return res.json({
      success: true,
      message:
        "Order cancelled successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(
      "Cancel order error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to cancel order",
    });
  }
}


/*
 * =========================================
 * ORDER TRACKING
 * =========================================
 */

async function getOrderTracking(req, res) {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const {
      data: order,
      error,
    } = await supabase
      .from("orders")
      .select(`
        id,
        status,
        payment_status,
        created_at,
        updated_at
      `)
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (
      error ||
      !order
    ) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const trackingSteps = [
      "pending",
      "confirmed",
      "processing",
      "out_for_delivery",
      "delivered",
    ];

    const currentIndex =
      trackingSteps.indexOf(
        order.status
      );

    const tracking =
      trackingSteps.map(
        (status, index) => ({
          status,

          completed:
            order.status ===
            "cancelled"
              ? false
              : currentIndex >=
                index,

          current:
            order.status ===
            status,
        })
      );

    return res.json({
      success: true,
      tracking: {
        orderId: order.id,

        status:
          order.status,

        paymentStatus:
          order.payment_status,

        createdAt:
          order.created_at,

        updatedAt:
          order.updated_at,

        steps: tracking,
      },
    });
  } catch (error) {
    console.error(
      "Get order tracking error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch order tracking",
    });
  }
}


/*
 * =========================================
 * EXPORTS
 * =========================================
 */

export {
  getOrders,
  getOrderById,
  createOrder,
  cancelOrder,
  getOrderTracking,
};