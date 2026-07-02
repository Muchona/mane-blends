import React from 'react';
import { motion } from 'framer-motion';
import ShinyButton from './ShinyButton';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-dark/40 z-10"></div>
        <img 
          src="/hero.png" 
          alt="Mane Blends Premium Barbershop" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start text-left pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 uppercase tracking-tight max-w-3xl">
            The <span className="text-brand-primary italic pr-2">Best</span> <br className="hidden md:block" /> in the World
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 text-xl md:text-2xl text-gray-300 max-w-xl font-light mb-10"
        >
          Premium grooming studio in Monaghan, Ireland. Where classic techniques meet modern style.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ShinyButton href="#book" className="inline-block px-10 py-4 rounded-full font-bold text-lg tracking-widest uppercase shadow-xl hover:shadow-brand-primary/20">
            Book Appointment
          </ShinyButton>
        </motion.div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark to-transparent z-10"></div>
    </div>
  );
};

export default Hero;
