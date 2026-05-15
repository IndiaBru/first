import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 5, label: 'Musiker' },
  { value: 3, label: 'Instrumente' },
  { value: 2025, label: 'Gegründet' },
];

export default function BandSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image slide in from left
      gsap.fromTo(imageRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: imageRef.current, start: 'top 80%', once: true },
        }
      );

      // Text blocks fade slide right with stagger
      const textBlocks = textRef.current?.querySelectorAll('.text-block');
      if (textBlocks) {
        gsap.fromTo(textBlocks,
          { x: 40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
            scrollTrigger: { trigger: textRef.current, start: 'top 80%', once: true },
          }
        );
      }

      // Stats countUp animation
      const statEls = statsRef.current?.querySelectorAll('.stat-number');
      if (statEls) {
        statEls.forEach((el, i) => {
          const target = STATS[i].value;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              once: true,
            },
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toString();
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="band" className="section-padding bg-fdl-cream">
      <div className="content-max-width">
        <SectionHeader
          label="DIE BAND"
          title="Von der Straße auf die Bühne"
          subtitle="Fünf Musiker, eine Leidenschaft — stilvolle Live-Musik abseits des Mainstreams."
        />

        {/* Stats Row */}
        <div ref={statsRef} className="flex flex-wrap justify-center items-center gap-8 md:gap-0 mb-16 md:mb-20">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="text-center px-8 md:px-16">
                <div className="stat-number font-playfair text-[44px] font-light text-fdl-dark leading-none">
                  0
                </div>
                <div className="font-inter text-[16px] text-fdl-muted mt-2">{stat.label}</div>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden md:block w-[1px] h-10 bg-fdl-divider" />
              )}
            </div>
          ))}
        </div>

        {/* Two Column Content */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[60px] items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="w-full lg:w-1/2 opacity-0">
            <div className="rounded-2xl overflow-hidden shadow-image">
              <img
                src="/images/image_6.jpg"
                alt="First Door Left Band bei einem Auftritt unter einem weißen Zelt"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right - Text */}
          <div ref={textRef} className="w-full lg:w-1/2 space-y-5">
            <p className="text-block font-inter text-[16px] leading-[1.7] text-fdl-body opacity-0">
              First Door Left sind fünf Musiker, die sich aus einer ursprünglichen Straßenmusik-Formation
              entwickelt haben. Angefangen hat alles ganz reduziert mit Bass und Gesang, bevor nach und
              nach eine Gitarre dazukam.
            </p>
            <p className="text-block font-inter text-[16px] leading-[1.7] text-fdl-body opacity-0">
              Heute ist die Band als vollständige fünfköpfige Besetzung mit zwei Gitarren und Schlagzeug
              unterwegs. Musikalisch bewegt sich First Door Left bewusst abseits von klassischer
              Partymusik und Schlager.
            </p>
            <p className="text-block font-inter text-[16px] leading-[1.7] text-fdl-body opacity-0">
              Stattdessen steht eine stilvolle, atmosphärische Auswahl im Vordergrund — ideal für
              Sektempfänge, Galas und besondere Veranstaltungen. Das Repertoire ist vielseitig und
              geprägt von ausgewählten Titeln aus Pop, Soul und weiteren Genres.
            </p>
            <a
              href="#leistungen"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#leistungen')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-block inline-block font-inter text-[16px] text-fdl-primary relative group opacity-0"
            >
              <span>Mehr erfahren</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-fdl-primary transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
