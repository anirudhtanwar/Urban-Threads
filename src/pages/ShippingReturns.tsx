
import { Helmet } from "react-helmet-async";

const ShippingReturns = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Helmet>
        <title>Shipping & Returns | Urban Threads</title>
        <meta name="description" content="Urban Threads shipping policies, delivery information, and return procedures" />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">Shipping & Returns</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Shipping Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h3 className="text-xl font-medium mt-6 mb-3">Shipping Methods</h3>
            <div className="mb-6">
              <p className="font-medium">Standard Shipping</p>
              <p className="text-gray-600 dark:text-gray-400">
                3-5 business days<br />
                $8.00 (Free on orders over $100)
              </p>
            </div>
            
            <div className="mb-6">
              <p className="font-medium">Express Shipping</p>
              <p className="text-gray-600 dark:text-gray-400">
                2-3 business days<br />
                $15.00
              </p>
            </div>
            
            <div className="mb-6">
              <p className="font-medium">Next Day Delivery</p>
              <p className="text-gray-600 dark:text-gray-400">
                Next business day<br />
                $25.00
              </p>
            </div>
            
            <h3 className="text-xl font-medium mt-8 mb-3">International Shipping</h3>
            <p>
              We ship to most countries worldwide. International shipping costs and delivery times vary based on location:
            </p>
            <ul className="list-disc pl-6">
              <li className="mb-1">Canada: 5-7 business days, starting at $12</li>
              <li className="mb-1">Europe: 7-10 business days, starting at $20</li>
              <li className="mb-1">Australia & New Zealand: 10-14 business days, starting at $25</li>
              <li className="mb-1">Rest of World: 10-21 business days, starting at $30</li>
            </ul>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              International customers are responsible for any customs fees, duties, or taxes imposed by their country of residence.
            </p>
            
            <h3 className="text-xl font-medium mt-8 mb-3">Tracking Your Order</h3>
            <p>
              Once your order ships, you'll receive a shipping confirmation email with tracking information. 
              You can also track your order by logging into your account on our website.
            </p>
          </div>
        </section>
        
        {/* Returns Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Returns Policy</h2>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h3 className="text-xl font-medium mt-6 mb-3">Return Eligibility</h3>
            <p>
              We offer a 30-day return policy for unworn items in original condition with tags attached.
            </p>
            
            <div className="mt-4">
              <p className="font-medium">Eligible for Return:</p>
              <ul className="list-disc pl-6">
                <li className="mb-1">Unworn, unwashed items in original condition</li>
                <li className="mb-1">Items with original tags attached</li>
                <li className="mb-1">Items returned within 30 days of delivery</li>
              </ul>
            </div>
            
            <div className="mt-4">
              <p className="font-medium">Not Eligible for Return:</p>
              <ul className="list-disc pl-6">
                <li className="mb-1">Items marked as final sale</li>
                <li className="mb-1">Worn, washed, or damaged items</li>
                <li className="mb-1">Items without original tags</li>
                <li className="mb-1">Intimate apparel and accessories</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-medium mt-8 mb-3">Return Process</h3>
            <ol className="list-decimal pl-6">
              <li className="mb-2">
                Log into your account and initiate a return from your order history, or contact our customer service team.
              </li>
              <li className="mb-2">
                Print the prepaid return label (US customers) or use your preferred shipping method (international customers).
              </li>
              <li className="mb-2">
                Package your item(s) securely with all original tags attached.
              </li>
              <li className="mb-2">
                Drop off the package at any authorized shipping location.
              </li>
            </ol>
            
            <h3 className="text-xl font-medium mt-8 mb-3">Refund Information</h3>
            <p>
              Refunds will be issued to the original payment method within 5-7 business days after we receive and process your return.
            </p>
            <p className="mt-2">
              US returns: Return shipping is free for exchanges; a $7 return fee will be deducted from your refund for returns.
            </p>
            <p className="mt-2">
              International returns: Customers are responsible for return shipping costs.
            </p>
            
            <h3 className="text-xl font-medium mt-8 mb-3">Exchange Policy</h3>
            <p>
              Exchanges are available for size and color changes on eligible items. 
              Follow the same return process and select "exchange" instead of "return" when initiating your request.
            </p>
          </div>
        </section>
      </div>
      
      <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
        <p>
          If you have questions about shipping or returns, please contact our customer service team 
          at <a href="mailto:support@urbanthreads.com" className="text-blue-600 dark:text-blue-400">support@urbanthreads.com</a> 
          or call us at <a href="tel:+18001234567" className="text-blue-600 dark:text-blue-400">+1 (800) 123-4567</a>.
        </p>
      </div>
    </div>
  );
};

export default ShippingReturns;
