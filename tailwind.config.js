/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3b82f6",
          "secondary": "#a3e635",
          "accent": "#d946ef",
          "neutral": "#4b5563",
          "base-100": "#fafafa",
          "info": "#40daff",
          "success": "#00f370",
          "warning": "#1c1917",
          "error": "#e11d48",
        },
      },
    ],
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'luckycoin': ['luckycoin', 'sans-serif'],
        'kanit': ['kanit', 'sans-serif'],
        'kanit-bold': ['kanit-bold', 'sans-serif'],
        'kanit-light': ['kanit-light', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
}