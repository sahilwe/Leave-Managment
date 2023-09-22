const colors = require("tailwindcss/colors");
//const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: colors.indigo,
        secondary: colors.blueGray,
        accent: colors.pink,
        success: colors.green,
        warning: colors.amber,
        error: colors.red,
        info: colors.cyan,
        dark: {
          50: "#f0f6f9",
          100: "#d9e2e8",
          200: "#bfcdd8",
          300: "#a5b9c7",
          400: "#8aa5b6",
          500: "#6f91a5",
          600: "#56727b",
          700: "#425662",
          800: "#2d3848",
          900: "#161c24",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  externals: {
    'react': 'React',
    'react-dom' :'ReactDom'

  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@material-tailwind/react"),
  ],
};

