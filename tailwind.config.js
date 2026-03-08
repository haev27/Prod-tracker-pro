/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          dark: '#1a1a1a',
          accent: '#facc15',
          danger: '#ef4444',
          success: '#22c55e',
          gray: '#374151'
        }
      }
    },
  },
  plugins: [],
}
