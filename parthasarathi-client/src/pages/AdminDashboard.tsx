import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <Helmet>
        <title>Admin Dashboard - Parthasarathi Musical</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2">Product Management</h2>
          <p className="text-gray-600 mb-4">
            Add, edit, or remove products from the store catalog.
          </p>
          <Link
            to="/admin/products"
            className="text-blue-600 hover:underline font-medium"
          >
            Manage Products &rarr;
          </Link>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2">Support Management</h2>
          <p className="text-gray-600 mb-4">
            View and respond to customer support tickets and inquiries.
          </p>
          <Link
            to="/admin/support"
            className="text-blue-600 hover:underline font-medium"
          >
            Manage Support &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
