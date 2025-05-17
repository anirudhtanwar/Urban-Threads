
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShop } from "@/context/shop-context";
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart,
  ZoomIn,
  Check,
  X,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product-grid";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    products, 
    addToCart, 
    isInWishlist, 
    addToWishlist, 
    removeFromWishlist 
  } = useShop();
  
  const product = products.find(p => p.id === id);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);
  
  // Get similar products
  const similarProducts = products
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);
  
  // If product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">Sorry, the product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/shop")}>Return to Shop</Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Size required",
        description: "Please select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedColor) {
      toast({
        title: "Color required",
        description: "Please select a color before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(product, selectedSize, selectedColor, quantity);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      action: (
        <Button onClick={() => navigate('/cart')} size="sm" variant="outline">
          <ShoppingCart className="mr-2 h-4 w-4" />
          View Cart
        </Button>
      ),
    });
  };
  
  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
        action: (
          <Button onClick={() => navigate('/wishlist')} size="sm" variant="outline">
            <Heart className="mr-2 h-4 w-4" />
            View Wishlist
          </Button>
        ),
      });
    }
  };
  
  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };
  
  const isLoaded = (index: number) => {
    return imageLoaded[index] || false;
  };
  
  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % product.images.length);
  };
  
  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + product.images.length) % product.images.length);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="relative aspect-[3/4] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden mb-4">
            {/* Skeleton loader */}
            {!isLoaded(currentImage) && (
              <div className="absolute inset-0 skeleton" />
            )}
            
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className={cn(
                "object-cover w-full h-full transition-opacity duration-300",
                isLoaded(currentImage) ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => handleImageLoad(currentImage)}
            />
            
            {/* Image navigation */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-black"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-black"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
            
            {/* Zoom button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-black"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl">
                <img
                  src={product.images[currentImage]}
                  alt={product.name}
                  className="w-full h-auto"
                />
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Thumbnail gallery */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`w-16 h-20 rounded overflow-hidden ${
                    currentImage === index
                      ? "ring-2 ring-black dark:ring-white"
                      : "opacity-70"
                  }`}
                  onClick={() => setCurrentImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-xl font-medium mb-4">${product.price.toFixed(2)}</p>
          
          <div className="border-t border-gray-200 dark:border-gray-800 py-4 mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              {product.description}
            </p>
          </div>
          
          {/* Size selector */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Size</h3>
              <button className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                Size Guide
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`min-w-[44px] h-10 px-3 rounded-md text-sm font-medium ${
                    selectedSize === size
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <div className="mt-2 flex items-center text-green-600 text-sm">
                <Check className="w-4 h-4 mr-1" /> Size {selectedSize} selected
              </div>
            )}
          </div>
          
          {/* Color selector */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Color</h3>
            
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color
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
                  onClick={() => setSelectedColor(color)}
                  title={color}
                />
              ))}
            </div>
            {selectedColor && (
              <div className="mt-2 flex items-center text-green-600 text-sm">
                <Check className="w-4 h-4 mr-1" /> Color {selectedColor} selected
              </div>
            )}
          </div>
          
          {/* Quantity selector */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Quantity</h3>
            
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md w-max">
              <button
                className="px-3 py-2"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-3 py-2 font-medium">{quantity}</span>
              <button
                className="px-3 py-2"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              onClick={handleAddToCart}
              className="flex-grow"
              size="lg"
            >
              Add to Cart
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12"
              onClick={toggleWishlist}
            >
              <Heart 
                className={cn(
                  "w-5 h-5",
                  isInWishlist(product.id) 
                    ? "fill-red-500 text-red-500" 
                    : ""
                )} 
              />
            </Button>
          </div>
          
          {/* Product details accordion */}
          <div className="border-t border-gray-200 dark:border-gray-800">
            <details className="group py-4 border-b border-gray-200 dark:border-gray-800">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-medium">Product Details</span>
                <ChevronRight className="h-5 w-5 transform transition-transform group-open:rotate-90" />
              </summary>
              <div className="pt-4 pb-2 text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <p>• Premium quality materials</p>
                <p>• Designed for durability and comfort</p>
                <p>• Modern fit</p>
              </div>
            </details>
            
            <details className="group py-4 border-b border-gray-200 dark:border-gray-800">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-medium">Shipping & Returns</span>
                <ChevronRight className="h-5 w-5 transform transition-transform group-open:rotate-90" />
              </summary>
              <div className="pt-4 pb-2 text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <p>• Free shipping on orders over $50</p>
                <p>• Standard delivery: 3-5 business days</p>
                <p>• Express delivery: 1-2 business days</p>
                <p>• 30-day return policy</p>
              </div>
            </details>
          </div>
        </div>
      </div>
      
      {/* Similar products */}
      <section className="py-16">
        <h2 className="text-2xl font-semibold mb-8">You Might Also Like</h2>
        <ProductGrid products={similarProducts} columns={4} />
      </section>
    </div>
  );
};

export default ProductDetail;
