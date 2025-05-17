import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "@/context/shop-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Check, CreditCard, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems, cartTotal, clearCart } = useShop();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const { user } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to continue with checkout",
        variant: "destructive",
      });
      // Save the current page in session storage to redirect back after login
      sessionStorage.setItem("redirectAfterLogin", "/checkout");
      navigate("/login");
    }
  }, [user, navigate, toast]);

  // If not authenticated, show loading or message
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Authentication Required</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You need to be signed in to complete your purchase.
        </p>
        <Button onClick={() => navigate("/login")}>
          Sign In to Continue
        </Button>
      </div>
    );
  }

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    email: user?.email || "",
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });
  
  const [shippingMethod, setShippingMethod] = useState("standard");
  
  // Shipping cost calculation
  const shippingCost = 
    shippingMethod === "express" ? 15 : 
    shippingMethod === "nextDay" ? 25 : 
    cartTotal > 100 ? 0 : 8;
  
  // Tax calculation (simplified)
  const taxRate = 0.08;
  const taxAmount = cartTotal * taxRate;
  
  // Total order calculation
  const orderTotal = cartTotal + shippingCost + taxAmount;
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo(0, 0);
  };
  
  // Update the handleOrderSubmit function
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Ensure user is authenticated before processing order
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be signed in to complete your order",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Simulate order processing
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      navigate("/order-confirmation");
      
      toast({
        title: "Order Placed!",
        description: "Thank you for your order. We'll send you a confirmation email shortly.",
      });
    }, 2000);
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formType: "shipping" | "payment"
  ) => {
    const { name, value } = e.target;
    
    if (formType === "shipping") {
      setShippingInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setPaymentInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
        <p className="mb-6">Add some items to your cart before proceeding to checkout.</p>
        <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 mt-4">
      <div className="max-w-4xl mx-auto">
        {/* Checkout steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            <div 
              className={`flex flex-col items-center ${
                step >= 1 ? "text-black dark:text-white" : "text-gray-400"
              }`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-2 ${
                step >= 1 
                  ? "bg-black dark:bg-white text-white dark:text-black" 
                  : "bg-gray-200 dark:bg-gray-800 text-gray-500"
              }`}>
                {step > 1 ? <Check className="h-4 w-4" /> : "1"}
              </div>
              <span className="text-sm">Shipping</span>
            </div>
            
            <div className="w-full mx-4 mt-4">
              <div className={`h-1 ${
                step >= 2 ? "bg-black dark:bg-white" : "bg-gray-200 dark:bg-gray-800"
              }`}></div>
            </div>
            
            <div 
              className={`flex flex-col items-center ${
                step >= 2 ? "text-black dark:text-white" : "text-gray-400"
              }`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-2 ${
                step >= 2 
                  ? "bg-black dark:bg-white text-white dark:text-black" 
                  : "bg-gray-200 dark:bg-gray-800 text-gray-500"
              }`}>
                {step > 2 ? <Check className="h-4 w-4" /> : "2"}
              </div>
              <span className="text-sm">Payment</span>
            </div>
            
            <div className="w-full mx-4 mt-4">
              <div className={`h-1 ${
                step >= 3 ? "bg-black dark:bg-white" : "bg-gray-200 dark:bg-gray-800"
              }`}></div>
            </div>
            
            <div 
              className={`flex flex-col items-center ${
                step >= 3 ? "text-black dark:text-white" : "text-gray-400"
              }`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-2 ${
                step === 3 
                  ? "bg-black dark:bg-white text-white dark:text-black" 
                  : "bg-gray-200 dark:bg-gray-800 text-gray-500"
              }`}>
                3
              </div>
              <span className="text-sm">Review</span>
            </div>
          </div>
        </div>
        
        {step === 1 && (
          <form onSubmit={handleShippingSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={shippingInfo.firstName}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={shippingInfo.lastName}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={(e) => handleInputChange(e, "shipping")}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={shippingInfo.city}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={shippingInfo.state}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Select 
                value={shippingInfo.country}
                onValueChange={(value) => 
                  setShippingInfo((prev) => ({ ...prev, country: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={shippingInfo.phone}
                onChange={(e) => handleInputChange(e, "shipping")}
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={shippingInfo.email}
                onChange={(e) => handleInputChange(e, "shipping")}
                required
              />
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">Shipping Method</h3>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="standard"
                    name="shippingMethod"
                    value="standard"
                    checked={shippingMethod === "standard"}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="standard" className="flex-grow">
                    <div className="font-medium">Standard Shipping</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      3-5 business days
                    </div>
                  </label>
                  <span className="font-medium">
                    {cartTotal > 100 ? "Free" : "$8.00"}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="express"
                    name="shippingMethod"
                    value="express"
                    checked={shippingMethod === "express"}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="express" className="flex-grow">
                    <div className="font-medium">Express Shipping</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      2-3 business days
                    </div>
                  </label>
                  <span className="font-medium">$15.00</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="nextDay"
                    name="shippingMethod"
                    value="nextDay"
                    checked={shippingMethod === "nextDay"}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="nextDay" className="flex-grow">
                    <div className="font-medium">Next Day Delivery</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Next business day
                    </div>
                  </label>
                  <span className="font-medium">$25.00</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button 
                type="button"
                variant="outline"
                onClick={() => navigate("/cart")}
              >
                Back to Cart
              </Button>
              <Button type="submit">Continue to Payment</Button>
            </div>
          </form>
        )}
        
        {step === 2 && (
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
            
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="flex items-center mb-4">
                <CreditCard className="mr-2 h-5 w-5" />
                <h3 className="font-medium">Credit Card</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={paymentInfo.cardName}
                    onChange={(e) => handleInputChange(e, "payment")}
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => handleInputChange(e, "payment")}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="expMonth">Expiration Month</Label>
                    <Select 
                      value={paymentInfo.expMonth}
                      onValueChange={(value) => 
                        setPaymentInfo((prev) => ({ ...prev, expMonth: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = i + 1;
                          return (
                            <SelectItem 
                              key={month} 
                              value={month.toString().padStart(2, "0")}
                            >
                              {month.toString().padStart(2, "0")}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="expYear">Expiration Year</Label>
                    <Select 
                      value={paymentInfo.expYear}
                      onValueChange={(value) => 
                        setPaymentInfo((prev) => ({ ...prev, expYear: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <SelectItem 
                              key={year} 
                              value={year.toString()}
                            >
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      maxLength={4}
                      value={paymentInfo.cvv}
                      onChange={(e) => handleInputChange(e, "payment")}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="font-medium mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span>
                    {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
              >
                Back to Shipping
              </Button>
              <Button type="submit">Review Order</Button>
            </div>
          </form>
        )}
        
        {step === 3 && (
          <form onSubmit={handleOrderSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Review Order</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Shipping Information</h3>
                <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <p className="font-medium">
                    {shippingInfo.firstName} {shippingInfo.lastName}
                  </p>
                  <p>{shippingInfo.address}</p>
                  <p>
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                  </p>
                  <p>{shippingInfo.country}</p>
                  <p className="mt-2">{shippingInfo.phone}</p>
                  <p>{shippingInfo.email}</p>
                  
                  <div className="border-t border-gray-200 dark:border-gray-800 mt-3 pt-3">
                    <p className="font-medium">Shipping Method:</p>
                    <p>
                      {shippingMethod === "standard"
                        ? "Standard (3-5 business days)"
                        : shippingMethod === "express"
                        ? "Express (2-3 business days)"
                        : "Next Day Delivery"}
                    </p>
                  </div>
                </div>
                
                <Button 
                  type="button"
                  variant="link" 
                  className="mt-2 h-auto p-0"
                  onClick={() => setStep(1)}
                >
                  Edit Shipping Information
                </Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Payment Information</h3>
                <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <p className="font-medium">{paymentInfo.cardName}</p>
                  <p>
                    Card ending in {paymentInfo.cardNumber.slice(-4)}
                  </p>
                  <p>
                    Expires {paymentInfo.expMonth}/{paymentInfo.expYear}
                  </p>
                </div>
                
                <Button 
                  type="button"
                  variant="link" 
                  className="mt-2 h-auto p-0"
                  onClick={() => setStep(2)}
                >
                  Edit Payment Information
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Order Items</h3>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                {cartItems.map((item) => (
                  <div 
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800 last:border-0"
                  >
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Size: {item.selectedSize} / Color: {item.selectedColor}
                      </p>
                      <p className="text-sm">
                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
                
                <div className="p-4 bg-gray-50 dark:bg-gray-900 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span>
                      {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setStep(2)}
              >
                Back to Payment
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing Order..." : "Place Order"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;
