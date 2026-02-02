import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import {
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Music,
} from "lucide-react";

const Profile = () => {
  const user = {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    memberSince: "Jan 2023",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyv-KJIREQljK0B_6usUYDU8mloX2mTHc3xYJ2oRAMKUlIXDnQ_hrge5Ob5OCV-RXjWuxRZdv6v9y5bELFdEuKJj7l5zVNjG6RM1er3zdt538bMoVwEWKZvV0SD8JsRGNRsJdjwJD3lr6djQAz5NmNuaveCgaYyuj16SHRcam-MG_YD_QJJz_LSXgHAJcMRZf7rBqdI3JqGx9BhbxhjZ9D0K0iuJPXCl1MUbFzhDe_EMlAs2xVqNEJqV-MEFW69Sr3e5nbh7zpSROZ",
  };

  const orders = [
    {
      id: "PSM-82910",
      date: "Oct 15, 2023",
      status: "Delivered",
      total: 14999,
    },
    { id: "PSM-71234", date: "Aug 22, 2023", status: "Delivered", total: 1250 },
  ];

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <Header />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <Breadcrumbs items={[{ label: "My Profile" }]} />

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-amber-100 p-8 sticky top-24">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="size-24 rounded-full overflow-hidden border-4 border-orange-100 mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="font-brand text-2xl text-amber-950">
                  {user.name}
                </h2>
                <p className="text-sm text-amber-800/60 font-ui">
                  {user.email}
                </p>
              </div>

              <nav className="space-y-2">
                {[
                  {
                    icon: <Package className="size-5" />,
                    label: "My Orders",
                    active: true,
                  },
                  { icon: <MapPin className="size-5" />, label: "Addresses" },
                  {
                    icon: <Settings className="size-5" />,
                    label: "Account Settings",
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-ui font-bold text-sm transition-all ${
                      item.active
                        ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                        : "text-amber-950/60 hover:bg-amber-50 hover:text-amber-950"
                    }`}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-ui font-bold text-sm text-red-500 hover:bg-red-50 transition-all mt-4">
                  <LogOut className="size-5" /> Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            <section className="bg-white rounded-3xl border border-amber-100 p-8 lg:p-10">
              <h3 className="font-brand text-3xl text-amber-950 mb-8">
                Recent Orders
              </h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-amber-50 bg-amber-50/30 hover:bg-white hover:border-orange-200 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <div className="size-12 rounded-xl bg-white flex items-center justify-center text-orange-600 shadow-sm">
                        <Package className="size-6" />
                      </div>
                      <div>
                        <p className="font-ui font-bold text-amber-950">
                          {order.id}
                        </p>
                        <p className="font-helper text-xs text-amber-800/60 font-medium">
                          {order.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-10 mt-4 sm:mt-0">
                      <div className="text-right">
                        <p className="font-ui font-bold text-amber-950">
                          ₹{order.total.toLocaleString("en-IN")}
                        </p>
                        <span className="font-helper text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          {order.status}
                        </span>
                      </div>
                      <ChevronRight className="size-5 text-amber-300 group-hover:text-orange-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl border border-amber-100 p-8">
                <h4 className="font-helper font-bold text-amber-950 uppercase tracking-wider text-xs mb-4">
                  Default Address
                </h4>
                <p className="font-ui text-sm text-amber-800/70 leading-relaxed mb-6">
                  Rahul Sharma
                  <br />
                  123 Heritage Lane, Salt Lake City
                  <br />
                  Kolkata, West Bengal 700091
                  <br />
                  India
                </p>
                <button className="font-ui text-orange-600 font-bold text-sm hover:underline">
                  Edit Address
                </button>
              </div>
              <div className="bg-orange-600 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-ui font-bold mb-2">Musical Rewards</h4>
                  <p className="font-ui text-white/80 text-sm mb-6">
                    You have 450 points to redeem on your next purchase.
                  </p>
                  <button className="font-ui bg-white text-orange-600 px-6 py-2 rounded-lg font-bold text-sm hover:bg-amber-50 transition-colors">
                    View Rewards
                  </button>
                </div>
                <Music className="absolute -bottom-4 -right-4 size-32 text-white/10 rotate-12" />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
