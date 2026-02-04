import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import ProductCard from "../components/layout/ProductCard";
import { ChevronDown } from "lucide-react";
import { adminService } from "../services/adminService";
import { toast } from "sonner";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedFilter, setSelectedFilter] = useState(categoryParam || "All");
  const [sortBy, setSortBy] = useState("Featured");
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryParam) {
      setSelectedFilter(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await adminService.getProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = allProducts.filter((product) => {
    if (selectedFilter === "All") return true;
    return (
      product.category === selectedFilter ||
      product.subcategory === selectedFilter
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <Breadcrumbs items={[{ label: "Our Collection" }]} />

        <h1 className="font-brand text-4xl lg:text-5xl text-amber-950 mb-8">
          Our Collection
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-helper font-bold text-amber-950 uppercase tracking-[0.15em] text-[10px] mb-6">
                  Categories
                </h3>
                <ul className="space-y-6 font-ui text-sm text-amber-800/70">
                  <li
                    className={`font-bold cursor-pointer transition-colors ${selectedFilter === "All" ? "text-orange-600" : "hover:text-orange-600"}`}
                    onClick={() => setSelectedFilter("All")}
                  >
                    All Instruments
                  </li>

                  {/* Harmoniums */}
                  <li className="space-y-2">
                    <span
                      className={`font-bold block cursor-pointer transition-colors ${selectedFilter === "Harmoniums" ? "text-orange-600" : "text-amber-950 hover:text-orange-600"}`}
                      onClick={() => setSelectedFilter("Harmoniums")}
                    >
                      Harmoniums
                    </span>
                    <ul className="pl-3 space-y-1.5 border-l border-amber-100 text-xs">
                      {["2 Line", "3 Line", "Scale Changer", "Standard"].map(
                        (sub) => (
                          <li
                            key={sub}
                            className={`cursor-pointer transition-colors ${
                              selectedFilter === sub
                                ? "text-orange-600 font-bold"
                                : "hover:text-orange-600"
                            }`}
                            onClick={() => setSelectedFilter(sub)}
                          >
                            {sub}
                          </li>
                        ),
                      )}
                    </ul>
                  </li>

                  {/* Percussion */}
                  <li className="space-y-2">
                    <span
                      className={`font-bold block cursor-pointer transition-colors ${selectedFilter === "Percussion" ? "text-orange-600" : "text-amber-950 hover:text-orange-600"}`}
                      onClick={() => setSelectedFilter("Percussion")}
                    >
                      Percussion
                    </span>
                    <ul className="pl-3 space-y-1.5 border-l border-amber-100 text-xs">
                      {[
                        "Nal Dholak",
                        "Dholl/Tasha",
                        "Khol Mrudanga",
                        "Hand Kartal",
                      ].map((sub) => (
                        <li
                          key={sub}
                          className={`cursor-pointer transition-colors ${
                            selectedFilter === sub
                              ? "text-orange-600 font-bold"
                              : "hover:text-orange-600"
                          }`}
                          onClick={() => setSelectedFilter(sub)}
                        >
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </li>

                  {/* Guitars */}
                  <li className="space-y-2">
                    <span
                      className={`font-bold block cursor-pointer transition-colors ${selectedFilter === "Guitars" ? "text-orange-600" : "text-amber-950 hover:text-orange-600"}`}
                      onClick={() => setSelectedFilter("Guitars")}
                    >
                      Guitars
                    </span>
                    <ul className="pl-3 space-y-1.5 border-l border-amber-100 text-xs">
                      <li
                        className={`cursor-pointer transition-colors ${selectedFilter === "Guitar" ? "text-orange-600 font-bold" : "hover:text-orange-600"}`}
                        onClick={() => setSelectedFilter("Guitar")}
                      >
                        Guitar
                      </li>
                    </ul>
                  </li>

                  {/* Devotional */}
                  <li className="space-y-2">
                    <span
                      className={`font-bold block cursor-pointer transition-colors ${selectedFilter === "Devotional" ? "text-orange-600" : "text-amber-950 hover:text-orange-600"}`}
                      onClick={() => setSelectedFilter("Devotional")}
                    >
                      Devotional
                    </span>
                    <ul className="pl-3 space-y-1.5 border-l border-amber-100 text-xs">
                      <li
                        className={`cursor-pointer transition-colors ${selectedFilter === "Arati Machine" ? "text-orange-600 font-bold" : "hover:text-orange-600"}`}
                        onClick={() => setSelectedFilter("Arati Machine")}
                      >
                        Arati Machine
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-helper font-bold text-amber-950 uppercase tracking-wider text-xs mb-4">
                  Price Range
                </h3>
                <div className="space-y-2 font-helper text-sm text-amber-800/70">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-orange-600" />{" "}
                    Under ₹5,000
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-orange-600" />{" "}
                    ₹5,000 - ₹20,000
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-orange-600" /> Over
                    ₹20,000
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-amber-100">
              <p className="font-helper text-sm text-amber-800/60">
                Showing {sortedProducts.length} products
              </p>
              <div className="relative group">
                <button className="flex items-center gap-2 font-ui text-sm font-semibold text-amber-950">
                  Sort by: {sortBy} <ChevronDown className="size-4" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-amber-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  {[
                    "Featured",
                    "Price: Low to High",
                    "Price: High to Low",
                    "Rating",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className="w-full text-left px-4 py-2 text-sm text-amber-950 hover:bg-amber-50 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
