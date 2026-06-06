/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        helios: {
          black: '#020805',
          deep: '#06140f',
          green: '#00d084',
          gold: '#f5b23c',
          blue: '#38a8ff',
          card: '#0b1510',
          muted: '#9ca3af',
        },
      },
      boxShadow: {
        glow: '0 0 35px rgba(0, 208, 132, 0.22)',
        gold: '0 0 30px rgba(245, 178, 60, 0.2)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
