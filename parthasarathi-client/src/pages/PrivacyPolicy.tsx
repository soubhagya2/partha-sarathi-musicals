import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <h1 className="font-helper text-4xl lg:text-5xl font-semibold text-amber-950 mb-8">
          Privacy Policy
        </h1>
        <p className="font-helper text-sm text-amber-800/40 mb-12 uppercase tracking-widest">
          Last Updated: October 2023
        </p>

        <div className="space-y-8 font-content text-lg text-amber-950/80 leading-relaxed">
          <section>
            <h2 className="font-ui text-2xl font-bold text-amber-950 mb-4">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, such as when
              you create an account, make a purchase, or contact our support
              team. This may include your name, email address, billing and
              shipping address, and payment information.
            </p>
          </section>

          <section>
            <h2 className="font-ui text-2xl font-bold text-amber-950 mb-4">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Process your orders and manage your account.</li>
              <li>
                Communicate with you about products, services, and promotions.
              </li>
              <li>Improve our website and customer service experience.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-ui text-2xl font-bold text-amber-950 mb-4">
              3. Data Security
            </h2>
            <p>
              We implement a variety of security measures to maintain the safety
              of your personal information. Your personal information is
              contained behind secured networks and is only accessible by a
              limited number of persons who have special access rights to such
              systems.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
