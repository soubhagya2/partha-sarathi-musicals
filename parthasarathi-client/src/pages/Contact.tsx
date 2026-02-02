import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import { Mail, Phone, MapPin, Send } from "lucide-react";

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30 scroll-smooth">
      <Header />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="mb-8">
          <Breadcrumbs items={[{ label: "Contact" }]} />
        </div>

        <div className="text-center mb-16">
          <h1 className="font-brand text-5xl text-amber-950 mb-4">
            Get in Touch
          </h1>
          <p className="font-ui text-lg text-amber-800/60 max-w-2xl mx-auto">
            Whether you're looking for a custom instrument or need help with an
            order, our experts are here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm">
              <div className="size-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-6">
                <Mail className="size-6" />
              </div>
              <h3 className="font-brand text-xl text-amber-950 mb-2">
                Email Us
              </h3>
              <p className="font-ui text-sm text-amber-800/60">
                support@parthasarathi.com
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm">
              <div className="size-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-6">
                <Phone className="size-6" />
              </div>
              <h3 className="font-brand text-xl text-amber-950 mb-2">
                Call Us
              </h3>
              <p className="font-ui text-sm text-amber-800/60">
                +91 98765 43210
              </p>
            </div>
            <a
              href="#stores"
              className="block bg-white p-8 rounded-3xl border border-amber-100 shadow-sm hover:border-orange-300 transition-all group"
            >
              <div className="size-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <MapPin className="size-6" />
              </div>
              <h3 className="font-brand text-xl text-amber-950 mb-2">
                Visit Us
              </h3>
              <p className="font-ui text-sm text-amber-800/60">
                Kolkata, West Bengal, India
              </p>
              <span className="font-helper inline-block mt-4 text-xs font-bold text-orange-600 uppercase tracking-widest">
                View on Map →
              </span>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 lg:p-12 rounded-[2.5rem] border border-amber-100 shadow-xl shadow-orange-900/5">
            <form className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-helper text-xs font-bold text-amber-950/40 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-amber-50 bg-amber-50/30 focus:bg-white focus:border-orange-500 outline-none transition-all font-ui text-sm"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="font-helper text-xs font-bold text-amber-950/40 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-amber-50 bg-amber-50/30 focus:bg-white focus:border-orange-500 outline-none transition-all font-ui text-sm"
                  placeholder="email@example.com"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="font-helper text-xs font-bold text-amber-950/40 uppercase tracking-widest ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-amber-50 bg-amber-50/30 focus:bg-white focus:border-orange-500 outline-none transition-all font-ui text-sm"
                  placeholder="How can we help?"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="font-helper text-xs font-bold text-amber-950/40 uppercase tracking-widest ml-1">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-amber-50 bg-amber-50/30 focus:bg-white focus:border-orange-500 outline-none transition-all font-ui text-sm resize-none"
                  placeholder="Tell us more..."
                ></textarea>
              </div>
              <div className="md:col-span-2 pt-4">
                <button className="w-full bg-amber-950 text-white py-5 rounded-2xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-amber-950/20 flex items-center justify-center gap-3">
                  Send Message
                  <Send className="size-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div id="stores" className="scroll-mt-28">
          <div className="mb-10 text-center">
            <h2 className="font-brand text-4xl text-amber-950">Our Location</h2>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden border border-amber-100 shadow-xl shadow-orange-900/5 h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.123456789!2d88.3639!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277ad12345678%3A0x1234567890abcdef!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1698000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
            ></iframe>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
