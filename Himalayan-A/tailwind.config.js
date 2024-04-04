/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        "40rem": "40rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
