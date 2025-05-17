
import { Plus, Minus, X } from "lucide-react";
import { useShop } from "@/context/shop-context";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

export function CartItem({ 
  id, 
  name, 
  price, 
  image, 
  quantity, 
  size, 
  color 
}: CartItemProps) {
  const { updateCartItemQuantity, removeFromCart } = useShop();
  
  const handleDecrease = () => {
    if (quantity > 1) {
      updateCartItemQuantity(id, quantity - 1);
    }
  };
  
  const handleIncrease = () => {
    updateCartItemQuantity(id, quantity + 1);
  };
  
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 dark:border-gray-800 animate-fade-in">
      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <Link to={`/product/${id}`} className="font-medium hover:underline">
            {name}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => removeFromCart(id)}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Size: {size} / Color: {color}
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-md">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={handleIncrease}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="font-medium">
            ${(price * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
