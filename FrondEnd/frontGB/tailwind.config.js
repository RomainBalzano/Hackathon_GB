/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#FE6C75",
          600: "#E1545D",
        },
      },
    },
  },
  plugins: [],
};
