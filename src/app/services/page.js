import ServiceCard from "@/components/ui/ServiceCard/ServiceCard";
import Navbar from "@/components/ui/Navbar/Navbar";
import "./services.css";

const services = [
  {
    id: 1,
    icon: "🚚",
    title: "Home Delivery",
    description:
      "Get fresh dairy products delivered safely and conveniently to your doorstep.",
  },

  {
    id: 2,
    icon: "🥛",
    title: "Daily Milk Delivery",
    description:
      "Enjoy fresh farm milk delivered regularly according to your preferred schedule.",
  },

  {
    id: 3,
    icon: "📦",
    title: "Bulk & B2B Orders",
    description:
      "Reliable dairy supply solutions for restaurants, hotels, cafes and businesses.",
  },

  {
    id: 4,
    icon: "🔄",
    title: "Dairy Subscription",
    description:
      "Choose a convenient subscription plan and receive your daily dairy essentials.",
  },

  {
    id: 5,
    icon: "🌱",
    title: "Farm Fresh Products",
    description:
      "Fresh dairy products sourced with care and prepared using quality ingredients.",
  },

  {
    id: 6,
    icon: "👨‍🌾",
    title: "Farm Experience",
    description:
      "Learn more about dairy farming and experience the journey from farm to family.",
  },
];

export default function ServicesPage() {
  return (
    <>
     <Navbar/>
    <main className="services-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="services-hero">

        <div className="services-hero-content">

          <span className="services-badge">
            OUR SERVICES
          </span>

          <h1>
            Freshness Delivered With Care
          </h1>

          <p>
            From our farm to your family, we make it easy
            to enjoy fresh and wholesome dairy products.
          </p>

        </div>

      </section>


      {/* =====================================
          SERVICES
      ===================================== */}

      <section className="services-section">

        <div className="services-heading">

          <span className="services-small-title">
            WHAT WE OFFER
          </span>

          <h2>
            Services Designed For You
          </h2>

          <p>
            Experience convenient dairy solutions designed
            around freshness, quality and your everyday needs.
          </p>

        </div>


        {/* SERVICE CARDS */}

        <div className="services-grid">

          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}

        </div>

      </section>


      {/* =====================================
          WHY SAI SATVIK
      ===================================== */}

      <section className="services-highlight">

        <div className="highlight-content">

          <span className="services-small-title">
            WHY SAI SATVIK
          </span>

          <h2>
            From Our Farm To Your Family
          </h2>

          <p>
            We focus on freshness, quality and reliable
            service so that your family can enjoy dairy
            products with confidence every day.
          </p>


          <div className="highlight-points">

            <div className="highlight-point">
              <strong>100%</strong>
              <span>Fresh Products</span>
            </div>

            <div className="highlight-point">
              <strong>Daily</strong>
              <span>Quality Care</span>
            </div>

            <div className="highlight-point">
              <strong>Safe</strong>
              <span>Home Delivery</span>
            </div>

          </div>

        </div>

      </section>

    </main>
    </>
  );
}