import { Scissors } from 'lucide-react';
import OnyxBadge from './OnyxBadge';
import SocialLinks from './SocialLinks';

const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-gray-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Scissors className="h-8 w-8 text-brand-primary" />
              <span className="font-display font-bold text-2xl tracking-tighter text-white">MANE BLENDS</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              The premier barbershop in Monaghan, Ireland. Delivering top-tier haircuts, beard trims, and styling for the modern gentleman.
            </p>
            <SocialLinks />
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:ml-auto">
            <h4 className="text-white font-bold text-xl mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-brand-primary transition-colors font-medium">Home</a></li>
              <li><a href="#about" className="hover:text-brand-primary transition-colors font-medium">About Us</a></li>
              <li><a href="#gallery" className="hover:text-brand-primary transition-colors font-medium">Gallery</a></li>
              <li><a href="#services" className="hover:text-brand-primary transition-colors font-medium">Service</a></li>
            </ul>
          </div>

          {/* Column 3: Onyx Badge */}
          <div className="flex md:justify-end items-start pt-2">
            <OnyxBadge />
          </div>

        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Mane Blends Premium Barbershop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
