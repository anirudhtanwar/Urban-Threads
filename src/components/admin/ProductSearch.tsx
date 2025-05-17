import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { useShop } from "../../context/shop-context";
import { SearchSuggestions } from "../ui/search-suggestions";
import { useNavigate } from "react-router-dom";

interface ProductSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({ 
  searchTerm, 
  setSearchTerm,
  placeholder = "Search products...",
  className = "",
  showSuggestions = false
}) => {
  const { products } = useShop();
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{
    id: string;
    name: string;
    image?: string;
    price?: number;
    category?: string;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleClear = () => {
    setSearchTerm('');
  };

  // Debug logs for searchTerm and products
  useEffect(() => {
    console.log("ProductSearch - searchTerm:", searchTerm);
    console.log("ProductSearch - products:", products);
  }, [searchTerm, products]);

  // Filter products based on search term
  useEffect(() => {
    if (!searchTerm?.trim() || !showSuggestions) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setHasError(false);
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        if (!Array.isArray(products)) {
          console.error("Products is not an array:", products);
          setSuggestions([]);
          setLoading(false);
          return;
        }
        
        const productsThatExist = products.filter(product => product != null);
        
        const filteredProducts = productsThatExist
          .filter(product => 
            (product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product?.description?.toLowerCase().includes(searchTerm.toLowerCase()))
          )
          .slice(0, 5)
          .map(product => ({
            id: product.id || '',
            name: product.name || 'Unnamed Product',
            image: product.image || (product.images && product.images[0]) || '', 
            price: product.price || 0,
            category: product.category || 'Uncategorized'
          }));
        
        setSuggestions(filteredProducts);
      } catch (error) {
        console.error("Error filtering products:", error);
        setSuggestions([]);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, products, showSuggestions]);

  if (hasError) {
    return <div className={`relative ${className} text-red-600`}>Error loading search suggestions.</div>;
  }

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder={placeholder}
        className="pl-9 w-full"
        value={searchTerm || ''}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          // Increased delay to allow clicking on suggestions
          setTimeout(() => setIsFocused(false), 300);
        }}
      />
      {searchTerm && (
        <button 
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          onClick={handleClear}
          type="button"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
        </button>
      )}

      {showSuggestions && isFocused && searchTerm && (
        <SearchSuggestions
          suggestions={suggestions}
          loading={loading}
          searchTerm={searchTerm}
          onClose={() => setIsFocused(false)}
          onSelectSuggestion={(suggestion) => {
            setSearchTerm(suggestion.name);
            if (suggestion.id) {
              navigate(`/product/${suggestion.id}`);
            }
          }}
        />
      )}
    </div>
  );
};
