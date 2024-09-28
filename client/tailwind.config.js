/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      theme: {
        colors: {
          darkBorder: '#52526B',
          darkBgPrimary: '#16162A',
          darkBgSecondary: '#292946',
          darkTextPrimary: '#4277FF',
          lightTextPrimary: '#4277FF',
        }
      }
    },
  },
  plugins: [],
};
