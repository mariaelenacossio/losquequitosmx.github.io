/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#FFF6EE',
          100: '#FFEAD6',
          200: '#FFD1A8',
          300: '#FFAF70',
          400: '#FF8336',
          500: '#F97316',  // primary CTA — warm orange
          600: '#E05C07',
          700: '#B84A05',
          800: '#8A380A',
          900: '#5C250B',
        },
        peach: {
          50:  '#FFF4F0',
          100: '#FFE5D9',
          200: '#FFCAB5',
          300: '#FFA688',
          400: '#FF7A55',
          500: '#F95432',
        },
        rose: {
          50:  '#FFF0F5',
          100: '#FFD6E8',
          200: '#FFB3D0',
          300: '#FF85B3',
          400: '#FF5596',
          500: '#F43F79',
        },
        neutral: {
          50:  '#FAFAF9',
          100: '#F5F4F2',
          200: '#EAE9E6',
          300: '#D6D4D0',
          400: '#A8A49E',
          500: '#78746E',
          600: '#57534D',
          700: '#3D3A35',
          800: '#27241F',
          900: '#1A1714',
        },
      },
      fontFamily: {
        display: ['"Nunito"', '"Poppins"', 'system-ui', 'sans-serif'],
        body:    ['"Inter"', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card':    '0 2px 20px rgba(26,23,20,0.06)',
        'card-md': '0 4px 32px rgba(26,23,20,0.09)',
        'card-lg': '0 8px 48px rgba(26,23,20,0.12)',
        'brand':   '0 4px 24px rgba(249,115,22,0.28)',
        'brand-lg':'0 8px 40px rgba(249,115,22,0.35)',
        'inner-sm':'inset 0 1px 3px rgba(26,23,20,0.06)',
      },
      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern':    'linear-gradient(135deg, #FFF6EE 0%, #FFF0F5 50%, #FFF6EE 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
