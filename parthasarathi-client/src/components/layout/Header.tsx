import {
  ShoppingCart,
  User,
  Search,
  ChevronDown,
  Heart,
  ShieldCheck,
  Headset,
  ShieldAlert,
  LogOut,
  Settings,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  variant?: "light" | "dark";
}

const Header = ({ variant = "light" }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, logout } = useAuth();

  const isDark = variant === "dark";

  // Determine the appropriate logout URL based on current route
  const getLogoutUrl = () => {
    const pathname = location.pathname;
    if (pathname.startsWith("/admin")) {
      return "/admin/login";
    } else if (pathname.startsWith("/super-admin")) {
      return "/super-admin/login";
    } else if (pathname.startsWith("/support")) {
      return "/support/login";
    }
    return "/";
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b shadow-sm ${
        isDark
          ? "border-slate-700/60 bg-slate-900/95 backdrop-blur-md"
          : "border-amber-200/60 bg-white/95 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className={isDark ? "text-red-600" : "text-orange-600"}>
            <svg
              viewBox="0 0 48 48"
              className="h-8 w-8 fill-current transition-transform group-hover:scale-105"
            >
              <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" />
            </svg>
          </div>
          <span
            className={`font-brand text-xl font-normal italic tracking-tight ${isDark ? "text-white" : "text-amber-900"}`}
          >
            Parthasarathi Musical
          </span>
        </Link>

        {/* Navigation */}
        <nav
          className={`hidden md:flex items-center gap-8 font-ui text-[0.95rem] font-medium ${isDark ? "text-slate-300" : "text-amber-800"}`}
        >
          <Link
            to="/"
            className={`${isDark ? "hover:text-red-500" : "hover:text-orange-600"} transition-colors`}
          >
            Home
          </Link>

          {/* Shop Mega Dropdown */}
          <div className="group relative py-4">
            <button
              className={`flex items-center gap-1 ${isDark ? "group-hover:text-red-500" : "group-hover:text-orange-600"} transition-colors`}
            >
              Shop
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>

            <div className="absolute left-1/2 top-full w-125 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div
                className={`mt-2 rounded-xl border shadow-xl ${isDark ? "border-slate-700 bg-slate-800" : "border-amber-200 bg-white"}`}
              >
                <div className="grid grid-cols-3 gap-8 p-6">
                  <div>
                    <h4
                      className={`mb-4 text-xs font-bold uppercase tracking-widest ${isDark ? "text-red-500" : "text-orange-600"}`}
                    >
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
                            className={`${isDark ? "text-slate-400 hover:text-white" : "text-amber-900/70 hover:text-orange-600"} transition-colors`}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`col-span-2 rounded-lg p-4 ${isDark ? "bg-slate-900" : "bg-amber-50"}`}
                  >
                    <p
                      className={`text-sm italic ${isDark ? "text-slate-400" : "text-amber-800/60"}`}
                    >
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
            className={`${isDark ? "hover:text-red-500" : "hover:text-orange-600"} transition-colors`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`${isDark ? "hover:text-red-500" : "hover:text-orange-600"} transition-colors`}
          >
            Contact
          </Link>
        </nav>

        {/* Search + Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search
              className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${isDark ? "text-slate-500" : "text-amber-600/60"}`}
            />
            <input
              type="text"
              placeholder="Search instruments…"
              className={`w-64 rounded-lg border px-10 py-2 text-sm font-ui transition-all focus:outline-none focus:ring-4 ${
                isDark
                  ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-red-500 focus:ring-red-500/10"
                  : "border-amber-200 bg-white text-amber-900 placeholder:text-amber-600/50 focus:border-orange-500 focus:ring-orange-500/10"
              }`}
            />
          </div>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className={`hidden sm:flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-200 ${
              isDark
                ? "border-slate-700 text-slate-400 hover:bg-red-600 hover:border-red-600 hover:text-white"
                : "border-amber-200 text-amber-700 hover:bg-red-500 hover:border-red-500 hover:text-white"
            }`}
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* Account */}
          {!isLoading && user ? (
            <div className="group relative py-2">
              <button
                className={`flex items-center gap-2 h-10 px-3 rounded-lg border transition-all duration-200 ${
                  isDark
                    ? "border-slate-700 bg-slate-800 text-slate-300 hover:bg-red-600 hover:border-red-600 hover:text-white"
                    : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-orange-600 hover:border-orange-600 hover:text-white"
                }`}
                aria-label="Account"
              >
                {user.imageUrl || user.imageUrl !== "" ? (
                  <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
                <span className="hidden sm:inline text-sm font-medium">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>

              {/* User Dropdown */}
              <div className="absolute right-0 top-full w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div
                  className={`mt-2 rounded-xl border shadow-xl overflow-hidden ${isDark ? "border-slate-700 bg-slate-800" : "border-amber-200 bg-white"}`}
                >
                  {/* User Info Section */}
                  <div
                    className={`px-4 py-3 border-b ${isDark ? "border-slate-700 bg-slate-900" : "border-amber-50 bg-amber-50/50"}`}
                  >
                    <div className="flex items-center gap-3">
                      {user.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt={user.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div
                          className={`h-10 w-10 rounded-lg flex items-center justify-center text-white ${isDark ? "bg-red-600" : "bg-orange-600"}`}
                        >
                          <User className="h-5 w-5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-bold truncate ${isDark ? "text-white" : "text-amber-950"}`}
                        >
                          {user.name}
                        </p>
                        <p
                          className={`text-xs truncate ${isDark ? "text-slate-400" : "text-amber-800/60"}`}
                        >
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <ul className="flex flex-col gap-1 p-2">
                    <li>
                      <Link
                        to="/profile"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-ui font-medium rounded-lg transition-colors ${
                          isDark
                            ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                            : "text-amber-900 hover:bg-amber-50 hover:text-orange-600"
                        }`}
                      >
                        <User className="h-4 w-4" /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-ui font-medium rounded-lg transition-colors ${
                          isDark
                            ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                            : "text-amber-900 hover:bg-amber-50 hover:text-orange-600"
                        }`}
                      >
                        <Settings className="h-4 w-4" /> Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={async () => {
                          try {
                            await logout();
                            navigate(getLogoutUrl());
                          } catch (error) {
                            console.error("Logout error:", error);
                          }
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-ui font-medium rounded-lg transition-colors ${
                          isDark
                            ? "text-red-400 hover:bg-red-600/20"
                            : "text-red-700 hover:bg-red-50"
                        }`}
                      >
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="group relative py-2">
              <Link
                to="/profile"
                className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-200 ${
                  isDark
                    ? "border-slate-700 text-slate-400 hover:bg-red-600 hover:border-red-600 hover:text-white"
                    : "border-amber-200 text-amber-700 hover:bg-orange-600 hover:border-orange-600 hover:text-white"
                }`}
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Login Portals Dropdown */}
              <div className="absolute right-0 top-full w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div
                  className={`mt-2 rounded-xl border p-2 shadow-xl ${isDark ? "border-slate-700 bg-slate-800" : "border-amber-200 bg-white"}`}
                >
                  <div
                    className={`px-3 py-2 mb-1 border-b ${isDark ? "border-slate-700" : "border-amber-50"}`}
                  >
                    <p
                      className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-amber-900/40"}`}
                    >
                      Access Portals
                    </p>
                  </div>
                  <ul className="flex flex-col gap-1">
                    <li>
                      <Link
                        to="/login"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-ui font-medium rounded-lg transition-colors ${
                          isDark
                            ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                            : "text-amber-900 hover:bg-amber-50 hover:text-orange-600"
                        }`}
                      >
                        <User className="h-4 w-4" /> Login User
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/support/login"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-ui font-medium rounded-lg transition-colors ${
                          isDark
                            ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                            : "text-amber-900 hover:bg-amber-50 hover:text-orange-600"
                        }`}
                      >
                        <Headset className="h-4 w-4" /> Support Access
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/login"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-ui font-medium rounded-lg transition-colors ${
                          isDark
                            ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                            : "text-amber-900 hover:bg-amber-50 hover:text-orange-600"
                        }`}
                      >
                        <ShieldCheck className="h-4 w-4" /> Admin Portal
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/super-admin/login"
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-ui font-medium rounded-lg transition-colors ${
                          isDark
                            ? "text-red-400 hover:bg-red-600/20"
                            : "text-red-700 hover:bg-red-50"
                        }`}
                      >
                        <ShieldAlert className="h-4 w-4" /> Super Admin
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-200 ${
              isDark
                ? "border-slate-700 text-slate-400 hover:bg-red-600 hover:border-red-600 hover:text-white"
                : "border-amber-200 text-amber-700 hover:bg-orange-600 hover:border-orange-600 hover:text-white"
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
