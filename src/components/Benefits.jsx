import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const Counter = ({ from, to, duration = 2 }) => {
  const nodeRef = useRef();
  const inView = useInView(nodeRef, { once: true, margin: "0px" });

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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start">
          
          {/* Image & Text Row for Mobile / Image only on Desktop */}
          <div className="flex flex-row gap-4 md:gap-8 w-full lg:w-1/2 items-start">
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-1/2 lg:w-full relative shrink-0"
            >
              <div className="aspect-[4/5] overflow-hidden relative rounded-lg shadow-lg">
                <img 
                  src="benefits-barber.png" 
                  alt="Professional Barber" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Text on Mobile (Hidden on Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-1/2 lg:hidden flex flex-col justify-center"
            >
              <h4 className="text-[#E74C3C] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1 font-display">Our Benefits</h4>
              <h2 className="text-lg sm:text-2xl font-bold mb-2 font-display leading-tight">
                Professional Barbershop For Men
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                An unrivaled grooming experience tailored exclusively for men. Expert service in a relaxing environment.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Text (Desktop) + Stats (Mobile & Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 lg:pl-8 flex flex-col"
          >
            {/* Text on Desktop (Hidden on Mobile) */}
            <div className="hidden lg:block">
              <h4 className="text-[#E74C3C] text-sm font-bold tracking-widest uppercase mb-4 font-display">Our Benefits</h4>
              <h2 className="text-5xl font-bold mb-6 font-display leading-tight">
                Professional Barbershop &<br />Hair Studio For Men Only
              </h2>
              <p className="text-gray-400 mb-12 text-lg leading-relaxed">
                We Provide An Unrivaled Grooming Experience Tailored Exclusively For Men. From The Moment You Walk In, You'll Receive Expert, One-On-One Service In A Relaxing, Sophisticated Environment.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8 relative w-full mt-4 lg:mt-0">
              {/* Highlight box for first item */}
              <div className="absolute top-[-24px] left-[-24px] w-[calc(50%+12px)] h-[160px] border border-gray-600 rounded pointer-events-none hidden lg:block"></div>
              
              {stats.map((stat, index) => (
                <div key={index} className="pb-2 sm:pb-8 relative z-10">
                  <div className="flex items-start mb-0.5 md:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-5xl font-bold font-display">
                      <Counter from={0} to={parseInt(stat.number)} duration={2} />
                    </span>
                    {stat.suffix && <span className="text-[#E74C3C] text-xl sm:text-2xl md:text-4xl font-bold ml-1">{stat.suffix}</span>}
                  </div>
                  <p className="text-gray-300 font-medium text-xs sm:text-sm md:text-lg">{stat.text}</p>
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
