/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.css",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
'fadeOut': 'fadeOut 1s ease-out forwards',
    'pageTransition': 'pageTransition 0.4s ease-out forwards',
    'pulse': 'pulse 2s infinite',      },
    },
  },
  plugins: [],
};
