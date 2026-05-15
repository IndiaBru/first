import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Image reveal from bottom
      tl.fromTo(imageRef.current,
        { clipPath: 'inset(100% 0 0% 0)' },
        { clipPath: 'inset(0% 0 0% 0)', duration: 1.4, ease: 'power3.inOut' },
        0
      );

      // Overlay gradient fade in
      tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.0, ease: 'power2.out' },
        0.6
      );

      // Headline word split
      if (headlineRef.current) {
        const text = headlineRef.current.innerText;
        const words = text.split(' ');
        headlineRef.current.innerHTML = words
          .map(word => `<span class="inline-block overflow-hidden mr-[0.25em]"><span class="word-inner inline-block">${word}</span></span>`)
          .join('');

        tl.fromTo(
          headlineRef.current.querySelectorAll('.word-inner'),
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', stagger: 0.05 },
          1.0
        );
      }

      // Subheadline
      tl.fromTo(subheadlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        1.5
      );

      // CTA buttons
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        1.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="hero" className="relative">
      {/* Full-Width Hero Image */}
      <div
        ref={imageRef}
        className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden"
        style={{ clipPath: 'inset(100% 0 0% 0)' }}
      >
        <img
          src="/images/image_1.jpg"
          alt="First Door Left Band - Fünf Musiker bei einem Live-Auftritt unter einem Zelt"
          className="w-full h-full object-cover object-[center_30%]"
          loading="eager"
        />
        {/* Gradient overlay for text readability at bottom */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-[#1A1714] via-[rgba(26,23,20,0.4)] to-transparent opacity-0"
        />

        {/* Text overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="content-max-width px-5 md:px-8 pb-10 md:pb-16">
            <h1
              ref={headlineRef}
              className="font-playfair text-[36px] sm:text-[48px] md:text-[56px] lg:text-[68px] font-normal leading-[1.05] tracking-[-0.02em] text-white max-w-[900px]"
            >
              Stilvolle Live-Musik für Ihren besonderen Moment
            </h1>
          </div>
        </div>
      </div>

      {/* Content band below image */}
      <div ref={contentRef} className="bg-fdl-dark py-10 md:py-14 px-5 md:px-8">
        <div className="content-max-width flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p
            ref={subheadlineRef}
            className="font-inter text-[16px] md:text-[18px] leading-[1.7] text-[rgba(232,226,218,0.7)] max-w-[520px] opacity-0"
          >
            First Door Left — fünf Musiker mit vielseitigem Repertoire aus Pop, Soul und mehr.
            Ideal für Hochzeiten, Galas und atmosphärische Events.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0 shrink-0">
            <button
              onClick={() => scrollTo('#kontakt')}
              className="bg-fdl-primary hover:bg-fdl-primary-hover text-white font-inter text-[14px] font-semibold tracking-[1px] px-8 py-3.5 rounded-lg transition-colors duration-200"
            >
              Jetzt Anfragen
            </button>
            <button
              onClick={() => scrollTo('#hoerprobe')}
              className="border border-[rgba(232,226,218,0.3)] hover:border-fdl-primary hover:text-fdl-primary text-fdl-body-light font-inter text-[14px] font-semibold tracking-[1px] px-8 py-3.5 rounded-lg transition-all duration-200"
            >
              Hörproben anhören
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
