import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
  { id: '_7NlHvJyQj0', title: "Ain't No Sunshine" },
  { id: 'yqyBYETC-m4', title: 'Dream a Little Dream' },
  { id: 'Ve1CJA6UCkg', title: 'Cover-Version' },
];

function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
      
      {/* Video */}
      <div className="relative aspect-video bg-fdl-dark">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-playfair text-[20px] text-fdl-dark leading-[1.3]">
          {video.title}
        </h3>

        <span className="font-inter text-[12px] font-semibold tracking-[1.5px] text-fdl-muted uppercase mt-2 inline-block">
          Hörprobe
        </span>
      </div>
    </div>
  );
}

export default function HoerprobeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.video-card-wrapper');
      if (cards) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.2,
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hoerprobe" className="section-padding bg-fdl-cream">
      <div className="content-max-width">
        <SectionHeader
          label="HÖRPROBE"
          title="Unsere Musik hören"
          subtitle="Gewinnen Sie einen Eindruck unseres Sounds."
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
          {VIDEOS.map((video) => (
            <div key={video.id} className="video-card-wrapper opacity-0">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
