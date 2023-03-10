/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ylw: {
          100: "#EAD6BD",
          200: "#FDB140",
        },
        dark: "#070707",
        light: "#f0f0f0",
        sub: "#4D6A68",
      },

      fontFamily: {
        sprat: ["sprat", "serif"],
        druk: ["druk", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        syne: ["Syne", "sans-serif"],
      },

      screens: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }
        xs: { max: "480px" },
      },
    },
  },
  plugins: [],
}