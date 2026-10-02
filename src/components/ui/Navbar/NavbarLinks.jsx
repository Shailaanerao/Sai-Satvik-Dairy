"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/home" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Subscription", href: "/subscription" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NavbarLinks() {
  const pathname = usePathname();

  const isLinkActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    <nav
      className="nav-links"
      aria-label="Main navigation"
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={
            isLinkActive(link.href)
              ? "nav-link active"
              : "nav-link"
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}