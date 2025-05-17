
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useShop } from "@/context/shop-context";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product-grid";

const Wishlist = () => {
  const { wishlist, products } = useShop();
  
  // Get recommended products
  const recommendedProducts = products
    .filter(p => !wishlist.some(item => item.id === p.id))
    .slice(0, 4);
  
  // Empty wishlist state
  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Your wishlist is empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Save items you love to your wishlist so you don't lose track of them.
          </p>
          <Link to="/shop">
            <Button>Start Shopping</Button>
          </Link>
        </div>
        
        {recommendedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-6">Recommended For You</h2>
            <ProductGrid products={recommendedProducts} />
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 mt-4">
      <h1 className="text-2xl font-semibold mb-8">Wishlist ({wishlist.length})</h1>
      <ProductGrid products={wishlist} />
    </div>
  );
};

export default Wishlist;
