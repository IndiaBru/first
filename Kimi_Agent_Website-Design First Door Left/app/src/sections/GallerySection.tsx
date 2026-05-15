import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COL1 = [
  { src: '/images/image_0.jpg', alt: 'Bandmitglieder unter einem Festzelt', aspect: 'tall' },
  { src: '/images/image_3.jpg', alt: 'Gitarrist bei einem Live-Auftritt', aspect: 'square' },
];

const COL2 = [
  { src: '/images/image_1.jpg', alt: 'Die komplette Band in Schwarz-Weiß', aspect: 'wide' },
  { src: '/images/image_5.jpg', alt: 'Sängerin bei einem Auftritt', aspect: 'tall' },
];

const COL3 = [
  { src: '/images/image_2.jpg', alt: 'Kontrabass-Nahaufnahme', aspect: 'tall' },
  { src: '/images/image_4.jpg', alt: 'Schlagzeuger in Aktion', aspect: 'square' },
  { src: '/images/image_6.jpg', alt: 'Band bei einem Auftritt unter dem Zelt', aspect: 'wide' },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = gridRef.current?.querySelectorAll('.gallery-img-wrapper');
      if (images) {
        gsap.fromTo(images,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.08,
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderImage = (img: typeof COL1[0], idx: string) => (
    <div
      key={idx}
      className={`gallery-img-wrapper rounded-2xl overflow-hidden shadow-image opacity-0 ${
        img.aspect === 'tall' ? 'aspect-[3/4]' : img.aspect === 'wide' ? 'aspect-[4/3]' : 'aspect-square'
      }`}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-400 cursor-zoom-in"
        loading="lazy"
      />
    </div>
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-[80px] bg-fdl-cream-card px-5 md:px-8">
      <div className="content-max-width">
        <h2 className="font-playfair text-[32px] md:text-[44px] font-normal text-fdl-dark text-center leading-[1.2] mb-12 md:mb-16">
          Momente & Eindrücke
        </h2>

        <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {/* Distribute images across columns */}
          {COL1.map((img, i) => renderImage(img, `c1-${i}`))}
          {COL2.map((img, i) => renderImage(img, `c2-${i}`))}
          {COL3.map((img, i) => renderImage(img, `c3-${i}`))}
        </div>
      </div>
    </section>
  );
}
