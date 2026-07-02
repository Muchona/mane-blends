import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Benefits from './components/Benefits'
import Team from './components/Team'
import Reviews from './components/Reviews'
import Gallery from './components/Gallery'
import GallerySection from './components/GallerySection'
import Location from './components/Location'
import Footer from './components/Footer'
import FeedbackPage from './components/FeedbackPage'
import BookingModal from './components/BookingModal'

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo(0, 0); // scroll to top when page changes
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isFeedbackPage = currentHash === '#all-feedbacks';
  const isGalleryPage = currentHash === '#full-gallery';

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light font-sans selection:bg-brand-primary selection:text-brand-dark">
      <Navbar />
      
      {isFeedbackPage ? (
        <FeedbackPage />
      ) : isGalleryPage ? (
        <Gallery />
      ) : (
        <main>
          <Hero />
          <About />
          <Services />
          <Benefits />
          <Team />
          <Reviews />
          <GallerySection />
          <Location />
        </main>
      )}

      <Footer />
      
      {/* App-like Booking Overlay */}
      <BookingModal 
        isOpen={currentHash === '#book'} 
        booksyUrl="https://booksy.com/widget/index.html?id=1647&country=ie&lang=en"
        onClose={() => {
          // Clear the hash to close the modal
          window.history.pushState(null, '', window.location.pathname + window.location.search);
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        }} 
      />
    </div>
  )
}

export default App
