
import { ResponsiveImage } from "@/components/ui/responsive-image";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Urban Threads was founded in 2018 with a simple mission: to create sustainable, 
              minimalist clothing that defies fast fashion trends and stands the test of time.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              What started as a small operation in a Brooklyn studio has grown into a globally 
              recognized brand, championing ethical production and timeless design.
            </p>
          </div>
          <div className="relative rounded-xl overflow-hidden">
            <ResponsiveImage
              src="https://images.unsplash.com/photo-1556905200-bd982f883637?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Urban Threads studio"
              aspectRatio="aspect-[4/3]"
              priority={true}
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We use organic cotton, recycled polyester, and other eco-friendly materials 
              to minimize our environmental footprint. Our packaging is 100% recyclable and 
              plastic-free.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Ethical Production</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All our garments are made in factories that pay fair wages and provide safe 
              working conditions. We regularly visit our manufacturing partners to ensure 
              compliance with our ethical standards.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Timeless Design</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We reject the constant churn of fast fashion trends. Our designs focus on 
              versatility and longevity, creating pieces that will be relevant for years 
              to come.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Alex Rivera",
              role: "Founder & Creative Director",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            },
            {
              name: "Jordan Lee",
              role: "Head of Design",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            },
            {
              name: "Taylor Morgan",
              role: "Sustainability Officer",
              image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            },
            {
              name: "Jamie Zhang",
              role: "Supply Chain Manager",
              image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
                <ResponsiveImage
                  src={member.image}
                  alt={member.name}
                  aspectRatio="aspect-square"
                  priority={true}
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mb-20 bg-black text-white p-16 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl leading-relaxed">
            "To create thoughtfully designed, sustainable clothing that empowers 
            individuals to express themselves while reducing the environmental impact 
            of the fashion industry."
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
