import Navbar from "@/components/ui/Navbar/Navbar";
import OrderConfirmation from "@/components/ui/OrderStatus/OrderConfirmation";
import "@/components/ui/OrderStatus/order-status.css";

export default function OrderConfirmationPage() {
  return (
    <>
      <Navbar />

      <OrderConfirmation />
    </>
  );
}