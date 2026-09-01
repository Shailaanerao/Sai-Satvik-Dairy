import React from "react";
import AboutHero from "./AboutHero";
import AboutStats from "./AboutStats";
import AboutStory from "./AboutStory";
import AboutValues from "./AboutValues";
import "@/app/about/About.css";

export default function AboutUs() {
  return (
    <section className="about-us-section">
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <AboutValues />
    </section>
  );
}