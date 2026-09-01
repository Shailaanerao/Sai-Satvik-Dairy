import React from "react";
import Image from "next/image";

export default function AboutStory({
  eyebrow = "THE SAI SATVIK JOURNEY",
  title = "Rooted in Ahimsa & Ancient Vedic Wisdom",
  quote = "“When cows are treated with affection and freedom, they produce nectar—pure, potent, and wholesome.”",
  image = "/logo.jpeg",
}) {
  return (
    <section className="about-story-section">
      <div className="about-story-container">
        <div className="about-story-text">
          <span className="story-eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>
            Sai Satvik began with a straightforward conviction: dairy should nourish, heal, and energize without compromises. Commercial mass-production often ignores animal welfare and strips nutrition.
          </p>
          <p>
            On our organic sanctuary, native Desi cows graze freely on chemical-free green pastures, listen to classical flute melodies, and are hand-milked only after their calves are fully fed.
          </p>
          {quote && <div className="story-quote">{quote}</div>}
        </div>

        <div className="about-story-image-wrap">
          <div className="story-image-card">
            <Image
              src={image}
              alt="Farm cows grazing freely"
              fill
              className="story-img"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}