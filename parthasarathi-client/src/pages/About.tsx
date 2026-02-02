import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import { Music, Heart, Award } from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30">
      <Header />
      <main className="max-w-7xl mx-auto">
        <div className="px-6 lg:px-10 pt-12">
          <Breadcrumbs items={[{ label: "About Us" }]} />
        </div>

        {/* Hero Section */}
        <section className="px-6 lg:px-10 py-20 text-center">
          <h1 className="font-brand text-5xl lg:text-7xl text-amber-900 mb-8 leading-tight">
            Crafting the <span className="text-orange-600 italic">Future</span>{" "}
            of <br className="hidden md:block" />
            Musical Tradition
          </h1>
          <p className="font-ui text-xl text-amber-800/80 max-w-3xl mx-auto leading-relaxed">
            At Parthasarathi Musical, we believe every instrument carries a
            soul. Our mission is to connect artists with the finest tools of
            expression, bridging centuries of heritage with modern innovation.
          </p>
        </section>

        {/* Story Section */}
        <section className="px-6 lg:px-10 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-orange-500/10 rounded-3xl blur-2xl group-hover:bg-orange-500/20 transition-all duration-500"></div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-amber-100">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqI5pI15naEFpKpeK9jc5UvmarwzlOnTfMk2gMW5O1bO-lrXCBrk_YxlckML2uQzph2QxoMjwagvP3wcfGoQRHJFVAPARDNYQ1EZ9-z2ickjbIqG-kgdOuRcQLWyI2FOMlyykgf7g0OgzeXFZdFft_xCTw2RliyQW3zMrhRsLtkQqF6k0W_ATm93FZm7gaelNAf87Se_BqzlFf4bi6FYbxhYI-po5LHAkwLxI1SOEYV9jQhJGz4YCzWkHS39m1NzwKS4KnLk1EcAwE"
                  alt="Artisan working on a Sitar"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest w-fit">
                Our Heritage
              </div>
              <h2 className="font-brand text-4xl lg:text-5xl text-amber-900">
                A Legacy of Resonance
              </h2>
              <p className="font-ui text-lg text-amber-800/70 leading-relaxed">
                Founded in the cultural heart of India, Parthasarathi Musical
                began as a small collective of artisans dedicated to the
                perfection of classical instruments. What started as a passion
                for the Sitar and Sarod has grown into a global destination for
                musicians of all genres.
              </p>
              <p className="font-ui text-lg text-amber-800/70 leading-relaxed">
                We don't just sell instruments; we curate experiences. Every
                piece in our collection undergoes rigorous tonal testing by
                professional musicians to ensure it meets the "Parthasarathi
                Standard" of excellence.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <p className="text-3xl font-brand text-orange-600">25+</p>
                  <p className="text-sm text-amber-900/60 font-ui font-medium">
                    Years of Experience
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-brand text-orange-600">50k+</p>
                  <p className="text-sm text-amber-900/60 font-ui font-medium">
                    Happy Musicians
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-6 lg:px-10 py-24 mb-16">
          <div className="bg-[#1c180d] rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full"></div>

            <div className="relative z-10">
              <h2 className="font-brand text-4xl lg:text-5xl mb-16 text-center">
                The Pillars of Our Craft
              </h2>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="flex flex-col gap-6">
                  <div className="size-14 rounded-xl bg-white/10 flex items-center justify-center text-orange-400">
                    <Music className="size-7" />
                  </div>
                  <h3 className="text-2xl font-brand">
                    Uncompromising Quality
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    From the choice of seasoned wood to the precision of the
                    strings, we never settle for anything less than perfection.
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="size-14 rounded-xl bg-white/10 flex items-center justify-center text-orange-400">
                    <Heart className="size-7" />
                  </div>
                  <h3 className="text-2xl font-brand">Artist-Centric</h3>
                  <p className="text-white/60 leading-relaxed">
                    We provide personalized consultations to help you find the
                    instrument that resonates with your unique artistic voice.
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="size-14 rounded-xl bg-white/10 flex items-center justify-center text-orange-400">
                    <Award className="size-7" />
                  </div>
                  <h3 className="text-2xl font-brand">Global Reach</h3>
                  <p className="text-white/60 leading-relaxed">
                    Our specialized white-glove shipping ensures your instrument
                    arrives safely, whether you're in Mumbai or New York.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;
