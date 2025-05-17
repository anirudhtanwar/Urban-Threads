
import { useState, useEffect } from "react";
import { useShop } from "@/context/shop-context";
import { ProductGrid } from "@/components/product-grid";
import { Product } from "@/context/shop-context";
import { Helmet } from "react-helmet-async";

const SaleItems = () => {
  const { products } = useShop();
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filtered = products.filter((product) => product.onSale);
    setSaleProducts(filtered);
    setIsLoading(false);
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-8 mt-4">
      <Helmet>
        <title>Sale Items | Urban Threads</title>
        <meta name="description" content="Shop our sale items - limited time discounts on select styles." />
      </Helmet>
      
      <h1 className="text-2xl font-semibold mb-8" id="page-title">Sale Items</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton rounded-lg h-64"></div>
          ))}
        </div>
      ) : saleProducts.length > 0 ? (
        <ProductGrid products={saleProducts} />
      ) : (
        <div className="text-center py-20" role="status">
          <h3 className="text-xl font-medium mb-2">No sale items currently available</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Check back soon for upcoming sales
          </p>
        </div>
      )}
    </div>
  );
};

export default SaleItems;
