import { post } from "@/lib/api";

export async function createOrder({
  cartItems,
  address,
  deliverySlot,
  paymentMethod,
  couponCode,
}) {
  if (!cartItems?.length) {
    throw new Error(
      "Your cart is empty."
    );
  }

  if (!address) {
    throw new Error(
      "Delivery address is required."
    );
  }

  const addressId = Number(address.id);

  if (!Number.isInteger(addressId)) {
    throw new Error(
      "A valid delivery address is required."
    );
  }

  if (!deliverySlot) {
    throw new Error(
      "Delivery slot is required."
    );
  }

  if (
    !deliverySlot.date ||
    !deliverySlot.time
  ) {
    throw new Error(
      "A valid delivery slot is required."
    );
  }

  const items = cartItems.map(
    (item) => ({
      productId: item.id,
      quantity: Number(
        item.quantity || 1
      ),
    })
  );

  const response = await post(
    "/orders",
    {
      items,

      addressId,

      deliveryDate:
        deliverySlot.date,

      deliveryTime:
        deliverySlot.time,

      paymentMethod:
        paymentMethod || "cod",

      couponCode:
        couponCode || null,
    }
  );

  if (!response?.order) {
    throw new Error(
      "Order was created but no order details were returned."
    );
  }

  return response.order;
}