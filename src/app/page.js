import Navbar from "@/components/ui/Navbar/Navbar";
import Carousel from "@/components/ui/Carousel/Carousel";
import AboutUs from "@/components/ui/About-us/About";
import OurPromise from "@/components/ui/OurPromise/Ourpromise";
import FeaturedProducts from "@/components/ui/Featured-products/FeaturedProducts";
import BestSellers from "@/components/ui/Best-Sellers/BestSellers";
import ExclusiveOffer from "@/components/ui/ExclusiveOffer/ExclusiveOffer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel/>
      <AboutUs/>
      <OurPromise/>
      <FeaturedProducts/>
      <BestSellers/>
      <ExclusiveOffer/>

      <main>
        <h1>Navbar</h1>
      </main>
    </>
  );
}