/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#fff',
        'dark-bg-meddium' : "#01987A",
        'dark-bg-lite' : "#01987A",
        'dark-bg-text' : "#fff"
      },
    },
  },
  plugins: [],
}

