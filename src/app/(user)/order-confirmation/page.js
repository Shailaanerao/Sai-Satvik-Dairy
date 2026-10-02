import OrderConfirmation from "@/components/ui/OrderStatus/OrderConfirmation";
import "@/components/ui/OrderStatus/order-status.css";

export default async function OrderConfirmationPage({
searchParams,
}) {
const params = await searchParams;

const orderId = params?.id || "";

return (
<OrderConfirmation orderId={orderId} />
);
}