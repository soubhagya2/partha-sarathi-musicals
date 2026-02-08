import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import { Truck, Globe, ShieldCheck, Clock } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <Breadcrumbs items={[{ label: "Shipping Policy" }]} />

        <h1 className="font-helper text-4xl lg:text-5xl font-semibold text-amber-950 mb-8">
          Shipping Policy
        </h1>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex gap-4">
            <Truck className="size-6 text-orange-600 shrink-0" />
            <div>
              <h3 className="font-ui font-bold text-amber-950 text-sm mb-1">
                Domestic Shipping
              </h3>
              <p className="text-xs text-amber-800/60">
                Free shipping across India on orders above ₹5,000.
              </p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex gap-4">
            <Globe className="size-6 text-orange-600 shrink-0" />
            <div>
              <h3 className="font-ui font-bold text-amber-950 text-sm mb-1">
                Global Delivery
              </h3>
              <p className="text-xs text-amber-800/60">
                We ship to over 50 countries with specialized instrument
                handling.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 font-content text-lg text-amber-900/80 leading-relaxed">
          <section>
            <h2 className="font-ui text-2xl font-bold text-amber-950 mb-4">
              White-Glove Instrument Handling
            </h2>
            <p>
              Musical instruments are delicate souls. At Parthasarathi Musical,
              we employ a "White-Glove" shipping process. Every Sitar, Sarod, or
              Tabla set is double-boxed with custom-molded shock-absorption
              materials to ensure it arrives in perfect tonal condition.
            </p>
          </section>

          <section>
            <h2 className="font-ui text-2xl font-bold text-amber-950 mb-4">
              Processing & Delivery Times
            </h2>
            <p>
              Standard instruments are processed within 2-3 business days.
              Handcrafted or custom-tuned instruments may require up to 7
              business days for final tonal calibration before dispatch.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Metro Cities:</strong> 3-5 business days
              </li>
              <li>
                <strong>Rest of India:</strong> 5-8 business days
              </li>
              <li>
                <strong>International:</strong> 10-15 business days (subject to
                customs)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-ui text-2xl font-bold text-amber-950 mb-4">
              Insurance & Tracking
            </h2>
            <p>
              All shipments are fully insured against damage or loss during
              transit. Once your instrument is dispatched, you will receive a
              tracking number via email and SMS. We partner with premium
              carriers like DHL, FedEx, and BlueDart to ensure reliability.
            </p>
          </section>

          <div className="p-8 rounded-3xl bg-orange-600 text-white mt-12">
            <h3 className="font-helper text-2xl font-semibold mb-2">
              Need it faster?
            </h3>
            <p className="text-white/80 text-sm mb-4">
              Expedited shipping options are available at checkout for most
              locations.
            </p>
            <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold text-sm">
              Contact Logistics Team
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
