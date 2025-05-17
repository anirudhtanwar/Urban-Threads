
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useShop, Product } from "@/context/shop-context";
import { cn } from "@/lib/utils";
import { ResponsiveImage } from "@/components/ui/responsive-image";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useShop();

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className={cn("product-card group relative flex flex-col", className)}>
      <div className="relative overflow-hidden aspect-[3/4] mb-4 rounded-lg">
        <ResponsiveImage
          src={product.image}
          alt={product.name}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Quick actions overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/5 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
          <div className="flex flex-col gap-2">
            <Link 
              to={`/product/${product.id}`}
              className="bg-white dark:bg-black text-black dark:text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              Quick View
            </Link>
          </div>
        </div>
        
        {/* Wishlist button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-black"
          onClick={toggleWishlist}
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-colors",
              isInWishlist(product.id) 
                ? "fill-red-500 text-red-500" 
                : "text-gray-600 dark:text-gray-400"
            )} 
          />
        </Button>
        
        {/* Badges */}
        {product.onSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            SALE
          </div>
        )}
        {product.newArrival && !product.onSale && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
            NEW
          </div>
        )}
      </div>
      
      <Link to={`/product/${product.id}`} className="flex-grow">
        <h3 className="font-medium hover:underline">{product.name}</h3>
      </Link>
      
      <div className="mt-1 flex justify-between items-center">
        <p className="text-sm font-medium">
          {product.onSale && (
            <span className="line-through text-gray-500 mr-2">${(product.price * 1.2).toFixed(2)}</span>
          )}
          ${product.price.toFixed(2)}
        </p>
        <div className="flex gap-1">
          {product.colors.slice(0, 3).map((color) => (
            <div
              key={color}
              className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-700"
              style={{ 
                backgroundColor: 
                  color === "White" ? "#FFFFFF" :
                  color === "Black" ? "#000000" :
                  color === "Gray" ? "#808080" :
                  color === "Navy" ? "#000080" :
                  color === "Olive" ? "#808000" :
                  color === "Khaki" ? "#F0E68C" :
                  color === "Cream" ? "#FFFDD0" :
                  color === "Tan" ? "#D2B48C" :
                  color === "Blue" ? "#0000FF" :
                  color === "Burgundy" ? "#800020" :
                  color
              }}
              title={color}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
}
