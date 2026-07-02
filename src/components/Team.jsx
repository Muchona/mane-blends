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
    <section className="bg-[#151515] text-white py-24" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
          <h4 className="text-brand-primary text-sm font-bold tracking-widest uppercase mb-4 font-display">The Team</h4>
          <h2 className="text-4xl md:text-5xl font-bold mb-16 font-display">Our Amazing Barbers</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <SpotlightCard className="h-full group">
                <div className="relative aspect-[4/5] overflow-hidden w-full">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle overlay gradient to ensure text readability if it overlaps */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none opacity-60" />
                </div>
                
                <div className="relative bg-brand-dark/50 backdrop-blur-sm p-6 border-t border-white/5 z-20">
                  <h3 className="text-xl font-bold font-display mb-1 text-white">{member.name}</h3>
                  <p className="text-brand-primary text-sm font-bold tracking-wide uppercase">{member.role}</p>
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
