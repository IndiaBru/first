import { useEffect, useRef } from 'react';

const MAX_DOTS = 30;

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotPool = useRef<HTMLDivElement[]>([]);
  const dotIndex = useRef(0);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = !window.matchMedia('(hover: hover)').matches;
    if (isTouch.current) return;

    const container = containerRef.current;
    if (!container) return;

    // Create pooled dots
    for (let i = 0; i < MAX_DOTS; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.style.opacity = '0';
      dot.style.transform = 'scale(0)';
      container.appendChild(dot);
      dotPool.current.push(dot);
    }

    let lastX = 0;
    let lastY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 8) return;
      lastX = e.clientX;
      lastY = e.clientY;

      const dot = dotPool.current[dotIndex.current];
      dotIndex.current = (dotIndex.current + 1) % MAX_DOTS;

      dot.style.left = `${e.clientX - 3}px`;
      dot.style.top = `${e.clientY - 3}px`;
      dot.style.opacity = '0.8';
      dot.style.transform = 'scale(1)';

      requestAnimationFrame(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      dotPool.current.forEach(dot => dot.remove());
      dotPool.current = [];
    };
  }, []);

  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
    return null;
  }

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true" />;
}
