import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Users, MapPin, Heart, Award, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-soft py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-brand-primary mb-6 japanese-title text-readable">
              About YourDuka
            </h1>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed chinese-accent text-readable-light">
              Uganda's premier destination for authentic, high-quality footwear. We curate the finest collection 
              of shoes with Japanese minimalism and attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light text-brand-primary mb-8 japanese-title text-readable">
                Our Story
              </h2>
              <div className="space-y-6 text-brand-secondary chinese-accent text-readable-light">
                <p className="text-lg leading-relaxed">
                  Founded in Kampala, YourDuka began with a simple vision: to bring premium, authentic footwear 
                  to Uganda. We believe that great shoes are more than just fashion – they're an investment in 
                  comfort, confidence, and quality craftsmanship.
                </p>
                <p className="text-lg leading-relaxed">
                  Our carefully curated collection features both international brands and local artisans, 
                  ensuring every customer finds their perfect pair. From formal occasions to casual adventures, 
                  we have the right shoes for every step of your journey.
                </p>
                <p className="text-lg leading-relaxed">
                  Inspired by Japanese minimalism and attention to detail, we focus on quality over quantity, 
                  offering timeless designs that transcend trends and seasons.
                </p>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <div className="bg-brand-light p-8 shadow-elegant">
                  <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600"
                    alt="YourDuka Store"
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-brand-accent text-on-accent p-6 shadow-elegant">
                  <div className="text-center">
                    <div className="text-2xl font-light japanese-title">2019</div>
                    <div className="text-sm uppercase tracking-widest font-light">Founded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-brand-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Our Values
            </h2>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto chinese-accent text-readable-light">
              These principles guide everything we do, from product selection to customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary text-on-primary mb-6 group-hover:bg-brand-accent transition-colors duration-300">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light text-brand-primary mb-4 chinese-accent text-readable">Quality First</h3>
              <p className="text-brand-secondary leading-relaxed text-readable-light">
                Every shoe in our collection meets our rigorous standards for craftsmanship, 
                materials, and durability.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary text-on-primary mb-6 group-hover:bg-brand-accent transition-colors duration-300">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light text-brand-primary mb-4 chinese-accent text-readable">Customer Care</h3>
              <p className="text-brand-secondary leading-relaxed text-readable-light">
                Your satisfaction is our priority. We provide personalized service and support 
                every step of the way.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary text-on-primary mb-6 group-hover:bg-brand-accent transition-colors duration-300">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-light text-brand-primary mb-4 chinese-accent text-readable">Local Impact</h3>
              <p className="text-brand-secondary leading-relaxed text-readable-light">
                Proudly Ugandan, we support local communities and contribute to the growth 
                of our economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-light text-brand-accent mb-4 japanese-title">500+</div>
              <div className="text-brand-secondary uppercase tracking-widest text-sm chinese-accent text-readable-light">Premium Shoes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-light text-brand-accent mb-4 japanese-title">50+</div>
              <div className="text-brand-secondary uppercase tracking-widest text-sm chinese-accent text-readable-light">Trusted Brands</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-light text-brand-accent mb-4 japanese-title">10K+</div>
              <div className="text-brand-secondary uppercase tracking-widest text-sm chinese-accent text-readable-light">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-light text-brand-accent mb-4 japanese-title">5</div>
              <div className="text-brand-secondary uppercase tracking-widest text-sm chinese-accent text-readable-light">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-brand-accent mb-6 japanese-title">
            Ready to Find Your Perfect Pair?
          </h2>
          <p className="text-xl text-on-primary/80 mb-10 max-w-2xl mx-auto chinese-accent">
            Explore our carefully curated collection of premium footwear and experience the YourDuka difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-minimal">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button variant="outline" asChild className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}