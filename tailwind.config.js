/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-yellow": "#FFE169",
        "medium-yellow": "#FAD643",
        "dark-yellow": "#DBB42C",
        "darker-yellow": "#5a490f",
        "background-grey": "#F8F9FA",
        "background-dark": "#403D39",
        "nav-text": "#6b7280",
        "nav-text-hover": "#030712",
        navIcon: "#a1a1aa",
      },
    },
  },
  plugins: [],
};
