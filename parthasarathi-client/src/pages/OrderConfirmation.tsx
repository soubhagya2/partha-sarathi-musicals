import { Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";

const OrderConfirmation = () => {
  const orderId =
    "PSM-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf5]">
      <Header />
      <main className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full">
        <Breadcrumbs items={[{ label: "Order Confirmation" }]} />

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8 flex justify-center">
              <div className="size-24 rounded-full bg-green-50 flex items-center justify-center text-green-500 shadow-inner">
                <CheckCircle className="size-12" />
              </div>
            </div>

            <h1 className="font-brand text-4xl lg:text-5xl text-amber-900 mb-4">
              Thank You for Your Order!
            </h1>
            <p className="font-ui text-lg text-amber-800/60 mb-8">
              Your musical journey continues. We've received your order and are
              preparing it with the utmost care.
            </p>

            <div className="bg-white rounded-3xl border border-amber-100 p-8 mb-10 shadow-sm text-left">
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 pb-6 border-b border-amber-50">
                <div>
                  <p className="text-xs font-bold text-amber-900/40 uppercase tracking-widest mb-1">
                    Order Number
                  </p>
                  <p className="font-ui font-bold text-amber-900">{orderId}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-900/40 uppercase tracking-widest mb-1">
                    Estimated Delivery
                  </p>
                  <p className="font-ui font-bold text-amber-900">
                    5-7 Business Days
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                  <Package className="size-5" />
                </div>
                <div>
                  <h4 className="font-ui font-bold text-amber-900 mb-1">
                    Order Tracking
                  </h4>
                  <p className="text-sm text-amber-800/60 leading-relaxed">
                    A confirmation email has been sent to your inbox. You can
                    track your instrument's progress once it ships.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-amber-950 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
              >
                Continue Shopping <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/"
                className="border-2 border-amber-100 text-amber-900 px-8 py-4 rounded-xl font-bold text-sm hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
              >
                <Home className="size-4" /> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
