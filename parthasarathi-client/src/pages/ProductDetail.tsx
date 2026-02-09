import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import {
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  Minus,
  Plus,
  Briefcase,
  Wrench,
  CheckCircle2,
  PlayCircle,
  Award,
} from "lucide-react";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState("Standard");
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data based on the requested design
  const product = {
    id: id || "1",
    name: "Professional Concert Grade Sitar",
    collection: "Master Artisans Collection",
    price: 125000,
    rating: 4.5,
    reviewCount: 12,
    description:
      "A masterpiece of resonance and aesthetics. Handcrafted from 40-year-old seasoned Teak wood (Tun), this Ravi Shankar style sitar offers unparalleled sustain and a deep, traditional kharaj-pancham tone.",
    history: [
      "The Sitar, a luminous jewel in the crown of Indian Classical Music, traces its lineage back over 800 years. Emerging from the synthesis of the ancient Indian Veena and the Persian Sehtar, it represents a cultural bridge between the traditions of the subcontinent and the influences of the Mughal courts.",
      "Our Professional Concert Grade Sitar is built upon this legacy. The wood is hand-selected by master luthiers in Miraj and Kolkata, then seasoned for six full months to ensure it can withstand the immense tension of the strings while vibrating with crystalline clarity. Every celluloid inlay is etched by hand, telling a story of patience and devotion to the craft.",
    ],
    specs: [
      {
        feature: "Primary Material",
        specification: "40-Year Seasoned Tun Wood (Teak)",
      },
      {
        feature: "Number of Strings",
        specification: "20 Strings (7 Main + 13 Sympathetic)",
      },
      { feature: "Bridge", specification: "Hand-carved Camel Bone" },
      {
        feature: "Style",
        specification: "Ravi Shankar Style (Kharaj Pancham)",
      },
      { feature: "Inlays", specification: "Artisanal Celluloid Etchings" },
      { feature: "Weight", specification: "Approx. 4.8 kg" },
      {
        feature: "Case Included",
        specification: "Fiberglass Hard-shell Flight Case",
      },
    ],
    accessories: [
      {
        name: "German Silver Wire Set",
        price: 1200,
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC5UDbKwc77JvNqFT5_vPU0QXAj6ek3tEnJuPhvpc7EaqvY4LRb1P_Dhyb6urTe992TJe2Yl_A0URtOweqcG8L0X1buk9jUGX1V3h7XJci7SIjBRMmptiSNj4YOhSTuS5y1oYwh5zYlmqA7x22ggTGWlIjONY3ys43YD_mmVdn0sNfDlP00TSp6T4MNc_Sz1v4VNdzCZ1srWFmXBa7AFK8oe_ycKcUxviJsldT7qF7IYM7DhDTwneN-7FJAseYZMuyzJgZr3J8qh8o",
      },
      {
        name: "Artisanal Steel Mizrabs (4pcs)",
        price: 850,
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDSwTP2OS_bIV7Q9irrezO2GjfMt_drresJthdluAIV0HStvtjCB2WQ3Ghvk9gyxQp6oJc2Ov8RcsL3SKuK9i2uuMfKIHPKKQNTx2GnlUnC6gbqwAH27earALzttKuxQsiUKcyZLjMoD1Ghm0wtdCuaVPV1SPY7v8z5AnE-eikB5cfk7CYq4cJ1Kr9pShgAyLz3GqiTOlnu2pWeOZ-cuv0NLrR8n4f3x--fM_2CKrGqkjIgLrxQhcUJCTG2WV19kx1fpnIqi7pit8o",
      },
      {
        name: "Padded Velvet Gig Bag",
        price: 4500,
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDDcrKVbjVYKu2PbvrRpJA6O46MIKu-jnlkDuOCfrayUk02ILgSjwFZQc_qalVEjq0KuDTfi5fPsgvZo7gpYJjzz07FOlAIoVBihkjqSGzUa2w8fpenL9XoQOGf_uGVm-QwYcbULKq-7MlozeW1xjR2bQJGYNNJ6ngDNkn6xVEg36LWBLcOIXlbsUrm6n7OBR2nyPh-UzyrmCVwaj4jQ8eR9oyxcyfSSfq69kpnYv1xVpHMFvtm3OSSBzCg5MWmiiBu2Y08pbYNHxc",
      },
      {
        name: "Natural Teak Polish Kit",
        price: 1100,
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB98uMhEqOjQXYOzgpdYG9rAgtgHHJLaX0M1bIoHakixy8C44MVTVX-2ZvG8k2tCcUpTDew38DqSi6dsBV1GScVCOV5lXu5O_n9RfArt3zH71OsHcoNdAsQf1EnmWcEHmnc60XlUuVHmDxkWpmt8pldlXpxtKRhj9abd8aVxHxWHwZAzWtzavSAuvofmDzqL14mkUe-_FKXHt51x0hG-YdTRXQnOTiqMopTwFEaL5EMx3lTW4MzvHOP0K5OlKy9XcAvm7ApQE-NDPk",
      },
    ],
    mainImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4un-GUenJfZuDCb2qFxa20F6fNd-dmH8eM_FYvuqMROpcNL4JAJ0T2MEb09ZlpvheQpD-_R1GB5diHy1MI4Mf2CB4KU6OzrJDNO-Uz1jhO3i_-hTWMAhUmPKqCDIvYRPUnwhwxTIyspN4uPpX6U8hXDHUAjuc2SipG2-0QH27WasdkJ7BR_CtHwhoX8sqI7AgSJMcXzmgYb5OqAX_TaBepU6QdcRyoKhW6d5gGU5OTvSadXOrAS-hmHyJ2CVA8S8UljGIOxY3dKs",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAf7XNLkbO2XtEKNPQZlBSZByWLbucID5Opd7jeMMtvktgN-_CJN-xaeE1VlTLZjxG6HioaNCMbu4g3RlF2TzU1J-8FyAuNAFuClW9W-xzLaa-2SqwLkgL0YAibKQv25ovwnNf1UENTEplEdNhrNsbQIr_mB2m-S7evIIfr2R4feFdqeL34rd-THsbRKNEpMIyffQQvJamacMFX7GuOgbFlNEtapVd2Fui6CmXtXp9p5FrtAC_Q8NGMG_6GFVWXCdYdXy14uczBDFQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCG5v-ZkpHCd-EAkdNUC6VeTCZgWPRr4jkEllEhIA56KN1q8nHHScop1Se1TdNb_g2jCFOok6_IVntwcl05wZXOF7I18qMG49z8F2UffjOGXDM01U-T3JqustEH0s06EKT7ZIut56Entq4FeotVWGtsZAHs9WEO0ZhRtMUIJnzLo42KQSJgcBo7Ir4xR_qO7umzDBtcDCiOACwXE8uwjPpsfgbvnZpwre0Z369hQkMlicgRa7oLDEq-XNL7bhbtOSRiX3R0KHv-hj8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANOQ6_OA5HIPMgKVODSzb-gsIBLRd-dwm2eyVxLe44UN3OtQZVf1eH3SrrjA5xvoXcqKNnEuDb-e6SNdZB3QdcrAh0X7oE5-koNMhk-KnurcEzYQfMgpi5V2DCGEEOqOgsnYsR3O1EYBgOzGRPtMC4xfFu4XMOfGhO6sqIRK1WqMInkUfy5Hv_qd0iC6tpZAa24XOO4EtP498Di42EN6oGozEGHNwfFQ9KQ8JSh_k8jSQWHT9k0W24GJxBnSL3saiHm5izCANtyig",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWdmzOpGAObKvn5cSgszwyIpKSwsOKG8qZZZ_rCd580H__VLE46D9pbjaQJrNd250rZ8S-r2FPJ3b67HZe6ANh6ZaDF3IJSYG57p40qshhOwbnjcjb29hWYnqkimngnzKocte2tOvemJblZaJnTqnY6Pv9bOFDa3Fu_LcO7TIsU5SkfrPUaCWSD_y8Ol1MBeL00b2LqkzH8zigu2MA312X8oG-TvcycAqdZ8HuX4TLE9fdbwWlivN1rnCePRwdmXCACg5VJkExn6U",
    ],
  };

  const renderStars = (rating: any) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-current text-amber-400"
        />,
      );
    }
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-amber-400/30" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-current text-amber-400" />
          </div>
        </div>,
      );
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-amber-400/30" />,
      );
    }
    return stars;
  };

  const handleQuantityChange = (type: any) => {
    if (type === "decrease") {
      setQuantity(Math.max(1, quantity - 1));
    } else {
      setQuantity(quantity + 1);
    }
  };

  const displayedImage =
    product.thumbnails[selectedImage] || product.mainImageUrl;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <Breadcrumbs
          items={[
            { label: "String Instruments", href: "/products?category=Strings" },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/5 bg-amber-50 rounded-xl overflow-hidden group border border-amber-100">
              <img
                src={displayedImage}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="font-helper bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                  Artisanal
                </span>
                <span className="font-helper bg-amber-950 text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                  In Stock
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.thumbnails.map((thumb, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    i === selectedImage
                      ? "border-orange-600"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={thumb}
                    className="w-full h-full object-cover"
                    alt={`Thumbnail ${i + 1}`}
                  />
                  {i === 3 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <PlayCircle className="text-white w-10 h-10" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <p className="font-helper text-orange-600 font-semibold text-sm tracking-widest uppercase">
                {product.collection}
              </p>
            </div>
            <h1 className="font-helper text-4xl lg:text-5xl font-semibold text-amber-950 leading-tight">
              {product.name}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="font-ui text-3xl font-bold text-amber-950">
                ₹{product.price.toLocaleString("en-IN")}.00
              </p>
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                <span className="font-helper text-amber-800/50 text-sm font-medium ml-2">
                  ({product.reviewCount} Reviews)
                </span>
              </div>
            </div>

            <div className="space-y-6 pb-8 border-b border-amber-100">
              <p className="font-content italic text-lg text-amber-950/80 leading-relaxed">
                "{product.description}"
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-helper text-xs font-bold uppercase tracking-widest text-amber-800/60">
                    Selection:
                  </span>
                  <span className="text-sm font-semibold text-amber-950">
                    Ravi Shankar Style (Double Toomba)
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedStyle("Standard")}
                    className={`font-ui px-6 py-2 border-2 rounded-lg text-sm font-bold transition-all ${
                      selectedStyle === "Standard"
                        ? "border-orange-600 bg-orange-50 text-orange-600"
                        : "border-amber-100 hover:border-orange-600 text-amber-950"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setSelectedStyle("Vilas Khan Style")}
                    className={`font-ui px-6 py-2 border-2 rounded-lg text-sm font-bold transition-all ${
                      selectedStyle === "Vilas Khan Style"
                        ? "border-orange-600 bg-orange-50 text-orange-600"
                        : "border-amber-100 hover:border-orange-600 text-amber-950"
                    }`}
                  >
                    Vilas Khan Style
                  </button>
                </div>
              </div>
            </div>

            <div className="py-8 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex items-center bg-amber-50 rounded-lg border border-orange-600/20">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="px-4 py-3 hover:text-orange-600 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-ui px-4 font-bold text-amber-950">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="px-4 py-3 hover:text-orange-600 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button className="font-ui flex-1 bg-orange-600 text-white font-bold py-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  ADD TO CART
                </button>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="font-ui w-full border-2 border-amber-950 text-amber-950 font-bold py-4 rounded-lg hover:bg-amber-950 hover:text-white transition-colors"
              >
                BUY IT NOW
              </button>
            </div>

            {/* USP List */}
            <div className="grid grid-cols-2 gap-4 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="font-helper text-xs font-bold uppercase tracking-tight text-amber-950">
                  Certified Quality
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-600">
                  <Truck className="w-5 h-5" />
                </div>
                <p className="font-helper text-xs font-bold uppercase tracking-tight text-amber-950">
                  Global Shipping
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-600">
                  <Briefcase className="w-5 h-5" />
                </div>
                <p className="font-helper text-xs font-bold uppercase tracking-tight text-amber-950">
                  Includes Case
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-600">
                  <Wrench className="w-5 h-5" />
                </div>
                <p className="font-helper text-xs font-bold uppercase tracking-tight text-amber-950">
                  1 Year Warranty
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="mt-20 space-y-20">
          {/* Story & History Section */}
          <section className="p-12 lg:p-20 rounded-3xl bg-amber-50/50 border border-orange-600/10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h3 className="font-helper text-3xl lg:text-4xl font-semibold text-amber-950">
                The History of the Instrument
              </h3>
              <div className="w-20 h-0.5 bg-orange-600 mx-auto"></div>
              <div className="font-content text-lg leading-loose text-amber-950/80 space-y-6 text-left">
                {product.history.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="space-y-12">
            <div className="text-center">
              <h3 className="font-helper text-3xl lg:text-4xl font-semibold text-amber-950 mb-4">
                Technical Specifications
              </h3>
              <p className="text-amber-800/60 uppercase tracking-widest text-sm font-bold">
                The finer details of craftsmanship
              </p>
            </div>
            <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-amber-100">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-orange-600 text-white">
                      <th className="px-8 py-4 font-semibold uppercase tracking-wider">
                        Feature
                      </th>
                      <th className="px-8 py-4 font-semibold uppercase tracking-wider">
                        Specification
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100">
                    {product.specs.map((spec, i) => (
                      <tr
                        key={i}
                        className="hover:bg-amber-50/50 transition-colors"
                      >
                        <td className="font-helper px-8 py-4 font-medium text-amber-800/60">
                          {spec.feature}
                        </td>
                        <td className="font-ui px-8 py-4 text-amber-950">
                          {spec.specification}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {/* Certificate of Authenticity Section */}
        <section className="mt-32 p-12 bg-amber-950 text-amber-50 rounded-3xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-linear-to-l from-orange-600/20 to-transparent"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <ShieldCheck className="text-orange-600 w-16 h-16" />
              <h3 className="font-helper text-2xl lg:text-3xl font-semibold">
                Certificate of Authenticity
              </h3>
              <p className="font-helper opacity-80 leading-relaxed text-base lg:text-lg">
                Every Professional Concert Grade instrument from Parthasarathi
                Musical comes with a physical certificate signed by the master
                artisan. This document guarantees the wood's age, the sourcing
                of materials, and the final acoustic testing conducted in our
                studio.
              </p>
            </div>
            <div className="w-64 h-80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 flex flex-col items-center justify-between text-center rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-16 h-16 border-2 border-orange-600 rounded-full flex items-center justify-center text-orange-600">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <p className="font-helper text-xl border-b border-white/20 pb-2 mb-2">
                  Original
                </p>
                <p className="text-xs uppercase tracking-widest opacity-60">
                  Verified Serial Number
                </p>
                <p className="font-mono text-orange-600">#PM-2023-SIT-084</p>
              </div>
              <p className="font-helper italic text-sm">
                "Crafted with devotion"
              </p>
            </div>
          </div>
        </section>

        {/* Recommended / Cross Sell */}
        <section className="mt-32 pb-20">
          <h4 className="font-helper text-2xl lg:text-3xl font-semibold mb-12 text-center text-amber-950">
            Complete Your Setup
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {product.accessories.map((acc, i) => (
              <Link
                key={i}
                to="/products?category=Accessories"
                className="group cursor-pointer block"
              >
                <div className="aspect-square bg-amber-50 rounded-xl mb-4 overflow-hidden relative border border-amber-100">
                  <img
                    src={acc.imageUrl}
                    alt={acc.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h5 className="font-ui font-bold text-sm mb-1 text-amber-950 group-hover:text-orange-600 transition-colors">
                  {acc.name}
                </h5>
                <p className="font-ui text-orange-600 font-bold text-sm">
                  ₹{acc.price.toLocaleString("en-IN")}.00
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
