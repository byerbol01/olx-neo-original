/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olx: {
          dark: "#002f34",
          darker: "#002226",
          footer: "#0b2628",
          teal: "#0f3837",
          cyan: "#23e5db",
          "cyan-hover": "#1cd1c7",
          "cyan-light": "#e6faf9",
          yellow: "#ffce32",
          "yellow-hover": "#f3c220",
          "yellow-light": "#fff8e0",
          bg: "#f2f4f5",
          border: "#e5eaed",
          text: "#7f9799",
          darkText: "#002f34",
          red: "#ff5636",
        },
      },
    },
  },
  plugins: [],
};
