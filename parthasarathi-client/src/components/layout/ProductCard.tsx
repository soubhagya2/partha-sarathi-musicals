import { Star, ShoppingBag, Heart, IndianRupee, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  category?: string;
}

function ProductCard({
  id,
  name,
  price,
  imageUrl,
  rating,
  reviewCount,
  badge,
  category = "Instruments",
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => {
      const isFull = i < Math.floor(rating);
      const isHalf = !isFull && i < rating;
      return (
        <div key={i} className="relative">
          <Star className="w-3.5 h-3.5 text-slate-200" />
          {isFull && (
            <Star className="absolute inset-0 w-3.5 h-3.5 fill-orange-400 text-orange-400" />
          )}
          {isHalf && (
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
            </div>
          )}
        </div>
      );
    });
  };

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden">
      <Link to={`/product/${id}`} className="block">
        {/* Product Image Section - Reduced height */}
        <div className="relative aspect-[4/3] overflow-hidden bg-linear-to-br from-slate-50 to-orange-50/20">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Top Actions */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
            {badge ? (
              <span className="font-helper bg-orange-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wide">
                {badge}
              </span>
            ) : (
              <div />
            )}
            <button
              onClick={(e) => {
                handleAction(e);
                setIsWishlisted(!isWishlisted);
              }}
              className="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all"
              aria-label="Add to wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-all ${isWishlisted ? "fill-red-500 text-red-500 scale-110" : "text-slate-400"}`}
              />
            </button>
          </div>

          {/* Bottom Hover Actions */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/40 via-black/10 to-transparent">
            <button
              onClick={handleAction}
              className="font-ui w-full bg-slate-900 text-white py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-lg uppercase tracking-wider"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4 space-y-3">
          {/* Category and Rating Row */}
          <div className="flex items-center justify-between">
            <span className="font-helper text-xs font-bold text-orange-600 uppercase tracking-wider">
              {category}
            </span>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {renderStars(rating)}
              </div>
              <span className="font-helper text-xs font-semibold text-slate-400">
                ({reviewCount})
              </span>
            </div>
          </div>

          {/* Product Name - Fixed color */}
          <h3 className="font-ui text-sm font-semibold text-amber-950 line-clamp-2 leading-snug min-h-[2.5rem] group-hover:text-orange-600 transition-colors">
            {name}
          </h3>

          {/* Price and CTA Row */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex items-baseline gap-0.5">
              <IndianRupee
                className="w-4 h-4 text-amber-950"
                strokeWidth={2.5}
              />
              <span className="font-ui text-xl font-black text-amber-950">
                {price.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={handleAction}
              className="font-ui bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-orange-700 transition-all uppercase tracking-wide whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Buy Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
