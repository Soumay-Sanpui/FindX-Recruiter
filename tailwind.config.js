/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      colors: {
        primary: '#2563eb',
        secondary: '#1d4ed8',
        dark: '#1e293b',
        gray: {
          light: '#f8fafc',
          DEFAULT: '#64748b',
          dark: '#334155',
        },
        success: '#10b981',
      },
    },
  },
  plugins: [],
}