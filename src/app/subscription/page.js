import Navbar from "@/components/ui/Navbar/Navbar";
import SubscriptionCard from "@/components/ui/SubscriptionCard/SubscriptionCard";
import "./subscription.css";

const plans = [
  {
    id: 1,
    title: "Daily Milk",
    price: "₹65",
    period: "/ day",
    description:
      "Fresh farm milk delivered to your doorstep every morning.",
    features: [
      "Fresh daily milk delivery",
      "Flexible quantity",
      "Morning delivery",
      "Easy subscription management",
      "Pause or skip delivery",
    ],
  },

  {
    id: 2,
    title: "Family Plan",
    price: "₹1,799",
    period: "/ month",
    description:
      "A convenient monthly dairy plan for families who love fresh products.",
    features: [
      "Daily milk delivery",
      "Free delivery",
      "Curd and paneer options",
      "Flexible delivery schedule",
      "Priority customer support",
    ],
    popular: true,
  },

  {
    id: 3,
    title: "Premium Dairy",
    price: "₹2,499",
    period: "/ month",
    description:
      "A complete premium dairy plan for your family's everyday needs.",
    features: [
      "Premium A2 milk",
      "Ghee and paneer",
      "Curd and butter",
      "Free home delivery",
      "Priority support",
    ],
  },
];

export default function SubscriptionPage() {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <main className="subscription-page">

        {/* =====================================
            HERO
        ===================================== */}

        <section className="subscription-hero">

          <div className="subscription-hero-content">

            <span className="subscription-badge">
              SAI SATVIK SUBSCRIPTION
            </span>

            <h1>
              Fresh Dairy, Delivered Your Way
            </h1>

            <p>
              Choose a subscription that fits your family's
              daily dairy needs and enjoy fresh products
              delivered right to your doorstep.
            </p>

          </div>

        </section>


        {/* =====================================
            SUBSCRIPTION PLANS
        ===================================== */}

        <section className="subscription-section">

          <div className="subscription-heading">

            <span className="subscription-small-title">
              CHOOSE YOUR PLAN
            </span>

            <h2>
              Simple Plans For Every Family
            </h2>

            <p>
              Select the plan that works best for you.
              You can manage, pause or change your
              subscription whenever you need.
            </p>

          </div>


          <div className="subscription-grid">

            {plans.map((plan) => (
              <SubscriptionCard
                key={plan.id}
                title={plan.title}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                popular={plan.popular}
              />
            ))}

          </div>

        </section>


        {/* =====================================
            HOW IT WORKS
        ===================================== */}

        <section className="subscription-how">

          <div className="subscription-how-heading">

            <span className="subscription-small-title">
              HOW IT WORKS
            </span>

            <h2>
              Your Daily Dairy Made Easy
            </h2>

          </div>


          <div className="subscription-steps">

            <div className="subscription-step">

              <div className="step-number">
                01
              </div>

              <h3>
                Choose Your Plan
              </h3>

              <p>
                Select a subscription based on your
                family's dairy requirements.
              </p>

            </div>


            <div className="subscription-step">

              <div className="step-number">
                02
              </div>

              <h3>
                Set Your Schedule
              </h3>

              <p>
                Choose your preferred quantity and
                delivery schedule.
              </p>

            </div>


            <div className="subscription-step">

              <div className="step-number">
                03
              </div>

              <h3>
                Receive Fresh Dairy
              </h3>

              <p>
                Your fresh dairy products arrive at
                your doorstep regularly.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================
            CTA
        ===================================== */}

        <section className="subscription-cta">

          <h2>
            Need Help Choosing a Plan?
          </h2>

          <p>
            Our team is happy to help you find the
            right dairy subscription for your family.
          </p>

          <a href="/contact">
            Contact Us →
          </a>

        </section>

      </main>
    </>
  );
}