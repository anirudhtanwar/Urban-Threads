import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProductSearch } from "@/components/admin/ProductSearch";
import { 
  Menu, 
  X, 
  ShoppingCart, 
  Heart, 
  Search
} from "lucide-react";
import { SettingsButton } from "@/components/settings/settings-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { VoiceSearchButton } from "@/components/voice-search-button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchResult = (text: string) => {
    if (text && text.trim()) {
      setSearchValue(text.trim());
      setIsSearchOpen(true);
    }
  };

  // Add a custom style for navigation menu trigger that doesn't use the accent color on hover
  const customNavTriggerStyle = cn(
    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors",
    "hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
    "data-[active]:bg-transparent data-[state=open]:bg-transparent"
  );

  // Handle clicks outside search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the search bar when navigating to a different page
  useEffect(() => {
    setIsSearchOpen(false);
  }, [location]);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-background shadow-sm" // Always show background, not transparent
      )}
    >
      <div className="container py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="font-bold text-2xl tracking-tight text-foreground">
          Urban Threads
        </Link>

        {/* Mobile Menu */}
        {isMobile ? (
          <div className="flex items-center gap-2">
            {/* Mobile Search Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-full text-foreground"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            
            <ThemeToggle />
            
            {user && (
              <Link to="/cart" className="hover:text-primary">
                <Button variant="ghost" size="icon" className="rounded-full text-foreground">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                </Button>
              </Link>
            )}
            
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleMenu} className="rounded-full text-foreground">
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>Urban Threads</SheetTitle>
                  <SheetDescription>
                    Explore our latest collections.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-5">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Navigation</h3>
                    <NavLink to="/" className={({ isActive }) => 
                      cn("block py-2 px-3 rounded-md hover:bg-transparent hover:text-primary transition-colors", 
                        isActive && "bg-transparent font-medium")}
                    >
                      Home
                    </NavLink>
                    <NavLink to="/shop" className={({ isActive }) => 
                      cn("block py-2 px-3 rounded-md hover:bg-transparent hover:text-primary transition-colors", 
                        isActive && "bg-transparent font-medium")}
                    >
                      Shop
                    </NavLink>
                    <NavLink to="/new-arrivals" className={({ isActive }) =>
                      cn("block py-2 px-3 rounded-md hover:bg-transparent hover:text-primary transition-colors", 
                        isActive && "bg-transparent font-medium")}
                    >
                      New Arrivals
                    </NavLink>
                    <NavLink to="/sale" className={({ isActive }) => 
                      cn("block py-2 px-3 rounded-md hover:bg-transparent hover:text-primary transition-colors", 
                        isActive && "bg-transparent font-medium")}
                    >
                      Sale
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => 
                      cn("block py-2 px-3 rounded-md hover:bg-transparent hover:text-primary transition-colors", 
                        isActive && "bg-transparent font-medium")}
                    >
                      About
                    </NavLink>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Account</h3>
                    {user ? (
                      <>
                        <NavLink to="/cart" className={({ isActive }) => 
                          cn("block py-2 px-3 rounded-md hover:bg-transparent hover:text-primary transition-colors", 
                            isActive && "bg-transparent font-medium")}
                        >
                          Cart
                        </NavLink>
                        <NavLink to="/wishlist" className={({ isActive }) => 
                          cn("block py-2 px-3 rounded-md hover:bg-transparent hover:text-primary transition-colors", 
                            isActive && "bg-transparent font-medium")}
                        >
                          Wishlist
                        </NavLink>
                <Button 
                  variant="nohover" 
                  className="w-full text-left py-2 px-3 rounded-md text-destructive transition-colors" 
                  onClick={signOut}
                >
                  Sign Out
                </Button>
                      </>
                    ) : (
                      <>
                        <NavLink to="/login" className={({ isActive }) => 
                          cn("block py-2 px-3 rounded-md hover:bg-transparent hover:text-primary transition-colors", 
                            isActive && "bg-transparent font-medium")}
                        >
                          Login
                        </NavLink>
                        <NavLink to="/register" className={({ isActive }) => 
                          cn("block py-2 px-3 rounded-md hover:bg-transparent hover:text-primary transition-colors", 
                            isActive && "bg-transparent font-medium")}
                        >
                          Register
                        </NavLink>
                      </>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Help & Support</h3>
                    <NavLink to="/contact-us" className={({ isActive }) => 
                      cn("block py-2 px-3 rounded-md hover:bg-transparent hover:text-primary transition-colors", 
                        isActive && "bg-transparent font-medium")}
                    >
                      Contact Us
                    </NavLink>
                    <NavLink to="/faq" className={({ isActive }) => 
                      cn("block py-2 px-3 rounded-md hover:bg-transparent hover:text-primary transition-colors", 
                        isActive && "bg-transparent font-medium")}
                    >
                      FAQ
                    </NavLink>
                    <NavLink to="/shipping-returns" className={({ isActive }) => 
                      cn("block py-2 px-3 rounded-md hover:bg-transparent hover:text-primary transition-colors", 
                        isActive && "bg-transparent font-medium")}
                    >
                      Shipping & Returns
                    </NavLink>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          /* Desktop Navigation Menu */
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  asChild 
                  className={customNavTriggerStyle}
                >
                  <NavLink to="/">Home</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:bg-transparent hover:text-primary">Shop</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 gap-2 p-4 w-[400px]">
                    <div>
                      <h3 className="font-medium mb-2">Categories</h3>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <NavLink to="/shop?category=tshirts" className="block p-2 hover:bg-transparent hover:text-primary rounded-md">
                            Tees & Tops
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/shop?category=pants" className="block p-2 hover:bg-transparent hover:text-primary rounded-md">
                            Pants & Bottoms
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/shop?category=jackets" className="block p-2 hover:bg-transparent hover:text-primary rounded-md">
                            Jackets & Outerwear
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/shop?category=accessories" className="block p-2 hover:bg-transparent hover:text-primary rounded-md">
                            Accessories
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Collections</h3>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <NavLink to="/new-arrivals" className="block p-2 hover:bg-transparent hover:text-primary rounded-md">
                            New Arrivals
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/sale" className="block p-2 hover:bg-transparent hover:text-primary rounded-md">
                            Sale Items
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/shop?collection=sustainable" className="block p-2 hover:bg-transparent hover:text-primary rounded-md">
                            Sustainable Collection
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/shop" className="block p-2 hover:bg-transparent hover:text-primary rounded-md font-medium">
                            View All
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  asChild 
                  className={customNavTriggerStyle}
                >
                  <NavLink to="/new-arrivals">New Arrivals</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  asChild 
                  className={customNavTriggerStyle}
                >
                  <NavLink to="/sale">Sale</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  asChild 
                  className={customNavTriggerStyle}
                >
                  <NavLink to="/about">About</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Desktop Controls */}
        {!isMobile && (
          <div className="flex items-center gap-1">
            {/* Desktop Search */}
            <div ref={searchRef} className="relative">
              <div className="flex items-center">
                {isSearchOpen ? (
                  <div className="relative">
                    <ProductSearch
                      searchTerm={searchValue}
                      setSearchTerm={setSearchValue}
                      placeholder="Search products..."
                      className="w-56"
                      showSuggestions={true}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close search</span>
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsSearchOpen(true)}
                    className="rounded-full text-foreground"
                  >
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Open search</span>
                  </Button>
                )}
                
                <VoiceSearchButton 
                  onSearchResult={handleSearchResult}
                  className="text-foreground"
                />
              </div>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* User Controls */}
            {user ? (
              <div className="flex items-center gap-1">
                {/* Cart */}
                <Link to="/cart" className="hover:text-primary">
                  <Button variant="ghost" size="icon" className="rounded-full text-foreground">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Cart</span>
                  </Button>
                </Link>
                
                {/* Wishlist */}
                <Link to="/wishlist" className="hover:text-primary">
                  <Button variant="ghost" size="icon" className="rounded-full text-foreground">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Wishlist</span>
                  </Button>
                </Link>
                
                {/* Settings */}
                <SettingsButton />
                
                {/* Sign Out */}
                <Button variant="outline" size="sm" onClick={signOut} className="rounded-full ml-2 border-primary bg-background text-foreground">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Login */}
                <Link to="/login">
                <Button variant="ghost" size="sm" className="rounded-full text-foreground">
                  Login
                </Button>
                </Link>
                
                {/* Register */}
                <Link to="/register">
                <Button variant="outline" size="sm" className="rounded-full border-primary bg-background text-foreground">
                  Register
                </Button>
                </Link>
                
                {/* Settings */}
                <SettingsButton />
              </div>
            )}
          </div>
        )}

        {/* Mobile Search Bar - conditionally rendered */}
        {isMobile && isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-2 z-50 animate-fade-in">
            <ProductSearch
              searchTerm={searchValue}
              setSearchTerm={setSearchValue}
              placeholder="Search products..."
              showSuggestions={true}
            />
            <div className="flex items-center justify-between mt-2">
              <VoiceSearchButton onSearchResult={handleSearchResult} />
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsSearchOpen(false)}
                className="rounded-full text-foreground"
              >
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
