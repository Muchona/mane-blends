import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Menu, X } from 'lucide-react';
import ShinyButton from './ShinyButton';

const NavbarItem = ({ link, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative px-5 py-2 group"
        >
            <span className={`relative z-10 text-xs font-display uppercase tracking-widest font-bold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-400'}`}>
                {link.name}
            </span>
            {isHovered && (
                <>
                    {/* Hover Pill Background */}
                    <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10"
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30
                        }}
                    />

                    {/* Animated Scissor */}
                    <motion.div
                        layoutId="nav-character"
                        className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <motion.div
                            animate={{ rotate: [-10, 20, -10] }}
                            transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                        >
                            <img src="Logo.png" alt="Logo" className="h-8 w-auto object-contain drop-shadow-lg" />
                        </motion.div>
                    </motion.div>
                </>
            )}
        </button>
    );
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Gallery', href: '#gallery' },
    ];

    const scrollToSection = (id) => {
        setMobileMenuOpen(false);
        if (id === '#') {
            window.history.pushState(null, '', '/mane-blends/');
            window.dispatchEvent(new HashChangeEvent("hashchange"));
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        window.location.hash = id;

        setTimeout(() => {
            const element = document.getElementById(id.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className={`fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 transition-all duration-300 ${scrolled ? 'pt-4 md:pt-8' : 'pt-8 md:pt-12'}`}
            >
                {/* Floating Glass Capsule */}
                <div className={`
                    relative flex items-center justify-between 
                    w-full max-w-5xl 
                    px-5 py-3 md:px-6 md:py-2 
                    rounded-full 
                    border border-white/10
                    transition-all duration-500
                    ${scrolled
                        ? 'bg-[#0f1115]/80 backdrop-blur-xl shadow-lg border-brand-primary/20'
                        : 'bg-black/20 backdrop-blur-md shadow-sm'
                    }
                `}>
                    {/* Logo */}
                    <button onClick={() => scrollToSection('#')} className="flex items-center gap-2 group">
                        <img src="Logo.png" alt="Mane Blends Logo" className="h-10 w-auto object-contain group-hover:rotate-12 transition-transform duration-300" />
                        <span className={`font-display font-bold text-2xl tracking-tighter transition-colors ${scrolled ? 'text-white' : 'text-white'}`}>
                            MANE BLENDS
                        </span>
                    </button>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link, i) => (
                            <NavbarItem
                                key={i}
                                link={link}
                                onClick={() => scrollToSection(link.href)}
                            />
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center">
                        <ShinyButton
                            href="#book"
                            className="relative px-6 py-2 font-display text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-brand-primary/20"
                        >
                            Book Now
                        </ShinyButton>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white p-2 hover:text-brand-primary transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] bg-[#0f1115]/95 backdrop-blur-xl flex flex-col items-center justify-center overflow-y-auto"
                    >
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-brand-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="h-8 w-8" />
                        </button>

                        <div className="flex flex-col items-center gap-10">
                            {navLinks.map((link, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollToSection(link.href)}
                                    className="font-display text-4xl text-white hover:text-brand-primary transition-colors"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <ShinyButton
                                href="#book"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-8 py-3 font-display font-bold uppercase tracking-widest rounded-full mt-4"
                            >
                                Book Now
                            </ShinyButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
