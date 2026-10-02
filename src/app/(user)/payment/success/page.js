import PaymentStatus from "@/components/ui/OrderStatus/PaymentStatus";
import "@/components/ui/OrderStatus/order-status.css";

export default function PaymentSuccessPage() {
  return (
    <>

      <PaymentStatus success={true} />
    </>
  );
}