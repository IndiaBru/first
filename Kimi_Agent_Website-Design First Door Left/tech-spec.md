# Tech Spec — First Door Left (Design 1: Warm Acoustic Elegance)

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0 | UI framework |
| react-dom | ^19.0 | DOM renderer |
| vite | ^6.0 | Build tool |
| @vitejs/plugin-react | ^4.4 | Vite React plugin |
| typescript | ^5.7 | Type safety |
| tailwindcss | ^4.0 | Styling |
| @tailwindcss/vite | ^4.0 | Tailwind Vite integration |
| gsap | ^3.12 | Animations (ScrollTrigger, SplitText) |
| lucide-react | ^0.460 | Icons (Music, Heart, MapPin, Phone, Mail, Instagram, Youtube, ArrowRight, Menu, X, Check) |
| imagesloaded | ^5.0 | Gallery image loading detection |

## Fonts

Playfair Display + Inter via Google Fonts CDN in index.html.

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| Navigation | Custom | Single instance, fixed pill nav with scroll-driven entrance/active state |
| Footer | Custom | Single instance |
| CursorTrail | Custom | Single instance, desktop only |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Two-column, GSAP timeline on mount, word-split animation |
| BandSection | Custom | Stats row with countUp, two-column content |
| LeistungenSection | Custom | 2 service cards |
| ConcertsSection | Custom | Dark band, concert list items |
| HoerprobeSection | Custom | 3 YouTube video cards with play overlay |
| GallerySection | Custom | 3-column masonry with imagesLoaded |
| ContactSection | Custom | Two-column: info + form |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| SectionHeader | Custom | Band, Leistungen, Concerts, Hoerprobe, Contact — renders label + title + optional subtitle |
| VideoCard | Custom | HoerprobeSection ×3 |
| ConcertItem | Custom | ConcertsSection ×5 |
| ServiceCard | Custom | LeistungenSection ×2 |

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Hero word split + entrance | GSAP | SplitText to wrap words in spans, timeline with stagger | High |
| Hero image scale-in + decorative line | GSAP | Timeline with scale/opacity/height tweens | Low |
| Section entrance animations | GSAP ScrollTrigger | fadeSlideUp/fadeIn/fadeSlideLeft/Right triggered at 80% viewport | Medium |
| Stats countUp | GSAP | gsap.to with snap on each number element, ScrollTrigger | Medium |
| Nav scroll entrance | GSAP ScrollTrigger | translateY(-100%)→0 triggered at 50px scroll | Low |
| Nav active state tracking | GSAP ScrollTrigger | onEnter/onLeave callbacks per section, React state | Medium |
| Golden cursor trail | Vanilla JS/CSS | requestAnimationFrame + pooled DOM dots on mousemove | Medium |
| Video play overlay | CSS/React state | Overlay fade-out on click, iframe lazy load | Low |
| Gallery image loading | imagesloaded | Wait for all images before initializing ScrollTrigger | Low |
| Card hover effects | CSS | translateY + shadow transitions | Low |
| Button hover | CSS | Background/border color transitions | Low |

## State & Logic

### Cursor Trail
- Pooled array of 30 DOM dot elements
- Track mousemove, cycle through pool
- Disable on touch devices (matchMedia hover: hover)

### Navigation Active Section
- React state `activeSection` string
- Each section has a ScrollTrigger that updates state on enter/leave

### Contact Form
- React state: name, email, message, submitted
- On submit: prevent default, set submitted=true, show success message

### Video Cards
- React state per card: isPlaying boolean
- On click: set isPlaying true, overlay fades out

## Other Key Decisions

- **Masonry gallery**: CSS columns (column-count: 3) with break-inside: avoid on image wrappers — no JS masonry library needed
- **YouTube embeds**: Standard iframe with lazy loading, not react-youtube (simpler, lighter)
- **Hero animation**: GSAP timeline on mount (not scroll-triggered) since it's above the fold
- **imagesloaded**: Used only in GallerySection to ensure ScrollTrigger measurements are correct after images load
- **Smooth scroll**: CSS scroll-behavior: smooth on html element (no Lenis needed — Design 1 doesn't require it)
