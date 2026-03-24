import { motion } from 'motion/react';
import { Phone, MapPin, MessageCircle, Clock, Mail, Send, Sparkles } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-brand-dark/60 max-w-2xl mx-auto">
            Have a question or want to book via WhatsApp? We're here to help you glow.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="card bg-white border-brand-pink/20">
                <div className="w-12 h-12 bg-brand-pink/30 rounded-full flex items-center justify-center text-brand-accent mb-6">
                  <Phone size={24} />
                </div>
                <h3 className="font-bold mb-2">Call Us</h3>
                <a href="tel:0849263898" className="text-brand-dark/70 hover:text-brand-accent transition-colors">084 926 3898</a>
              </div>
              <div className="card bg-white border-brand-pink/20">
                <div className="w-12 h-12 bg-brand-pink/30 rounded-full flex items-center justify-center text-brand-accent mb-6">
                  <MessageCircle size={24} />
                </div>
                <h3 className="font-bold mb-2">WhatsApp</h3>
                <a href="https://wa.me/27849263898" className="text-brand-dark/70 hover:text-brand-accent transition-colors">Chat with Angel</a>
              </div>
            </div>

            <div className="card bg-white border-brand-pink/20">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-brand-pink/30 rounded-full flex items-center justify-center text-brand-accent shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Our Location</h3>
                  <p className="text-brand-dark/70 leading-relaxed">
                    Sunnyside Hall of Residence<br/>
                    1 Jan Smuts Avenue<br/>
                    Braamfontein, 2017
                  </p>
                  <div className="mt-6 aspect-video rounded-2xl bg-brand-pink/10 flex items-center justify-center text-brand-dark/30 border border-dashed border-brand-pink/50">
                    <span className="text-sm font-medium">Map Placeholder</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-brand-accent text-white border-none">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-4 text-xl">Business Hours</h3>
                  <ul className="space-y-2 opacity-90">
                    <li className="flex justify-between border-b border-white/10 pb-2">
                      <span>Mon - Fri</span>
                      <span>09:00 - 18:00</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-2">
                      <span>Saturday</span>
                      <span>09:00 - 15:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-xs italic opacity-70">* Strictly by appointment only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="card shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            
            <h2 className="text-3xl font-display font-bold mb-8">Send an Inquiry</h2>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">Message Sent!</h3>
                <p className="text-brand-dark/60 mb-8">We'll get back to you as soon as possible.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary">Send Another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Your Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full p-4 rounded-2xl border border-brand-pink/30 focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full p-4 rounded-2xl border border-brand-pink/30 focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Subject</label>
                  <select className="w-full p-4 rounded-2xl border border-brand-pink/30 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 bg-white">
                    <option>General Inquiry</option>
                    <option>Booking Question</option>
                    <option>Custom Design Request</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Message</label>
                  <textarea 
                    required
                    className="w-full p-4 rounded-2xl border border-brand-pink/30 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 min-h-[150px]"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  Send Message <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs */}
        <section className="mt-32">
          <h2 className="text-4xl font-display font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-brand-accent" />
                Do I need to book in advance?
              </h4>
              <p className="text-brand-dark/60 text-sm">Yes, we are strictly by appointment only to ensure each client gets our full attention.</p>
            </div>
            <div className="card">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-brand-accent" />
                Are charms included?
              </h4>
              <p className="text-brand-dark/60 text-sm">Absolutely! Every set includes free charms of your choice at no extra cost.</p>
            </div>
            <div className="card">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-brand-accent" />
                Where are you located?
              </h4>
              <p className="text-brand-dark/60 text-sm">We are located at Sunnyside Hall of Residence, 1 Jan Smuts Avenue, Braamfontein.</p>
            </div>
            <div className="card">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-brand-accent" />
                Do you soak off other tech's work?
              </h4>
              <p className="text-brand-dark/60 text-sm">Yes, we do. There is a small additional fee of R80 for soak-offs of work not done by us.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
