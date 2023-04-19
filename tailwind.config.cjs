/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        arial : ['Arial', 'sans-serif'],
      },
      boxShadow: {
        "button": "inset 2px 2px 5px black",
        "blue": "0px 0px 30px -6px rgba(94,220,224,1)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      }
    },
  },
  plugins: [],
}
