/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#a700ff",
          "secondary": "#0089e9",
          "accent": "#6061ff",
          "neutral": "#080d05",
          "base-100": "#0d3242",
          "info": "#00ecff",
          "success": "#00a260",
          "warning": "#ff7800",
          "error": "#e54152",
        },
      },
    ],
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}