import Navbar from "@/components/ui/Navbar/Navbar";
import CardForm from "@/components/ui/Payment/CardForm";
import "@/components/ui/Payment/payment.css";

export default function CardPage() {
  return (
    <>
      <Navbar />

      <main>
        <CardForm />
      </main>
    </>
  );
}