import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGallery } from './components';
import { Camera, Filter, Upload, Check, X, Image as ImageIcon } from 'lucide-react';

export default function Gallery() {
  const { images, addImages } = useGallery();
  const [filter, setFilter] = useState('All');
  const [uploading, setUploading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['All', 'Short', 'Medium', 'Long', 'Pedicure', 'Recent Work'];

  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!previewUrl) return;

    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newImage = {
        url: previewUrl,
        category: 'Recent Work',
        title: 'Client Submission'
      };
      
      addImages([newImage]);
      setUploading(false);
      setShowConfirm(true);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Hide confirmation after 3 seconds
      setTimeout(() => setShowConfirm(false), 3000);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Nail Gallery</h1>
          <p className="text-xl text-brand-dark/60 max-w-2xl mx-auto">
            Get inspired by our latest creations. From subtle nudes to bold statement sets.
          </p>
        </header>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="card border-dashed border-2 border-brand-accent/30 bg-brand-pink/5 text-center p-10">
            <h3 className="text-2xl font-display font-bold mb-4">Submit Your Look</h3>
            <p className="text-brand-dark/60 mb-8">Got a fresh set from Angel? Share it with our community!</p>
            
            <div className="flex flex-col items-center gap-6">
              {!previewUrl ? (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-4 cursor-pointer group"
                >
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-brand-accent shadow-sm group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <span className="font-bold text-brand-accent">Select Photo</span>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </button>
              ) : (
                <div className="w-full max-w-xs">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setPreviewUrl(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={handleUpload}
                    disabled={uploading}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Check size={20} /> Confirm Upload
                      </>
                    )}
                  </button>
                </div>
              )}

              <AnimatePresence>
                {showConfirm && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-600 font-bold"
                  >
                    <CheckCircle size={20} /> Photo added to gallery!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                ? 'bg-brand-accent text-white shadow-md' 
                : 'bg-white text-brand-dark hover:bg-brand-pink/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.url + idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-sm"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">{img.category}</span>
                  <h3 className="text-white text-xl font-display font-bold">{img.title}</h3>
                </div>
                <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={20} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brand-dark/50 italic">No images found in this category yet. Check back soon!</p>
          </div>
        )}

        <div className="mt-20 bg-brand-pink/20 rounded-[3rem] p-12 text-center">
          <h3 className="text-2xl font-display font-bold mb-4">Want something custom?</h3>
          <p className="text-brand-dark/70 mb-8 max-w-md mx-auto">
            Bring a reference photo to your appointment and we'll bring your vision to life.
          </p>
          <a href="https://wa.me/27849263898" className="btn-primary">Send Reference Photo</a>
        </div>
      </div>
    </div>
  );
}

// Helper component for the check circle since I missed it in imports
const CheckCircle = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
