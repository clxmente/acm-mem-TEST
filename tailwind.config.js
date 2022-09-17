/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ai: "#21d19f",
        algo: "#9d35e7",
        design: "#ff4365",
        dev: "#1e6cff",
      },
    },
  },
  plugins: [],
};
