import CursorTrail from './sections/CursorTrail';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import BandSection from './sections/BandSection';
import LeistungenSection from './sections/LeistungenSection';
import ConcertsSection from './sections/ConcertsSection';
import HoerprobeSection from './sections/HoerprobeSection';
import GallerySection from './sections/GallerySection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="relative">
      <CursorTrail />
      <Navigation />
      <main>
        <HeroSection />
        <BandSection />
        <LeistungenSection />
        <ConcertsSection />
        <HoerprobeSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
