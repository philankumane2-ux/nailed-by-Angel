import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SERVICES, ServiceCard } from './components';
import { Sparkles, Info } from 'lucide-react';

export default function Services() {
  const nails = SERVICES.filter(s => s.category === 'nails');
  const other = SERVICES.filter(s => s.category === 'other');
  const soakOffs = SERVICES.filter(s => s.category === 'soak-off');

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Our Services</h1>
            <p className="text-xl text-brand-dark/60 max-w-2xl mx-auto">
              Premium nail care tailored to your style. All sets include <span className="text-brand-accent font-bold">free charms</span> and a polished finish.
            </p>
          </motion.div>
        </header>

        {/* Nails Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-display font-bold">Nail Sets</h2>
            <div className="h-px bg-brand-pink/50 flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nails.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Other Services Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-display font-bold">Other Services</h2>
            <div className="h-px bg-brand-pink/50 flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {other.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Soak Offs Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-display font-bold">Soak Offs</h2>
            <div className="h-px bg-brand-pink/50 flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {soakOffs.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Important Notes */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-brand-pink/30 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-pink/30 rounded-full flex items-center justify-center text-brand-accent shrink-0">
              <Info size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold mb-4">Good to Know</h3>
              <ul className="space-y-4 text-brand-dark/70">
                <li className="flex items-center gap-3">
                  <Sparkles size={18} className="text-brand-accent" />
                  <span>Charms are applied <strong>free of charge</strong> with all sets.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles size={18} className="text-brand-accent" />
                  <span>We specialize in both <strong>Acrylic</strong> and <strong>Polygel</strong> techniques.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles size={18} className="text-brand-accent" />
                  <span>Service is strictly <strong>by appointment only</strong>.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles size={18} className="text-brand-accent" />
                  <span>Located at Sunnyside Hall of Residence in Braamfontein.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link to="/book" className="btn-primary px-12 py-5 text-lg">
            Book Your Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
