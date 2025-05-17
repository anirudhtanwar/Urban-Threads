import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product-grid";
import { useShop } from "@/context/shop-context";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCarousel } from "@/hooks/use-carousel";

const Index = () => {
  const { products } = useShop();
  const featuredProducts = Array.isArray(products) ? products.filter(product => product?.featured) : [];
  const newArrivals = Array.isArray(products) ? products.filter(product => product?.newArrival) : [];
  const saleItems = Array.isArray(products) ? products.filter(product => product?.onSale) : [];
  
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    
    // Simulate loading for demonstration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Hero slider images - Updated with better aspect ratio images for full coverage
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Redefining Urban Apparel for 2025",
      subtitle: "Minimal designs. Sustainable materials. Future-forward styles."
    },
    {
      url: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Summer Collection Now Available",
      subtitle: "Breathable fabrics for the warmer days ahead."
    },
    {
      url: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Sustainable Fashion Forward",
      subtitle: "Eco-friendly materials, ethical manufacturing."
    }
  ];

  // Use our custom carousel hook for automatic sliding
  const { api: carouselApi, setApi: setCarouselApi } = useCarousel({
    autoplay: true, 
    delay: 5000
  });
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel - Fill viewport properly */}
      <section className="relative min-h-[calc(100vh-4rem)]">
        {loading ? (
          <div className="h-full w-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
        ) : (
          <Carousel 
            className="h-full w-full" 
            setApi={setCarouselApi}
            opts={{ loop: true }} // Ensure loop is enabled
          >
            <CarouselContent className="h-full">
              {heroImages.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative h-[calc(100vh-4rem)] w-full flex items-center">
                    <div className="absolute inset-0 bg-gray-900 opacity-50 z-10" />
                    <div className="absolute inset-0 z-0">
                      <ResponsiveImage 
                        src={image.url}
                        alt={`Hero image ${index + 1}`}
                        aspectRatio="aspect-none"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="container mx-auto px-4 text-white z-20">
                      <h1 className={cn(
                        "text-4xl sm:text-5xl md:text-7xl font-bold mb-6 max-w-4xl",
                        mounted && "animate-fade-in"
                      )}>
                        {image.title}
                      </h1>
                      <p className={cn(
                        "text-lg sm:text-xl md:text-2xl max-w-2xl mb-8 opacity-90",
                        mounted && "animate-fade-in delay-200"
                      )}>
                        {image.subtitle}
                      </p>
                      <div className={cn(
                        "flex flex-wrap gap-4",
                        mounted && "animate-fade-in delay-400"
                      )}>
                        {/* Make buttons stay in place without animation */}
                        <Link to="/shop">
                          <Button 
                            size="lg" 
                            className="relative z-30 rounded-full px-8 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 hover:scale-105 transition-transform duration-300"
                          >
                            Shop Collection
                          </Button>
                        </Link>
                        <Link to="/about">
                          <Button 
                            size="lg"
                            className="relative z-30 rounded-full px-8 bg-transparent border-2 border-white text-white hover:bg-white/10 dark:border-white dark:text-white dark:hover:bg-white/10 hover:scale-105 transition-transform duration-300"
                          >
                            Our Story
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
              {heroImages.map((_, index) => {
                // Safe access to the current slide index
                const currentSlide = typeof carouselApi?.selectedScrollSnap === 'function' 
                  ? carouselApi.selectedScrollSnap() 
                  : 0;
                
                return (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentSlide === index
                        ? "bg-white scale-125"
                        : "bg-white/50"
                    }`}
                    onClick={() => carouselApi?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>
          </Carousel>
        )}
      </section>
      
      {/* Featured Collections */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold">Featured Collection</h2>
            <Link to="/shop" className="flex items-center text-sm font-medium hover:underline group">
              View All <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <SkeletonLoader type="product" count={4} />
            </div>
          ) : (
            <ProductGrid products={featuredProducts} columns={4} />
          )}
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">Shop By Category</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SkeletonLoader type="category" count={3} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CategoryCard 
                name="Tees & Tops" 
                image="https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                url="/shop?category=tshirts" 
              />
              <CategoryCard 
                name="Pants & Bottoms" 
                image="https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                url="/shop?category=pants" 
              />
              <CategoryCard 
                name="Jackets & Outerwear" 
                image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                url="/shop?category=jackets" 
              />
            </div>
          )}
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold">New Arrivals</h2>
            <Link to="/shop?filter=new" className="flex items-center text-sm font-medium hover:underline group">
              View All <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <SkeletonLoader type="product" count={4} />
            </div>
          ) : (
            <ProductGrid products={newArrivals} columns={4} />
          )}
        </div>
      </section>
      
      {/* Sale Items Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold">Sale Items</h2>
            <Link to="/shop?filter=sale" className="flex items-center text-sm font-medium hover:underline group">
              View All <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {loading ? (
              <>
                <SkeletonLoader type="banner" count={1} />
                <SkeletonLoader type="banner" count={1} />
              </>
            ) : (
              <>
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <ResponsiveImage 
                    src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Season End Sale" 
                    aspectRatio="aspect-none"
                    className="h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
                    <h3 className="text-2xl font-bold mb-2">Season End Sale</h3>
                    <p className="text-lg mb-4">Up to 50% off on selected items</p>
                    <Link to="/shop?filter=sale">
                      <Button className="bg-white text-black hover:bg-gray-100 hover:scale-105 transition-transform duration-300">Shop Now</Button>
                    </Link>
                  </div>
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <ResponsiveImage 
                    src="https://images.unsplash.com/photo-1550047509-8ea97fc29be9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Limited Collection" 
                    aspectRatio="aspect-none"
                    className="h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
                    <h3 className="text-2xl font-bold mb-2">Limited Collections</h3>
                    <p className="text-lg mb-4">Special pricing on collections</p>
                    <Link to="/shop?filter=sale">
                      <Button className="bg-white text-black hover:bg-gray-100 hover:scale-105 transition-transform duration-300">Shop Now</Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <SkeletonLoader type="product" count={4} />
            </div>
          ) : (
            <ProductGrid products={saleItems} columns={4} />
          )}
        </div>
      </section>
      
      {/* Sustainability Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Sustainable Fashion Forward</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Urban Threads is committed to sustainable practices and ethical manufacturing. 
                Our apparel is crafted from organic and recycled materials, produced in facilities 
                that prioritize fair wages and environmental responsibility.
              </p>
              <Link to="/about">
                <Button className="rounded-full hover:scale-105 transition-transform duration-300">Learn More</Button>
              </Link>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 aspect-square rounded-lg overflow-hidden order-1 lg:order-2 group">
              {loading ? (
                <div className="w-full h-full animate-pulse bg-gray-200 dark:bg-gray-700" />
              ) : (
                <ResponsiveImage 
                  src="https://images.unsplash.com/photo-1621972660772-6a0427d5e5b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Sustainable Fashion" 
                  className="transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Join Our Community</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-300">
            Subscribe to our newsletter for exclusive drops, sustainability updates, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 flex-grow bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 hover:bg-white/15"
            />
            <Button className="bg-white text-black hover:bg-gray-100 hover:scale-105 transition-transform duration-300">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface CategoryCardProps {
  name: string;
  image: string;
  url: string;
}

function CategoryCard({ name, image, url }: CategoryCardProps) {
  return (
    <Link to={url} className="group relative overflow-hidden aspect-[3/4] rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
      <ResponsiveImage 
        src={image} 
        alt={name} 
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300 group-hover:translate-y-[-10px]">
        <h3 className="text-xl font-medium text-white mb-2">{name}</h3>
        <div className="flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors">
          Shop Now <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default Index;
