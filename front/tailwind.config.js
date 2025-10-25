const { blackA, violet, mauve } = require("@radix-ui/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Alterna o tema com a classe 'dark'
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Ajuste conforme a estrutura do seu projeto
  ],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...violet,
        ...mauve,
      },
    },
  },
  plugins: [],
};
