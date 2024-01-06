/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#CB4335"
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
