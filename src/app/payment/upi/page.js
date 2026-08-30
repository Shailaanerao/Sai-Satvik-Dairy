import Navbar from "@/components/ui/Navbar/Navbar";
import UPIForm from "@/components/ui/Payment/UPIForm";
import "@/components/ui/Payment/payment.css";

export default function UPIPage() {
  return (
    <>
      <Navbar />

      <main>
        <UPIForm />
      </main>
    </>
  );
}