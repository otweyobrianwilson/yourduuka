import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Ruler, Footprints, HelpCircle, Users, Phone } from 'lucide-react';

export default function SizeGuidePage() {
  const mensSizes = [
    { uk: '6', us: '7', eu: '40', cm: '25.0' },
    { uk: '6.5', us: '7.5', eu: '40.5', cm: '25.5' },
    { uk: '7', us: '8', eu: '41', cm: '26.0' },
    { uk: '7.5', us: '8.5', eu: '41.5', cm: '26.5' },
    { uk: '8', us: '9', eu: '42', cm: '27.0' },
    { uk: '8.5', us: '9.5', eu: '42.5', cm: '27.5' },
    { uk: '9', us: '10', eu: '43', cm: '28.0' },
    { uk: '9.5', us: '10.5', eu: '43.5', cm: '28.5' },
    { uk: '10', us: '11', eu: '44', cm: '29.0' },
    { uk: '10.5', us: '11.5', eu: '44.5', cm: '29.5' },
    { uk: '11', us: '12', eu: '45', cm: '30.0' },
    { uk: '11.5', us: '12.5', eu: '45.5', cm: '30.5' },
    { uk: '12', us: '13', eu: '46', cm: '31.0' },
  ];

  const womensSizes = [
    { uk: '3', us: '5', eu: '36', cm: '22.5' },
    { uk: '3.5', us: '5.5', eu: '36.5', cm: '23.0' },
    { uk: '4', us: '6', eu: '37', cm: '23.5' },
    { uk: '4.5', us: '6.5', eu: '37.5', cm: '24.0' },
    { uk: '5', us: '7', eu: '38', cm: '24.5' },
    { uk: '5.5', us: '7.5', eu: '38.5', cm: '25.0' },
    { uk: '6', us: '8', eu: '39', cm: '25.5' },
    { uk: '6.5', us: '8.5', eu: '39.5', cm: '26.0' },
    { uk: '7', us: '9', eu: '40', cm: '26.5' },
    { uk: '7.5', us: '9.5', eu: '40.5', cm: '27.0' },
    { uk: '8', us: '10', eu: '41', cm: '27.5' },
    { uk: '8.5', us: '10.5', eu: '41.5', cm: '28.0' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-soft py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Size Guide
            </h1>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto leading-relaxed chinese-accent text-readable-light">
              Find your perfect fit with our comprehensive sizing guide. When in doubt, contact us for personalized assistance.
            </p>
          </div>
        </div>
      </section>

      {/* How to Measure */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-brand-primary mb-6 japanese-title text-readable">
              How to Measure Your Feet
            </h2>
            <p className="text-xl text-brand-secondary max-w-3xl mx-auto chinese-accent text-readable-light">
              Follow these simple steps for the most accurate measurements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4 rounded-full">
                <span className="text-xl font-light japanese-title">1</span>
              </div>
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Prepare</h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Place a sheet of paper on a hard floor against a wall. Wear your normal socks.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4 rounded-full">
                <span className="text-xl font-light japanese-title">2</span>
              </div>
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Position</h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Stand with your heel against the wall and your full weight on the foot.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4 rounded-full">
                <span className="text-xl font-light japanese-title">3</span>
              </div>
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Mark</h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Mark the tip of your longest toe on the paper with a pen or pencil.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent text-on-accent flex items-center justify-center mx-auto mb-4 rounded-full">
                <span className="text-xl font-light japanese-title">4</span>
              </div>
              <h3 className="text-lg font-light text-brand-primary mb-3 chinese-accent text-readable">Measure</h3>
              <p className="text-brand-secondary chinese-accent text-readable-light">
                Measure from the wall to the mark in centimeters. Repeat for both feet.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-brand-light p-8 text-center shadow-soft">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent text-on-accent mb-4">
              <Footprints className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-light text-brand-primary mb-4 chinese-accent text-readable">Important Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-brand-secondary chinese-accent text-readable-light">
              <div>
                <h4 className="font-light text-brand-primary mb-2 text-readable">Best Time to Measure</h4>
                <p className="text-sm">Measure your feet in the evening when they're at their largest.</p>
              </div>
              <div>
                <h4 className="font-light text-brand-primary mb-2 text-readable">Use Longer Foot</h4>
                <p className="text-sm">Always use the measurement of your longer foot for sizing.</p>
              </div>
              <div>
                <h4 className="font-light text-brand-primary mb-2 text-readable">Consider Width</h4>
                <p className="text-sm">If you have wide feet, consider going up half a size.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Size Charts */}
      <section className="bg-brand-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Size Charts
            </h2>
            <p className="text-brand-secondary chinese-accent text-readable-light">
              Use these charts to convert your foot measurement to the right shoe size.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Men's Size Chart */}
            <div>
              <div className="bg-white p-6 shadow-soft">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-brand-primary text-on-primary flex items-center justify-center mr-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-light text-brand-primary japanese-title text-readable">Men's Sizes</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-brand-light">
                        <th className="text-left py-3 px-2 text-sm font-light text-brand-primary chinese-accent text-readable">UK</th>
                        <th className="text-left py-3 px-2 text-sm font-light text-brand-primary chinese-accent text-readable">US</th>
                        <th className="text-left py-3 px-2 text-sm font-light text-brand-primary chinese-accent text-readable">EU</th>
                        <th className="text-left py-3 px-2 text-sm font-light text-brand-primary chinese-accent text-readable">CM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mensSizes.map((size, index) => (
                        <tr key={index} className="border-b border-brand-light/50">
                          <td className="py-2 px-2 text-brand-secondary chinese-accent text-readable-light">{size.uk}</td>
                          <td className="py-2 px-2 text-brand-secondary chinese-accent text-readable-light">{size.us}</td>
                          <td className="py-2 px-2 text-brand-secondary chinese-accent text-readable-light">{size.eu}</td>
                          <td className="py-2 px-2 text-brand-accent font-light">{size.cm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Women's Size Chart */}
            <div>
              <div className="bg-white p-6 shadow-soft">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-brand-accent text-on-accent flex items-center justify-center mr-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-light text-brand-primary japanese-title text-readable">Women's Sizes</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-brand-light">
                        <th className="text-left py-3 px-2 text-sm font-light text-brand-primary chinese-accent text-readable">UK</th>
                        <th className="text-left py-3 px-2 text-sm font-light text-brand-primary chinese-accent text-readable">US</th>
                        <th className="text-left py-3 px-2 text-sm font-light text-brand-primary chinese-accent text-readable">EU</th>
                        <th className="text-left py-3 px-2 text-sm font-light text-brand-primary chinese-accent text-readable">CM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {womensSizes.map((size, index) => (
                        <tr key={index} className="border-b border-brand-light/50">
                          <td className="py-2 px-2 text-brand-secondary chinese-accent text-readable-light">{size.uk}</td>
                          <td className="py-2 px-2 text-brand-secondary chinese-accent text-readable-light">{size.us}</td>
                          <td className="py-2 px-2 text-brand-secondary chinese-accent text-readable-light">{size.eu}</td>
                          <td className="py-2 px-2 text-brand-accent font-light">{size.cm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fit Guide */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-brand-primary mb-6 japanese-title text-readable">
              Fit Guide by Category
            </h2>
            <p className="text-brand-secondary chinese-accent text-readable-light">
              Different shoe types may fit differently. Here's what to expect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-light p-6 shadow-soft">
              <h3 className="text-xl font-light text-brand-primary mb-4 chinese-accent text-readable">Sneakers</h3>
              <div className="space-y-3 text-brand-secondary chinese-accent text-readable-light">
                <p className="text-sm">• Generally true to size</p>
                <p className="text-sm">• Consider half size up for thick socks</p>
                <p className="text-sm">• Athletic styles may run larger</p>
                <p className="text-sm">• Leave thumb width space at toe</p>
              </div>
            </div>

            <div className="bg-brand-light p-6 shadow-soft">
              <h3 className="text-xl font-light text-brand-primary mb-4 chinese-accent text-readable">Formal Shoes</h3>
              <div className="space-y-3 text-brand-secondary chinese-accent text-readable-light">
                <p className="text-sm">• May run half size smaller</p>
                <p className="text-sm">• Leather will stretch slightly</p>
                <p className="text-sm">• Should feel snug but not tight</p>
                <p className="text-sm">• Consider foot width for oxfords</p>
              </div>
            </div>

            <div className="bg-brand-light p-6 shadow-soft">
              <h3 className="text-xl font-light text-brand-primary mb-4 chinese-accent text-readable">Boots</h3>
              <div className="space-y-3 text-brand-secondary chinese-accent text-readable-light">
                <p className="text-sm">• Usually true to size</p>
                <p className="text-sm">• Consider thicker socks</p>
                <p className="text-sm">• High-tops may feel different</p>
                <p className="text-sm">• Allow for ankle movement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Assistance */}
      <section className="bg-brand-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent text-on-accent mb-6">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-light text-brand-accent mb-6 japanese-title">
              Still Not Sure About Your Size?
            </h2>
            <p className="text-xl text-on-primary/80 mb-10 max-w-2xl mx-auto chinese-accent">
              Our sizing experts are here to help you find the perfect fit. Get personalized recommendations based on your measurements and preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-minimal">
                <Link href="/contact">Get Sizing Help</Link>
              </Button>
              <Button variant="outline" asChild className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-on-accent flex items-center">
                <Link href="tel:+256758306513">
                  <Phone className="h-4 w-4 mr-2" />
                  Call: +256 758 306 513
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-light text-brand-accent mb-2 japanese-title">Free</div>
                <div className="text-sm text-on-primary/70 chinese-accent">Size Exchanges</div>
              </div>
              <div>
                <div className="text-2xl font-light text-brand-accent mb-2 japanese-title">30 Days</div>
                <div className="text-sm text-on-primary/70 chinese-accent">Return Policy</div>
              </div>
              <div>
                <div className="text-2xl font-light text-brand-accent mb-2 japanese-title">Expert</div>
                <div className="text-sm text-on-primary/70 chinese-accent">Fitting Advice</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}