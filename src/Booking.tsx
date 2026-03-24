import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from './components';
import { Calendar as CalendarIcon, Clock, User, Phone, CheckCircle, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

export default function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceId: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    notes: ''
  });

  const selectedService = SERVICES.find(s => s.id === formData.serviceId);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const isStep1Valid = formData.serviceId !== '';
  const isStep2Valid = formData.date !== '' && formData.time !== '';
  const isStep3Valid = formData.name !== '' && formData.phone !== '';

  const timeSlots = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30'];

  if (step === 4) {
    return (
      <div className="pt-32 pb-24 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto card text-center p-12"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-display font-bold mb-4">Booking Requested!</h2>
            <p className="text-brand-dark/60 mb-8">
              Thank you, {formData.name}. We've received your request for {selectedService?.name} on {formData.date} at {formData.time}. 
              <br/><br/>
              <span className="font-bold text-brand-accent">Please note:</span> Your booking is only confirmed once we contact you via WhatsApp/SMS.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="btn-primary w-full"
            >
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Book Appointment</h1>
            <p className="text-brand-dark/60">Secure your spot for a fresh set. Appointment only.</p>
          </header>

          {/* Progress Bar */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-pink/30 -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold transition-all ${
                  step >= i ? 'bg-brand-accent text-white shadow-lg' : 'bg-white text-brand-dark border border-brand-pink/30'
                }`}
              >
                {i}
              </div>
            ))}
          </div>

          <div className="card shadow-xl p-8 md:p-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
                    <Sparkles className="text-brand-accent" /> Select Service
                  </h3>
                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {SERVICES.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setFormData({ ...formData, serviceId: s.id })}
                        className={`text-left p-6 rounded-2xl border-2 transition-all flex justify-between items-center ${
                          formData.serviceId === s.id 
                          ? 'border-brand-accent bg-brand-pink/10' 
                          : 'border-brand-pink/20 hover:border-brand-pink'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-lg">{s.name}</p>
                          <p className="text-sm text-brand-dark/60">{s.description}</p>
                        </div>
                        <span className="font-bold text-brand-accent">R{s.price}</span>
                      </button>
                    ))}
                  </div>
                  <button 
                    disabled={!isStep1Valid}
                    onClick={handleNext}
                    className={`btn-primary w-full flex items-center justify-center gap-2 ${!isStep1Valid && 'opacity-50 cursor-not-allowed'}`}
                  >
                    Continue <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
                    <CalendarIcon className="text-brand-accent" /> Date & Time
                  </h3>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-bold mb-3">Select Date</label>
                    <input 
                      type="date" 
                      className="w-full p-4 rounded-2xl border border-brand-pink/30 focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="mb-10">
                    <label className="block text-sm font-bold mb-3">Available Slots</label>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setFormData({ ...formData, time: slot })}
                          className={`py-3 rounded-xl border transition-all font-medium ${
                            formData.time === slot 
                            ? 'bg-brand-accent text-white border-brand-accent shadow-md' 
                            : 'bg-white text-brand-dark border-brand-pink/30 hover:border-brand-accent'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={handleBack} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                      <ChevronLeft size={18} /> Back
                    </button>
                    <button 
                      disabled={!isStep2Valid}
                      onClick={handleNext}
                      className={`btn-primary flex-[2] flex items-center justify-center gap-2 ${!isStep2Valid && 'opacity-50 cursor-not-allowed'}`}
                    >
                      Almost Done <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
                    <User className="text-brand-accent" /> Your Details
                  </h3>
                  
                  <div className="space-y-6 mb-10">
                    <div>
                      <label className="block text-sm font-bold mb-2">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your name"
                        className="w-full p-4 rounded-2xl border border-brand-pink/30 focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        value={formData.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Phone Number (WhatsApp preferred)</label>
                      <input 
                        type="tel" 
                        placeholder="084 926 3898"
                        className="w-full p-4 rounded-2xl border border-brand-pink/30 focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        value={formData.phone}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Special Notes (Optional)</label>
                      <textarea 
                        placeholder="Any specific design or request?"
                        className="w-full p-4 rounded-2xl border border-brand-pink/30 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 min-h-[100px]"
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        value={formData.notes}
                      ></textarea>
                    </div>
                  </div>

                  <div className="bg-brand-pink/10 p-6 rounded-2xl mb-10">
                    <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-brand-accent">Booking Summary</h4>
                    <p className="text-lg font-display font-bold">{selectedService?.name} — R{selectedService?.price}</p>
                    <p className="text-sm text-brand-dark/70">{formData.date} at {formData.time}</p>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={handleBack} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                      <ChevronLeft size={18} /> Back
                    </button>
                    <button 
                      disabled={!isStep3Valid}
                      onClick={handleNext}
                      className={`btn-primary flex-[2] flex items-center justify-center gap-2 ${!isStep3Valid && 'opacity-50 cursor-not-allowed'}`}
                    >
                      Confirm Booking
                    </button>
                  </div>
                  <p className="text-center text-xs text-brand-dark/40 mt-6">
                    Payment is made in person after your service.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
