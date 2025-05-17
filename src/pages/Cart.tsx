
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useShop } from "@/context/shop-context";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart-item";
import { ProductGrid } from "@/components/product-grid";

const Cart = () => {
  const { cartItems, cartTotal, products } = useShop();
  
  // Get recommended products
  const recommendedProducts = products
    .filter(p => !cartItems.some(item => item.product.id === p.id))
    .slice(0, 4);
  
  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
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
      <h1 className="text-2xl font-semibold mb-8">Shopping Cart ({cartItems.length})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <CartItem
              key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
              id={item.product.id}
              name={item.product.name}
              price={item.product.price}
              image={item.product.image}
              quantity={item.quantity}
              size={item.selectedSize}
              color={item.selectedColor}
            />
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-6">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Link to="/checkout">
              <Button className="w-full mb-3">
                Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/shop" className="text-center block text-sm text-gray-600 dark:text-gray-400 hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
