/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        fdl: {
          primary: '#B07D3E',
          'primary-hover': '#9A6B32',
          dark: '#1A1714',
          'dark-section': '#1A1714',
          body: '#3D3833',
          'body-light': '#E8E2DA',
          cream: '#F2EDE6',
          'cream-card': '#EBE5DC',
          muted: '#8A827A',
          divider: '#D4CCC2',
          'cursor-dot': '#D4A853',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 24px rgba(26, 23, 20, 0.08)',
        'card-hover': '0 8px 32px rgba(26, 23, 20, 0.12)',
        'image': '0 8px 40px rgba(26, 23, 20, 0.15)',
        'nav': '0 2px 16px rgba(26, 23, 20, 0.06)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
