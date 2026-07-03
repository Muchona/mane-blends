import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const Counter = ({ from, to, duration = 2 }) => {
  const nodeRef = useRef();
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value);
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef}>{from}</span>;
};

const Benefits = () => {
  const stats = [
    { number: '4', text: 'Professional Barbers' },
    { number: '5000', text: 'Customers', suffix: '+' },
    { number: '15', text: 'Years Of Experience', suffix: '+' },
    { number: '99', text: 'Happy Customers', suffix: '%' },
  ];

  return (
    <section className="bg-[#1a1a1a] text-white py-12 md:py-24 relative overflow-hidden" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden relative">
              <img 
                src="benefits-barber.png" 
                alt="Professional Barber" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:pl-8"
          >
            <h4 className="text-[#E74C3C] text-xs md:text-sm font-bold tracking-widest uppercase mb-2 md:mb-4 font-display">Our Benefits</h4>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-display leading-tight">
              Professional Barbershop &<br />Hair Studio For Men Only
            </h2>
            <p className="text-gray-400 mb-12 text-lg leading-relaxed">
              We Provide An Unrivaled Grooming Experience Tailored Exclusively For Men. From The Moment You Walk In, You'll Receive Expert, One-On-One Service In A Relaxing, Sophisticated Environment.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12 relative">
              {/* Highlight box for first item */}
              <div className="absolute top-[-24px] left-[-24px] w-[calc(50%+12px)] h-[160px] border border-gray-600 rounded pointer-events-none hidden sm:block"></div>
              
              {stats.map((stat, index) => (
                <div key={index} className="pb-8 relative z-10">
                  <div className="flex items-start mb-1 md:mb-2">
                    <span className="text-3xl md:text-5xl font-bold font-display">
                      <Counter from={0} to={parseInt(stat.number)} duration={2} />
                    </span>
                    {stat.suffix && <span className="text-[#E74C3C] text-2xl md:text-4xl font-bold ml-1">{stat.suffix}</span>}
                  </div>
                  <p className="text-gray-300 font-medium text-sm md:text-lg">{stat.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Benefits;
