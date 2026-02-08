import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import { CreditCard, Truck, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <Header />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <Breadcrumbs
          items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]}
        />

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white p-8 rounded-3xl border border-amber-100">
              <h2 className="font-helper text-2xl font-semibold text-amber-950 mb-6 flex items-center gap-3">
                <Truck className="size-6 text-orange-600" /> Shipping Details
              </h2>
              <form className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-amber-50/30 outline-none focus:border-orange-500 font-ui text-sm"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-amber-50/30 outline-none focus:border-orange-500 font-ui text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-amber-50/30 outline-none focus:border-orange-500 font-ui text-sm md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-amber-50/30 outline-none focus:border-orange-500 font-ui text-sm md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-amber-50/30 outline-none focus:border-orange-500 font-ui text-sm"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-amber-50/30 outline-none focus:border-orange-500 font-ui text-sm"
                />
              </form>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-amber-100">
              <h2 className="font-helper text-2xl font-semibold text-amber-950 mb-6 flex items-center gap-3">
                <CreditCard className="size-6 text-orange-600" /> Payment Method
              </h2>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 rounded-xl border-2 border-orange-500 bg-orange-50/30 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="accent-orange-600"
                  />
                  <span className="font-ui font-bold text-amber-950">
                    Online Payment (Razorpay/Stripe)
                  </span>
                </label>
                <label className="flex items-center gap-4 p-4 rounded-xl border-2 border-amber-100 hover:border-orange-200 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="payment"
                    className="accent-orange-600"
                  />
                  <span className="font-ui font-bold text-amber-950">
                    Cash on Delivery
                  </span>
                </label>
              </div>
            </section>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-amber-950 text-white p-8 rounded-[2.5rem] sticky top-24">
              <h3 className="font-helper text-2xl font-semibold mb-8">
                Order Summary
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="size-12 rounded-lg bg-white/10 overflow-hidden">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWCHkQGW5GKWlNLaqV14qiCjjDhawLJXucBHLlsknc2jW2ZVq8Ql0uINt5vMZLCzbAwsKgqY5nszOi5Z5av8IzfCreGPmiB-HSXzLxlVp_AOi1uTB-O2m2b7CeY0CW3-RiQrBNJCy2r4iEcrWMpnUrZfkzdV_K9exGEnS6i7NLciihnKNPmpvuE7x09dkKtjnuIymJpswAwuvnFriuuf1JUjk-2DLHPmGcLspPIdPYkP1eUZTybN8YBnpLtqKrNCLxPpJHoscIZ9bW"
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">
                      Handcrafted Tabla Set x 1
                    </span>
                  </div>
                  <span className="font-bold">₹14,999</span>
                </div>
              </div>
              <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                <div className="flex justify-between text-white/60 text-sm">
                  <span className="font-helper">Subtotal</span>
                  <span>₹14,999</span>
                </div>
                <div className="flex justify-between text-white/60 text-sm">
                  <span className="font-helper">Shipping</span>
                  <span className="text-orange-400">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2">
                  <span>Total</span>
                  <span>₹14,999</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/order-confirmation")}
                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20 active:scale-[0.98]"
              >
                Complete Purchase
              </button>
              <p className="font-helper mt-6 flex items-center justify-center gap-2 text-xs text-white/40 uppercase tracking-widest font-bold">
                <ShieldCheck className="size-4" /> 256-bit Secure Checkout
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
