import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-container">
          
          {/* Brand Info */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <div className="footer-logo-icon">
                <Image
                  src="/logo.jpeg"
                  alt="Sai Satvik Dairy"
                  width={42}
                  height={42}
                  className="footer-logo-img"
                />
              </div>
              <div className="footer-brand-text">
                <span className="footer-brand-title">Sai Satvik</span>
                <span className="footer-brand-subtitle">DAIRY PRODUCTS</span>
                <span className="footer-brand-tagline">PURE FOR SURE</span>
              </div>
            </Link>
            <p className="footer-desc">
              Delivering 100% pure, natural, and unprocessed A2 milk and dairy products directly from our farm to your family every morning.
            </p>
            <div className="footer-contact-info">
              <div className="footer-info-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 98765 43210</span>
              </div>
              <div className="footer-info-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>support@saisatvikdairy.com</span>
              </div>
              <div className="footer-info-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Satvik Organic Farms, Pune, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/products">All Products</Link></li>
              <li><Link href="/subscription">Daily Subscription</Link></li>
              <li><Link href="/services">Our Services</Link></li>
              <li><Link href="/about">About Our Farm</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><Link href="/products?category=milk">A2 Fresh Milk</Link></li>
              <li><Link href="/products?category=ghee">Desi Bilona Ghee</Link></li>
              <li><Link href="/products?category=paneer">Fresh Organic Paneer</Link></li>
              <li><Link href="/products?category=curd">Thick Farm Curd</Link></li>
              <li><Link href="/products?category=butter">White Butter</Link></li>
              <li><Link href="/products?category=sweets">Dairy Sweets</Link></li>
            </ul>
          </div>

          {/* Newsletter / App */}
          <div className="footer-newsletter">
            <h4 className="footer-heading">Stay Connected</h4>
            <p className="footer-newsletter-text">
              Subscribe to get daily fresh offers, healthy recipes, and farm updates.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
            <div className="footer-socials">
              <span className="social-label">Follow Us:</span>
              <div className="social-icons">
                <a href="#" aria-label="Facebook" className="social-icon">FB</a>
                <a href="#" aria-label="Instagram" className="social-icon">IG</a>
                <a href="#" aria-label="WhatsApp" className="social-icon">WA</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © {new Date().getFullYear()} Sai Satvik Dairy Products. All rights reserved. Pure & Natural Farm Dairy.
          </p>
          <div className="footer-bottom-links">
            <Link href="/settings/privacy-policy">Privacy Policy</Link>
            <span className="dot">•</span>
            <Link href="/settings/terms">Terms of Service</Link>
            <span className="dot">•</span>
            <Link href="/settings/shipping-policy">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
