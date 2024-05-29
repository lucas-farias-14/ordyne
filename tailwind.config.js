/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1C1D27',
        golden: '#E4AC1C',
        grayb: '#737698',
        delete: '#961212',
        secondary: '#363742'
      }
    },
  },
  plugins: [],
}

