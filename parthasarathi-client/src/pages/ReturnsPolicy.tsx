import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import { RotateCcw, ShieldCheck, AlertCircle } from "lucide-react";

const ReturnsPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <Breadcrumbs items={[{ label: "Returns & Refunds" }]} />

        <h1 className="font-brand text-4xl lg:text-5xl text-amber-950 mb-8">
          Returns & Refunds
        </h1>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-12">
          <div className="flex gap-4">
            <ShieldCheck className="size-6 text-orange-600 shrink-0" />
            <div>
              <h3 className="font-ui font-bold text-amber-950">
                Tonal Satisfaction Guarantee
              </h3>
              <p className="text-sm text-amber-800/70 mt-1">
                If your instrument doesn't resonate with your soul, we offer a
                7-day trial period for all professional-grade instruments.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-10 font-content text-lg text-amber-900/80 leading-relaxed">
          <section>
            <h2 className="font-ui text-2xl font-bold text-amber-950 mb-4">
              Return Eligibility
            </h2>
            <p>
              To be eligible for a return, your instrument must be in the same
              condition that you received it, unworn or unused, with tags, and
              in its original packaging. You’ll also need the receipt or proof
              of purchase.
            </p>
          </section>

          <section>
            <h2 className="font-ui text-2xl font-bold text-amber-950 mb-4">
              The Return Process
            </h2>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                Contact our support team at{" "}
                <strong>returns@parthasarathi.com</strong> within 7 days of
                delivery.
              </li>
              <li>Provide photos of the instrument and the packaging.</li>
              <li>
                Once approved, we will arrange a specialized courier pickup (for
                domestic orders).
              </li>
              <li>
                After inspection at our workshop, your refund or exchange will
                be processed.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="font-ui text-2xl font-bold text-amber-950 mb-4">
              Refunds
            </h2>
            <p>
              We will notify you once we’ve received and inspected your return.
              If approved, you’ll be automatically refunded on your original
              payment method within 10 business days. Please remember it can
              take some time for your bank or credit card company to process and
              post the refund too.
            </p>
          </section>

          <section className="p-8 rounded-3xl border-2 border-dashed border-amber-200 bg-amber-50/30">
            <h3 className="font-ui font-bold text-amber-950 flex items-center gap-2 mb-3">
              <AlertCircle className="size-5 text-orange-600" /> Non-returnable
              Items
            </h3>
            <p className="text-sm text-amber-800/70">
              Custom-made instruments, personalized engravings, and opened
              accessory packs (strings, reeds, etc.) cannot be returned unless
              they arrive damaged.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnsPolicy;
