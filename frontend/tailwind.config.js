/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0B0E14',
          900: '#0F1420',
          800: '#151B2B',
          700: '#1D2438',
        },
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        surface2: 'rgb(var(--color-surface-2) / <alpha-value>)',
        surface3: 'rgb(var(--color-surface-3) / <alpha-value>)',
        edge: 'rgb(var(--color-edge) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        'ink-muted': 'rgb(var(--color-ink-muted) / <alpha-value>)',
        'ink-faint': 'rgb(var(--color-ink-faint) / <alpha-value>)',
        line: 'rgba(255,255,255,0.08)',
        mist: '#94A3B8',
        teal: {
          400: '#22D3AE',
          500: '#14B896',
        },
        violet: {
          400: '#7C6CF6',
          500: '#6552E8',
        },
        coral: {
          400: '#FB7185',
          500: '#F43F5E',
        },
        mint: {
          400: '#34D399',
          500: '#10B981',
        },
        amber: {
          400: '#FBBF24',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'aurora-teal': 'radial-gradient(circle at 30% 30%, rgba(34,211,174,0.25), transparent 70%)',
        'aurora-violet': 'radial-gradient(circle at 70% 70%, rgba(124,108,246,0.22), transparent 70%)',
        'brand-gradient': 'linear-gradient(135deg, #22D3AE 0%, #7C6CF6 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0,0,0,0.37)',
        'glass-sm': '0 4px 16px 0 rgba(0,0,0,0.25)',
        glow: '0 0 24px rgba(34,211,174,0.35)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, -30px) scale(1.05)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        drift: 'drift 14s ease-in-out infinite',
        'drift-slow': 'drift 20s ease-in-out infinite reverse',
        'fade-up': 'fade-up 0.4s ease-out both',
        'scale-in': 'scale-in 0.2s ease-out both',
      },
    },
  },
  plugins: [],
}
