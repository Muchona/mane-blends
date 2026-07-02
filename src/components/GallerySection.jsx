import React, { useState, useEffect } from 'react';
import { Scissors, Droplet, Star, Camera, Sparkles, ArrowRight } from 'lucide-react';
import ShinyButton from './ShinyButton';

const GallerySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState([]);
  
  const options = [
    {
      title: "Precision Fades",
      description: "Flawless transitions & sharp lines",
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Scissors size={20} className="text-white" />
    },
    {
      title: "Classic Shave",
      description: "Hot towel & straight razor",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Droplet size={20} className="text-white" />
    },
    {
      title: "Premium Styling",
      description: "Top-tier grooming products",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Sparkles size={20} className="text-white" />
    },
    {
      title: "The Atmosphere",
      description: "Relax, unwind, and vibe",
      image: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Star size={20} className="text-white" />
    },
    {
      title: "Scissor Work",
      description: "Expert texture & layering",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Camera size={20} className="text-white" />
    }
  ];

  const handleOptionClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-[#050505]">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center font-sans text-white z-10 w-full px-4"> 
        {/* Header Section */}
        <div className="w-full max-w-2xl text-center mb-16">
          <h4 className="text-brand-primary text-sm font-bold tracking-widest uppercase mb-4 font-display">Our Work</h4>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display drop-shadow-lg animate-fadeInTop delay-300">
            The Mane Blends Experience
          </h2>
          <p className="text-lg text-gray-400 font-medium max-w-xl mx-auto animate-fadeInTop delay-600">
            A glimpse into the craftsmanship, atmosphere, and premium grooming services we deliver every single day.
          </p>
        </div>

        {/* Options Container */}
        <div className="options flex flex-col md:flex-row w-full max-w-5xl h-[600px] md:h-[600px] mx-auto items-stretch overflow-hidden relative rounded-3xl shadow-2xl bg-[#111] p-2 gap-2">
          {options.map((option, index) => (
            <div
              key={index}
              className={`
                option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-2xl
                ${activeIndex === index ? 'active' : ''}
              `}
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: activeIndex === index ? 'cover' : 'cover',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                minWidth: '60px',
                margin: 0,
                cursor: 'pointer',
                backgroundColor: '#18181b',
                boxShadow: activeIndex === index 
                  ? 'inset 0 -150px 100px -50px rgba(0,0,0,0.8), 0 20px 60px rgba(0,0,0,0.50)' 
                  : 'inset 0 -150px 100px -50px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.30)',
                flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
                zIndex: activeIndex === index ? 10 : 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                willChange: 'flex-grow, transform, opacity',
                border: activeIndex === index ? '2px solid rgba(212, 175, 55, 0.5)' : '2px solid transparent'
              }}
              onClick={() => handleOptionClick(index)}
            >
              {/* Overlay for non-active items to darken them */}
              <div 
                className="absolute inset-0 bg-black transition-opacity duration-700 pointer-events-none"
                style={{ opacity: activeIndex === index ? 0 : 0.4 }}
              />
              
              {/* Label with icon and info */}
              <div className="label absolute left-0 right-0 bottom-4 md:bottom-6 flex items-center justify-start h-14 z-10 pointer-events-none px-4 md:px-6 gap-4 w-[600px]">
                <div className="icon min-w-[40px] max-w-[40px] h-[40px] md:min-w-[48px] md:max-w-[48px] md:h-[48px] flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md shadow-lg border border-white/20 flex-shrink-0 transition-transform duration-500 hover:scale-110 text-brand-primary">
                  {option.icon}
                </div>
                <div className="info text-white whitespace-pre relative flex flex-col justify-center">
                  <div 
                    className="main font-display font-bold text-xl md:text-2xl tracking-tight transition-all duration-700 ease-out"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                    }}
                  >
                    {option.title}
                  </div>
                  <div 
                    className="sub text-sm md:text-base text-gray-300 font-medium transition-all duration-700 ease-out delay-75"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                    }}
                  >
                    {option.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery CTA */}
        <div className="mt-16 flex flex-col items-center gap-4 animate-fadeInTop delay-[900ms]">
          <p className="text-gray-400 font-medium">Want to see more of our work?</p>
          <ShinyButton 
            href="#full-gallery" 
            className="flex items-center gap-3 px-8 py-4 rounded-full font-display font-bold uppercase tracking-widest text-sm"
          >
            View Full Gallery <ArrowRight size={18} />
          </ShinyButton>
        </div>
        
        {/* Custom animations */}
        <style jsx>{`
          @keyframes fadeInFromTop {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeInTop {
            opacity: 0;
            transform: translateY(-20px);
            animation: fadeInFromTop 0.8s ease-in-out forwards;
          }
          
          .delay-300 { animation-delay: 0.3s; }
          .delay-600 { animation-delay: 0.6s; }
        `}</style>
      </div>
    </section>
  );
};

export default GallerySection;
