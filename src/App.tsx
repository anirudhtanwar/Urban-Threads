
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/shop-context";
import { ThemeProvider } from "./components/theme-provider";
import { Layout } from "./components/layout/layout";
import { AuthProvider } from "./hooks/use-auth";
import { AccessibilityProvider } from "./context/accessibility-context";

// Pages
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Admin from "./pages/Admin";
import NewArrivals from "./pages/NewArrivals";
import SaleItems from "./pages/SaleItems";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import ShippingReturns from "./pages/ShippingReturns";
import Accessibility from "./pages/Accessibility";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <AccessibilityProvider>
          <ShopProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/new-arrivals" element={<NewArrivals />} />
                    <Route path="/sale" element={<SaleItems />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/accessibility" element={<Accessibility />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/shipping-returns" element={<ShippingReturns />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ShopProvider>
        </AccessibilityProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
