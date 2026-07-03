import React from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';

const Team = () => {
  const team = [
    {
      name: 'Daniel Cruz',
      role: 'Owner',
      image: 'team-1.png'
    },
    {
      name: 'Victor Morales',
      role: 'Color Specialist',
      image: 'team-2.png'
    },
    {
      name: 'Miles Turner',
      role: 'Barber',
      image: 'team-3.png'
    }
  ];

  return (
    <section className="bg-[#151515] text-white py-12 md:py-24" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
          <h4 className="text-brand-primary text-xs md:text-sm font-bold tracking-widest uppercase mb-2 md:mb-4 font-display">The Team</h4>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-16 font-display">Our Amazing Barbers</h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <SpotlightCard className="h-full group rounded-xl md:rounded-2xl">
                <div className="relative aspect-[4/5] overflow-hidden w-full">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle overlay gradient to ensure text readability if it overlaps */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-80 md:opacity-60" />
                  
                  {/* Content positioned over image at the bottom for compact mobile view */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-6 z-20">
                    <h3 className="text-[11px] sm:text-sm md:text-xl font-bold font-display mb-0.5 md:mb-1 text-white truncate drop-shadow-md">{member.name}</h3>
                    <p className="text-brand-primary text-[8px] sm:text-[10px] md:text-sm font-bold tracking-widest uppercase truncate drop-shadow-md">{member.role}</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
