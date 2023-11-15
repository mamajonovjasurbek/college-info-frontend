/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#27374D',
        'dark-bg-meddium' : "#526D82",
        'dark-bg-lite' : "#9DB2BF",
        'dark-bg-text' : "#DDE6ED"
      },
    },
  },
  plugins: [],
}

