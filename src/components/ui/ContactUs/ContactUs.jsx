"use client";

import { useState } from "react";
import "./ContactUs.css";

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-page">

      {/* ================= HERO ================= */}

      <div className="contact-hero">

        <div className="contact-hero-overlay"></div>

        <div className="contact-hero-content">

          <span className="contact-eyebrow">
            WE'RE HERE FOR YOU
          </span>

          <h1>
            Let's Talk <span>Freshness</span>
          </h1>

          <p>
            Have a question about our farm-fresh dairy products,
            delivery or subscription? Our team is happy to help.
          </p>

          <div className="hero-buttons">
            <a href="#contact-form" className="hero-primary-btn">
              Send a Message
              <span>→</span>
            </a>

            <a href="tel:+919876543210" className="hero-secondary-btn">
              Call Us
            </a>
          </div>

        </div>
      </div>


      {/* ================= QUICK CONTACT ================= */}

      <div className="quick-contact-wrapper">

        <div className="quick-contact-card">

          <div className="quick-icon">📞</div>

          <div>
            <span>CALL US</span>
            <h3>+91 98765 43210</h3>
            <p>Available 7 AM – 9 PM</p>
          </div>

        </div>


        <div className="quick-contact-card">

          <div className="quick-icon">💬</div>

          <div>
            <span>WHATSAPP</span>
            <h3>Chat With Us</h3>
            <p>Quick response from our team</p>
          </div>

        </div>


        <div className="quick-contact-card">

          <div className="quick-icon">✉️</div>

          <div>
            <span>EMAIL US</span>
            <h3>support@saisatvikdairy.com</h3>
            <p>We reply within 24 hours</p>
          </div>

        </div>

      </div>


      {/* ================= CONTACT FORM SECTION ================= */}

      <div className="contact-main">

        {/* LEFT */}

        <div className="contact-details">

          <span className="section-eyebrow">
            CONTACT SAI SATVIK
          </span>

          <h2>
            We'd Love To
            <br />
            <span>Hear From You.</span>
          </h2>

          <p className="contact-description">
            Whether you have a question about our products,
            need help with an order, or simply want to share
            your experience, feel free to reach out.
          </p>


          {/* Contact information */}

          <div className="detail-list">

            <div className="detail-item">

              <div className="detail-icon">
                📍
              </div>

              <div>
                <h4>Visit Our Farm</h4>
                <p>
                  Pune, Maharashtra, India
                </p>
              </div>

            </div>


            <div className="detail-item">

              <div className="detail-icon">
                🕐
              </div>

              <div>
                <h4>Working Hours</h4>
                <p>
                  Monday – Sunday
                  <br />
                  7:00 AM – 9:00 PM
                </p>
              </div>

            </div>


            <div className="detail-item">

              <div className="detail-icon">
                🚚
              </div>

              <div>
                <h4>Delivery Support</h4>
                <p>
                  Need help with your delivery?
                  <br />
                  We're just a message away.
                </p>
              </div>

            </div>

          </div>


          {/* Social */}

          <div className="social-area">

            <span>FOLLOW OUR FARM JOURNEY</span>

            <div className="social-buttons">

              <a href="#" aria-label="Instagram">
                Instagram
              </a>

              <a href="#" aria-label="Facebook">
                Facebook
              </a>

              <a href="#" aria-label="YouTube">
                YouTube
              </a>

            </div>

          </div>

        </div>


        {/* RIGHT FORM */}

        <div
          className="contact-form-card"
          id="contact-form"
        >

          <div className="form-header">

            <div>

              <span>GET IN TOUCH</span>

              <h3>
                Send Us a Message
              </h3>

            </div>

            <div className="form-leaf">
              🌿
            </div>

          </div>


          {submitted ? (

            <div className="success-message">

              <div className="success-icon">
                ✓
              </div>

              <h3>
                Thank You!
              </h3>

              <p>
                Your message has been received.
                Our team will get back to you shortly.
              </p>

              <button
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>

            </div>

          ) : (

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div className="input-group">

                  <label>Full Name</label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                  />

                </div>


                <div className="input-group">

                  <label>Phone Number</label>

                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />

                </div>

              </div>


              <div className="input-group">

                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                />

              </div>


              <div className="input-group">

                <label>How can we help?</label>

                <select defaultValue="">

                  <option value="" disabled>
                    Select a topic
                  </option>

                  <option>
                    Product Enquiry
                  </option>

                  <option>
                    Order Support
                  </option>

                  <option>
                    Delivery Issue
                  </option>

                  <option>
                    Subscription
                  </option>

                  <option>
                    Feedback
                  </option>

                  <option>
                    Other
                  </option>

                </select>

              </div>


              <div className="input-group">

                <label>Your Message</label>

                <textarea
                  rows="5"
                  placeholder="Tell us how we can help..."
                  required
                ></textarea>

              </div>


              <button
                type="submit"
                className="send-message-btn"
              >

                Send Message

                <span>→</span>

              </button>


              <p className="privacy-note">
                🔒 Your information is safe with us.
              </p>

            </form>

          )}

        </div>

      </div>


      {/* ================= WHY CONTACT US ================= */}

      <section className="help-section">

        <div className="help-heading">

          <span className="section-eyebrow">
            HOW CAN WE HELP?
          </span>

          <h2>
            We're Here For
            <span> Every Step.</span>
          </h2>

        </div>


        <div className="help-grid">

          <div className="help-card">

            <div>🛒</div>

            <h3>Order Assistance</h3>

            <p>
              Need help placing or tracking your
              dairy product order?
            </p>

          </div>


          <div className="help-card">

            <div>🥛</div>

            <h3>Product Questions</h3>

            <p>
              Curious about our milk, ghee, paneer
              or other fresh products?
            </p>

          </div>


          <div className="help-card">

            <div>🔄</div>

            <h3>Subscription Help</h3>

            <p>
              Need help managing your daily dairy
              subscription?
            </p>

          </div>


          <div className="help-card">

            <div>💚</div>

            <h3>Share Feedback</h3>

            <p>
              Tell us about your experience and
              help us serve you better.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FAQ ================= */}

      <section className="faq-section">

        <div className="faq-heading">

          <span className="section-eyebrow">
            QUICK ANSWERS
          </span>

          <h2>
            Frequently Asked
            <span> Questions</span>
          </h2>

        </div>


        <div className="faq-list">

          <details>
            <summary>
              How can I track my dairy order?
              <span>+</span>
            </summary>

            <p>
              You can track your order from your customer
              account under the Orders section.
            </p>

          </details>


          <details>
            <summary>
              How can I start a milk subscription?
              <span>+</span>
            </summary>

            <p>
              Visit our Subscription page and choose
              the plan that works best for your family.
            </p>

          </details>


          <details>
            <summary>
              Where does Sai Satvik milk come from?
              <span>+</span>
            </summary>

            <p>
              Our dairy products are sourced with a focus
              on freshness, quality and responsible farming
              practices.
            </p>

          </details>


          <details>
            <summary>
              How can I report a delivery issue?
              <span>+</span>
            </summary>

            <p>
              Contact our support team using the form above
              or call our customer support number.
            </p>

          </details>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}

      <section className="contact-cta">

        <div>

          <span>
            FRESHNESS IS JUST A MESSAGE AWAY
          </span>

          <h2>
            Have Something To Ask?
          </h2>

          <p>
            Our team is always happy to help.
          </p>

        </div>

        <a href="#contact-form">
          Contact Us
          <span>→</span>
        </a>

      </section>

    </section>
  );
}