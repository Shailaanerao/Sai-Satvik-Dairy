import Carousel from "@/components/ui/Carousel/Carousel";
import OurPromise from "@/components/ui/OurPromise/Ourpromise";
import FeaturedProducts from "@/components/ui/Featured-products/FeaturedProducts";
import BestSellers from "@/components/ui/Best-Sellers/BestSellers";
import ExclusiveOffer from "@/components/ui/ExclusiveOffer/ExclusiveOffer";
import NewArrivals from "@/components/ui/New-Arrivals/NewArrivals";
export default function HomePage() {
    return (
        <>
            <Carousel />
            <OurPromise />
            <FeaturedProducts />
            <BestSellers />
            <NewArrivals />
            <ExclusiveOffer />
        </>
    );
}