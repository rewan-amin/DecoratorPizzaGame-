/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crust: '#4A2C2A',
        sauce: '#DC2626',
        cheese: '#FACC15',
      },
      fontFamily: {
        sans: ['"Fredoka"', '"Nunito"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
