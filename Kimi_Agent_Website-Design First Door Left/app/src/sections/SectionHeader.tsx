import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  maxWidth?: string;
}

export default function SectionHeader({ label, title, subtitle, light = false, maxWidth }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`text-center mb-12 md:mb-16 ${maxWidth ? 'mx-auto' : ''}`} style={maxWidth ? { maxWidth } : undefined}>
      <span className={`inline-block font-inter text-[12px] font-semibold tracking-[1.5px] uppercase mb-4 ${light ? 'text-fdl-primary' : 'text-fdl-muted'}`}>
        {label}
      </span>
      <h2 className={`font-playfair text-[32px] md:text-[44px] font-normal leading-[1.2] tracking-[-0.01em] mb-6 ${light ? 'text-fdl-body-light' : 'text-fdl-dark'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-inter text-[16px] md:text-[18px] leading-[1.7] ${light ? 'text-[rgba(232,226,218,0.6)]' : 'text-fdl-muted'} mx-auto`} style={{ maxWidth: '640px' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
