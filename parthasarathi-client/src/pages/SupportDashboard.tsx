import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  Users,
  Bell,
  Search,
} from "lucide-react";
import Header from "../components/layout/Header";

const SupportDashboard = () => {
  const stats = [
    {
      label: "Open Tickets",
      value: "12",
      icon: <MessageSquare />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      label: "Pending Orders",
      value: "45",
      icon: <Package />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      label: "Active Users",
      value: "1.2k",
      icon: <Users />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Urgent Queries",
      value: "3",
      icon: <Bell />,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffaf5] flex flex-col">
      <Header />
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-amber-100 hidden md:flex flex-col p-6">
          <nav className="space-y-2">
            <Link
              to="/support/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-950 text-white font-ui font-bold text-sm"
            >
              <LayoutDashboard className="size-4" /> Dashboard
            </Link>
            <Link
              to="/support/tickets"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-amber-900/60 hover:bg-amber-50 font-ui font-bold text-sm transition-all"
            >
              <MessageSquare className="size-4" /> Tickets
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-amber-900/60 hover:bg-amber-50 font-ui font-bold text-sm transition-all"
            >
              <Package className="size-4" /> Orders
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12">
          <div className="flex justify-between items-center mb-10">
            <h1 className="font-helper text-3xl font-semibold text-amber-950">
              Support Overview
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-amber-400" />
              <input
                type="text"
                placeholder="Search tickets or orders..."
                className="pl-10 pr-4 py-2 rounded-lg border border-amber-100 bg-white outline-none focus:border-orange-500 text-sm font-ui w-64"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm"
              >
                <div
                  className={`size-10 rounded-lg ${stat.color} flex items-center justify-center mb-4`}
                >
                  {stat.icon}
                </div>
                <p className="text-xs font-bold text-amber-900/40 uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-helper font-semibold text-amber-950">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl border border-amber-100 p-8 shadow-sm">
            <h3 className="font-ui font-bold text-amber-950 mb-6">
              Recent Ticket Activity
            </h3>
            <div className="space-y-4">
              {[
                {
                  user: "Amit K.",
                  subject: "Sitar Tuning Issue",
                  time: "10 mins ago",
                  status: "Urgent",
                },
                {
                  user: "Sarah J.",
                  subject: "Shipping to London",
                  time: "1 hour ago",
                  status: "Open",
                },
                {
                  user: "Rajesh M.",
                  subject: "Tabla Skin Replacement",
                  time: "3 hours ago",
                  status: "Open",
                },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl bg-amber-50/30 border border-amber-50 hover:border-amber-100 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-700 text-xs">
                      {activity.user.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-amber-950">
                        {activity.subject}
                      </p>
                      <p className="text-[10px] text-amber-800/40 font-medium uppercase tracking-wider">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${
                      activity.status === "Urgent"
                        ? "bg-red-100 text-red-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupportDashboard;
