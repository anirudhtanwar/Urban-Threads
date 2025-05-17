
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">URBAN THREADS</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Modern, sustainable fashion for the forward-thinking individual.
            </p>
          </div>
          
          <nav aria-label="Shop navigation">
            <h4 className="font-medium mb-4" id="shop-navigation">Shop</h4>
            <ul className="space-y-2 text-sm" aria-labelledby="shop-navigation">
              <li><Link to="/shop" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">All Products</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">New Arrivals</Link></li>
              <li><Link to="/sale" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Sale</Link></li>
            </ul>
          </nav>
          
          <nav aria-label="Customer service navigation">
            <h4 className="font-medium mb-4" id="customer-navigation">Customer Service</h4>
            <ul className="space-y-2 text-sm" aria-labelledby="customer-navigation">
              <li><Link to="/contact-us" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">FAQs</Link></li>
              <li><Link to="/shipping" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Shipping & Returns</Link></li>
            </ul>
          </nav>
          
          <div>
            <h4 className="font-medium mb-4" id="connect-section">Connect</h4>
            <div className="flex space-x-4 mb-4" aria-labelledby="connect-section">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" aria-label="Instagram">Instagram</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" aria-label="Twitter">Twitter</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" aria-label="TikTok">TikTok</a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400" id="newsletter-label">
              Subscribe for updates
            </p>
            <form className="mt-2 flex" aria-labelledby="newsletter-label">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email for newsletter"
                className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-primary flex-1"
                required
              />
              <button
                type="submit"
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-medium rounded-r-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 Urban Threads. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms-of-service" className="hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Terms</Link>
            <Link to="/privacy-policy" className="hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Privacy</Link>
            <Link to="/accessibility" className="hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
