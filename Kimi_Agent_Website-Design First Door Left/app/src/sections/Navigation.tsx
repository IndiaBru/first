import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Startseite', href: '#hero' },
  { label: 'Band', href: '#band' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Konzerte', href: '#konzerte' },
  { label: 'Hörprobe', href: '#hoerprobe' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Nav entrance animation
    gsap.fromTo(nav, { y: -100, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.3,
    });

    // Scroll detection for background change
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track active section
    const sections = ['hero', 'band', 'leistungen', 'konzerte', 'hoerprobe', 'kontakt'];
    const triggers: ScrollTrigger[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
      triggers.push(st);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      triggers.forEach(st => st.kill());
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const isLight = !scrolled;

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 opacity-0 ${
          scrolled
            ? 'bg-[rgba(242,237,230,0.95)] backdrop-blur-[12px] shadow-nav'
            : 'bg-transparent'
        }`}
        style={{ opacity: 0 }}
      >
        <div className="content-max-width flex items-center justify-between h-16 md:h-[72px] px-5 md:px-8">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-1.5"
          >
            <span className={`font-inter text-[16px] font-bold tracking-[2px] transition-colors duration-500 ${
              isLight ? 'text-white' : 'text-fdl-dark'
            }`}>
              FIRST DOOR LEFT
            </span>
            <span className="w-2 h-2 rounded-full bg-fdl-primary inline-block" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2 rounded-[40px] text-[14px] font-medium font-inter transition-all duration-300 ${
                    isActive
                      ? isLight
                        ? 'bg-[rgba(176,125,62,0.25)] text-white'
                        : 'bg-[rgba(176,125,62,0.12)] text-fdl-primary'
                      : isLight
                        ? 'text-[rgba(255,255,255,0.8)] hover:text-white hover:bg-[rgba(255,255,255,0.08)]'
                        : 'text-fdl-body hover:text-fdl-primary hover:bg-[rgba(176,125,62,0.08)]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Hamburger */}
          <div className="flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${isLight ? 'text-white' : 'text-fdl-dark'}`}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-fdl-dark flex flex-col items-center justify-center gap-6 lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-fdl-body-light text-2xl font-playfair hover:text-fdl-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
