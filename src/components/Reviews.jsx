import React, { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import WriteReviewModal from './WriteReviewModal';
import ScannerCardStream from './ScannerCardStream';

export const initialReviews = [
    {
        id: '1',
        author: 'Sarah O\'Connor',
        role: 'Local Resident',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
        rating: 5,
        text: '"Absolutely the best haircut in Monaghan! The attention to detail is incredible. You can really tell they know what they are doing. A true premium experience!"',
        date: '2 weeks ago',
    },
    {
        id: '2',
        author: 'Michael Murphy',
        role: 'Business Owner',
        avatar: 'https://i.pravatar.cc/150?u=michael',
        rating: 5,
        text: '"Stumbled upon this barbershop by accident and I\'m so glad I did. The atmosphere is unmatched. Great fade and friendly staff too."',
        date: '1 month ago',
    },
    {
        id: '3',
        author: 'Emma Walsh',
        role: 'Marketing Manager',
        avatar: 'https://i.pravatar.cc/150?u=emma',
        rating: 5,
        text: '"Finally, a proper grooming studio! Brought my husband here and he looks fantastic. Highly recommend booking an appointment as it gets busy."',
        date: '3 weeks ago',
    },
    {
        id: '4',
        author: 'David Kelly',
        role: 'IT Consultant',
        avatar: 'https://i.pravatar.cc/150?u=david',
        rating: 4,
        text: '"Beard trim was on point, very authentic feel. Service was a little slow but it was a busy Saturday. Worth the wait though!"',
        date: '2 months ago',
    },
    {
        id: '5',
        author: 'Ciara Byrne',
        role: 'Operations',
        avatar: 'https://i.pravatar.cc/150?u=ciara',
        rating: 5,
        text: '"Hands down the best barbershop in town. My partner refuses to go anywhere else now. 10/10."',
        date: '1 week ago',
    }
];

export const ReviewCard = ({ review }) => {
    return (
        <div className="relative overflow-hidden bg-[#241a30] rounded-3xl h-full flex flex-col group shadow-xl">
            {/* Scanner Beam Animation */}
            <motion.div
                className="absolute inset-x-0 z-0 pointer-events-none"
                initial={{ top: "-100%" }}
                animate={{ top: "200%" }}
                transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity,
                    repeatDelay: 0.5
                }}
            >
                <div className="w-full h-32 bg-gradient-to-b from-transparent via-brand-primary/10 to-transparent blur-[8px]" />
                <div className="w-full h-[2px] bg-brand-primary/30 blur-[2px]" />
            </motion.div>

            {/* Subtle Border Glow on Hover */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl border border-brand-primary/20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-primary/10 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 p-8 flex flex-col h-full">
                {/* Rating Stars */}
                <div className="flex gap-1.5 mb-6">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={18}
                            fill={i < review.rating ? "#ffffff" : "none"}
                            className={i < review.rating ? "text-white" : "text-white/20"}
                        />
                    ))}
                </div>

                {/* Review Text */}
                <p className="text-white/90 font-medium leading-relaxed flex-1 text-sm md:text-base mb-6 font-sans">
                    {review.text}
                </p>

                {/* Attached Image */}
                {review.attachedImage && (
                    <div className="mb-4 w-full h-24 rounded-xl overflow-hidden shrink-0 mt-auto shadow-inner">
                        <img src={review.attachedImage} alt="Attached" className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Footer: Avatar, Name & Role */}
                <div className={`flex items-center gap-4 ${!review.attachedImage ? 'mt-auto' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-[#a855f7] flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg shadow-purple-500/20">
                        {review.author.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-sans font-bold text-white text-sm">
                            {review.author}
                        </h4>
                        <span className="text-xs text-white/50 font-medium">{review.role || review.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Reviews = () => {
    const scrollContainerRef = useRef(null);
    const [reviewsData, setReviewsData] = useState(initialReviews);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate stats dynamically from ALL reviews
    const stats = useMemo(() => {
        const total = reviewsData.length;
        const average = reviewsData.reduce((acc, review) => acc + review.rating, 0) / (total || 1);
        const distribution = {
            5: reviewsData.filter(r => r.rating === 5).length,
            4: reviewsData.filter(r => r.rating === 4).length,
            3: reviewsData.filter(r => r.rating === 3).length,
            2: reviewsData.filter(r => r.rating === 2).length,
            1: reviewsData.filter(r => r.rating === 1).length,
        };
        return { total, average: average.toFixed(1), distribution };
    }, [reviewsData]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = direction === 'left' ? -350 : 350;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleAddReview = (newReviewData) => {
        let imageUrl = null;
        if (newReviewData.image) {
            imageUrl = URL.createObjectURL(newReviewData.image);
        }

        const newReview = {
            id: Date.now().toString(),
            author: newReviewData.name,
            role: newReviewData.barber ? `Service by ${newReviewData.barber}` : 'New Client',
            avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
            rating: newReviewData.rating || 5, // fallback if they somehow submitted 0
            text: `"${newReviewData.text || 'Great experience!'}"`,
            date: 'Just now',
            attachedImage: imageUrl
        };
        
        // Mutate the top-level array so FeedbackPage sees it too
        initialReviews.unshift(newReview);
        setReviewsData([...initialReviews]);
        setIsModalOpen(false);
    };

    return (
        <section className="py-12 md:py-20 relative overflow-hidden bg-[#0a0a0a]" id="reviews">
            {/* Deep Purple Gradient Background matching the image */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#2d1142] to-[#7c266a] opacity-90 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-fuchsia-600/20 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10">

                {/* Header & Stats - Centered Stack */}
                <div className="w-full max-w-4xl mx-auto text-center mb-8 md:mb-16 space-y-8 md:space-y-12">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-2 md:space-y-4"
                    >
                        <h4 className="text-purple-300 text-xs md:text-sm font-bold tracking-widest uppercase mb-2 md:mb-4 font-display">Client Reviews</h4>
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-16 font-display text-white">
                            What Our Clients Say
                        </h2>
                    </motion.div>

                    {/* Stats Card - Centered */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 max-w-lg mx-auto shadow-2xl relative"
                    >
                        <div className="flex items-end justify-center gap-4 mb-6 md:mb-8">
                            <span className="font-display text-5xl md:text-7xl text-white font-bold leading-none">
                                {stats.average}
                            </span>
                            <div className="mb-1 md:mb-2 text-left">
                                <div className="flex gap-1 mb-1 md:mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill="#ffffff" className="text-white md:w-5 md:h-5" />
                                    ))}
                                </div>
                                <p className="text-[10px] md:text-xs text-purple-200 font-medium uppercase tracking-widest">
                                    Based on {stats.total} Reviews
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            {[5, 4, 3, 2, 1].map((rating) => {
                                const count = stats.distribution[rating];
                                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;

                                return (
                                    <div key={rating} className="flex items-center gap-4 text-xs font-bold">
                                        <span className="w-4 text-purple-200">{rating}</span>
                                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className="h-full bg-purple-400 rounded-full"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* Buttons */}
                        <div className="pt-6 md:pt-8 border-t border-white/10 flex flex-col items-center gap-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-6 py-2 md:px-8 md:py-3 text-sm md:text-base bg-white text-purple-900 font-display font-bold uppercase tracking-widest rounded-full hover:bg-purple-100 transition-colors w-full sm:w-auto"
                            >
                                Leave Feedback
                            </button>
                            <a
                                href="#all-feedbacks"
                                className="text-xs md:text-sm font-medium text-purple-300 hover:text-white transition-colors uppercase tracking-widest underline decoration-purple-500/50 underline-offset-4"
                            >
                                See all feedbacks
                            </a>
                        </div>
                    </motion.div>
                </div>

                    {/* ScannerCardStream Carousel */}
                    <div className="w-full relative mt-8 -mx-4 md:mx-0 overflow-visible">
                        <ScannerCardStream reviews={reviewsData} />
                    </div>
            </div>
            
            <WriteReviewModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddReview}
            />
        </section>
    );
};

export default Reviews;
