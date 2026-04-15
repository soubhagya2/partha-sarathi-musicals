import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import {
  Package,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Music,
} from "lucide-react";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) return null;

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
                  {user.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-amber-100 flex items-center justify-center text-amber-900 font-bold text-2xl">
                      {user.name?.charAt(0)}
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-semibold text-amber-950">
                  {user.name}
                </h2>
                <p className="text-sm text-amber-800/60">{user.email}</p>
              </div>

              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-600 text-white">
                  <Package className="size-5" /> My Orders
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-amber-950/60 hover:bg-amber-50">
                  <MapPin className="size-5" /> Addresses
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-amber-950/60 hover:bg-amber-50">
                  <Settings className="size-5" /> Account Settings
                </button>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 mt-4"
                >
                  <LogOut className="size-5" /> Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-9 space-y-8">
            <section className="bg-white rounded-3xl border p-8">
              <h3 className="text-3xl font-semibold mb-8">Recent Orders</h3>

              {orders.map((order) => (
                <div key={order.id} className="p-4 border rounded-xl mb-3">
                  <p>{order.id}</p>
                  <p>₹{order.total}</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
