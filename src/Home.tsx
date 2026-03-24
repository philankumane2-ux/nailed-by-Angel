import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, Star, Camera, Heart, MapPin, Phone, MessageCircle } from 'lucide-react';
import { SERVICES, TESTIMONIALS, TestimonialCard, useGallery } from './components';

export default function Home() {
  const { images } = useGallery();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=2000"
            alt="Nail Art"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-nude/50 via-brand-nude to-brand-nude"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-sm font-bold mb-6 tracking-wider uppercase">
                Braamfontein's Finest
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
                Beautiful Acrylic & <span className="text-brand-accent italic">Polygel</span> Nails
              </h1>
              <p className="text-lg md:text-xl text-brand-dark/70 mb-10 leading-relaxed">
                Book stylish, affordable nail appointments with Nailed by Angel. 
                Premium quality sets starting from just R140. <span className="font-bold text-brand-accent">Free charms included</span> with every set!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book" className="btn-primary flex items-center justify-center gap-2">
                  Book Appointment <ChevronRight size={18} />
                </Link>
                <Link to="/services" className="btn-secondary flex items-center justify-center">
                  View Price List
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Intro / Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-brand-pink/30 rounded-full flex items-center justify-center text-brand-accent mx-auto mb-6">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Free Charms</h3>
              <p className="text-brand-dark/60">Every set comes with free charms to add that extra sparkle to your look.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-brand-pink/30 rounded-full flex items-center justify-center text-brand-accent mx-auto mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Personal Service</h3>
              <p className="text-brand-dark/60">One-on-one attention in a comfortable, private setting in Braamfontein.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-brand-pink/30 rounded-full flex items-center justify-center text-brand-accent mx-auto mb-6">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Premium Quality</h3>
              <p className="text-brand-dark/60">We use high-grade acrylic and polygel for long-lasting, beautiful results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="py-24 bg-brand-nude">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Favorites</h2>
              <p className="text-brand-dark/60 max-w-md">Explore our most popular nail services and find your perfect match.</p>
            </div>
            <Link to="/services" className="text-brand-accent font-bold flex items-center gap-2 hover:underline">
              Full Price List <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((service) => (
              <div key={service.id} className="card group hover:shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-display font-bold">{service.name}</h3>
                  <span className="text-brand-accent font-bold">R{service.price}</span>
                </div>
                <p className="text-brand-dark/60 mb-8">{service.description}</p>
                <Link to="/book" className="btn-secondary w-full text-center py-2">Book This</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Charms Callout */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-brand-accent rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <Sparkles className="mx-auto mb-6" size={48} />
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Charms are on us!</h2>
              <p className="text-xl opacity-90 mb-10">
                We love seeing you sparkle. That's why every single set at Nailed by Angel includes free charms of your choice. No hidden fees, just pure style.
              </p>
              <Link to="/book" className="bg-white text-brand-accent px-10 py-4 rounded-full font-bold shadow-xl hover:bg-brand-pink transition-all">
                Claim Your Free Charms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Recent Work</h2>
            <p className="text-brand-dark/60">Follow us on Instagram for daily inspiration.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.filter(img => img.category === 'Recent Work').slice(0, 4).map((img, idx) => (
              <div key={idx} className="aspect-[3/4] rounded-3xl overflow-hidden relative group">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white" size={32} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/gallery" className="btn-secondary">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-brand-nude">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Ready for your glow up?</h2>
          <p className="text-xl text-brand-dark/60 mb-12 max-w-xl mx-auto">
            Located in Braamfontein, Sunnyside Hall of Residence. Appointments fill up fast—book yours today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/book" className="btn-primary px-12 py-5 text-lg">Book Now</Link>
            <a href="https://wa.me/27849263898" className="btn-secondary px-12 py-5 text-lg flex items-center justify-center gap-2">
              <MessageCircle size={24} /> WhatsApp Us
            </a>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
            <div className="flex gap-4 items-start">
              <MapPin className="text-brand-accent shrink-0" size={24} />
              <div>
                <h4 className="font-bold mb-1">Location</h4>
                <p className="text-brand-dark/60 text-sm">Sunnyside Hall, 1 Jan Smuts Ave, Braamfontein</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Phone className="text-brand-accent shrink-0" size={24} />
              <div>
                <h4 className="font-bold mb-1">Phone</h4>
                <p className="text-brand-dark/60 text-sm">084 926 3898</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Star className="text-brand-accent shrink-0" size={24} />
              <div>
                <h4 className="font-bold mb-1">Policy</h4>
                <p className="text-brand-dark/60 text-sm">Appointment Only Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
