import { Heart, Instagram, MapPin, Phone, Clock, MessageCircle, Menu, X, ChevronRight, Star, Camera, Calendar, Sparkles } from 'lucide-react';
import { useState, useEffect, createContext, useContext, ReactNode, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'nails' | 'other' | 'soak-off';
}

export interface GalleryImage {
  url: string;
  category: string;
  title: string;
}

// --- Context ---
interface GalleryContextType {
  images: GalleryImage[];
  addImages: (newImages: GalleryImage[]) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<GalleryImage[]>(INITIAL_GALLERY_IMAGES);

  const addImages = (newImages: GalleryImage[]) => {
    setImages(prev => [...newImages, ...prev]);
  };

  return (
    <GalleryContext.Provider value={{ images, addImages }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) throw new Error('useGallery must be used within a GalleryProvider');
  return context;
};

// --- Data ---
const INITIAL_GALLERY_IMAGES: GalleryImage[] = [
  { url: 'https://storage.googleapis.com/m-ai-studio-public-assets/nailed_by_angel/nails_purple_bows.jpg', category: 'Recent Work', title: 'Purple Bow Stiletto Set' },
  { url: 'https://storage.googleapis.com/m-ai-studio-public-assets/nailed_by_angel/nails_red_hearts.jpg', category: 'Recent Work', title: 'Red Heart Almond Set' },
  { url: 'https://storage.googleapis.com/m-ai-studio-public-assets/nailed_by_angel/pedi_orange_flowers.jpg', category: 'Recent Work', title: 'Orange Floral Pedicure' },
  { url: 'https://storage.googleapis.com/m-ai-studio-public-assets/nailed_by_angel/pedi_pink_ombre.jpg', category: 'Recent Work', title: 'Pink Ombre Pedicure' },
  { url: 'https://storage.googleapis.com/m-ai-studio-public-assets/nailed_by_angel/nails_pink_glitter.jpg', category: 'Recent Work', title: 'Soft Pink Glitter Set' },
];
export const SERVICES: Service[] = [
  { id: 'short', name: 'Short Nails', price: 140, description: 'Perfect for a clean, natural look with added strength.', category: 'nails' },
  { id: 'medium', name: 'Medium Nails', price: 180, description: 'The ideal balance of length and daily practicality.', category: 'nails' },
  { id: 'long', name: 'Long Nails', price: 220, description: 'Dramatic length for a bold, statement-making set.', category: 'nails' },
  { id: 'pedi', name: 'Pedicure', price: 120, description: 'Complete foot care and polish for a refreshed feel.', category: 'other' },
  { id: 'buff', name: 'Buff and Shine', price: 50, description: 'Natural nail maintenance for a healthy glow.', category: 'other' },
  { id: 'soak-only', name: 'Soak Off Only', price: 40, description: 'Safe removal of your current set.', category: 'soak-off' },
  { id: 'soak-refill', name: 'Soak Off and Refill', price: 50, description: 'Removal followed by a fresh new application.', category: 'soak-off' },
  { id: 'soak-other', name: 'Soak Off (Other Tech)', price: 80, description: 'Removal of work done by another technician.', category: 'soak-off' },
];

export const TESTIMONIALS = [
  { name: 'Noxolo Radebe', text: 'The best pedicure I\'ve ever had! My feet feel so soft and the color is perfect. Highly recommend Angel!', rating: 5 },
  { name: 'Rhulani', text: 'Angel is so talented. My polygel set is exactly what I wanted. The vibe is always great and professional.', rating: 5 },
  { name: 'Phamela M.', text: 'I love my nails! The free charms are such a nice touch and the service is top-notch. Best in Braamfontein!', rating: 5 },
];

// --- Components ---

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Book', path: '/book' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-md">
            <Sparkles size={20} />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">Nailed by Angel</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-brand-accent ${location.pathname === link.path ? 'text-brand-accent' : 'text-brand-dark'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/book" className="btn-primary py-2 px-6 text-sm">Book Now</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-dark" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden border-t border-brand-pink/20"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium ${location.pathname === link.path ? 'text-brand-accent' : 'text-brand-dark'}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/book" onClick={() => setIsOpen(false)} className="btn-primary text-center mt-2">Book Appointment</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-brand-pink/30 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center text-white">
                <Sparkles size={16} />
              </div>
              <span className="font-display text-xl font-bold">Nailed by Angel</span>
            </Link>
            <p className="text-brand-dark/70 mb-6 max-w-xs">
              Premium Acrylic & Polygel nails in the heart of Braamfontein. We believe in beauty that's both elegant and affordable.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-pink/30 flex items-center justify-center text-brand-accent hover:bg-brand-accent hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/27849263898" className="w-10 h-10 rounded-full bg-brand-pink/30 flex items-center justify-center text-brand-accent hover:bg-brand-accent hover:text-white transition-all">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-brand-dark/70 hover:text-brand-accent transition-colors">Our Services</Link></li>
              <li><Link to="/gallery" className="text-brand-dark/70 hover:text-brand-accent transition-colors">Nail Gallery</Link></li>
              <li><Link to="/book" className="text-brand-dark/70 hover:text-brand-accent transition-colors">Book Appointment</Link></li>
              <li><Link to="/contact" className="text-brand-dark/70 hover:text-brand-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-brand-dark/70">
                <MapPin size={20} className="text-brand-accent shrink-0" />
                <span>Sunnyside Hall of Residence, 1 Jan Smuts Avenue, Braamfontein, 2017</span>
              </li>
              <li className="flex gap-3 text-brand-dark/70">
                <Phone size={20} className="text-brand-accent shrink-0" />
                <a href="tel:0849263898">084 926 3898</a>
              </li>
              <li className="flex gap-3 text-brand-dark/70">
                <Clock size={20} className="text-brand-accent shrink-0" />
                <span>By Appointment Only</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-pink/20 pt-8 text-center text-sm text-brand-dark/50">
          <p>&copy; {new Date().getFullYear()} Nailed by Angel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export const ServiceCard: FC<{ service: Service }> = ({ service }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="card flex flex-col justify-between h-full"
  >
    <div>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-display text-xl font-bold">{service.name}</h3>
        <span className="text-brand-accent font-bold text-lg">R{service.price}</span>
      </div>
      <p className="text-brand-dark/70 text-sm mb-6 leading-relaxed">
        {service.description}
      </p>
    </div>
    <Link to="/book" className="btn-secondary py-2 text-center text-sm w-full">
      Select Service
    </Link>
  </motion.div>
);

export const TestimonialCard: FC<{ testimonial: any }> = ({ testimonial }) => (
  <div className="card bg-brand-pink/10 border-none">
    <div className="flex gap-1 mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} size={16} className="fill-brand-accent text-brand-accent" />
      ))}
    </div>
    <p className="italic text-brand-dark/80 mb-6 leading-relaxed">"{testimonial.text}"</p>
    <p className="font-bold text-sm">— {testimonial.name}</p>
  </div>
);
