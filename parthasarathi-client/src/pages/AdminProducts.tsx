import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { adminService } from "../services/adminService";
import { toast } from "sonner";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await adminService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <Helmet>
        <title>Manage Products - Admin</title>
      </Helmet>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Link
          to="/admin/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add New Product
        </Link>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow border">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Stock
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id || product.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product._id || product.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ₹{product.price?.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-4">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
