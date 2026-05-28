/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      animation: {
        'pulse': 'pulse 0.5s ease-in-out',
        'bounce-slow': 'bounce 1s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 1.5s infinite',
      },
    },
  },
  plugins: [],
}