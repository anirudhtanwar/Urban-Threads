
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Helmet>
        <title>Privacy Policy | Urban Threads</title>
        <meta name="description" content="Urban Threads privacy policy and data practices" />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg mb-4">
          Last updated: May 15, 2023
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p>
          We collect information you provide directly, such as when you create an account, place an order, 
          or contact customer service. This may include your name, email address, shipping address, payment information, 
          and phone number.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p>
          We use your information to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about your account or orders</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our website and services</li>
          <li>Prevent fraud and enhance security</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar technologies to improve your browsing experience, analyze site traffic, 
          and personalize content. You can control cookies through your browser settings.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Information Sharing</h2>
        <p>
          We may share your information with:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Service providers who perform services on our behalf</li>
          <li>Payment processors to complete transactions</li>
          <li>Shipping partners to deliver your orders</li>
          <li>Legal authorities when required by law</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights and Choices</h2>
        <p>
          Depending on your location, you may have rights to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Access the personal information we hold about you</li>
          <li>Correct inaccurate information</li>
          <li>Delete your personal information</li>
          <li>Object to certain processing activities</li>
          <li>Opt-out of marketing communications</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
        <p>
          We implement appropriate measures to protect your personal information from unauthorized access, 
          alteration, or disclosure. However, no method of transmission over the Internet is 100% secure.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than where you live. 
          We ensure appropriate safeguards are in place to protect your information when transferred.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
        <p>
          Our services are not directed to children under 16. We do not knowingly collect personal information 
          from children under 16. If you believe we have collected information from a child, please contact us.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
        <p>
          We may update this policy periodically. We will notify you of any significant changes by posting 
          a notice on our website or sending you an email.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Information</h2>
        <p>
          If you have questions about this privacy policy, please contact us at privacy@urbanthreads.com
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
