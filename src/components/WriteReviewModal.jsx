import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Upload, Image as ImageIcon } from 'lucide-react';
import ShinyButton from './ShinyButton';

const WriteReviewModal = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [barber, setBarber] = useState('');
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit the review data
        if (onSubmit) {
            onSubmit({
                name,
                barber,
                rating,
                text: e.target.querySelector('textarea').value,
                image
            });
        }

        // Close and reset
        setTimeout(() => {
            onClose();
            setRating(0);
            setImage(null);
            setName('');
            setBarber('');
        }, 500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-[#1a1a1a] border border-gray-800 w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl pointer-events-auto relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="relative">
                                <h3 className="font-display font-bold text-2xl text-white mb-1">Leave Feedback</h3>
                                <p className="text-gray-400 text-sm mb-6 font-sans">Tell us about your experience at Mane Blends.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Input */}
                                    <input
                                        type="text"
                                        placeholder="Your Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-[#111111] border border-gray-800 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-primary/50 transition-colors font-sans text-sm"
                                        required
                                    />
                                    
                                    {/* Barber Selection */}
                                    <select
                                        value={barber}
                                        onChange={(e) => setBarber(e.target.value)}
                                        className="w-full bg-[#111111] border border-gray-800 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-primary/50 transition-colors font-sans text-sm appearance-none"
                                        required
                                    >
                                        <option value="" disabled>Select your barber</option>
                                        <option value="Marcus">Marcus (Master Barber)</option>
                                        <option value="David">David (Senior Barber)</option>
                                        <option value="James">James (Barber)</option>
                                        <option value="Any Barber">Any Barber</option>
                                    </select>

                                    {/* Star Rating */}
                                    <div className="flex justify-center gap-2 mb-8">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                onClick={() => setRating(star)}
                                                className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                            >
                                                <Star
                                                    size={32}
                                                    fill={star <= (hoverRating || rating) ? "#D4AF37" : "none"}
                                                    className={star <= (hoverRating || rating) ? "text-brand-primary" : "text-gray-700"}
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Text Area */}
                                    <textarea
                                        placeholder="What did you enjoy most?"
                                        className="w-full bg-[#111111] border border-gray-800 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-primary/50 transition-colors min-h-[120px] resize-none font-sans text-sm"
                                    />

                                    {/* Image Upload */}
                                    <div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full h-12 border border-dashed border-gray-700 rounded-xl flex items-center justify-center gap-2 text-gray-500 hover:text-brand-primary hover:border-brand-primary/50 hover:bg-[#111111] transition-all group"
                                        >
                                            {image ? (
                                                <>
                                                    <ImageIcon size={18} className="text-green-500" />
                                                    <span className="text-sm text-green-500 font-bold">{image.name}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload size={18} className="group-hover:-translate-y-1 transition-transform" />
                                                    <span className="text-sm font-bold uppercase tracking-wider">Add Photo</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Submit Button */}
                                    <ShinyButton 
                                        type="submit"
                                        className="w-full py-4 rounded-full"
                                    >
                                        Post Feedback
                                    </ShinyButton>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WriteReviewModal;
