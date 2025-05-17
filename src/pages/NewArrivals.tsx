
import { useState, useEffect } from "react";
import { useShop } from "@/context/shop-context";
import { ProductGrid } from "@/components/product-grid";
import { Product } from "@/context/shop-context";
import { Helmet } from "react-helmet-async";

const NewArrivals = () => {
  const { products } = useShop();
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filtered = products.filter((product) => product.newArrival);
    setNewProducts(filtered);
    setIsLoading(false);
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-8 mt-4">
      <Helmet>
        <title>New Arrivals | Urban Threads</title>
        <meta name="description" content="Check out our latest arrivals - fresh styles just added to our collection." />
      </Helmet>
      
      <h1 className="text-2xl font-semibold mb-8" id="page-title">New Arrivals</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton rounded-lg h-64"></div>
          ))}
        </div>
      ) : newProducts.length > 0 ? (
        <ProductGrid products={newProducts} />
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium mb-2">No new arrivals found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Check back soon for our newest products
          </p>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
