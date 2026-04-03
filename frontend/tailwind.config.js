/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zentry-dark': '#0a0a0a',   // Deep, rich black/gray
        'zentry-copper': '#C48446', // Your primary metallic copper
        'zentry-slate': '#888888',  // Clean, readable secondary gray
      }
    },
  },
  plugins: [],
}