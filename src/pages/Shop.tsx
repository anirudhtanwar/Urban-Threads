
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useShop } from "@/context/shop-context";
import { ProductGrid } from "@/components/product-grid";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Product } from "@/context/shop-context";

const Shop = () => {
  const { products } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  
  // Get filter values from URL
  const categoryParam = searchParams.get("category");
  const filterParam = searchParams.get("filter");
  const sortParam = searchParams.get("sort") || "featured";
  const searchQuery = searchParams.get("search");
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );
  
  const sizes = Array.from(
    new Set(products.flatMap((product) => product.sizes))
  );
  
  const colors = Array.from(
    new Set(products.flatMap((product) => product.colors))
  );
  
  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];
    
    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Special filters
    if (filterParam === "new") {
      filtered = filtered.filter(p => p.newArrival);
    } else if (filterParam === "sale") {
      filtered = filtered.filter(p => p.onSale);
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => 
        p.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Price filter
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortParam) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered = filtered.filter(p => p.newArrival).concat(
          filtered.filter(p => !p.newArrival)
        );
        break;
      case "featured":
      default:
        filtered = filtered.filter(p => p.featured).concat(
          filtered.filter(p => !p.featured)
        );
    }
    
    setFilteredProducts(filtered);
  }, [products, filterParam, selectedCategories, selectedSizes, selectedColors, priceRange, sortParam, searchQuery]);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0]);
    }
    
    if (filterParam) {
      params.set("filter", filterParam);
    }
    
    if (sortParam !== "featured") {
      params.set("sort", sortParam);
    }
    
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    
    setSearchParams(params, { replace: true });
  }, [selectedCategories, filterParam, sortParam, setSearchParams, searchQuery]);
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8 mt-4">
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full sm:w-64 lg:w-72">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button 
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
              onClick={() => {
                setSelectedCategories([]);
                setSelectedSizes([]);
                setSelectedColors([]);
                setPriceRange([0, 200]);
                setSearchParams({});
              }}
            >
              Clear all
            </button>
          </div>
          
          <Accordion type="multiple" defaultValue={["categories", "sizes", "colors", "price"]} className="space-y-2">
            <AccordionItem value="categories" className="border border-gray-200 dark:border-gray-800 rounded-lg px-4">
              <AccordionTrigger className="py-3">Categories</AccordionTrigger>
              <AccordionContent>
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2 py-1">
                    <Checkbox 
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label 
                      htmlFor={`category-${category}`}
                      className="text-sm leading-none capitalize"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="sizes" className="border border-gray-200 dark:border-gray-800 rounded-lg px-4">
              <AccordionTrigger className="py-3">Sizes</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`min-w-[40px] h-9 px-2 rounded-md text-sm font-medium ${
                        selectedSizes.includes(size)
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      }`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="colors" className="border border-gray-200 dark:border-gray-800 rounded-lg px-4">
              <AccordionTrigger className="py-3">Colors</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColors.includes(color)
                          ? "border-black dark:border-white"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
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
                      onClick={() => toggleColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="price" className="border border-gray-200 dark:border-gray-800 rounded-lg px-4">
              <AccordionTrigger className="py-3">Price</AccordionTrigger>
              <AccordionContent>
                <div className="px-1">
                  <Slider 
                    value={priceRange} 
                    min={0}
                    max={200}
                    step={10}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Products grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">
              {searchQuery ? `Search: "${searchQuery}"` :
              filterParam === "new" ? "New Arrivals" : 
              filterParam === "sale" ? "Sale Items" : 
              categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}` : 
              "All Products"}
            </h1>
            
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
                Sort by:
              </span>
              <Select 
                value={sortParam} 
                onValueChange={(value) => {
                  searchParams.set("sort", value);
                  setSearchParams(searchParams);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters or browse our other collections
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
