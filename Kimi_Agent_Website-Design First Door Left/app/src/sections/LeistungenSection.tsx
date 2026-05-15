import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Heart } from '../components/Icons';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Music,
    title: 'Öffentliche Veranstaltungen',
    description: 'Live-Musik für Galas, Firmenfeiern, Feste und kulturelle Veranstaltungen — mit einem vielseitigen Repertoire abseits klassischer Partymusik.',
  },
  {
    icon: Heart,
    title: 'Hochzeit Live-Musik',
    description: 'Stilvolle Live-Musik für Hochzeiten — passend für Trauungen, Sektempfänge und besondere Momente Ihres großen Tages. Individuell abgestimmt auf Ihre Wünsche und die gewünschte Atmosphäre.',
  },
];

export default function LeistungenSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.2,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="leistungen" className="section-padding bg-fdl-cream-card">
      <div className="content-max-width">
        <SectionHeader
          label="UNSERE LEISTUNGEN"
          title="Das perfekte Soundtrack für Ihr Event"
        />

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="service-card bg-white rounded-2xl p-8 md:p-10 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 opacity-0"
            >
              <div className="w-12 h-12 rounded-full bg-[rgba(176,125,62,0.08)] flex items-center justify-center mb-6">
                <service.icon className="w-5 h-5 text-fdl-primary" />
              </div>
              <h3 className="font-playfair text-[22px] md:text-[24px] font-normal text-fdl-dark mb-4 leading-[1.3]">
                {service.title}
              </h3>
              <p className="font-inter text-[16px] leading-[1.7] text-fdl-body">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
