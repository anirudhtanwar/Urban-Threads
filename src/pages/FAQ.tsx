
import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental United States. Express shipping is available for 1-2 business day delivery. International shipping times vary by location, generally taking 7-14 business days."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unworn items in original condition with tags attached. Sale items are final sale and cannot be returned. Please visit our Shipping & Returns page for complete details."
    },
    {
      question: "How do I find my size?",
      answer: "Each product page includes a detailed size guide specific to that item. For general guidance, we recommend measuring a similar garment that fits you well and comparing it to our size charts. If you're between sizes, we recommend sizing up for a more comfortable fit."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary based on location. Please note that customers are responsible for any import duties or taxes that may apply in their country."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a shipping confirmation email with tracking information. You can also track your order by logging into your account on our website and viewing your order history."
    },
    {
      question: "Can I change or cancel my order?",
      answer: "We process orders quickly to ensure fast shipping. If you need to change or cancel your order, please contact us immediately at support@urbanthreads.com. We can usually accommodate changes if the order hasn't shipped yet."
    },
    {
      question: "How do I care for my garments?",
      answer: "Care instructions are included on the tag of each garment and in the product description on our website. Generally, we recommend washing in cold water, hanging or laying flat to dry, and avoiding bleach to preserve the quality and lifespan of your clothes."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes! During checkout, you can select the gift wrapping option for $5 per item. You can also include a personalized message that we'll print on a card and include with your gift."
    },
    {
      question: "Are your products sustainable?",
      answer: "We're committed to increasing our sustainable practices. Many of our products use eco-friendly materials, and we're continuously working to improve our manufacturing processes and reduce waste. Look for our 'eco-conscious' tag on products that meet our sustainability criteria."
    },
    {
      question: "How can I contact customer service?",
      answer: "You can reach our customer service team by email at support@urbanthreads.com, by phone at +1 (800) 123-4567 Monday through Friday from 9am to 6pm EST, or through the contact form on our Contact Us page."
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Helmet>
        <title>Frequently Asked Questions | Urban Threads</title>
        <meta name="description" content="Find answers to common questions about Urban Threads products, shipping, returns, and more." />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Find answers to common questions about our products, orders, and policies.
      </p>
      
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 dark:border-gray-800 rounded-lg px-4">
            <AccordionTrigger className="text-lg font-medium py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-gray-600 dark:text-gray-400">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Can't find what you're looking for? Contact our customer service team.
        </p>
        <div className="flex justify-center">
          <a 
            href="/contact-us" 
            className="inline-flex items-center bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
