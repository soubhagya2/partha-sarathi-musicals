import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: "All Instruments", href: "/products" },
      { label: "New Arrivals", href: "/products" },
      { label: "Handcrafted Specials", href: "/products" },
      { label: "Accessories", href: "/products?category=Accessories" },
    ],
    company: [
      { label: "Our Story", href: "/about" },
      { label: "Musical Insights", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
      { label: "Store Locator", href: "/contact#stores" },
      { label: "Careers", href: "#careers" },
    ],
    customerCare: [
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Support Center", href: "/support" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  };

  return (
    <footer className="bg-gradient-to-b from-amber-50 to-orange-50/30 pt-20 pb-10 mt-10 border-t border-amber-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="text-orange-600 size-6">
                <svg
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-brand font-normal italic text-orange-600 tracking-wide">
                Parthasarathi
              </h2>
            </div>

            <p className="text-sm text-amber-800/70 leading-relaxed">
              We are dedicated to preserving the heritage of traditional Indian
              music while providing modern tools for global artists.
            </p>

            <div className="flex gap-4">
              {/* FIXED: Added '<' to anchor tags below */}
              <a
                href="#share"
                className="size-10 rounded-full border border-amber-200 text-amber-700 hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all duration-200 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v4a2 2 0 002 2h12a2 2 0 002-2v-4m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
              <a
                href="#public"
                className="size-10 rounded-full border border-amber-200 text-amber-700 hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all duration-200 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h5 className="font-ui font-bold mb-6 uppercase tracking-wider text-xs text-amber-950">
              Shop
            </h5>
            <ul className="flex flex-col gap-4">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="hover:text-orange-600 text-sm font-ui text-amber-800/70 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="font-ui font-bold mb-6 uppercase tracking-wider text-xs text-amber-950">
              Company
            </h5>
            <ul className="flex flex-col gap-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="hover:text-orange-600 text-sm font-ui text-amber-800/70 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care Links */}
          <div>
            <h5 className="font-ui font-bold mb-6 uppercase tracking-wider text-xs text-amber-950">
              Customer Care
            </h5>
            <ul className="flex flex-col gap-4">
              {footerLinks.customerCare.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="hover:text-orange-600 text-sm font-ui text-amber-800/70 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="font-helper border-t border-amber-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-amber-700/60">
          <p>© {currentYear} Parthasarathi Musical. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="#terms"
              className="font-helper hover:text-orange-600 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#cookies"
              className="font-helper hover:text-orange-600 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
