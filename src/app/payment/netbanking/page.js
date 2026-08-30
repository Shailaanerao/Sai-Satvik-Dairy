import Navbar from "@/components/ui/Navbar/Navbar";
import NetBankingForm from "@/components/ui/Payment/NetBankingForm";
import "@/components/ui/Payment/payment.css";

export default function NetBankingPage() {
  return (
    <>
      <Navbar />

      <main className="payment-main">
        <NetBankingForm />
      </main>
    </>
  );
}