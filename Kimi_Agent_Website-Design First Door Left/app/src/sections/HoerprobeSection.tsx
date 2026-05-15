import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from '../components/Icons';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
  { id: '_7NlHvJyQj0', title: "Ain't No Sunshine" },
  { id: 'yqyBYETC-m4', title: 'Dream a Little Dream' },
  { id: 'Ve1CJA6UCkg', title: 'Cover-Version' },
];

function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
      {/* Video Container */}
      <div className="relative aspect-video bg-fdl-dark">
        {!isPlaying ? (
          <>
            {/* Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
              alt={`${video.title} - First Door Left Cover`}
              className="w-full h-full object-cover"
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
            />
            {!isLoaded && (
              <div className="absolute inset-0 bg-fdl-dark animate-pulse" />
            )}
            {/* Play Overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group cursor-pointer"
              aria-label={`${video.title} abspielen`}
            >
              <div className="absolute inset-0 bg-[rgba(26,23,20,0.3)] group-hover:bg-[rgba(26,23,20,0.15)] transition-colors duration-300" />
              <div className="relative w-16 h-16 rounded-full bg-fdl-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </button>
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
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
          subtitle="Dreimal einen Eindruck unseres Sounds gewinnen."
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
