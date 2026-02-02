import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import CategoryCard from "../components/layout/CategoryCard";
import ProductCard from "../components/layout/ProductCard";
import FeatureCard from "../components/layout/FeatureCards";
import { Shield, Users, Lock, Truck, Quote } from "lucide-react";

// If you had props, define an interface like this:

function Home() {
  // Categories Data
  const categories = [
    {
      name: "Strings",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC2ciS4zbeOzzzs38NrDJHm1ii2Fwo8wK7XlLQsw0Nug09dSI_0R3vjyg1EABm7vK-fIk-XrsKuFWVpE1yttj87XAifCqhht3zZ3oDMXipKoGIVjdCy6wi80dyCoqZmbZxzPFtZ-xnDtOtVIkFMoRMDPstwTmatEs_iajx1KLt98WsAZeXsfOkva_3o7o19Sj0BvCv3_fcU8hEF5b_A82eN7ctbT5R3Aq0E3MRIBos46yEnMAP5UNJFpWPwii7syGSN9ZKnthaC7YLB",
    },
    {
      name: "Keyboard",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB_QPvrJN-D1jm-F9h6L2CsrLUyeydBIkfBs7-TrHHu_HuP6lWL0VDQGuqlGckaIlGAEUDddc3aXgGKPv31WsUi4ysqeWo_f7XLw26uMhN6UYLp0_YjWtvfQzqQmA_JHjR9PkrVTJTvFfVW3bw2Rf6JPJ8FJ1D5_iJO1io4MJMOC6YmbPpzmKO4hMzHIWZTxxYkDCnHi_6xZA0yjS890urTccEjR8jM0X2DKh0In56NhTQdiQExQVExRQ4u0NmnXU2aUAAV_RfQd4TH",
    },
    {
      name: "Percussion",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBgyo2IHLzOU6LZyN_8mkVWuWLz6RRYCbLRf7hQya6jaiXY1uHKT9CxUl4L4EneEslrP8l7HuNM07T22pV_z7YlaUAgKQLGV36LEkYA9HhTYCNv6JaPj22F40p90HuBzKQaw19_KPpo_VZvqKcILAclh9G8F4Wenlt3HqIFg7qRMhACKp0eclwuCtkpFbrBXQSMxqi7HyxH2FMUll8KBNyW49wYVbv2F3z7KYQsEvGJSeI92eUQ_bWlksMmtfv4gtyWfVOGseD7Skbn",
    },
    {
      name: "Wind",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCMj8A3UF9dGbhchXYYPaX8_GNcB3lDeom5W2MJd1Dzspl4wOZCK45XNSXCK6C9h11_nXzZdwgtmZBWKM7CTJ_Z2Ov1caMejKeq9ySSecHZf9aSxzXoPYJohXBTKTXfBTu8b_-J_z-ttOmVB05FDR2rEFzk9Nhtrv8dJFNKeEYUczcAVQB53m19i67u42Tv5SVF4MWKBkLErNAu3LFiIt0QKrv_3omzm_3Ju92ki1T5jPC0GXeWo0v4kHS3xpEzlRcXx9iEtLAFRJJI",
    },
    {
      name: "Electronic",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDeV1WrFcZkxyeSf6psKwR9Oairga1oH91IaUQl9_eOCWH8By3j4cTN-vsI4l2TqmP1GB8AR6KKhBoApuF94Xbkm5DTSGofAnRnhdp7BMaXExW3j1msAwhSm-hOKCeZdNZRdZ2slSEImNAbm9yos71JwmriaXNnF9junV2JMhP05q2bX9kiD5sE9utVOrRTxucgH26qZogXCE7c8g4zHZEM_cktShB5pxZ3O7wGlTX7gEvAVb6gCyBUwDvU_SYXIsyIO6vdJH4Yn1YH",
    },
    {
      name: "Accessories",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBd3kd-D_bBVzdavA26kIXpvBrPUlwa1ox-WEFWSV7Rj2YVsNHlWmy9eL9IfbsnNLLiwKWHrSb0e_GEpt3Y76nblE4ettJSfI9PzMns4A9tTBZYL7UuGcGLdW0aF1tAwVlp3DvnJcbymQs0oC2jvpNudNGwpXtoPSgIIp_0J7haciIKgJp3h15_MeAUfqWX5J00jRoihNIul1-BSq2fn2KmcWHKwaL2nFhWTFrUYUjlcBRdaFazw8A2EYtEPypCoRWmgdsUguzv4lN1",
    },
  ];

  // Featured Products Data
  const featuredProducts = [
    {
      id: "1",
      name: "Handcrafted Tabla Set",
      price: 14999,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDWCHkQGW5GKWlNLaqV14qiCjjDhawLJXucBHLlsknc2jW2ZVq8Ql0uINt5vMZLCzbAwsKgqY5nszOi5Z5av8IzfCreGPmiB-HSXzLxlVp_AOi1uTB-O2m2b7CeY0CW3-RiQrBNJCy2r4iEcrWMpnUrZfkzdV_K9exGEnS6i7NLciihnKNPmpvuE7x09dkKtjnuIymJpswAwuvnFriuuf1JUjk-2DLHPmGcLspPIdPYkP1eUZTybN8YBnpLtqKrNCLxPpJHoscIZ9bW",
      rating: 5,
      reviewCount: 48,
      badge: "Best Seller",
    },
    {
      id: "2",
      name: "Yamaha PSR Digital Keyboard",
      price: 22450,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAy-Y7vOHxQafji4qsemA0H3kZxik0pkgCM9YcLwiuuuUyzot24w_s6hiA00AJCgtHJQKxbiasFLPdEtmcViIgqSSEYbTnTlwbcvaU208ZSQ7jTH_JQ92ZjGj_CdO6L9YGmsXNsGYWcwKUnSokdCr0nYfvIGKs_43H2l1XI1SqFZm1_LJ4FCNOxobKc5dHsRcVWB3erZZ9H-hps_tb2OaJadp23aehnWze1REWtcViYLO1BgG-ApSwyv2muXmS0hqv6td58Iaw4-M44",
      rating: 4.5,
      reviewCount: 124,
    },
    {
      id: "3",
      name: "Traditional Bamboo Flute",
      price: 1250,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA4vEs0hhCwpDn_GQQBlBPm02_K0YJsUSgIxGwpo9NyZBeDtdRyG4LoGtL1vIu0I8l1qy3TRRx4dmRSMRCLkQzwLowsY5tlwm7gSnimkJgnAlf2uUHEzRwWyB9691pHEoaYzxpofFhecrhGHi-tGGdxkXYNhFFtNz-iNypfnEsj5pzKPGULJH09SOeHwE4_1CEAoHeacM6J_gwtG08lGoAn32jRAZOvZmTrLpeUd8YrS_6o5aZ_IDwMDG7gXKKmvTZnPcIhRRnJON-m",
      rating: 5,
      reviewCount: 86,
    },
  ];

  // Features Data
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Authentic Instruments",
      description: "Handpicked quality from local and global masters.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Trusted by Musicians",
      description: "Join 50k+ professionals and beginners alike.",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Secure Payments",
      description: "100% encrypted transactions for your peace of mind.",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Safe and speedy shipping across the country.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30">
      <Header />
      <main className="max-w-7xl mx-auto">
        <Hero />

        {/* Categories Section */}
        <section className="px-6 lg:px-10 py-16">
          <h2 className="font-brand text-4xl font-normal text-amber-950 mb-10">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                imageUrl={category.imageUrl}
              />
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="px-6 lg:px-10 py-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-brand text-4xl font-normal text-amber-950">
              Featured Products
            </h2>
            <a
              href="#all-products"
              className="font-ui text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-2 transition-all group"
            >
              View All
              <span className="transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="px-6 lg:px-10 py-16 bg-[#f4f0e7] rounded-3xl mx-6 mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="size-16 rounded-full bg-[#f4c025]/20 flex items-center justify-center text-[#f4c025]">
                  {feature.icon}
                </div>
                <h4 className="font-ui font-bold text-lg text-[#1c180d]">
                  {feature.title}
                </h4>
                <p className="font-ui text-sm opacity-60 max-w-[200px] text-[#1c180d]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-6 lg:px-10 py-16 text-center max-w-4xl mx-auto">
          <h2 className="font-brand text-3xl font-bold mb-12 text-[#1c180d]">
            Voices of Music
          </h2>
          <div className="relative p-10 bg-white rounded-2xl border border-[#f4f0e7]">
            <Quote className="text-[#f4c025] size-14 opacity-30 absolute top-4 left-6 rotate-180" />
            <p className="font-content text-xl italic mb-8 leading-relaxed text-[#1c180d]/90">
              "The quality of the Sitar I purchased from Parthasarathi Musical
              is unmatched. It has a soul that resonates perfectly during my
              concerts. Their service is truly premium."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div
                className="size-12 rounded-full bg-cover bg-center border-2 border-[#f4c025]/20"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyv-KJIREQljK0B_6usUYDU8mloX2mTHc3xYJ2oRAMKUlIXDnQ_hrge5Ob5OCV-RXjWuxRZdv6v9y5bELFdEuKJj7l5zVNjG6RM1er3zdt538bMoVwEWKZvV0SD8JsRGNRsJdjwJD3lr6djQAz5NmNuaveCgaYyuj16SHRcam-MG_YD_QJJz_LSXgHAJcMRZf7rBqdI3JqGx9BhbxhjZ9D0K0iuJPXCl1MUbFzhDe_EMlAs2xVqNEJqV-MEFW69Sr3e5nbh7zpSROZ')",
                }}
              ></div>
              <div className="text-left">
                <p className="font-ui font-bold text-[#1c180d]">Rahul Sharma</p>
                <p className="font-helper text-xs opacity-50 uppercase tracking-widest font-bold">
                  Professional Sitarist
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="px-6 lg:px-10 py-16">
          <div className="bg-[#1c180d] rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
            {/* Wavy lines decorative background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M0 50 Q 25 30 50 50 T 100 50"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                ></path>
                <path
                  d="M0 60 Q 25 40 50 60 T 100 60"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                ></path>
              </svg>
            </div>

            <h2 className="font-brand text-3xl lg:text-5xl font-bold text-white mb-6 relative z-10">
              Stay in Tune
            </h2>
            <p className="font-ui text-white/70 mb-10 text-lg max-w-lg mx-auto relative z-10">
              Get music tips, new product arrivals & exclusive offers delivered
              to your inbox.
            </p>

            <form
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto relative z-10"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="font-ui flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#f4c025] outline-none"
              />
              <button className="font-ui bg-[#f4c025] text-[#1c180d] font-bold px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-95">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
