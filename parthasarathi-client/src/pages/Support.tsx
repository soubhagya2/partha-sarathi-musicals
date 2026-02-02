import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import { Search, MessageCircle, Phone, Mail, ChevronDown } from "lucide-react";

const Support = () => {
  const faqs = [
    {
      q: "How do I tune my new Sitar?",
      a: "Every Sitar comes with a basic tuning guide. For professional calibration, we recommend our video consultation service available in the 'Services' section.",
    },
    {
      q: "Do you provide international warranty?",
      a: "Yes, all our handcrafted instruments come with a 1-year global warranty against manufacturing defects.",
    },
    {
      q: "Can I visit your workshop in Kolkata?",
      a: "Absolutely! We welcome musicians to our workshop by appointment. Please contact us to schedule a visit.",
    },
    {
      q: "How should I store my instrument in dry weather?",
      a: "We recommend using a room humidifier and keeping the instrument in its hard case when not in use to prevent wood cracking.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-16">
        <Breadcrumbs items={[{ label: "Support Center" }]} />

        <div className="text-center mb-16">
          <h1 className="font-brand text-5xl text-amber-950 mb-4">
            Support Center
          </h1>
          <p className="font-ui text-lg text-amber-800/60">
            How can we help you on your musical journey today?
          </p>

          <div className="max-w-xl mx-auto mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 size-5" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-amber-100 shadow-sm outline-none focus:border-orange-500 transition-all font-ui"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-3xl border border-amber-100 text-center hover:shadow-lg transition-all">
            <MessageCircle className="size-8 text-orange-600 mx-auto mb-4" />
            <h3 className="font-ui font-bold text-amber-950 mb-2">Live Chat</h3>
            <p className="text-xs text-amber-800/60 mb-4">
              Available Mon-Sat, 10am-7pm IST
            </p>
            <button className="font-ui text-orange-600 font-bold text-sm">
              Start Chat
            </button>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-amber-100 text-center hover:shadow-lg transition-all">
            <Phone className="size-8 text-orange-600 mx-auto mb-4" />
            <h3 className="font-ui font-bold text-amber-950 mb-2">
              Call Support
            </h3>
            <p className="text-xs text-amber-800/60 mb-4">+91 98765 43210</p>
            <button className="font-ui text-orange-600 font-bold text-sm">
              Call Now
            </button>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-amber-100 text-center hover:shadow-lg transition-all">
            <Mail className="size-8 text-orange-600 mx-auto mb-4" />
            <h3 className="font-ui font-bold text-amber-950 mb-2">Email Us</h3>
            <p className="text-xs text-amber-800/60 mb-4">
              support@parthasarathi.com
            </p>
            <button className="font-ui text-orange-600 font-bold text-sm">
              Send Email
            </button>
          </div>
        </div>

        <section className="max-w-3xl mx-auto">
          <h2 className="font-brand text-3xl text-amber-950 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-amber-100 overflow-hidden"
              >
                <button className="w-full px-6 py-5 flex items-center justify-between text-left group">
                  <span className="font-ui font-bold text-amber-950 group-hover:text-orange-600 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown className="size-5 text-amber-300 group-hover:text-orange-600 transition-all" />
                </button>
                <div className="px-6 pb-5 text-sm text-amber-800/70 font-content leading-relaxed">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
