const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addVariant }) => {
      addVariant("dark", "&:is(.dark *)");
    }),
  ],
};
