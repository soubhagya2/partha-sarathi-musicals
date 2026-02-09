import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Music,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Music, label: "Products", path: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
  { icon: Users, label: "Customers", path: "/admin/customers" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-red-950 text-white flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-red-900/50">
          <div className="size-8 rounded-lg bg-white flex items-center justify-center text-red-950">
            <ShieldAlert className="size-5" />
          </div>
          <span className="font-helper font-bold text-lg tracking-tight">
            Admin Panel
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? "bg-white text-red-950 shadow-[0_8px_30px_rgb(0,0,0,0.12)] scale-[1.02]"
                    : "text-red-100/70 hover:bg-red-900/40 hover:text-white hover:translate-x-1"
                }`}
              >
                <item.icon
                  className={`size-5 transition-transform ${isActive ? "" : "group-hover:scale-110"}`}
                />
                <span className="font-ui text-sm font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-red-900/50">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-red-100/70 hover:text-white transition-colors"
          >
            <LogOut className="size-5" />
            <span className="font-ui text-sm font-medium">Exit to Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="font-helper text-xl font-semibold text-gray-800">
            {navItems.find((n) => n.path === location.pathname)?.label ||
              "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right mr-2">
              <p className="text-sm font-bold text-gray-900">
                {user?.name || "Admin"}
              </p>
              <p className="text-[10px] font-bold text-red-700 uppercase tracking-widest">
                {user?.role || "ADMIN"}
              </p>
            </div>
            <button
              onClick={() => logout()}
              className="size-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all"
            >
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  className="size-full rounded-full object-cover"
                  alt=""
                />
              ) : (
                <LogOut className="size-5" />
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
