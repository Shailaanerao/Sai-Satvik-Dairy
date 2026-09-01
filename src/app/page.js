import Navbar from "@/components/ui/Navbar/Navbar";
import Carousel from "@/components/ui/Carousel/Carousel";
import OurPromise from "@/components/ui/OurPromise/Ourpromise";
import FeaturedProducts from "@/components/ui/Featured-products/FeaturedProducts";
import BestSellers from "@/components/ui/Best-Sellers/BestSellers";
import ExclusiveOffer from "@/components/ui/ExclusiveOffer/ExclusiveOffer";
import NewArrivals from "@/components/ui/New-Arrivals/NewArrivals";

export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel/>
      <OurPromise/>
      <FeaturedProducts/>
      <BestSellers/>
      <NewArrivals/>
      <ExclusiveOffer/>
      

      <main>
        <h1>Navbar</h1>
      </main>
    </>
  );
}