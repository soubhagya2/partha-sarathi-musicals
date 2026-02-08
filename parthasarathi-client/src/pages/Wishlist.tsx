import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/layout/ProductCard";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlistItems = [
    {
      id: "2",
      name: "Professional Rosewood Sitar",
      price: 45000,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAqI5pI15naEFpKpeK9jc5UvmarwzlOnTfMk2gMW5O1bO-lrXCBrk_YxlckML2uQzph2QxoMjwagvP3wcfGoQRHJFVAPARDNYQ1EZ9-z2ickjbIqG-kgdOuRcQLWyI2FOMlyykgf7g0OgzeXFZdFft_xCTw2RliyQW3zMrhRsLtkQqF6k0W_ATm93FZm7gaelNAf87Se_BqzlFf4bi6FYbxhYI-po5LHAkwLxI1SOEYV9jQhJGz4YCzWkHS39m1NzwKS4KnLk1EcAwE",
      rating: 4.9,
      reviewCount: 12,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <Breadcrumbs items={[{ label: "My Wishlist" }]} />

        <div className="flex items-center gap-4 mb-10">
          <div className="size-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
            <Heart className="size-6 fill-current" />
          </div>
          <h1 className="font-helper text-4xl font-semibold text-amber-950">
            My Wishlist
          </h1>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistItems.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-amber-50/30 rounded-[3rem] border border-amber-100">
            <p className="font-ui text-xl text-amber-800/60 mb-8">
              Your wishlist is empty.
            </p>
            <Link
              to="/products"
              className="font-ui bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all"
            >
              Explore Instruments
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
