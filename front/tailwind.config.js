import { mauve, mauveDark, purple, purpleDark } from "@radix-ui/colors";
/** @type {import('tailwindcss').Config} */

const radixToCssVars = (prefix, colors) =>
  Object.fromEntries(Object.entries(colors).map(([key, value]) => [`${prefix}-${key}`, value]));
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...radixToCssVars("mauve", mauve),
        ...radixToCssVars("purple", purple),
        dark: {
          ...radixToCssVars("mauve", mauveDark),
          ...radixToCssVars("purple", purpleDark),
        },
        radix: {
          bg: "var(--color-bg)",
          text: "var(--color-text)",
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          border: "var(--color-border)",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
