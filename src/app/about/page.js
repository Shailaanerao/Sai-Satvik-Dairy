import AboutHero from "@/components/ui/About-us/AboutHero";
import Navbar from "@/components/ui/Navbar/Navbar";
import AboutStats from "@/components/ui/About-us/AboutStats";
import AboutStory from "@/components/ui/About-us/AboutStory";
import AboutValues from "@/components/ui/About-us/AboutValues";
import "./About.css";

export const metadata = {
  title: "About Us | Sai Satvik Dairy",
  description: "Learn about our farm, pure A2 desi cows, and ethical dairy practices.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
        <Navbar/>
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <AboutValues />
    </main>
  );
}