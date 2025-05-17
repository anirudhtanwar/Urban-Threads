
import { Helmet } from "react-helmet-async";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Helmet>
        <title>Terms of Service | Urban Threads</title>
        <meta name="description" content="Urban Threads terms of service and conditions of use" />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg mb-4">
          Last updated: May 15, 2023
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>
          Welcome to Urban Threads ("we," "our," or "us"). These Terms of Service govern your access to and use of our website, 
          mobile applications, and services. By accessing or using our services, you agree to be bound by these terms.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Account Registration</h2>
        <p>
          To access certain features of our service, you may need to create an account. You are responsible for maintaining 
          the confidentiality of your account credentials and for all activities that occur under your account.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Products and Purchases</h2>
        <p>
          All products are subject to availability. We reserve the right to discontinue any products at any time. 
          Prices for products are subject to change without notice. We reserve the right to refuse any order you place with us.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Shipping and Delivery</h2>
        <p>
          Shipping times are estimates and not guaranteed. We are not responsible for delays due to customs, postal 
          services, or other factors outside our control.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Returns and Refunds</h2>
        <p>
          Please see our Shipping and Returns page for detailed information on our return policy. Certain items 
          cannot be returned, and all returns must be in original condition with tags attached.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
        <p>
          All content, designs, graphics, logos, and service names are trademarks of Urban Threads and 
          protected by copyright, trademark, and other intellectual property laws.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. User Content</h2>
        <p>
          By submitting reviews, comments, or other content, you grant us a non-exclusive, royalty-free, 
          perpetual license to use, reproduce, and display your content in connection with our services.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
        <p>
          In no event shall Urban Threads be liable for any indirect, incidental, special, consequential or 
          punitive damages arising out of or related to your use of our services.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Your continued use of our services following 
          any changes indicates your acceptance of the new terms.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Information</h2>
        <p>
          If you have questions about these terms, please contact us at support@urbanthreads.com
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
