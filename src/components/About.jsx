import { motion } from 'framer-motion';
import { Scissors, Award, Clock } from 'lucide-react';

const features = [
  { icon: <Scissors className="w-6 h-6 text-brand-primary" />, title: 'Master Barbers', desc: 'Expertly trained to deliver the perfect cut every time.' },
  { icon: <Award className="w-6 h-6 text-brand-primary" />, title: 'Premium Products', desc: 'We only use the best products for your hair and beard.' },
  { icon: <Clock className="w-6 h-6 text-brand-primary" />, title: 'Punctual Service', desc: 'Your time is valuable. We always run on schedule.' }
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              More Than Just <br/>
              <span className="text-brand-primary">A Haircut.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              At Mane Blends Premium Barbershop, we believe that a great haircut is the foundation of a man's confidence. Located in the heart of Monaghan, our studio offers a modern sanctuary where classic barbering techniques meet contemporary style.
            </p>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 bg-brand-accent rounded-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl">{feature.title}</h4>
                    <p className="text-gray-400 mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[600px] w-full"
          >
            <div className="absolute inset-0 bg-brand-primary/10 rounded-sm transform translate-x-4 translate-y-4"></div>
            <div className="absolute inset-0 bg-brand-accent rounded-sm overflow-hidden flex items-center justify-center border border-gray-800">
               {/* Placeholder for shop interior photo */}
               <div className="text-center p-8">
                  <Scissors className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 font-display text-xl uppercase tracking-widest">Shop Interior<br/>Coming Soon</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
