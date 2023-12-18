/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nav: "#121212",
        carousel: "#1a1a1a",
        yellow: "#f5c518",
        lightGrey: "#757575",
        grey: "#b3b3b3",
        darkGrey: "#252525",
        darkGrey2: "#383838",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
  },
  plugins: [],
};
