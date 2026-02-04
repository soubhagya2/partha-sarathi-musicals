import {
  ShoppingCart,
  User,
  Search,
  ChevronDown,
  Heart,
  ShieldCheck,
  Headset,
  ShieldAlert,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200/60 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="text-orange-600">
            <svg
              viewBox="0 0 48 48"
              className="h-8 w-8 fill-current transition-transform group-hover:scale-105"
            >
              <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" />
            </svg>
          </div>
          <span className="font-brand text-xl font-bold italic tracking-tight text-amber-900">
            Parthasarathi Musical
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-ui text-[0.95rem] font-medium">
          <Link
            to="/"
            className="text-amber-800 hover:text-orange-600 transition-colors"
          >
            Home
          </Link>

          {/* Shop Mega Dropdown */}
          <div className="group relative py-4">
            <button className="flex items-center gap-1 text-amber-800 group-hover:text-orange-600 transition-colors">
              Shop
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>

            <div className="absolute left-1/2 top-full w-[600px] -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="mt-2 rounded-xl border border-amber-200 bg-white p-6 shadow-xl">
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-orange-600">
                      Categories
                    </h4>
                    <ul className="flex flex-col gap-3">
                      {[
                        "Harmoniums",
                        "Percussion",
                        "Guitars",
                        "Devotional",
                        "Accessories",
                      ].map((item) => (
                        <li key={item}>
                          <Link
                            to={`/products?category=${item}`}
                            className="text-amber-900/70 hover:text-orange-600 transition-colors"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-span-2 rounded-lg bg-amber-50 p-4">
                    <p className="text-sm text-amber-800/60 italic">
                      "Discover our handcrafted collection of traditional Indian
                      instruments, tuned to perfection for the modern maestro."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/about"
            className="text-amber-800 hover:text-orange-600 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-amber-800 hover:text-orange-600 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Search + Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600/60" />
            <input
              type="text"
              placeholder="Search instruments…"
              className="w-64 rounded-lg border border-amber-200 bg-white px-10 py-2 text-sm font-ui text-amber-900 placeholder:text-amber-600/50 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg border border-amber-200 text-amber-700 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-200"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* Account */}
          <div className="group relative py-2">
            <Link
              to="/profile"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-200 text-amber-700 hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all duration-200"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* User Dropdown */}
            <div className="absolute right-0 top-full w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="mt-2 rounded-xl border border-amber-200 bg-white p-2 shadow-xl">
                <div className="px-3 py-2 mb-1 border-b border-amber-50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-900/40">
                    Access Portals
                  </p>
                </div>
                <ul className="flex flex-col gap-1">
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center gap-3 px-3 py-2 text-sm font-ui font-medium text-amber-900 hover:bg-amber-50 hover:text-orange-600 rounded-lg transition-colors"
                    >
                      <User className="h-4 w-4" /> Login User
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/support/login"
                      className="flex items-center gap-3 px-3 py-2 text-sm font-ui font-medium text-amber-900 hover:bg-amber-50 hover:text-orange-600 rounded-lg transition-colors"
                    >
                      <Headset className="h-4 w-4" /> Support Access
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/login"
                      className="flex items-center gap-3 px-3 py-2 text-sm font-ui font-medium text-amber-900 hover:bg-amber-50 hover:text-orange-600 rounded-lg transition-colors"
                    >
                      <ShieldCheck className="h-4 w-4" /> Admin Portal
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/super-admin/login"
                      className="flex items-center gap-3 px-3 py-2 text-sm font-ui font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <ShieldAlert className="h-4 w-4" /> Super Admin
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-amber-200 text-amber-700 hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all duration-200 group"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 rounded-full bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-md z-10 group-hover:bg-orange-600">
              2
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
