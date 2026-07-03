import React from 'react';
import { motion } from 'framer-motion';
import ShinyButton from './ShinyButton';

const servicesList = [
  { name: 'The Classic Cut', price: '€30', desc: 'Tailored haircut with a hot towel finish and styling.' },
  { name: 'Skin Fade', price: '€35', desc: 'Precision fade down to the skin, blended to perfection.' },
  { name: 'Beard Trim & Line Up', price: '€20', desc: 'Sculpting and shaping with a straight razor finish.' },
  { name: 'The Full Mane Blend', price: '€50', desc: 'Complete package: Haircut, beard trim, and premium styling.' },
  { name: 'Restyle', price: '€45', desc: 'Going from long to short or wanting a completely new look.' },
  { name: 'Kids Cut (Under 12)', price: '€20', desc: 'Classic cuts for the young gentlemen.' }
];

const Services = () => {
  return (
    <section id="services" className="py-12 md:py-24 bg-[#14171c]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-tight"
          >
            Services & <span className="text-brand-primary">Pricing</span>
          </motion.h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto"></div>
        </div>

        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {servicesList.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-row justify-between items-center border-b border-gray-800 pb-4 sm:pb-6 hover:border-brand-primary transition-colors duration-300"
            >
              <div className="pr-4 flex-1">
                <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white group-hover:text-brand-primary transition-colors duration-300 leading-tight">{service.name}</h3>
                <p className="text-gray-400 mt-1 md:mt-2 text-xs sm:text-sm md:text-base leading-snug">{service.desc}</p>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-primary flex-shrink-0">
                {service.price}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <ShinyButton href="#book" className="inline-block px-10 py-4 rounded-full font-bold text-lg tracking-widest uppercase shadow-xl hover:shadow-brand-primary/20">
            Book via Booksy
          </ShinyButton>
        </div>
      </div>
    </section>
  );
};

export default Services;
