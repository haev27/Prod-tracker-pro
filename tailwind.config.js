/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#6a7d90",
        "background-light": "#f7f7f7",
        "background-dark": "#17191b",
        "emerald-green": "#078838",
        industrial: {
          dark: '#1a1a1a',
          accent: '#6a7d90',
          danger: '#ef4444',
          success: '#078838',
          gray: '#374151'
        }
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
