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
          light: '#6366f1', // Indigo 500
          DEFAULT: '#4f46e5', // Indigo 600
          dark: '#4338ca', // Indigo 700
        },
        secondary: {
          light: '#94a3b8', // Slate 400
          DEFAULT: '#64748b', // Slate 500
          dark: '#475569', // Slate 600
        },
      },
    },
  },
  plugins: [],
}

