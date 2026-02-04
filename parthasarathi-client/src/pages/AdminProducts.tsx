import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AdminProducts() {
  // Mock data for demonstration
  const products = [
    { id: 1, name: "Acoustic Guitar", price: "₹15,000", stock: 12 },
    { id: 2, name: "Electronic Keyboard", price: "₹25,000", stock: 8 },
  ];

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
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product.price}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
