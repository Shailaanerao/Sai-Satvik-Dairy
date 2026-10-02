import supabase from "../config/supabase.js";

export async function getAdminOrders(req, res) {
  try {
    const { data: orders, error } = await supabase
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
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Get admin orders database error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch orders.",
      });
    }

    const userIds = [
      ...new Set(
        (orders || [])
          .map((order) => order.user_id)
          .filter(Boolean)
      ),
    ];

    let profiles = [];

    if (userIds.length > 0) {
      const {
        data,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select(
          "id, first_name, last_name, mobile"
        )
        .in("id", userIds);

      if (profileError) {
        console.error(
          "Get admin order customer profiles error:",
          profileError
        );
      } else {
        profiles = data || [];
      }
    }

    const profileMap = new Map(
      profiles.map((profile) => [
        profile.id,
        profile,
      ])
    );

    const formattedOrders = (orders || []).map(
      (order) => {
        const profile = profileMap.get(
          order.user_id
        );

        return {
          ...order,
          customer: {
            id: order.user_id,
            firstName:
              profile?.first_name || "",
            lastName:
              profile?.last_name || "",
            mobile:
              profile?.mobile || "",
          },
        };
      }
    );

    return res.json({
      success: true,
      orders: formattedOrders,
    });
  } catch (error) {
    console.error(
      "Get admin orders error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
}

export async function getAdminOrderById(
  req,
  res
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required.",
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
      .single();

    if (error) {
      console.error(
        "Get admin order database error:",
        error
      );

      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    let customer = null;

    if (order.user_id) {
      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select(
          "id, first_name, last_name, mobile"
        )
        .eq("id", order.user_id)
        .single();

      if (!profileError && profile) {
        customer = {
          id: profile.id,
          firstName:
            profile.first_name || "",
          lastName:
            profile.last_name || "",
          mobile:
            profile.mobile || "",
        };
      }
    }

    return res.json({
      success: true,
      order: {
        ...order,
        customer,
      },
    });
  } catch (error) {
    console.error(
      "Get admin order by ID error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order.",
    });
  }
}

export async function updateAdminOrderStatus(
  req,
  res
) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "processing",
      "out_for_delivery",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const {
      data: order,
      error,
    } = await supabase
      .from("orders")
      .update({
        status,
      })
      .eq("id", id)
      .select(
        "id, status, updated_at"
      )
      .single();

    if (error) {
      console.error(
        "Update admin order status error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update order status.",
      });
    }

    return res.json({
      success: true,
      message:
        "Order status updated successfully.",
      order,
    });
  } catch (error) {
    console.error(
      "Update admin order status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update order status.",
    });
  }
}

export async function updateAdminPaymentStatus(
  req,
  res
) {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const allowedPaymentStatuses = [
      "pending",
      "paid",
      "failed",
      "refunded",
    ];

    if (
      !allowedPaymentStatuses.includes(
        paymentStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid payment status.",
      });
    }

    const {
      data: order,
      error,
    } = await supabase
      .from("orders")
      .update({
        payment_status: paymentStatus,
      })
      .eq("id", id)
      .select(
        "id, payment_status, updated_at"
      )
      .single();

    if (error) {
      console.error(
        "Update admin payment status error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update payment status.",
      });
    }

    return res.json({
      success: true,
      message:
        "Payment status updated successfully.",
      order,
    });
  } catch (error) {
    console.error(
      "Update admin payment status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update payment status.",
    });
  }
}