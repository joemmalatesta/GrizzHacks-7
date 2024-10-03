/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      light: "#f6f6e9",
      primary: "#3d81a8",
      secondary: "#a89a64",
    },
    extend: {
      fontFamily: {
        recoleta: ['Recoleta', 'sans-serif']
      }
    }
  },
  plugins: []
};