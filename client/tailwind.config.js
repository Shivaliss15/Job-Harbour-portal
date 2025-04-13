/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit", // Ensure JIT mode is enabled
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}" // Include all source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
