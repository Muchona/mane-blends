import React from 'react';

const TikTokIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const SocialLinks = () => {
  return (
    <div className="flex space-x-4">
      {/* Instagram */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-brand-primary/20 hover:border-brand-primary/50 transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-brand-primary blur-md transition-opacity duration-300 pointer-events-none" />
        <InstagramIcon className="w-4 h-4 text-gray-400 group-hover:text-brand-primary transition-colors duration-300 z-10" />
      </a>

      {/* TikTok */}
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-brand-primary/20 hover:border-brand-primary/50 transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-brand-primary blur-md transition-opacity duration-300 pointer-events-none" />
        <TikTokIcon className="w-4 h-4 text-gray-400 group-hover:text-brand-primary transition-colors duration-300 z-10" />
      </a>
    </div>
  );
};

export default SocialLinks;
