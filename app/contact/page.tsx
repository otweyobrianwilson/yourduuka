import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-soft py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Contact Us
            </h1>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed chinese-accent text-readable-light">
              We're here to help you find your perfect pair. Get in touch with our friendly team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-light text-brand-primary mb-8 japanese-title text-readable">
                Get In Touch
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-accent text-on-accent flex items-center justify-center">
                      <Phone className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-brand-primary mb-2 chinese-accent text-readable">Phone</h3>
                    <p className="text-brand-secondary chinese-accent text-readable-light">+256 758 306 513</p>
                    <p className="text-sm text-brand-muted mt-1 text-readable-muted">Monday - Saturday, 9AM - 7PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-accent text-on-accent flex items-center justify-center">
                      <Mail className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-brand-primary mb-2 chinese-accent text-readable">Email</h3>
                    <p className="text-brand-secondary chinese-accent text-readable-light">info@yourduka.com</p>
                    <p className="text-sm text-brand-muted mt-1 text-readable-muted">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-accent text-on-accent flex items-center justify-center">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-brand-primary mb-2 chinese-accent text-readable">Visit Our Store</h3>
                    <p className="text-brand-secondary chinese-accent text-readable-light">
                      Garden City Mall<br />
                      Kampala, Uganda
                    </p>
                    <p className="text-sm text-brand-muted mt-1 text-readable-muted">Level 2, Shop 245</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-accent text-on-accent flex items-center justify-center">
                      <Clock className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-brand-primary mb-2 chinese-accent text-readable">Store Hours</h3>
                    <div className="text-brand-secondary space-y-1 chinese-accent text-readable-light">
                      <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                      <p>Saturday: 9:00 AM - 9:00 PM</p>
                      <p>Sunday: 10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mt-12 lg:mt-0">
              <div className="bg-brand-light p-8 shadow-soft">
                <h3 className="text-2xl font-light text-brand-primary mb-6 japanese-title text-readable">
                  Send Us a Message
                </h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-light text-brand-primary mb-2 chinese-accent text-readable">
                        First Name
                      </label>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-4 py-3 border-brand-light focus:border-brand-accent transition-colors chinese-accent"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-light text-brand-primary mb-2 chinese-accent text-readable">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-4 py-3 border-brand-light focus:border-brand-accent transition-colors chinese-accent"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-light text-brand-primary mb-2 chinese-accent text-readable">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border-brand-light focus:border-brand-accent transition-colors chinese-accent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-light text-brand-primary mb-2 chinese-accent text-readable">
                      Phone Number (Optional)
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border-brand-light focus:border-brand-accent transition-colors chinese-accent"
                      placeholder="+256 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-light text-brand-primary mb-2 chinese-accent text-readable">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-brand-light focus:border-brand-accent transition-colors bg-white text-brand-primary chinese-accent"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="product">Product Question</option>
                      <option value="return">Returns & Exchanges</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-light text-brand-primary mb-2 chinese-accent text-readable">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-3 border border-brand-light focus:border-brand-accent transition-colors bg-white text-brand-primary resize-none chinese-accent"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full btn-minimal">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-brand-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Find Our Store
            </h2>
            <p className="text-brand-secondary chinese-accent text-readable-light">
              Visit us at Garden City Mall for a personalized shopping experience.
            </p>
          </div>
          
          <div className="bg-brand-light h-96 flex items-center justify-center shadow-soft">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-brand-accent mx-auto mb-4" />
              <h3 className="text-xl font-light text-brand-primary mb-2 japanese-title text-readable">YourDuka Store</h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Garden City Mall, Level 2, Shop 245<br />
                Kampala, Uganda
              </p>
              <Button variant="outline" className="mt-4 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}