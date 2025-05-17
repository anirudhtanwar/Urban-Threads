
import { ProductCard } from "@/components/product-card";
import { Product } from "@/context/shop-context";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: number;
}

export function ProductGrid({ 
  products, 
  className,
  columns = 4 
}: ProductGridProps) {
  
  const getGridCols = () => {
    switch(columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };
  
  return (
    <div className={cn(
      "grid gap-6 md:gap-8",
      getGridCols(),
      className
    )}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
