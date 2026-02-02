import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import { Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = [
    {
      id: "1",
      name: "Handcrafted Tabla Set",
      price: 14999,
      quantity: 1,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDWCHkQGW5GKWlNLaqV14qiCjjDhawLJXucBHLlsknc2jW2ZVq8Ql0uINt5vMZLCzbAwsKgqY5nszOi5Z5av8IzfCreGPmiB-HSXzLxlVp_AOi1uTB-O2m2b7CeY0CW3-RiQrBNJCy2r4iEcrWMpnUrZfkzdV_K9exGEnS6i7NLciihnKNPmpvuE7x09dkKtjnuIymJpswAwuvnFriuuf1JUjk-2DLHPmGcLspPIdPYkP1eUZTybN8YBnpLtqKrNCLxPpJHoscIZ9bW",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <Header />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <Breadcrumbs items={[{ label: "Your Cart" }]} />

        <h1 className="font-brand text-4xl text-amber-950 mb-10">Your Cart</h1>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-2xl border border-amber-100 flex gap-6 items-center"
                >
                  <div className="size-24 rounded-xl overflow-hidden bg-amber-50 shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-ui font-bold text-amber-950">
                      {item.name}
                    </h3>
                    <p className="font-ui text-orange-600 font-bold">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="flex items-center border border-amber-200 rounded-lg">
                    <button className="px-3 py-1 hover:bg-amber-50">-</button>
                    <span className="px-4 py-1 font-ui font-bold border-x border-amber-200">
                      {item.quantity}
                    </span>
                    <button className="px-3 py-1 hover:bg-amber-50">+</button>
                  </div>
                  <button className="text-amber-300 hover:text-red-500 transition-colors">
                    <Trash2 className="size-5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-amber-100">
                <p className="font-ui text-amber-800/60 mb-6">
                  Your cart is currently empty.
                </p>
                <Link
                  to="/products"
                  className="text-orange-600 font-bold hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm sticky top-24">
              <h3 className="font-brand text-2xl text-amber-950 mb-6">
                Order Summary
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-amber-800/60 font-helper text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-amber-800/60 font-helper text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="pt-4 border-t border-amber-100 flex justify-between text-xl font-bold text-amber-950">
                  <span>Total</span>
                  <span className="font-ui">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <Link
                to="/checkout"
                className={`w-full bg-amber-950 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all ${cartItems.length === 0 ? "pointer-events-none opacity-50" : ""}`}
              >
                Proceed to Checkout <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
