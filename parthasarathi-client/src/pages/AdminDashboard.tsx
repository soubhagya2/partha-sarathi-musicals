import AdminLayout from "../components/layout/AdminLayout";
import {
  TrendingUp,
  Package,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const StatCard = ({ title, value, change, icon: Icon, isPositive }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="size-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-950">
        <Icon className="size-6" />
      </div>
      <div
        className={`flex items-center gap-1 text-xs font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}
      >
        {isPositive ? (
          <ArrowUpRight className="size-3" />
        ) : (
          <ArrowDownRight className="size-3" />
        )}
        {change}
      </div>
    </div>
    <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
  </div>
);

const AdminDashboard = () => {
  const recentOrders = [
    {
      id: "#ORD-7721",
      customer: "Rahul Sharma",
      product: "Yamaha F310 Acoustic",
      amount: "₹9,500",
      status: "Delivered",
    },
    {
      id: "#ORD-7722",
      customer: "Priya Das",
      product: "Roland FP-30X Digital Piano",
      amount: "₹62,000",
      status: "Processing",
    },
    {
      id: "#ORD-7723",
      customer: "Amit Singh",
      product: "Fender Stratocaster",
      amount: "₹1,45,000",
      status: "Shipped",
    },
    {
      id: "#ORD-7724",
      customer: "Sneha Kapoor",
      product: "Focusrite Scarlett 2i2",
      amount: "₹15,800",
      status: "Pending",
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value="₹4,25,000"
            change="+12.5%"
            icon={DollarSign}
            isPositive={true}
          />
          <StatCard
            title="Total Orders"
            value="156"
            change="+8.2%"
            icon={Package}
            isPositive={true}
          />
          <StatCard
            title="New Customers"
            value="42"
            change="-2.4%"
            icon={Users}
            isPositive={false}
          />
          <StatCard
            title="Conversion Rate"
            value="3.2%"
            change="+1.1%"
            icon={TrendingUp}
            isPositive={true}
          />
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-helper font-bold text-gray-900 text-lg">
              Recent Orders
            </h3>
            <button className="text-sm font-bold text-red-950 hover:underline uppercase tracking-widest">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-[0.15em] font-bold">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-red-50/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-sm text-red-950 font-bold">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "Shipped"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
