/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit", // Habilita el modo Just-In-Time para mejor rendimiento
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Azul fuerte
        secondary: "#FACC15", // Amarillo vibrante
        danger: "#DC2626", // Rojo para alertas
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
