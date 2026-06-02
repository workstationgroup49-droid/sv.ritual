import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
  './src/**/*.{ts,tsx}',
],
  theme: {
    extend: {
      colors: {
        obsidian:  '#0e0e0e',
        graphite:  '#1c1c1e',
        ash:       '#2a2a2d',
        mist:      '#8a8a8e',
        cream:     '#f0ece4',
        parchment: '#ddd8cd',
        burgundy:  '#6b1a2a',
        bordeaux:  '#8b2236',
        gold:      '#c9a96e',
        'gold-dim': '#a07c4a',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-lato)', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.8s ease forwards',
        'slide-up':   'slideUp 0.7s ease forwards',
        'slide-up-d': 'slideUp 0.7s ease 0.2s forwards',
        'slide-up-d2':'slideUp 0.7s ease 0.4s forwards',
        'scale-in':   'scaleIn 0.5s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'noise': "url('/images/noise.png')",
      },
    },
  },
  plugins: [],
}

export default config