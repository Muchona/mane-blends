import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, booksyUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when opened
  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center md:items-center p-0 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full h-[90vh] md:max-h-[85vh] md:w-[1000px] bg-white md:rounded-2xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 bg-[#0f1115] border-b border-gray-800">
              <h3 className="font-display font-bold text-white text-lg tracking-widest uppercase">
                Book Appointment
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-brand-primary rounded-full group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 w-full bg-white relative">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-4 bg-gray-50">
                  <Loader2 className="animate-spin text-brand-primary" size={40} />
                  <p className="font-medium text-sm">Loading Booksy...</p>
                </div>
              )}
              <iframe
                src={booksyUrl || "https://booksy.com/en-ie/s/barbershop"}
                className="absolute inset-0 w-full h-full border-0"
                title="Booksy Booking Widget"
                allow="geolocation"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
