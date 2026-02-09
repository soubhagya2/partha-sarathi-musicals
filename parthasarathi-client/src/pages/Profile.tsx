import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useApiClient from "../services/apiClient";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import {
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
  Music,
  Loader,
} from "lucide-react";
import { toast } from "sonner";

interface Order {
  _id: string;
  id: string;
  orderNumber: string;
  date: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: number;
}

interface Address {
  _id: string;
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface UserProfile {
  rewards: number;
  totalOrders: number;
  totalSpent: number;
}

const Profile = () => {
  const auth = useAuth();
  const api = useApiClient();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from backend
  useEffect(() => {
    if (!auth.isLoaded || !auth.user) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const ordersData = await api.get<{ orders: any[] }>(
          "/orders/my-orders",
        );
        setOrders(ordersData.orders || []);

        const addressData = await api.get<{ addresses: any[] }>(
          "/addresses/my-addresses",
        );
        setAddresses(addressData.addresses || []);

        const profileRes = await api.get<{ profile: any }>("/users/profile");
        setProfile(profileRes.profile || null);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth.isLoaded, auth.user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (auth.isLoaded && !auth.user) {
      navigate("/login");
    }
  }, [auth.isLoaded, auth.user, navigate]);

  if (!auth.isLoaded || !auth.user) {
    return null;
  }

  const navItems = [
    {
      id: "orders",
      icon: <Package className="size-5" />,
      label: "My Orders",
    },
    {
      id: "addresses",
      icon: <MapPin className="size-5" />,
      label: "Addresses",
    },
    {
      id: "settings",
      icon: <Settings className="size-5" />,
      label: "Account Settings",
    },
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
                <div className="size-24 rounded-full overflow-hidden border-4 border-orange-100 mb-4 bg-amber-50 flex items-center justify-center">
                  {auth.user?.imageUrl ? (
                    <img
                      src={auth.user.imageUrl}
                      alt={auth.user.name || ""}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="size-10 text-amber-200" />
                  )}
                </div>
                <h2 className="font-helper text-2xl font-semibold text-amber-950">
                  {auth.user?.name || auth.user?.email || "Guest"}
                </h2>
                <p className="text-sm text-amber-800/60 font-ui">
                  {auth.user?.email}
                </p>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-ui font-bold text-sm transition-all ${
                      activeTab === item.id
                        ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                        : "text-amber-950/60 hover:bg-amber-50 hover:text-amber-950"
                    }`}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}
                <button
                  onClick={() => auth.logout()}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-ui font-bold text-sm text-red-500 hover:bg-red-50 transition-all mt-4"
                >
                  <LogOut className="size-5" /> Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-3xl border border-amber-100 p-8 lg:p-10 flex items-center justify-center py-16">
                <div className="flex flex-col items-center gap-4">
                  <Loader className="size-8 text-orange-600 animate-spin" />
                  <p className="font-ui text-amber-800/60">
                    Loading your data...
                  </p>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {!loading && activeTab === "orders" && (
              <section className="bg-white rounded-3xl border border-amber-100 p-8 lg:p-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-helper text-3xl font-semibold text-amber-950">
                    Recent Orders
                  </h3>
                  {profile && (
                    <div className="text-right">
                      <p className="text-xs font-bold text-amber-800/60 uppercase tracking-widest">
                        Total Orders
                      </p>
                      <p className="font-helper text-2xl font-semibold text-orange-600">
                        {profile.totalOrders}
                      </p>
                    </div>
                  )}
                </div>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="size-12 text-amber-200 mx-auto mb-4" />
                    <p className="font-ui text-amber-800/60 mb-6">
                      No orders yet. Start exploring our collection!
                    </p>
                    <button
                      onClick={() => navigate("/products")}
                      className="font-ui bg-orange-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-orange-700 transition-colors"
                    >
                      Explore Products
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order._id || order.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-amber-50 bg-amber-50/30 hover:bg-white hover:border-orange-200 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-6">
                          <div className="size-12 rounded-xl bg-white flex items-center justify-center text-orange-600 shadow-sm">
                            <Package className="size-6" />
                          </div>
                          <div>
                            <p className="font-ui font-bold text-amber-950">
                              {order.orderNumber}
                            </p>
                            <p className="font-helper text-xs text-amber-800/60 font-medium">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                            <p className="font-helper text-xs text-amber-800/40">
                              {order.items} item(s)
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-10 mt-4 sm:mt-0">
                          <div className="text-right">
                            <p className="font-ui font-bold text-amber-950">
                              ₹{order.total.toLocaleString("en-IN")}
                            </p>
                            <span
                              className={`font-helper text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full inline-block ${
                                order.status === "Delivered"
                                  ? "text-green-600 bg-green-50"
                                  : order.status === "Cancelled"
                                    ? "text-red-600 bg-red-50"
                                    : "text-blue-600 bg-blue-50"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Addresses Tab */}
            {!loading && activeTab === "addresses" && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-helper text-3xl font-semibold text-amber-950">
                    My Addresses
                  </h3>
                  <button
                    onClick={() => navigate("/profile/add-address")}
                    className="font-ui bg-orange-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-orange-700 transition-colors"
                  >
                    + Add New
                  </button>
                </div>
                {addresses.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-amber-100 p-8 text-center py-12">
                    <MapPin className="size-12 text-amber-200 mx-auto mb-4" />
                    <p className="font-ui text-amber-800/60 mb-6">
                      No addresses saved yet.
                    </p>
                    <button
                      onClick={() => navigate("/profile/add-address")}
                      className="font-ui bg-orange-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-orange-700 transition-colors"
                    >
                      Add Your First Address
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {addresses.map((addr) => (
                      <div
                        key={addr._id || addr.id}
                        className={`bg-white rounded-3xl border p-6 relative ${addr.isDefault ? "border-orange-300 bg-orange-50/30" : "border-amber-100"}`}
                      >
                        {addr.isDefault && (
                          <span className="absolute top-3 right-3 font-helper text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                            Default
                          </span>
                        )}
                        <h4 className="font-ui font-bold text-amber-950 mb-3">
                          {addr.name}
                        </h4>
                        <p className="font-ui text-sm text-amber-800/70 text-leading-relaxed mb-4">
                          {addr.address}
                          <br />
                          {addr.city}, {addr.state} {addr.pincode}
                        </p>
                        <p className="font-ui text-xs text-amber-800/60 mb-4">
                          Phone: {addr.phone}
                        </p>
                        <div className="flex gap-3">
                          <button className="flex-1 font-ui text-orange-600 font-bold text-sm hover:underline py-2">
                            Edit
                          </button>
                          <button className="flex-1 font-ui text-red-600 font-bold text-sm hover:underline py-2">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Settings Tab */}
            {!loading && activeTab === "settings" && (
              <section className="bg-white rounded-3xl border border-amber-100 p-8 lg:p-10 space-y-8">
                <div>
                  <h3 className="font-helper text-3xl font-semibold text-amber-950 mb-2">
                    Account Settings
                  </h3>
                  <p className="font-ui text-amber-800/60">
                    Manage your profile information and preferences
                  </p>
                </div>

                <div className="border-t border-amber-100 pt-8 space-y-6">
                  <div>
                    <label className="font-ui font-bold text-sm text-amber-950 block mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={auth.user?.name || ""}
                      disabled
                      className="w-full px-4 py-2 rounded-lg border border-amber-100 bg-amber-50/50 font-ui text-amber-950 text-sm disabled:cursor-not-allowed"
                    />
                    <p className="font-ui text-[10px] text-amber-800/60 mt-2">
                      Managed by your authentication provider
                    </p>
                  </div>

                  <div>
                    <label className="font-ui font-bold text-sm text-amber-950 block mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={auth.user?.email || ""}
                      disabled
                      className="w-full px-4 py-2 rounded-lg border border-amber-100 bg-amber-50/50 font-ui text-amber-950 text-sm disabled:cursor-not-allowed"
                    />
                    <p className="font-ui text-[10px] text-amber-800/60 mt-2">
                      Verified email address
                    </p>
                  </div>

                  <div>
                    <label className="font-ui font-bold text-sm text-amber-950 block mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Add your phone number"
                      className="w-full px-4 py-2 rounded-lg border border-amber-100 bg-white font-ui text-amber-950 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-ui font-bold text-sm hover:bg-orange-700 transition-colors mt-8">
                    Save Changes
                  </button>
                </div>

                <div className="border-t border-amber-100 pt-8">
                  <h4 className="font-ui font-bold text-amber-950 mb-4">
                    Danger Zone
                  </h4>
                  <button className="w-full border-2 border-red-200 text-red-600 py-3 rounded-lg font-ui font-bold text-sm hover:bg-red-50 transition-colors">
                    Delete Account
                  </button>
                </div>
              </section>
            )}

            {/* Stats Card */}
            {!loading && profile && (
              <section className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl border border-amber-100 p-8">
                  <h4 className="font-helper font-bold text-amber-900 uppercase tracking-wider text-xs mb-4">
                    Total Spent
                  </h4>
                  <p className="font-helper text-4xl font-bold text-orange-600 mb-2">
                    ₹{profile.totalSpent.toLocaleString("en-IN")}
                  </p>
                  <p className="font-ui text-sm text-amber-800/60">
                    Across all your purchases
                  </p>
                </div>
                <div className="bg-orange-600 rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="font-ui font-bold mb-2">Musical Rewards</h4>
                    <p className="font-helper text-3xl font-bold mb-2">
                      {profile.rewards} Points
                    </p>
                    <p className="font-ui text-white/80 text-sm mb-6">
                      Redeem on your next purchase
                    </p>
                    <button className="font-ui bg-white text-orange-600 px-6 py-2 rounded-lg font-bold text-sm hover:bg-amber-50 transition-colors">
                      Redeem Now
                    </button>
                  </div>
                  <Music className="absolute -bottom-4 -right-4 size-32 text-white/10 rotate-12" />
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
