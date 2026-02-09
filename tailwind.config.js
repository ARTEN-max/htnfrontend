/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        beige: {
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#ebe7e0',
          300: '#d6d0c4',
          400: '#b8b0a0',
          500: '#9c9280',
          600: '#7a7060',
          700: '#645c50',
          800: '#524c42',
          900: '#454038',
        },
        accent: {
          pink: '#ec4899',
          purple: '#a855f7',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          green: '#10b981',
          yellow: '#f59e0b',
        },
      },
      backgroundImage: {
        'speckled': "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'rainbow': 'linear-gradient(90deg, #f97316, #ec4899, #a855f7, #3b82f6, #06b6d4, #10b981)',
        'warm': 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
        'cool': 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)',
        'sunset': 'linear-gradient(135deg, #fef3c7 0%, #fde68a 25%, #fbbf24 50%, #f97316 75%, #ec4899 100%)',
      },
      backgroundSize: {
        'speckled': '20px 20px',
      },
      boxShadow: {
        'colorful': '0 10px 40px -10px rgba(249, 115, 22, 0.3), 0 0 0 1px rgba(249, 115, 22, 0.1)',
        'colorful-lg': '0 20px 60px -15px rgba(249, 115, 22, 0.4), 0 0 0 1px rgba(249, 115, 22, 0.15)',
      },
    },
  },
  plugins: [],
}
