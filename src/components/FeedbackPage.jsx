import React from 'react';
import { motion } from 'framer-motion';
import { initialReviews, ReviewCard } from './Reviews';
import { ArrowLeft } from 'lucide-react';

const FeedbackPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#2d1142] to-[#7c266a] opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-600/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors uppercase tracking-widest text-sm font-medium mb-6"
            >
              <ArrowLeft size={16} />
              Back to Home
            </a>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              All <span className="text-brand-primary italic">Feedbacks</span>
            </h1>
          </motion.div>
        </div>

        {/* Grid of Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default FeedbackPage;
