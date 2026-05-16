import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Youtube, Instagram } from '../components/Icons';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="kontakt" className="section-padding bg-fdl-cream">
      <div className="content-max-width">
        <SectionHeader
          label="KONTAKT"
          title="Lassen Sie uns Ihr Event unvergesslich machen"
          maxWidth="600px"
        />

        <div ref={contentRef} className="max-w-[600px] mx-auto opacity-0">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-fdl-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-inter text-[18px] text-fdl-body">Tholey, Deutschland</p>
              </div>
            </div>

            <a href="mailto:firstdoorleft@gmx.de" className="flex items-start gap-4 group">
              <Mail className="w-6 h-6 text-fdl-primary shrink-0 mt-0.5" />
              <p className="font-inter text-[18px] text-fdl-body group-hover:text-fdl-primary transition-colors">
                firstdoorleft@gmx.de
              </p>
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-4 mt-10">
            <a
              href="https://www.youtube.com/@firstdoorleft"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-fdl-divider rounded-xl flex items-center justify-center hover:border-fdl-primary hover:bg-[rgba(176,125,62,0.05)] transition-all duration-200"
              aria-label="YouTube Kanal"
            >
              <Youtube className="w-5 h-5 text-fdl-body" />
            </a>
            <a
              href="https://www.instagram.com/firstdoorleft/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-fdl-divider rounded-xl flex items-center justify-center hover:border-fdl-primary hover:bg-[rgba(176,125,62,0.05)] transition-all duration-200"
              aria-label="Instagram Profil"
            >
              <Instagram className="w-5 h-5 text-fdl-body" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
