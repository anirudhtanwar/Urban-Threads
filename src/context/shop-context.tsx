import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
  images: string[];
  featured?: boolean;
  newArrival?: boolean;
  onSale?: boolean;
  discount?: number;
  sku?: string;
  brand?: string;
  material?: string;
  weight?: string;
  stock?: number;
  tags?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface ShopContextType {
  products: Product[];
  cartItems: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Sample product data with proper images
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Modern Minimal Tee",
    price: 39.99,
    category: "tshirts",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583743089315-5b8e914f4b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    description: "A clean, minimal t-shirt perfect for everyday wear. Made from premium cotton for comfort and durability.",
    colors: ["Black", "White", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    sku: "TEE-001",
    brand: "Urban Threads",
    material: "Cotton",
    weight: "200g",
    stock: 120,
    tags: "minimal,summer,men"
  },
  {
    id: "2",
    name: "Urban Cargo Pants",
    price: 89.99,
    category: "pants",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1549062572-544a64fb0c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    description: "Functional cargo pants with a modern twist. Multiple pockets and a relaxed fit for urban exploration.",
    colors: ["Olive", "Black", "Khaki"],
    sizes: ["30", "32", "34", "36"],
    newArrival: true,
  },
  {
    id: "3",
    name: "Tech Fabric Hoodie",
    price: 79.99,
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1565693413579-8a448c03f412?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    description: "Advanced technical fabric hoodie that regulates temperature and provides maximum comfort.",
    colors: ["Navy", "Gray", "Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "4",
    name: "Minimalist Cropped Jacket",
    price: 129.99,
    category: "jackets",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    description: "A lightweight cropped jacket with clean lines and minimal detailing. Perfect for layering.",
    colors: ["Black", "Cream", "Tan"],
    sizes: ["XS", "S", "M", "L"],
    onSale: true,
  },
  {
    id: "5",
    name: "Urban Bomber Jacket",
    price: 149.99,
    category: "jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1559551409-dadc959f76b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    description: "Modern take on the classic bomber jacket. Water-resistant shell with premium insulation.",
    colors: ["Black", "Navy", "Olive"],
    sizes: ["S", "M", "L", "XL"],
    newArrival: true,
  },
  {
    id: "6",
    name: "Relaxed Fit Jeans",
    price: 69.99,
    category: "pants",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    description: "Comfortable relaxed fit jeans with a slightly tapered leg for a modern silhouette.",
    colors: ["Blue", "Black", "Gray"],
    sizes: ["30", "32", "34", "36"],
    featured: true,
  },
  {
    id: "7",
    name: "Graphic Print Tee",
    price: 44.99,
    category: "tshirts",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583744946564-b52d01e7f922?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    description: "Artistic graphic tee featuring original designs screen printed on premium cotton.",
    colors: ["White", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    onSale: true,
  },
  {
    id: "8",
    name: "Knit Beanie",
    price: 29.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1604532057340-58c9a9548767?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    description: "Soft knitted beanie made from sustainable materials. Provides warmth without bulk.",
    colors: ["Black", "Gray", "Burgundy"],
    sizes: ["One Size"],
    newArrival: true,
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Cart & wishlist persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse saved cart:", error);
      }
    }
    
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Failed to parse saved wishlist:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart functions
  const addToCart = (product: Product, selectedSize: string, selectedColor: string, quantity: number = 1) => {
    setCartItems(prev => {
      // Check if item already exists in cart
      const existingItemIndex = prev.findIndex(
        item => item.product.id === product.id && 
               item.selectedSize === selectedSize && 
               item.selectedColor === selectedColor
      );
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...prev];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prev, { product, quantity, selectedSize, selectedColor }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Wishlist functions
  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlist(prev => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(product => product.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(product => product.id === productId);
  };

  // Admin functions
  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
    // Save to localStorage for persistence
    localStorage.setItem('products', JSON.stringify([...products, product]));
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    // Save to localStorage for persistence
    localStorage.setItem('products', JSON.stringify(
      products.map(product => product.id === updatedProduct.id ? updatedProduct : product)
    ));
  };

  const removeProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    // Save to localStorage for persistence
    localStorage.setItem('products', JSON.stringify(
      products.filter(product => product.id !== productId)
    ));
  };

  // Cart calculations
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  
  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity, 
    0
  );

  const value = {
    products,
    cartItems,
    wishlist,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearCart,
    cartTotal,
    cartCount,
    addProduct,
    updateProduct,
    removeProduct,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
