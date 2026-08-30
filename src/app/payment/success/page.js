import Navbar from "@/components/ui/Navbar/Navbar";
import PaymentStatus from "@/components/ui/OrderStatus/PaymentStatus";
import "@/components/ui/OrderStatus/order-status.css";

export default function PaymentSuccessPage() {
  return (
    <>
      <Navbar />

      <PaymentStatus success={true} />
    </>
  );
}