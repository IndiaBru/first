import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const CONCERTS = [
  { day: '04', month: 'JUL', year: '2026', name: 'Waderner Marktsommer' },
  { day: '12', month: 'JUL', year: '2026', name: 'Dorffest Überroth' },
  { day: '01', month: 'AUG', year: '2026', name: 'Feuerwehrfest Dorf im Bohnental' },
  { day: '15', month: 'AUG', year: '2026', name: 'Feuerwehrfest Scheuern' },
  { day: '22', month: 'AUG', year: '2026', name: 'Dämmerschoppen Bardenbach' },
  { day: '05', month: 'SEP', year: '2026', name: 'Weinfest Scheuern' },
];

export default function ConcertsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll('.concert-item');
      if (items) {
        gsap.fromTo(items,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: listRef.current, start: 'top 80%', once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="konzerte" className="bg-fdl-dark py-20 md:py-[100px] px-5 md:px-8">
      <div className="content-max-width">
        <SectionHeader
          label="KONZERTTERMINE"
          title="Kommende Auftritte"
          subtitle="Erleben Sie First Door Left live bei einem unserer nächsten Events."
          light
        />

        <div ref={listRef} className="max-w-[800px] mx-auto space-y-4">
          {CONCERTS.map((concert) => (
            <div
              key={concert.name}
              className="concert-item flex items-center justify-between bg-[rgba(232,226,218,0.05)] border border-[rgba(232,226,218,0.1)] rounded-2xl px-6 md:px-8 py-5 md:py-6 hover:bg-[rgba(232,226,218,0.08)] hover:border-[rgba(176,125,62,0.3)] transition-all duration-300 cursor-default opacity-0"
            >
              <div className="flex items-center gap-4 md:gap-6">
                {/* Date */}
                <div className="flex flex-col items-center min-w-[48px]">
                  <span className="font-playfair text-[28px] md:text-[32px] font-normal text-fdl-body-light leading-none">
                    {concert.day}
                  </span>
                  <span className="font-inter text-[12px] font-semibold tracking-[1.5px] text-fdl-muted uppercase">
                    {concert.month}
                  </span>
                  <span className="font-inter text-[14px] text-fdl-muted">
                    {concert.year}
                  </span>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-[1px] h-10 bg-[rgba(232,226,218,0.15)]" />

                {/* Event name */}
                <span className="font-inter text-[16px] md:text-[18px] text-fdl-body-light">
                  {concert.name}
                </span>
              </div>


            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
