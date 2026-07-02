import React from 'react';
import { MapPin, Phone, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Location = () => {
    return (
        <section className="py-32 bg-brand-dark relative overflow-hidden border-t border-white/5" id="location">
            {/* Background Grain/Glow - matching site theme */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Info & Map */}
                    <div className="space-y-12">
                        {/* Title */}
                        <div>
                            <span className="text-brand-primary font-display text-xs tracking-[0.3em] uppercase mb-4 block animate-pulse">Visit Us</span>
                            <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.9] mb-8">
                                The Heart of <br />
                                <span className="text-white/40">Monaghan</span>
                            </h2>
                            <p className="text-gray-400 max-w-md text-lg">
                                Experience our premium grooming studio in person.
                                Delivering top-tier haircuts and styling daily.
                            </p>
                        </div>

                        {/* Map Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-full h-80 bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative group"
                        >
                            <iframe
                                src="https://maps.google.com/maps?q=Monaghan%2C%20Ireland&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(60%) contrast(100%)' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full group-hover:filter-none transition-all duration-700 opacity-80 group-hover:opacity-100"
                            ></iframe>
                            {/* Hint */}
                            <div className="absolute bottom-4 left-4 z-20 bg-brand-dark/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white pointer-events-none">
                                Find Us
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Hours & Contact inside styling card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="h-full relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-brand-accent/20 flex flex-col p-8 lg:p-12 group"
                    >
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-10 w-full h-full flex flex-col justify-between space-y-12">
                            {/* Hours */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-brand-primary border-b border-white/10 pb-4">
                                    <Clock className="w-5 h-5" />
                                    <span className="text-sm font-bold uppercase tracking-widest text-white">Opening Hours</span>
                                </div>
                                <ul className="space-y-3 text-sm text-gray-400 font-sans">
                                    <li className="flex justify-between items-center">
                                        <span>Mon - Wed</span>
                                        <span className="text-white font-medium">09:00 - 18:00</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span>Thu - Fri</span>
                                        <span className="text-white font-medium">09:00 - 20:00</span>
                                    </li>
                                    <li className="flex justify-between items-center text-brand-primary/80">
                                        <span>Saturday</span>
                                        <span className="text-white font-medium">08:00 - 16:00</span>
                                    </li>
                                    <li className="flex justify-between items-center text-gray-600">
                                        <span>Sunday</span>
                                        <span className="text-gray-500 font-medium">Closed</span>
                                    </li>
                                </ul>
                                <div className="pt-2">
                                    <a href="#book" className="inline-block px-5 py-2 bg-brand-primary hover:bg-white hover:text-brand-dark transition-colors duration-300 text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg shadow-brand-primary/20">
                                        Book Now
                                    </a>
                                </div>
                            </div>

                            {/* Contact Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                                <div>
                                    <div className="flex items-center gap-2 text-brand-primary mb-3">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-widest text-white">Location</span>
                                    </div>
                                    <address className="not-italic text-gray-400 text-sm leading-relaxed">
                                        Main Street<br />
                                        Monaghan Town, Ireland
                                    </address>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 text-brand-primary mb-3">
                                        <Phone className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-widest text-white">Contact Us</span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-1 hover:text-white transition-colors">
                                        <a href="tel:04712345" className="hover:text-brand-primary transition-colors">(047) 12345</a>
                                    </p>
                                    <p className="text-gray-400 text-sm hover:text-white transition-colors break-all">
                                        <a href="mailto:info@maneblends.ie" className="hover:text-brand-primary transition-colors">info@maneblends.ie</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Location;
