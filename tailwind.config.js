/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#272935',
        'dark-bg-meddium' : "#37384A",
        'dark-bg-lite' : "#505269",
        'dark-bg-text' : "#fff"
      },
    },
  },
  plugins: [],
}

