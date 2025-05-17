
import { Link } from "react-router-dom";

export function PolicyFooter() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Urban Threads. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:underline">
              Terms of Service
            </Link>
            <Link to="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:underline">
              Privacy Policy
            </Link>
            <Link to="/shipping-returns" className="text-gray-600 dark:text-gray-400 hover:underline">
              Shipping & Returns
            </Link>
            <Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:underline">
              FAQ
            </Link>
            <Link to="/contact-us" className="text-gray-600 dark:text-gray-400 hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
