import { useNavigate } from "react-router-dom";
import { ShieldCheck, Truck } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 lg:px-10 py-12">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-amber-50 to-orange-50/40 border border-amber-200/60">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <div className="p-8 lg:p-16 lg:w-1/2 flex flex-col gap-6">
            <h1 className="font-brand text-4xl lg:text-6xl font-normal text-amber-900 leading-tight">
              Your One-Stop Destination for{" "}
              <span className="text-orange-600">Musical Instruments</span>
            </h1>

            <p className="font-ui text-lg text-amber-800/80 max-w-lg leading-relaxed">
              From beginners to professionals — quality instruments you can
              trust. Discover our curated collection of traditional and modern
              sounds.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="bg-orange-600 text-white px-8 py-3.5 rounded-lg font-ui font-semibold text-base
                           hover:bg-orange-700 transition-colors duration-200"
              >
                Explore Collection
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="border-2 border-orange-600 bg-white px-8 py-3.5 rounded-lg font-ui font-semibold text-base text-orange-600
                           hover:bg-orange-50 transition-colors duration-200"
              >
                Sign In
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 pt-4 text-sm text-amber-700 font-ui">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>Authentic Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero Images with Different Animations */}
          <div className="w-full lg:w-1/2 h-screen relative group">
            <div className="absolute inset-0 grid grid-cols-2 gap-1">
              {/* Left Image - Slide Up & Fade */}
              <div className="relative overflow-hidden ">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqI5pI15naEFpKpeK9jc5UvmarwzlOnTfMk2gMW5O1bO-lrXCBrk_YxlckML2uQzph2QxoMjwagvP3wcfGoQRHJFVAPARDNYQ1EZ9-z2ickjbIqG-kgdOuRcQLWyI2FOMlyykgf7g0OgzeXFZdFft_xCTw2RliyQW3zMrhRsLtkQqF6k0W_ATm93FZm7gaelNAf87Se_BqzlFf4bi6FYbxhYI-po5LHAkwLxI1SOEYV9jQhJGz4YCzWkHS39m1NzwKS4KnLk1EcAwE"
                  alt="Close-up of a handcrafted Indian sitar with intricate carvings"
                  className="object-cover w-full h-full  "
                />
              </div>

              {/* Right Image - Rotate & Scale */}
              <div className="relative overflow-hidden rounded-r-xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa7EmNs9Rzr---1LatqLfzMjVraMg9zwQnpnRYJBqxVherqm-s3r7oTdBT_iAD2yX_jQC6DtH77cGUY7kGQv7F-Bgfxc0NWttKDTdgWDordQ5xjGS4BQZgpTKhXbWstSS7UyZwwnpBEIeNL3N85SSdgO2oKHuwCbOkCLdzvOYbuE4BgEiwdxWm8LLnqkTtPoGnhHY8XXwwJL3jkn9PlEPCW4MbSmu-3biYoz5FtTwqXVB5JbPDKTVJmPYyXeP1m5Fl7P6JU5js5hW-"
                  alt="Modern acoustic guitar resting against a warm wall"
                  className="object-cover w-full h-full "
                />
                {/* Overlay that fades in */}
                <div
                  className="absolute inset-0 bg-linear-to-t from-orange-900/10 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                ></div>
              </div>
            </div>

            {/* Ambient glow effect */}
            <div
              className="absolute -inset-4 bg-linear-to-r from-orange-400/0 via-orange-400/5 to-orange-400/0 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
