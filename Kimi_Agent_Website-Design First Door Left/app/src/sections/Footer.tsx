import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Youtube, Instagram } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = [
  { label: 'Startseite', href: '#hero' },
  { label: 'Band', href: '#band' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Konzerte', href: '#konzerte' },
  { label: 'Hörprobe', href: '#hoerprobe' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%', once: true },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="bg-fdl-dark pt-14 md:pt-[60px] pb-8 px-5 md:px-8 opacity-0">
      <div className="content-max-width">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          {/* Left */}
          <div>
            <span className="font-inter text-[16px] font-bold tracking-[2px] text-fdl-body-light">
              FIRST DOOR LEFT
            </span>
            <p className="font-inter text-[16px] text-fdl-muted mt-2">
              Stilvolle Live-Musik für besondere Anlässe.
            </p>
          </div>

          {/* Right - Nav */}
          <div>
            <span className="block font-inter text-[12px] font-semibold tracking-[1.5px] text-fdl-muted uppercase mb-4">
              Navigation
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="font-inter text-[16px] text-[rgba(232,226,218,0.6)] hover:text-fdl-body-light transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[rgba(232,226,218,0.1)] my-8" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-inter text-[14px] text-fdl-muted">
            © 2025 First Door Left. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.youtube.com/@firstdoorleft"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fdl-muted hover:text-fdl-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/firstdoorleft/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fdl-muted hover:text-fdl-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
