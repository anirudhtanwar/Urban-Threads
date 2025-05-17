
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderConfirmation = () => {
  // Generate a random order number
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
  
  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
      <div className="rounded-full bg-green-100 dark:bg-green-900 w-16 h-16 flex items-center justify-center mx-auto mb-6">
        <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
      </div>
      
      <h1 className="text-3xl font-semibold mb-3">Thank You for Your Order!</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Your order has been received and is being processed.
      </p>
      
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-8">
        <div className="mb-4">
          <h2 className="font-medium mb-1">Order Number</h2>
          <p className="text-2xl font-mono">#UT-{orderNumber}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="font-medium mb-1">Confirmation Email</h2>
          <p>A confirmation email has been sent to your email address.</p>
        </div>
        
        <div>
          <h2 className="font-medium mb-1">Estimated Delivery</h2>
          <p>May 13 - May 18, 2025</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="font-medium mb-2">What happens next?</h2>
          <ol className="space-y-2 text-left text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="bg-gray-200 dark:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
              <span>We'll send you a confirmation email with your order details.</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-200 dark:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
              <span>Once your order is ready for shipping, you'll receive a shipping confirmation email with tracking information.</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-200 dark:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
              <span>Your items will be delivered to the address you provided.</span>
            </li>
          </ol>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400">
          Questions about your order? Contact our customer service team at support@urbanthreads.com
        </p>
      </div>
      
      <div className="mt-10 space-x-4">
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
        <Link to="/shop">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
