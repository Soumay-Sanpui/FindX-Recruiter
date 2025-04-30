/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      backgroundColor :{
        'blue-pri': '#0B64FB',
        'blue-sec': '#051258',
      },
      textColor :{
        'blue-pri': '#0B64FB',
        'blue-sec': '#051258',
      }
    },
  },
  plugins: [],
}